import Validation from '../validations/index'
import { manager, validator, auth } from '../middlewares'
import OrdersController from '../controllers/orders'
const express = require('express')
const router = express.Router()

/**
 * @api {post} /orders Add Order
 * @apiVersion 1.0.0
 * @apiName Add Order
 * @apiGroup Orders
 *
 * @apiParam {Array} items [{product, quantity}]
 * @apiParam {String} [coupon]
 * @apiParam {String} [customer]
 * @apiParam {Object} [guest]
 *
 * @apiSuccess {String} _id
 * @apiSuccess {String} number
 * @apiSuccess {String} items
 * @apiSuccess {String} coupon
 * @apiSuccess {String} customer
 * @apiSuccess {Object} guest
 * @apiSuccess {Object} payment
 *
 */
router.post('/', Validation.order.validateAdd, validator, manager, OrdersController.addOrder)

/**
 * @api {put} /orders/:id Edit Order
 * @apiVersion 1.0.0
 * @apiName Edit Order
 * @apiGroup Orders
 *
 * @apiParam {Array} [items] [{product, quantity}]
 * @apiParam {String} [coupon]
 * @apiParam {String} [customer]
 * @apiParam {Object} [guest]
 *
 * @apiSuccess {String} _id
 * @apiSuccess {String} number
 * @apiSuccess {String} items
 * @apiSuccess {String} coupon
 * @apiSuccess {String} customer
 * @apiSuccess {Object} guest
 * @apiSuccess {Object} payment
 *
 */
router.put('/:id', Validation.order.validateEdit, validator, manager, OrdersController.editOrder)

/**
 * @api {delete} /orders/:id Delete Order
 * @apiVersion 1.0.0
 * @apiName Delete Order
 * @apiGroup Orders
 *
 *
 * @apiSuccess {Boolean} success
 *
 */
router.delete(
  '/:id',
  Validation.order.validateDelete,
  validator,
  manager,
  OrdersController.deleteOrder
)

/**
 * @api {get} /orders/sync Sync all orders
 * @apiVersion 1.0.0
 * @apiName Sync all orders
 * @apiGroup Orders
 *
 * @apiSuccess {String} _id
 * @apiSuccess {String} number
 * @apiSuccess {String} items
 * @apiSuccess {String} coupon
 * @apiSuccess {String} customer
 * @apiSuccess {Object} guest
 * @apiSuccess {Object} payment
 *
 */
router.get('/sync', auth, OrdersController.syncOrders)

/**
 * @api {get} /orders Get Orders
 * @apiVersion 1.0.0
 * @apiName Get Orders
 * @apiGroup Orders
 *
 * @apiParam {String} [page]
 * @apiParam {String} [limit]
 * @apiParam {String} [customer]
 *
 * @apiSuccess {String} _id
 * @apiSuccess {String} number
 * @apiSuccess {String} items
 * @apiSuccess {String} coupon
 * @apiSuccess {String} customer
 * @apiSuccess {Object} guest
 * @apiSuccess {Object} payment
 *
 */
router.get('/', Validation.order.validateGet, validator, auth, OrdersController.getOrders)

module.exports = router
