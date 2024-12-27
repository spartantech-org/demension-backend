const Coupon = require('../models/coupon')
require('mongoose-pagination')

async function addCoupon(req, res, next) {
  const coupon = new Coupon({ ...req.body, business: req.business })
  coupon.save((err, item) => {
    if (err) return next(err)
    res.json(item)
  })
}

async function editCoupon(req, res, next) {
  Coupon.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, item) => {
    if (err) return next(err)
    Coupon.findById(item._id, (err, item) => {
      if (err) return next(err)
      res.json(item)
    })
  })
}

async function deleteCoupon(req, res, next) {
  Coupon.findByIdAndUpdate(req.params.id, { $set: { enable: false } }, (err, item) => {
    if (err) return next(err)
    res.json({ success: true })
  })
}

async function getCoupons(req, res, next) {
  Coupon.find({ enable: true, business: req.business }, (err, items) => {
    if (err) return next(err)
    res.json(items)
  })
}

export default {
  addCoupon,
  editCoupon,
  deleteCoupon,
  getCoupons
}
