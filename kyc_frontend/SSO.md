# Документация по использованию технологии единого входа в приложении Account&KYC

## Содержание

1. [Авторизация](#markdown-header-login)
2. [Регистрация](#markdown-header-register)
3. [Получение токена после авторизации/регистрации](#markdown-header-getting-a-token-after-external-sso-request)
4. [KYC](#markdown-header-kyc)
5. [Верификация номера телефона](#markdown-header-phone-number-verification)

Все запросы направляются на страницу SSO приложения Account&KYC и делятся на запрашивающие токен (login, register) и присылающие токен (kyc, verify). В зависимости от этого меняется список входных параметров и параметры обратного редиректа.
***Адрес с которого производится SSO запрос (HTTP Referer), а также адрес в параметре "Redirect" должен быть в списке разрешённых адресов для SSO в приложении Account&KYC.***


## Login

Для авторизации внешнего приложения необходимо выполнить редирект на страницу SSO c параметром "Mode=login", а также идентификатором приложения в параметре "AppId".

Дополнительно может быть передан адрес обратного редиректа в параметре "Redirect", а также имя приложения в параметре "AppName". В параметре "Redirect" должен быть полный адрес до метода обрабатывающего токен из входного параметра адресной строки. Параметры Redirect и AppName опциональны. Если они не переданы, то будут использованы данные из справочника приложений.

Дополнительно можно задать локаль приложения с помощью параметра Lang, он должен содержать пятисимвольный код локали, например Lang=es-ES.

##### Список параметров

- AppId (*Обязательно*) - Идентификатор приложения
- Mode (*Обязательно*) - Режим запроса SSO, должен быть равен "login"
- Redirect - Адрес обратного редиректа
- AppName - Имя приложения
- Lang - Код локали

##### Пример запроса авторизации
`
https://kyc8.azurewebsites.net/sso?AppId=1&Mode=login&Redirect=https://getcrypto24.azurewebsites.net/externallogin&AppName=Bitcoin%20Alley&Lang=it-IT
`

После успешной авторизации, пользователь будет автоматически перенаправлен с токеном на адрес указанный в параметре "Redirect" или из справочника приложений.


## Register

Запрос аналогичен редиректу авторизации за исключением параметра "Mode=register".

##### Список параметров:

- AppId (*Обязательно*) - Идентификатор приложения
- Mode (*Обязательно*) - Режим запроса SSO, должен быть равен "register"
- Redirect - Адрес обратного редиректа
- AppName - Имя приложения
- Lang - Код локали
  
##### Пример запроса регистрации
`
https://kyc8.azurewebsites.net/sso?AppId=1&Mode=register&Redirect=https://getcrypto24.azurewebsites.net/externallogin&AppName=Bitcoin%20Alley&Lang=fr-FR
`

После успешной регистрации, пользователь будет авторизован и перейдёт на страницу подтверждения номера телефона. В случае успешного подтверждения произойдёт обратный редирект с токеном на адрес указанный в параметре "Redirect" или из справочника приложений. Если пользователь уйдёт со страницы подтверждения номера телефона, на странице Dashboard появится кнопка с предложением вернуться в приложение указанное в параметре "Redirect" или из справочника приложений.


## Getting a token after external SSO request

После успешной авторизации или, в случае, если пользователь уже авторизован, произойдёт обратный редирект на указанный адрес или из справочника приложений с авторизационным токеном в параметре AuthToken.

##### Пример обратного редиректа

`
https://getcrypto24.azurewebsites.net/externallogin?AuthToken=Bearer%20eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdC9hcGkiLCJpYXQiOjE1NDU4MjI1MzksImV4cCI6MTU0NTg1ODUzOSwic3ViIjoiVG9ueSBTdGFyayIsInVzZXJfaWQiOjMsImdyb3VwcyI6WzEsMywtMV0sInJvbGVzIjpbIkFkZCB1c2VyIHRvIGdyb3VwIiwiVmlldyB1c2VyIGdyb3VwIiwiUmVtb3ZlIHVzZXIgZnJvbSBncm91cCIsIkNyZWF0ZSB0aGUgZ3JvdXAiLCJVcGRhdGUgdGhlIGdyb3VwIiwiVmlldyB0aGUgZ3JvdXAiLCJEZWxldGUgdGhlIGdyb3VwIiwiVmlldyBncm91cCBsaXN0IiwiVmlldyBsaXN0IG9mIHVzZXIgZ3JvdXBzIiwiVmlldyB0aGUgcm9sZSIsIlZpZXcgcm9sZXMiLCJWaWV3IHVzZXIgcm9sZXMiLCJDcmVhdGUgdGltZSB6b25lIiwiVXBkYXRlIHRpbWUgem9uZSIsIlZpZXcgdGltZSB6b25lIiwiRGVsZXRlIHRpbWUgem9uZSIsIlZpZXcgdGltZSB6b25lIGxpc3QiLCJWaWV3IHVzZXIgdGltZSB6b25lIGxpc3QiLCJDcmVhdGUgdGhlIHVzZXIiLCJVcGRhdGUgdGhlIHVzZXIiLCJWaWV3IHRoZSB1c2VyIiwiRGVsZXRlIHRoZSB1c2VyIiwiVmlldyB1c2VyIGxpc3QiLCJBZGQgdXNlciB0byByb2xlIiwiVmlldyB1c2VyIHJvbGUiLCJEZWxldGUgdXNlciBmcm9tIHJvbGUiLCJBc3NpZ24gdGltZSB6b25lIHRvIHVzZXIiLCJWaWV3IHVzZXIgdGltZSB6b25lIiwiQ3JlYXRlIHRoZSBwZXJzb24iLCJVcGRhdGUgdGhlIHBlcnNvbiIsIlZpZXcgdGhlIHBlcnNvbiIsIkRlbGV0ZSB0aGUgcGVyc29uIiwiQ3JlYXRlIHVzZXIgYWRkcmVzcyIsIlVwZGF0ZSB1c2VyIGFkZHJlc3MiLCJWaWV3IHVzZXIgYWRkcmVzcyIsIkRlbGV0ZSB1c2VyIGFkZHJlc3MiLCJDcmVhdGUgdXNlciBpZGVudGl0eSBjYXJkIiwiVXBkYXRlIHVzZXIgaWRlbnRpdHkgY2FyZCIsIlZpZXcgdXNlciBpZGVudGl0eSBjYXJkIiwiRGVsZXRlIHVzZXIgaWRlbnRpdHkgY2FyZCIsIkV4Y2hhbmdlQWRtaW4iLCJQcm9jZXNzaW5nQWRtaW4iLCJWaWV3IEtZQyBtZXRhIiwiVmlldyBLWUMgc3RhdGUiXX0.uI6jAcCFVEgU_n9DMHxXL5M28RYlmYrU777kM6EBFyU
`


## KYC

Для редиректа пользователя на процедуру KYC следует выполнить редирект на страницу SSO приложения Account&KYC c параметром "Mode=kyc", с идентификатором приложения в параметре "AppId", а также с авторизационным токеном в параметре "AuthToken".

##### Список параметров:

- AppId (*Обязательно*) - Идентификатор приложения
- Mode (*Обязательно*) - Режим запроса SSO, должен быть равен "kyc"
- AuthToken (*Обязательно*) - Авторизационный токен
- AppName - Имя приложения
- Lang - Код локали

##### Пример редиректа для входящей авторизации
`
https://kyc8.azurewebsites.net/sso?AppId=1&Mode=kyc&AuthToken=Bearer%20eyJhbGciOiJod...
`

После входа в приложение пользователь увидит кнопку с предложением вернуться во внешнее приложение. Адрес обратного редиректа будет взят из HTTP заголовка Referer, а название приложения из параметра AppName или из справочника приложений.

## Phone number verification

Аналогично редиректу пользователя на процедуру KYC за исключением параметра "Mode=verify".

##### Список параметров:

- AppId (*Обязательно*) - Идентификатор приложения
- Mode (*Обязательно*) - Режим запроса SSO, должен быть равен "verify"
- AuthToken (*Обязательно*) - Авторизационный токен
- AppName - Имя приложения
- Lang - Код локали

##### Пример редиректа для входящей авторизации
`
https://kyc8.azurewebsites.net/sso?AppId=1&Mode=verify&AuthToken=Bearer%20eyJhbGciOiJod...
`

После успешной верификации номера телефона пользователь перейдёт на страницу Dashboard, где появится кнопка с предложением вернуться в приложение. Адрес обратного редиректа будет взят из HTTP заголовка Referer или из справочника приложений, а название приложения из параметра AppName или из справочника приложений.