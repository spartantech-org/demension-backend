import Services from '../services/index'
import _ from 'lodash'
const Product = require('../models/product')
const Log = require('../models/log')
const Order = require('../models/order')
require('mongoose-pagination')

async function addProduct(req, res, next) {
  try {
    const product = new Product({ ...req.body, business: req.business })
    let item = await product.save()
    item = await Product.findById(item._id).populate('category').exec()
    if (item.category) {
      Services.category.increaseCount(item.category)
    }
    Services.log.createNewProduct(item, req.userInfo)
    res.json(Product.detailForManager(item))
  } catch (error) {
    next(error)
  }
}

async function editProduct(req, res, next) {
  try {
    if (req.body.category) {
      const product = await Product.findById(req.params.id)
      if (product.category) {
        Services.category.decreaseCount(product.category)
      }
      Services.category.increaseCount(req.body.category)
    }
    await Product.updateOne({ _id: req.params.id }, { $set: req.body })
    const item = await Product.findById(req.params.id).populate('category').exec()
    Services.log.editProduct(item, req.userInfo)
    res.json(Product.detailForManager(item))
  } catch (error) {
    next(error)
  }
}

async function deleteProduct(req, res, next) {
  try {
    await Product.updateOne({ _id: req.params.id }, { $set: { enable: false } })
    res.status(200).json({ success: true })
  } catch (error) {
    next(error)
  }
}

async function syncProducts(req, res, next) {
  Product.find({ enable: true, business: req.business })
    .populate('category')
    .exec((err, items) => {
      if (err) return next(err)
      res.status(200).json(_.map(items, Product.detailForManager))
    })
}

async function getProducts(req, res, next) {
  let query = { enable: true, business: req.business }
  const page = req.query.page ? parseInt(req.query.page) : 1
  const limit = req.query.limit ? parseInt(req.query.limit) : 10
  if (req.query.search !== undefined && req.query.search.length > 0) {
    query = {
      $and: [
        query,
        {
          $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { sku: { $regex: req.query.search, $options: 'i' } },
            { desc: { $regex: req.query.search, $options: 'i' } }
          ]
        }
      ]
    }
  }
  if (req.query.category !== undefined) {
    query.category = req.query.category
  }
  Product.find(query)
    .populate('category')
    .paginate(page, limit, (err, docs, total) => {
      if (err) return next(err)
      res.status(200).json({ data: _.map(docs, Product.detailForManager), total })
    })
}

async function getProductLogs(req, res, next) {
  const page = req.query.page ? parseInt(req.query.page) : 1
  const limit = req.query.limit ? parseInt(req.query.limit) : 10
  const orders = await Order.find({ 'items.product': { $in: [req.params.id] } })
  const query = {
    $or: [{ 'payload.product': req.params.id }, { 'payload.order': { $in: _.map(orders, '_id') } }]
  }
  Log.find(query)
    .deepPopulate(['payload.product', 'payload.order'])
    .sort({ createdAt: -1 })
    .paginate(page, limit, (err, docs, total) => {
      if (err) return next(err)
      res.status(200).json({ data: _.map(docs, Log.detailForManager), total })
    })
}

async function getMarketProducts(req, res, next) {
  let query = { enable: true }
  const page = req.query.page ? parseInt(req.query.page) : 1
  const limit = req.query.limit ? parseInt(req.query.limit) : 10
  if (req.query.search !== undefined && req.query.search.length > 0) {
    query = {
      $and: [
        query,
        {
          $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { sku: { $regex: req.query.search, $options: 'i' } },
            { desc: { $regex: req.query.search, $options: 'i' } }
          ]
        }
      ]
    }
  }
  if (req.query.category !== undefined) {
    query.category = req.query.category
  }
  Product.find(query)
    .populate('category')
    .paginate(page, limit, (err, docs, total) => {
      if (err) return next(err)
      res.status(200).json({ data: _.map(docs, Product.detailForGuest), total })
    })
}

export default {
  addProduct,
  editProduct,
  deleteProduct,
  syncProducts,
  getProducts,
  getProductLogs,
  getMarketProducts
}
