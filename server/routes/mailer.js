const express = require('express');
var cors = require('cors');
var nodemailer = require('nodemailer');
var QRCode = require('qrcode');
require('dotenv').config({path: __dirname + '/.env'})
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
const app = express();

app.use(cors());

// email sender function
sendEmail = function(req, res){
  
};



app.post('/tramites',async function(req,res,next) {
  if(req.body.to){
    // Definimos el QR
    let qr = await QRCode.toDataURL(req.body.fileUrl);
    // Definimos el transporter
    let mailer = req.body;
    
    let statusMsg
    if(mailer.status === 1){
      statusMsg = 'en proceso'
    }else if(mailer.status === 2){
      statusMsg = 'completado'
    }
    // var transporter = nodemailer.createTransport({
    //   service: 'Gmail',
    //   auth: {
    //       user: 'deeze.designs@gmail.com',
    //       pass: 'Bruno.2015'
    //   }
    // });

    var transporter = nodemailer.createTransport({
      host: 'mail.citdf.org.ar',
      port:587,
      secure:false,
      tls:{
        rejectUnauthorized:false
      },
      auth: {
          user: 'secretaria@citdf.org.ar',
          pass: 'da?N)m0%KV4o'
      }
    });
    // Definimos el email
    var mailOptions = {
        from: 'Secretaria CITDF<secretaria@citdf.org.ar>',
        to: mailer.to,
        attachDataUrls: true,
        subject: `Documentación de Trámite "${mailer.type} #${mailer.tid}"`,
        html: `<div style="font-family:Helvetica;font-size:14px;">
                <h2 style="color:#10172b;">Hola ${mailer.name}!</h2>
                <p>Tenemos el agrado de informarle que su trámite <strong>"${mailer.type} #${mailer.tid}"</strong> se encuentra ${statusMsg}.</p>
                <p>Puede visualizar el documento adjuntado a su trámite escaneando el código QR desde un dispositivo móvil.</p>
                <br>
                <p><img width="150" height="150" src="${qr}"></p>
                <br>
                <p>Si no puede visualizarlo correctamente puede ingresar <a href="${mailer.fileUrl}">AQUÍ</a> para acceder al Documento.</p>
                <br>

                <div style="color:#616161;font-style:italic;font-size:10px;">
                  <p>
                    <strong>Colegio de Ingenieros de Tierra del Fuego</strong><br>
                    <a style="font-size:12px;" href="www.citdf.org.ar">www.citdf.org.ar</a><br>
                    Rio Grande Tel. (02964) - 430300 - Bernardo Houssay 288 <br>
                    Ushuaia Tel. (02901) - 431957 - Gdor Campos  y Yaganes (Sede de la Cámara Fueguina de la Construcción)
                  </p>
                </div>
              </div>`
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            res.status(500).jsonp({errorType:500,errorMessage:error.message});
        } else {
            console.log("Email sent");
            res.status(200).jsonp({ok:true});
        }
    });
  }
})

module.exports = app;