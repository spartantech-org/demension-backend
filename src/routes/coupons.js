import Validation from '../validations/index'
import { manager, validator, auth } from '../middlewares'
import CouponsController from '../controllers/coupons'
const express = require('express')
const router = express.Router()

/**
 * @api {post} /coupons Add Coupon
 * @apiVersion 1.0.0
 * @apiName Add Coupon
 * @apiGroup Coupons
 *
 * @apiParam {String} code
 * @apiParam {String} name
 * @apiParam {String} type fixed or percentage
 * @apiParam {Number} amount
 * @apiParam {String} [expiredAt]
 *
 * @apiSuccess {String} _id
 * @apiSuccess {String} code
 * @apiSuccess {String} name
 * @apiSuccess {String} type
 * @apiSuccess {Number} amount
 * @apiSuccess {String} expiredAt
 *
 */
router.post('/', Validation.coupon.validateAdd, validator, manager, CouponsController.addCoupon)

/**
 * @api {put} /coupons/:id Edit Coupon
 * @apiVersion 1.0.0
 * @apiName Edit Coupon
 * @apiGroup Coupons
 *
 * @apiParam {String} [code]
 * @apiParam {String} [name]
 * @apiParam {String} [type]
 * @apiParam {Number} [amount]
 * @apiParam {String} [expiredAt]
 *
 * @apiSuccess {String} _id
 * @apiSuccess {String} code
 * @apiSuccess {String} name
 * @apiSuccess {String} type
 * @apiSuccess {Number} amount
 *
 */
router.put('/:id', Validation.coupon.validateEdit, validator, manager, CouponsController.editCoupon)

/**
 * @api {delete} /coupons/:id Delete Coupon
 * @apiVersion 1.0.0
 * @apiName Delete Coupon
 * @apiGroup Coupons
 *
 *
 * @apiSuccess {Boolean} success
 *
 */
router.delete(
  '/:id',
  Validation.coupon.validateDelete,
  validator,
  manager,
  CouponsController.deleteCoupon
)

/**
 * @api {get} /coupons Get coupons
 * @apiVersion 1.0.0
 * @apiName Get coupons
 * @apiGroup Coupons
 *
 * @apiSuccess {String} _id
 * @apiSuccess {String} code
 * @apiSuccess {String} name
 * @apiSuccess {String} type
 * @apiSuccess {Number} amount
 *
 */
router.get('/', auth, CouponsController.getCoupons)

module.exports = router
