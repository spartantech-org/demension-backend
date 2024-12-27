import Services from '../services/index'
import _ from 'lodash'
const Order = require('../models/order')
require('mongoose-pagination')

async function addOrder(req, res, next) {
  Services.order.createOrder(
    { ...req.body, business: req.business, createdBy: req.userId },
    (err, item) => {
      if (err) return next(err)
      Services.log.createNewOrder(item, req.userInfo)
      res.json(Order.detailForManager(item))
    }
  )
}

async function editOrder(req, res, next) {
  Services.order.updateOrder(req.params.id, req.body, (err, item) => {
    if (err) return next(err)
    res.json(Order.detailForManager(item))
  })
}

async function deleteOrder(req, res, next) {
  Services.order.deleteOrder(req.params.id, (err, item) => {
    if (err) return next(err)
    res.json({ success: true })
  })
}

async function syncOrders(req, res, next) {
  Order.find({ business: req.business })
    .deepPopulate('items.product')
    .populate('customer')
    .populate('coupon')
    .exec((err, items) => {
      if (err) return next(err)
      res.json(_.map(items, Order.detailForManager))
    })
}

async function getOrders(req, res, next) {
  const query = { business: req.business }
  const page = req.query.page ? parseInt(req.query.page) : 1
  const limit = req.query.limit ? parseInt(req.query.limit) : 10
  if (req.query.customer !== undefined && req.query.customer.length > 0) {
    query.customer = req.query.customer
  }
  Order.find(query)
    .deepPopulate('items.product')
    .populate('customer')
    .populate('coupon')
    .paginate(page, limit, (err, docs, total) => {
      if (err) return next(err)
      res.json({ data: _.map(docs, Order.detailForManager), total })
    })
}

export default {
  addOrder,
  editOrder,
  deleteOrder,
  syncOrders,
  getOrders
}
