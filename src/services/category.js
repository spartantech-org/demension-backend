/* eslint-disable node/handle-callback-err */
import _ from 'lodash'
const Product = require('../models/product')
const Category = require('../models/category')

const increaseCount = async (categoryId) => {
  try {
    await Category.updateOne({ _id: categoryId }, { $inc: { count: 1 } })
  } catch (error) {}
}

const decreaseCount = async (categoryId) => {
  try {
    await Category.updateOne({ _id: categoryId }, { $inc: { count: -1 } })
  } catch (error) {}
}

export default {
  increaseCount,
  decreaseCount
}
