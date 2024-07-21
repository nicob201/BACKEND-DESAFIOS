# Para probar el manejo de errores dejo algunos ejemplos:

## ERRORES RELACIONADOS A PRODUCTOS:

###  - Hacer un PUT a la ruta 
```bash
http://localhost:8080/api/products/669bfcd1328ee8c57858c433
```
pasando por body lo siguiente:
```json
{
  "title": 12345,
  "price": "three",
  "stock": "ten"
}
```

el error que se obtiene es:
```json
{
  "status": "error",
  "error": "Uno o más propiedades están incompletas o no son válidas.\n    Lista de propiedades requeridas:\n    * title debe ser un string, recibido: 12345\n    * price debe ser un number, recibido: twenty\n    * stock debe ser un number, recibido: ten\n"
}
```

### - Hacer un POST a la ruta 
```bash
http://localhost:8080/api/products
```
pasando por body lo siguiente:
```json
{
  "title": 12345,
  "price": "two",
  "stock": "ten"
}
```
el error que se obtiene es:
```json
{
  "status": "error",
  "error": "Uno o más propiedades están incompletas o no son válidas.\n    Lista de propiedades requeridas:\n    * title debe ser un string, recibido: 12345\n    * price debe ser un number, recibido: twenty\n    * stock debe ser un number, recibido: ten\n"
}
```


## ERRORES RELACIONADOS A USUARIOS:

### - Hacer un POST a la ruta
```bash
http://localhost:8080/api/users/register 
```
pasando por body lo siguiente (falta email):

```json
{
  "first_name": "Homero",
  "last_name": "Simpson",
  "age": 42,
  "password": "123"
}
```


## ERRORES RELACIONADOS AL CARRITO:

### - Hacer un POST a la ruta 
```bash
http://localhost:8080/api/carts 
```
pasando por body lo siguiente:
```json
{
  "productId": 12345,
  "units": "ten"
}
```
el error que se obtiene es:
```json
{
  "status": "error",
  "error": "Una o más propiedades están incompletas o no son válidas.\nLista de propiedades requeridas:\n* productId debe ser un string, recibido: 12345\n* units debe ser un number, recibido: ten\n"
}
```