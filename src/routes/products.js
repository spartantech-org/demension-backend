import Validation from '../validations/index'
import { manager, validator, auth } from '../middlewares'
import ProductsController from '../controllers/products'
const express = require('express')
const router = express.Router()

/**
 * @api {post} /products Add Product
 * @apiVersion 1.0.0
 * @apiName Add Product
 * @apiGroup Products
 *
 * @apiParam {String} sku
 * @apiParam {String} name
 * @apiParam {String} [category]
 * @apiParam {String} [desc]
 * @apiParam {Number} [quantity]
 * @apiParam {Number} [sellingPrice]
 * @apiParam {Number} [purchasePrice]
 * @apiParam {Array} [images]
 *
 * @apiSuccess {String} _id
 * @apiSuccess {String} sku
 * @apiSuccess {String} name
 * @apiSuccess {String} category
 * @apiSuccess {Array} images
 * @apiSuccess {String} desc
 * @apiSuccess {Number} quantity
 * @apiSuccess {Number} sellingPrice
 * @apiSuccess {Number} purchasePrice
 * @apiSuccess {Boolean} enable
 * @apiSuccess {String} createdAt
 *
 */
router.post('/', manager, Validation.product.validateAdd, validator, ProductsController.addProduct)

/**
 * @api {put} /products/:id Edit Product
 * @apiVersion 1.0.0
 * @apiName Edit Product
 * @apiGroup Products
 *
 * @apiParam {String} [sku]
 * @apiParam {String} [name]
 * @apiParam {String} [category]
 * @apiParam {String} [desc]
 * @apiParam {Number} [quantity]
 * @apiParam {Number} [sellingPrice]
 * @apiParam {Number} [purchasePrice]
 * @apiParam {Array} [images]
 *
 * @apiSuccess {String} _id
 * @apiSuccess {String} sku
 * @apiSuccess {String} name
 * @apiSuccess {String} category
 * @apiSuccess {Array} images
 * @apiSuccess {String} desc
 * @apiSuccess {Number} quantity
 * @apiSuccess {Number} sellingPrice
 * @apiSuccess {Number} purchasePrice
 * @apiSuccess {Boolean} enable
 * @apiSuccess {String} createdAt
 *
 */
router.put(
  '/:id',
  Validation.product.validateEdit,
  validator,
  manager,
  ProductsController.editProduct
)

/**
 * @api {delete} /products/:id Delete Product
 * @apiVersion 1.0.0
 * @apiName Delete Product
 * @apiGroup Products
 *
 *
 * @apiSuccess {Boolean} success
 *
 */
router.delete(
  '/:id',
  Validation.product.validateDelete,
  validator,
  manager,
  ProductsController.deleteProduct
)

/**
 * @api {get} /products/sync Sync all products
 * @apiVersion 1.0.0
 * @apiName Sync all products
 * @apiGroup Products
 *
 * @apiSuccess {String} _id
 * @apiSuccess {String} sku
 * @apiSuccess {String} name
 * @apiSuccess {String} category
 * @apiSuccess {Array} images
 * @apiSuccess {String} desc
 * @apiSuccess {Number} quantity
 * @apiSuccess {Number} sellingPrice
 * @apiSuccess {Number} purchasePrice
 * @apiSuccess {Boolean} enable
 * @apiSuccess {String} createdAt
 *
 */
router.get('/sync', auth, ProductsController.syncProducts)

/**
 * @api {get} /products Get products
 * @apiVersion 1.0.0
 * @apiName Get products
 * @apiGroup Products
 *
 * @apiParam {String} [search]
 * @apiParam {String} [category]
 * @apiParam {String} [page]
 * @apiParam {String} [limit]
 *
 * @apiSuccess {String} _id
 * @apiSuccess {String} sku
 * @apiSuccess {String} name
 * @apiSuccess {String} category
 * @apiSuccess {Array} images
 * @apiSuccess {String} desc
 * @apiSuccess {Number} quantity
 * @apiSuccess {Number} sellingPrice
 * @apiSuccess {Number} purchasePrice
 * @apiSuccess {Boolean} enable
 * @apiSuccess {String} createdAt
 *
 */
router.get('/', Validation.product.validateGet, validator, auth, ProductsController.getProducts)

/**
 * @api {get} /products/logs Get Product's Logs
 * @apiVersion 1.0.0
 * @apiName Get Product's Logs
 * @apiGroup Products
 *
 */
router.get('/:id/logs', auth, ProductsController.getProductLogs)

module.exports = router
