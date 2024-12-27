import _ from 'lodash'
const Category = require('../models/category')
require('mongoose-pagination')

async function addCategory(req, res, next) {
  try {
    const category = new Category({ ...req.body, business: req.business })
    const item = await category.save()
    res.status(200).json(Category.detailForOwner(item))
  } catch (error) {
    next(error)
  }
}

async function editCategory(req, res, next) {
  try {
    await Category.findByIdAndUpdate(req.params.id, { $set: req.body })
    const item = await Category.findById(req.params.id)
    res.status(200).json(Category.detailForOwner(item))
  } catch (error) {
    next(error)
  }
}

async function deleteCategory(req, res, next) {
  try {
    await Category.updateOne({ _id: req.params.id }, { $set: { enable: false } })
    res.status(200).json({ success: true })
  } catch (error) {
    next(error)
  }
}

async function getCategories(req, res, next) {
  try {
    const items = await Category.find({ enable: true, business: req.business })
    res.status(200).json(_.map(items, Category.detailForOwner))
  } catch (error) {
    next(error)
  }
}

async function getMarketCategories(req, res, next) {
  try {
    const items = await Category.find({ enable: true })
    res.status(200).json(_.map(items, Category.detailForGuest))
  } catch (error) {
    next(error)
  }
}

export default {
  addCategory,
  editCategory,
  deleteCategory,
  getCategories,
  getMarketCategories
}
