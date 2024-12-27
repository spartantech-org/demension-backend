import Validation from '../validations/index'
import { manager, validator, auth } from '../middlewares'
const express = require('express')
const router = express.Router()
import CustomersController from '../controllers/customers'

/**
* @api {post} /customers Add Customer
* @apiVersion 1.0.0
* @apiName Add Customer
* @apiGroup Customers
*
* @apiParam {String} name
* @apiParam {String} email
* @apiParam {String} [phone]
* @apiParam {String} [address]
* @apiParam {String} [avatar]
*
* @apiSuccess {String} _id
* @apiSuccess {String} name
* @apiSuccess {String} email
* @apiSuccess {String} phone
* @apiSuccess {String} address
* @apiSuccess {String} avatar
*
*/
router.post('/', Validation.customer.validateAdd, validator, manager, CustomersController.addCustomer)

/**
* @api {put} /customers/:id Edit Customer
* @apiVersion 1.0.0
* @apiName Edit Customer
* @apiGroup Customers
*
* @apiParam {String} [name]
* @apiParam {String} [email]
* @apiParam {String} [phone]
* @apiParam {String} [address]
* @apiParam {String} [avatar]
*
* @apiSuccess {String} _id
* @apiSuccess {String} name
* @apiSuccess {String} email
* @apiSuccess {String} phone
* @apiSuccess {String} address
* @apiSuccess {String} avatar
*
*/
router.put('/:id', Validation.customer.validateEdit, validator, manager, CustomersController.editCustomer)

/**
* @api {delete} /customers/:id Delete Customer
* @apiVersion 1.0.0
* @apiName Delete Customer
* @apiGroup Customers
*
*
* @apiSuccess {Boolean} success
*
*/
router.delete('/:id', Validation.customer.validateDelete, validator, manager, CustomersController.deleteCustomer)

/**
* @api {get} /customers/sync Sync all customers
* @apiVersion 1.0.0
* @apiName Sync all customers
* @apiGroup Customers
*
* @apiSuccess {String} _id
* @apiSuccess {String} name
* @apiSuccess {String} email
* @apiSuccess {String} phone
* @apiSuccess {String} address
* @apiSuccess {String} avatar
*
*/
router.get('/sync', auth, CustomersController.syncCustomers)

/**
* @api {get} /customers Get customers
* @apiVersion 1.0.0
* @apiName Get customers
* @apiGroup Customers
*
* @apiParam {String} [search]
* @apiParam {String} [page]
* @apiParam {String} [limit]
*
* @apiSuccess {String} _id
* @apiSuccess {String} name
* @apiSuccess {String} email
* @apiSuccess {String} phone
* @apiSuccess {String} address
* @apiSuccess {String} avatar
*
*/
router.get('/', Validation.customer.validateGet, validator, auth, CustomersController.getCustomers)

module.exports = router
