const request = require('request');
const express = require("express");
const router = express.Router();
const keys = require("../data/keys");
const order = require("../data/order")
const hmacSHA256 = require('crypto-js/hmac-sha256')
const Hex = require('crypto-js/enc-hex')
const controller = {};

const endpoint = keys.endpoint         // SERVIDOR
const username = keys.username;        // USUARIO
const password = keys.password         // CONTRASEÑA API REST
const publickey = keys.publickey       // PUBLIC KEY


//SE GENERA EL TOKEN DE AUTENTICACIÓN ==============================================//
const auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');    // AUTENTICACION


controller.home = (req, res) => {
  res.render("home")
}

// CREACIÓN DEL FORMTOKEN
controller.checkout = (req, res,next) => {
  request.post({
    url: `${endpoint}/api-payment/V4/Charge/CreatePayment`,
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json'
    },
    json: order
  }, 
  function(error, response, body) {
    if (body.status === 'SUCCESS')
    {
      const formtoken = body.answer.formToken;
      res.render("checkout",
      {formtoken ,publickey , endpoint}
    );
    }
    else
    {
      console.error(body);
      res.status(500).send('error');
    }  
  })
};

//MANEJO DE LA URL DE RETORNO
controller.paid =  (req,res)=> {

  const answer = JSON.parse(req.body["kr-answer"])
  const hash = req.body["kr-hash"]

  const answerHash = Hex.stringify(
    hmacSHA256(JSON.stringify(answer), keys.HMACSHA256)
  )
    orderDetails = answer.orderDetails

  if (hash === answerHash)
   res.status(200).render('paid', {'response' : answer.orderStatus , 'details':orderDetails} )
  else res.status(500).render('paid', {'response' : 'Error catastrófico'})
}

//IPN
controller.ipn =  (req,res)=> {
  console.log(req);
  console.log(res);
  console.log(req.body);
  const answer = JSON.parse(req.body["kr-answer"])
  const hash = req.body["kr-hash"]

  const answerHash = Hex.stringify(
    hmacSHA256(JSON.stringify(answer), keys.HMACSHA256)
  )
  console.log(answer);
  console.log(hash);
  res.status(200).send({'response' : answer.orderStatus })

}


//API ========================================================================//

controller.apiCheckout = (req,res,next) => {
  request.post({
    url: `${endpoint}/api-payment/V4/Charge/CreatePayment`,
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json'
    },
    json: order
  }, 
  function(error, response, body) {
    if (body.status === 'SUCCESS')
    {
      const formtoken = body.answer.formToken;
      res.send({formtoken , publickey , endpoint})
    }
    else
    {
      console.error(body);
      res.status(500).send('error');
    }  
  })
};

controller.apiValidate = (req,res,next) => {

  const answer = JSON.parse(req.body["kr-answer"])
  const hash = req.body["kr-hash"]

  const answerHash = Hex.stringify(
    hmacSHA256(JSON.stringify(answer), keys.HMACSHA256)
  )
    orderDetails = answer.orderDetails
  
  if (hash === answerHash)
   res.status(200).send(  {'response' : answer.orderStatus , 'details':orderDetails}  )
  else res.status(500).send( {'response' : 'Error catastrófico'})
}


module.exports = controller;
