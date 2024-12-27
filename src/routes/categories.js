import Validation from '../validations/index';
import { manager, validator, auth } from '../middlewares';
const express = require('express');
const router = express.Router();
import CategoriesController from '../controllers/categories'

/**
 * @api {post} /categories Add Category
 * @apiVersion 1.0.0
 * @apiName Add Category
 * @apiGroup Categories
 *
 * @apiParam {String} name
 * @apiParam {String} [image]
 *
 * @apiSuccess {String} _id
 * @apiSuccess {String} parent
 * @apiSuccess {String} name
 * @apiSuccess {String} image
 * @apiSuccess {Boolean} enable
 * @apiSuccess {String} createdAt
 *
 */
router.post(
  '/',
  Validation.category.validateAdd,
  validator,
  manager,
  CategoriesController.addCategory
);

/**
 * @api {put} /categories/:id Edit Category
 * @apiVersion 1.0.0
 * @apiName Edit Category
 * @apiGroup Categories
 *
 * @apiParam {String} [parent]
 * @apiParam {String} [name]
 * @apiParam {String} [image]
 *
 * @apiSuccess {String} _id
 * @apiSuccess {String} parent
 * @apiSuccess {String} name
 * @apiSuccess {String} image
 * @apiSuccess {Boolean} enable
 * @apiSuccess {String} createdAt
 *
 */
router.put(
  '/:id',
  Validation.category.validateEdit,
  validator,
  manager,
  CategoriesController.editCategory
);

/**
 * @api {delete} /categories/:id Delete Category
 * @apiVersion 1.0.0
 * @apiName Delete Category
 * @apiGroup Categories
 *
 *
 * @apiSuccess {Boolean} success
 *
 */
router.delete(
  '/:id',
  Validation.category.validateDelete,
  validator,
  manager,
  CategoriesController.deleteCategory
);

/**
 * @api {get} /categories get categories
 * @apiVersion 1.0.0
 * @apiName get categories
 * @apiGroup Categories
 *
 * @apiSuccess {String} _id
 * @apiSuccess {String} code
 * @apiSuccess {String} name
 * @apiSuccess {String} image
 * @apiSuccess {Boolean} enable
 * @apiSuccess {String} createdAt
 *
 */
router.get('/', auth, CategoriesController.getCategories);

module.exports = router;
