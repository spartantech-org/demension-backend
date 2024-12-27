import Validation from '../validations/index'
import { validator } from '../middlewares'

import AuthController from '../controllers/auth'
const express = require('express')
const router = express.Router()

/**
 * @api {post} /users/register Register
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup Auth
 *
 * @apiParam {String} businessName
 * @apiParam {String} firstName
 * @apiParam {String} lastName
 * @apiParam {String} email
 * @apiParam {String} [password]
 * @apiParam {String} [role] manager, staff or admin, default manager
 *
 * @apiSuccess {String} _id
 * @apiSuccess {String} firstName
 * @apiSuccess {String} lastName
 * @apiSuccess {String} email
 * @apiSuccess {String} avatar
 * @apiSuccess {String} authType
 * @apiSuccess {String} role
 *
 */
router.post('/register', Validation.auth.validateRegister, validator, AuthController.register)

/**
 * @api {post} /users/login Login
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiParam {String} email
 * @apiParam {String} password
 *
 * @apiSuccess {String} _id
 * @apiSuccess {String} firstName
 * @apiSuccess {String} lastName
 * @apiSuccess {String} email
 * @apiSuccess {String} avatar
 * @apiSuccess {String} role
 * @apiSuccess {String} token
 *
 */
router.post('/login', Validation.auth.validateLogin, validator, AuthController.login)

/**
 * @api {post} /users/forgotPassword Forgot Password
 * @apiVersion 1.0.0
 * @apiName Forgot Password
 * @apiGroup Auth
 *
 * @apiParam {String} email
 *
 * @apiSuccess {String} token
 *
 */
router.post(
  '/forgotPassword',
  Validation.auth.validateForgotPassword,
  validator,
  AuthController.forgotPassword
)

/**
 * @api {post} /users/resetPassword Reset Password
 * @apiVersion 1.0.0
 * @apiName Reset Password
 * @apiGroup Auth
 *
 * @apiParam {String} token
 * @apiParam {String} code
 * @apiParam {String} password
 *
 */
router.post(
  '/resetPassword',
  Validation.auth.validateResetPassword,
  validator,
  AuthController.resetPassword
)

module.exports = router
