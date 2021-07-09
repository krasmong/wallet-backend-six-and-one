const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/users')
const guard = require('../../../helpers/guard')
const { validateUserCreate, validateUserLogin } = require('./userValidation')

router.post('/signup', validateUserCreate, ctrl.register)
router.post('/login', validateUserLogin, ctrl.login)
router.post('/logout', guard, ctrl.logout)
router.get('/current', guard, ctrl.current)

module.exports = router

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: string
 *          description: Сгенерированный бекендом уникальный идентификатор.
 *        name:
 *          type: string
 *          description: Имя пользователя.
 *        email:
 *          type: string
 *          description: Адрес электронной почты.
 *        password:
 *            type: string
 *            description: Пароль.
 *      example:
 *          name: Bruce Wayne
 *          email: bat@mail.com
 *          password: examplepassword
 */

/**
 * @swagger
 * /api/users/signup:
 *  post:
 *    summary: Создать нового пользователя
 *    tags:
 *      - Пользователь
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: Пользователь создан.
 *      400:
 *        description: Ошибка создания пользователя.
 *      500:
 *        description: Ошибка сервера.
 */

/**
 * @swagger
 * /api/users/login:
 *  post:
 *    summary: Залогинить пользователя
 *    tags:
 *      - Пользователь
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                format: string
 *              password:
 *                type: string
 *                format: string
 *
 *    responses:
 *      200:
 *        description: Пользователь залогинен.
 *      400:
 *        description: Ошибка логина.
 */

/**
 * @swagger
 * /api/users/logout:
 *  post:
 *    summary: Разлогинить пользователя
 *    tags:
 *      - Пользователь
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        required: true
 *        description: Токен выданный текущему пользователю.
 *        schema:
 *          type: string
 *
 *    responses:
 *      200:
 *        description: Пользователь разлогинен.
 *      401:
 *        description: Отсутствует заголовок с токеном авторизации.
 *      500:
 *        description: Ошибка сервера.
 */

/**
 * @swagger
 * /api/users/current:
 *  get:
 *    summary: Получить информацию о текущем пользователе
 *    tags:
 *      - Пользователь
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        required: true
 *        description: Токен выданный текущему пользователю.
 *        schema:
 *          type: string
 *
 *    responses:
 *      200:
 *        description: Информация найдена.
 *      401:
 *        description: Отсутствует заголовок с токеном авторизации.
 */
