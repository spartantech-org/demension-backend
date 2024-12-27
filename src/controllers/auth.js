import Services from '../services/index'
import { sendEmail } from '../common/utils'
import * as EmailTemplates from '../common/email_templates'
import randomstring from 'randomstring'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Business = require('../models/business')
const Constants = require('../common/constants')
require('mongoose-pagination')

function loginUser(user, res) {
  const generateToken = (user, res) => {
    const token = jwt.sign({ id: user._id, email: user.email }, Constants.JWTSecret)
    res.json({ token, ...user })
  }

  if (!user) {
    res.status(401).json({ message: __('The username or password is incorrect') })
  } else {
    if (user.enable) {
      Services.account
        .getAuthUserInfo(user._id)
        .then((user) => {
          generateToken(user, res)
        })
        .catch((err) => {
          res.status(500).json(err)
        })
    } else {
      res.status(401).json({ message: __('The user is blocked') })
    }
  }
}

async function register(req, res, next) {
  const business = new Business({ name: req.body.businessName })
  business.save((err, item) => {
    if (err) return next(err)
    const hash = bcrypt.hashSync(req.body.password, 10)
    const user = new User({
      ...req.body,
      hash,
      business: item._id
    })
    user.save(async (err, user) => {
      if (err) return next(err)
      try {
        if (Constants.SampleData) {
          await Services.sample_data.generateData(item._id, user._id)
        }
        if (!Constants.AutoLogin) {
          res.send(user)
        } else {
          loginUser(user, res)
        }
      } catch (error) {
        console.log(error)
      }
    })
  })
}

async function login(req, res) {
  User.findOne({ email: req.body.email, authType: Constants.AuthType.Email }, (err, user) => {
    if (err) return res.status(500).json(err)
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.hash)) {
        loginUser(user, res)
      } else {
        res.status(400).send({ message: __('The password is incorrect.') })
      }
    } else {
      res.status(400).send({ message: __('The account is not existed.') })
    }
  })
}

async function forgotPassword(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email })
    const resetCode = randomstring.generate({ charset: 'numeric', length: 6 })
    await User.updateOne({ _id: user._id }, { $set: { resetCode } })
    await sendEmail(
      user.email,
      EmailTemplates.ForgotPassword(resetCode).title,
      EmailTemplates.ForgotPassword(resetCode).html
    )
    res.status(200).json({
      token: user._id,
      message:
        'We sent the code to your email. Please check the email and use that code to reset the password.'
    })
  } catch (error) {
    next(error)
  }
}

async function resetPassword(req, res, next) {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10)
    await User.updateOne({ _id: req.body.token }, { $set: { hash } })
    res.status(200).json({ success: true })
  } catch (error) {
    next(error)
  }
}

export default {
  register,
  login,
  forgotPassword,
  resetPassword
}
