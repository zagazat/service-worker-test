`yarn global add serve` - чтобы локально запустить билд<br>
`yarn` - для установки пакетов<br>
`yarn serve` - для сборки билда на MacOS и запуска на локальном порту для проверки работы Service Worker<br>

### После запуска

Запустить в браузере http://localhost:5000 - откроется форма для ввода текста. После сабмита запрос обрабатывается на сервис-воркере. Если текст не пустой, то создастся запись в IndexedDB. Далее по айдишнику эта запись достаётся из базы и через сервис воркер возвращается в респонсе и обрабатывается простым `alert()`
