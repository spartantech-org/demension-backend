import { response } from '../common/utils'
const Customer = require('../models/customer')
require('mongoose-pagination')

async function addCustomer (req, res, next) {
  const customer = new Customer({ ...req.body, business: req.business })
  customer.save((err, item) => {
    if (err) return next(err)
    res.json(item)
  })
}

async function editCustomer (req, res, next) {
  try {
    if (req.body.email) {
      const item = await Customer.findOne({
        business: req.business,
        email: req.body.email,
        _id: { $ne: req.params.id }
      })
      if (item) {
        return res.status(400).json(response(false, {}, __('Email is existed')))
      }
    }
    Customer.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, item) => {
      if (err) return next(err)
      Customer.findById(item._id, (err, item) => {
        if (err) return next(err)
        res.json(item)
      })
    })
  } catch (error) {
    next(error)
  }
}

async function deleteCustomer (req, res, next) {
  Customer.findByIdAndUpdate(req.params.id, { $set: { enable: false } }, (err, item) => {
    if (err) return next(err)
    res.json({ success: true })
  })
}

async function syncCustomers (req, res, next) {
  Customer.find({ enable: true, business: req.business }).exec((err, items) => {
    if (err) return next(err)
    res.json(items)
  })
}

async function getCustomers (req, res, next) {
  let query = { enable: true, business: req.business }
  const page = req.query.page ? parseInt(req.query.page) : 1
  const limit = req.query.limit ? parseInt(req.query.limit) : 10
  if (req.query.search != undefined && req.query.search.length > 0) {
    query = {
      $and: [
        query,
        {
          $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
            { address: { $regex: req.query.search, $options: 'i' } },
            { phone: { $regex: req.query.search, $options: 'i' } }
          ]
        }
      ]
    }
  }
  Customer.find(query).paginate(page, limit, (err, docs, total) => {
    if (err) return next(err)
    res.json({ data: docs, total })
  })
}

export default {
  addCustomer,
  editCustomer,
  deleteCustomer,
  syncCustomers,
  getCustomers
}
