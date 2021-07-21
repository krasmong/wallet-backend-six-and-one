const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/transactions')
const guard = require('../../../helpers/guard')

const { validationCreateTransaction } = require('./validation')

router.use((req, res, next) => {
  console.log(req.url)
  next()
})

router
  .get('/', guard, controller.listTransactions)
  .get('/categories', guard, controller.categoryList)
  .post('/', guard, validationCreateTransaction, controller.addTransaction)

router.get('/:transactionId', controller.getTransactionById)

module.exports = router

/**
 * @swagger
 * components:
 *  schemas:
 *    Transaction:
 *      type: object
 *      required:
 *        - date
 *        - type
 *        - category
 *        - amount
 *      optional:
 *        - comment
 *      properties:
 *        _id:
 *          type: string
 *          description: Сгенерированный бэкендом уникальный идентификатор.
 *        date:
 *          type: string
 *          description: Дата транзакции.
 *        type:
 *          type: string
 *          description: Тип транзакции.
 *        category:
 *          type: string
 *          description: Категория транзакции.
 *        comment:
 *          type: string
 *          description: Комментарий для транзакции.
 *        amount:
 *          type: number
 *          description: Сумма транзакции.
 *        balance:
 *          type: number
 *          description: Количество денег на счету пользователя после совершения транзакции, возвращает Back end
 *      example:
 *        _id: erglhllbl4565lbjjghj
 *        date: 01.01.2021
 *        type: DEPOSIT
 *        category: Зарплата.
 *        comment: Заработано честным трудом на любимой работе))
 *        amount: 30000
 *        balance: 30000
 */

/**
 * @swagger
 * /api/transactions/:
 *  get:
 *    summary: Получить все транзакции пользователя
 *    description: Получить все транзакции пользователя
 *    tags:
 *      - Транзакция
 *    parameters:
 *    - in: header
 *      required: true
 *      name: Authorization
 *      description: Bearer token текущего пользователя
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: Список транзакций.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: string
 *                        description: ID транзакции
 *                        example: kjhvkjhsdvfkshd4563456jvkhgv
 *                      date:
 *                        type: string
 *                        description: Дата транзакции
 *                        example: 01.07.2021
 *                      type:
 *                        type: string
 *                        description: Тип транзакции.
 *                        example: WITHDRAW
 *                      category:
 *                        type: string
 *                        description: Категория транзакции.
 *                        example: На еду
 *                      comment:
 *                        type: string
 *                        description: Комментарий для транзакции.
 *                        example: Пельмешки, картофан, корм для котяры
 *                      amount:
 *                        type: number
 *                        description: Сумма транзакции.
 *                        example: 300
 *                      balance:
 *                        type: number
 *                        description: Количество денег которе останется после транзакции
 *                        example: 29700
 *
 *      400:
 *        description: Ошибка получения транзакций.
 *      500:
 *        description: Ошибка сервера.
 */

/**
 * @swagger
 * /api/transactions/{transactionId}:
 *  get:
 *    summary: Получить транзакцию
 *    description: Получить транзакцию по ID транзакции
 *    tags:
 *      - Транзакция
 *    parameters:
 *    - in: header
 *      required: true
 *      name: Authorization
 *      description: Bearer token текущего пользователя
 *      schema:
 *        type: string
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID транзакции
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: Транзакция полученная по ID транзакции.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: ID транзакции
 *                  example: kjhvkjhsdvfkshd4563456jvkhgv
 *                date:
 *                  type: string
 *                  description: Дата транзакции
 *                  example: 01.07.2021
 *                type:
 *                  type: string
 *                  description: Тип транзакции.
 *                  example: WITHDRAW
 *                category:
 *                  type: string
 *                  description: Категория транзакции.
 *                  example: На еду
 *                comment:
 *                  type: string
 *                  description: Комментарий для транзакции.
 *                  example: Пельмешки, картофан, корм для котяры
 *                amount:
 *                  type: number
 *                  description: Сумма транзакции.
 *                  example: 300
 *                balance:
 *                  type: number
 *                  description: Количество денег которе останется после транзакции
 *                  example: 29700

 *      400:
 *        description: Ошибка создания транзакции.
 *      500:
 *        description: Ошибка сервера.
 */

/**
 * @swagger
 * /api/transactions/:
 *  post:
 *    summary: Создать новую транзакцию
 *    description: Создать новую транзакцию
 *    tags:
 *      - Транзакция
 *    parameters:
 *    - in: header
 *      required: true
 *      name: Authorization
 *      description: Bearer token текущего пользователя
 *      schema:
 *        type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              date:
 *                type: string
 *                description: Дата транзакции
 *                example: 01.01.2021
 *              type:
 *                type: string
 *                description: Тип транзакции.
 *                example: DEPOSIT
 *              category:
 *                type: string
 *                description: Категория транзакции.
 *                example: Зарплата.
 *              comment:
 *                type: string
 *                description: Комментарий для транзакции.
 *                example: Заработано честным трудом на любимой работе))
 *              amount:
 *                type: number
 *                description: Сумма транзакции.
 *                example: 30000
 *    responses:
 *      201:
 *        description: Транзакция создана.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                      description: ID транзакции
 *                    date:
 *                      type: string
 *                      description: Дата транзакции
 *                      example: 01.01.2021
 *                    type:
 *                      type: string
 *                      description: Тип транзакции.
 *                      example: DEPOSIT
 *                    category:
 *                      type: string
 *                      description: Категория транзакции.
 *                      example: Зарплата.
 *                    comment:
 *                      type: string
 *                      description: Комментарий для транзакции.
 *                      example: Заработано честным трудом на любимой работе))
 *                    amount:
 *                      type: number
 *                      description: Сумма транзакции.
 *                      example: 30000
 *                    balance:
 *                      type: number
 *                      description: Количество денег после совершения транзакции
 *                      example: 30000
 *
 *      400:
 *        description: Ошибка создания транзакции.
 *      500:
 *        description: Ошибка сервера.
 */
