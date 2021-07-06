### GoIT Final project Wallet BACK-END

## 1. Разворачиваем сервер:

- отлов ошибок,
- настройка `CORS`,
- подключение модулей,
- структура проекта,
- создаем ветку `dev`

## 2 Инициализируем и подключаем БД

- добавлена userSchema
- добавлена transactionSchema

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок
