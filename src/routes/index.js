const express = require('express')
const router = express.Router()

router.use('/users', require('./users'))
router.use('/categories', require('./categories'))
router.use('/files', require('./files'))
router.use('/products', require('./products'))
router.use('/coupons', require('./coupons'))
router.use('/orders', require('./orders'))
router.use('/customers', require('./customers'))
router.use('/reports', require('./reports'))
router.use('/assets', require('./assets'))
router.use('/auth', require('./auth'))
router.use('/businesses', require('./businesses'))
router.use('/markets', require('./markets'))

module.exports = router
