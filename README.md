# Izipay-nodejs-paymentForm

## 1- Configurar Keys

Crear un archivo llamado keys.js dentro del folder llamada data y colocar las credenciales requeridas 
```sh
const keys = {
    "endpoint": "XXXXXXXXXXXXXXXXXXXXX",
    "username" : "XXXXXXXXXXX",
    "password": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "publickey" : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "HMACSHA256" : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}

```

## 2- Instalar paquetes y correr el proyecyo

```sh
 npm install
```

```sh
 npm run dev 
```

## 3- Api rest 

- Para crear el formToken 
```sh

localhost:3000/api/checkout
```

- Para validar la compra
```sh

localhost:3000/api/validate
```

## 4- IPN

- Para configurar la ipn 
```sh

localhost:3000/ipn
```

## 5- DEMO

https://izipay-nodejs-example.onrender.com/

