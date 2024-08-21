# Testing API E-commerce

El presente repositorio contiene el codigo de la API del e-commerce implementando modulos de Test.

## Instalación

Clona este repositorio:

   ```bash
   git clone https://github.com/nicob201/BACKEND-DESAFIOS.git
   ```
## Configuración

Crea el archivo `.env.development` para configurar la base de datos segun el entorno que se desee utilizar, ten en cuenta las siguientes variables de entorno:

   ```bash
   MONGO_URL=
   PORT=
   CLIENT_ID=
   CLIENT_SECRET=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   MAILING_EMAIL=
   MAILING_PASSWORD=
   TEST_MODE=  
   ```

## Ejecución de los test

Instala las librerias y dependencias necesarias del proyecto:

   ```bash
   npm install
   ```

Corre el siguiente comando en la terminal, luego de instalar las dependencias necesarias de la API:

   ```bash
   npm test
   ```