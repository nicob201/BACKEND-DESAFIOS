# Desafios curso Backend

El presente repositorio va a contener las carpetas con los desafios a entregar para cada clase.

# Estructura del Repo

```bash
  DESAFIOS/
│
├── 2-ECMAScript-ECMAScript-avanzado/
      └───src
              app.js
├── 4-Manejo-De-Archivos/
      └───src
              app.js
              productos.json
├── 6-Servidor-con-Express/
      └───src
              app.js
              product-manager.js
              products.json
├── 10-websockets-handlebars/
      └───src
          │   app.js
          │   utils.js
          │
          ├───public
          │   └───js
          │           index.js
          │
          ├───routes
          │       views.router.js
          │
          └───views
              │   home.handlebars
              │   realTimeProducts.handlebars
              │
              └───layouts
                      main.handlebars
├── 19-Implementando-login/
      └───src
      │   app.js
      │   utils.js
      │
      ├───config
      │       database.js
      │
      ├───controllers
      │       cartController.js
      │       productController.js
      │
      ├───dao
      │   └───models
      │           cart.model.js
      │           product.model.js
      │           user.js
      │
      ├───middleware
      │       auth.js
      │
      ├───public
      │   └───js
      │           carts.js
      │           products.js
      │
      ├───routes
      │   │   cart.router.js
      │   │   product.router.js
      │   │   views.router.js
      │   │
      │   └───api
      │           sessions.js
      │
      └───views
            │   carts.handlebars
            │   editProduct.handlebars
            │   login.handlebars
            │   newProduct.handlebars
            │   products.handlebars
            │   profile.handlebars
            │   register.handlebars
            │
            └───layouts
                  main.handlebars
├── 21-autenticacion-JWT/
      └───src
      │   app.js
      │   utils.js
      │
      ├───config
      │       database.js
      │       passport.config.js
      │
      ├───controllers
      │       cartController.js
      │       productController.js
      │
      ├───dao
      │   └───models
      │           cart.model.js
      │           product.model.js
      │           user.js
      │
      ├───middleware
      │       auth.js
      │
      ├───public
      │   └───js
      │           carts.js
      │           products.js
      │
      ├───routes
      │   │   cart.router.js
      │   │   product.router.js
      │   │   views.router.js
      │   │
      │   └───api
      │           sessions.js
      │
      └───views
            │   carts.handlebars
            │   editProduct.handlebars
            │   login.handlebars
            │   newProduct.handlebars
            │   products.handlebars
            │   profile.handlebars
            │   register.handlebars
            │   restorePass.handlebars
            │
            └───layouts
                  main.handlebars
├── 27-arquitectura-del-servidor/
      └───src
      │   app.js
      │   utils.js
      │   
      ├───config
      │       database.js
      │       passport.config.js
      │       
      ├───controllers
      │       cartController.js
      │       productController.js
      │       userController.js
      │       
      ├───dao
      │   └───models
      │           cart.model.js
      │           product.model.js
      │           user.js
      │
      ├───middleware
      │       auth.js
      │       
      ├───public
      │   ├───css
      │   │       styles.css
      │   │
      │   └───js
      │           carts.js
      │           products.js
      │
      ├───routes
      │   │   cart.router.js
      │   │   product.router.js
      │   │   user.router.js
      │   │   views.router.js
      │   │
      │   └───api
      │           sessions.js
      │
      ├───services
      │       cartService.js
      │       productService.js
      │       userService.js
      │
      └───views
      │   carts.handlebars
      │   editProduct.handlebars
      │   login.handlebars
      │   newProduct.handlebars
      │   products.handlebars
      │   profile.handlebars
      │   register.handlebars
      │   restorePass.handlebars
      │
      └───layouts
                  main.handlebars
├── 32-optimizacion/
      └───src
      │   app.js
      │   utils.js
      │
      ├───config
      │       config.js
      │       database.js
      │       passport.config.js
      │       socketConfig.js
      │
      ├───controllers
      │       cartController.js
      │       mockingController.js
      │       productController.js
      │       ticketController.js
      │       userController.js
      │
      ├───dao
      │   ├───DTOs
      │   │       usersDTO.js
      │   │
      │   └───models
      │           cart.model.js
      │           message.model.js
      │           product.model.js
      │           ticket.model.js
      │           user.js
      │
      ├───middleware
      │   │   auth.js
      │   │
      │   └───errors
      │           index.js
      │
      ├───public
      │   ├───css
      │   │       styles.css
      │   │
      │   └───js
      │           carts.js
      │           chat.js
      │           products.js
      │           tickets.js
      │
      ├───routes
      │   │   cart.router.js
      │   │   messages.router.js
      │   │   mocking.router.js
      │   │   product.router.js
      │   │   ticket.router.js
      │   │   user.router.js
      │   │   views.router.js
      │   │
      │   └───api
      │           sessions.js
      │
      ├───services
      │       cartService.js
      │       customError.js
      │       emailService.js
      │       enums.js
      │       info.js
      │       messageService.js
      │       productService.js
      │       ticketService.js
      │       userService.js
      │
      └───views
            │   carts.handlebars
            │   chat.handlebars
            │   editProduct.handlebars
            │   login.handlebars
            │   newProduct.handlebars
            │   products.handlebars
            │   profile.handlebars
            │   register.handlebars
            │   restorePass.handlebars
            │
            └───layouts
                  main.handlebars
└── README.md
```
