const express = require('express');
var cors = require('cors');
var nodemailer = require('nodemailer');
var QRCode = require('qrcode');
const db = require('../models');
const Sequelize = require('../models').Sequelize;
const Op = Sequelize.Op;
require('dotenv').config({path: __dirname + '/.env'})
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
const app = express();

app.use(cors());

// email sender function
sendEmail = function(mailOptions, res){
  var transporter = nodemailer.createTransport({
    host: 'mail.citdf.org.ar',
    port:587,
    secure:false,
    tls:{
      rejectUnauthorized:false
    },
    auth: {
        user: 'documentos@citdf.org.ar',
        pass: 'g#fJw^7!iSLm'
    }
  });

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
};

app.post('/aprobadores', (req,res,next) => {
  //primero obtenemos todos los aprobadores habilitados
  let registroWhere = {
    [Op.and]: [
      {
        tramite: _tramite
      },
      {
        ciudadTramite: ciudadTramite
      }
    ]
  };

  db.tramites.findOne({
    attributes: ['id','nroRegistro','incremental','createdAt','updatedAt'],
    where: {registroWhere},
    order: [
      ["createdAt", "Desc"]
    ]
  })
  .then(registroNro => {
  }).catch(Sequelize.ValidationError, function(msg) {
    return res.status(422).json({
      message: msg.errors
    });
  }).catch(function(err) {
    console.log('fallo la busqueda de aprobadores', err)
    return res.status(400).json({ message: err });
  });
})



app.post('/tramites',async function(req,res,next) {
  console.log('a punto de enviar correo', req.body)
  if(req.body.to){
    // Definimos el transporter
    let mailer = req.body;
    // Definimos el QR si es que hace falta
    let qr = null
    if (mailer.status !== 3 && mailer.status !== 4) qr = await QRCode.toDataURL(req.body.fileUrl);
    
    let statusMsg
    if(mailer.status === 1){
      statusMsg = 'en proceso'
    }else if(mailer.status === 2){
      statusMsg = 'completado'
    }else if(mailer.status === 5) {
      statusMsg = 'listo para ser abonado y que comience el proceso de revisión'
    }
    // var transporter = nodemailer.createTransport({
    //   service: 'Gmail',
    //   auth: {
    //       user: 'deeze.designs@gmail.com',
    //       pass: 'Bruno.2015'
    //   }
    // });

    // Definimos el mensaje
    let htmlTemplate = ''
    if (mailer.status === 3) {
      htmlTemplate = `
      <p>Lamentamos informar que su trámite <strong>"${mailer.type} #${mailer.tid}"</strong> fué rechazado por el siguiente motivo:</p>
      <br>
      <p><strong><cite>"${mailer.nota}"</cite></strong></p>
      <br>
      <p>Si ha enviado documentación revisela y vuelva a enviarla nuevamente. Si no es el caso, póngase en contacto con la secretaría de su localidad.</p>
      <br>
      `
    } else {
      htmlTemplate = `
        <p>Tenemos el agrado de informarle que su trámite <strong>"${mailer.type} #${mailer.tid}"</strong> se encuentra ${statusMsg}.</p>
        <p>Puede visualizar el documento adjuntado a su trámite escaneando el código QR desde un dispositivo móvil.</p>
        <br>
        <p><img width="150" height="150" src="${qr}"></p>
        <br>
        <p>Si no puede visualizarlo correctamente puede ingresar <a href="${mailer.fileUrl}">AQUÍ</a> para acceder al Documento.</p>
        <br>
        `
    }
    
    // Definimos el email
    var mailOptions = {
        from: 'Secretaria CITDF<secretaria@citdf.org.ar>',
        to: mailer.to,
        attachDataUrls: true,
        subject: `Documentación de Trámite "${mailer.type} #${mailer.tid}"`,
        html: `<div style="font-family:Helvetica;font-size:14px;">
          <h2 style="color:#10172b;">Hola ${mailer.name}!</h2>
          
          ${htmlTemplate}

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
    
    // comento esto un momento para probar los correos
    // if (mailer.status !== 4) this.sendEmail(mailOptions, res)

    // Ahora enviamos correo a las secretarias o aprobadores correspondientemente
    var mailOptions2 = {}
    if (mailer.status === 4) { // APROBADORES

      // Primero obtengo los aprobadores
      db.aprobadores.findAll({
        attributes: ['id','matriculadoId','observaciones','active','createdAt','updatedAt'],
        include: [{
          model: db.wp_users,
          as: 'matriculado',
          where: {matriculadoId: Sequelize.col('aprobadores.matriculadoId')}
        }],
        where: [{active: 1}]
      })
      .then(async aprobadores => {
        console.log('volviendo con aprobadores...')
        let listaAprobadores = ''
        await Promise.all(aprobadores.map(a => {
          if (a.matriculado && a.matriculado.user_email) {
            listaAprobadores += `${a.matriculado.user_email},`
            console.log('agregando aprobador', listaAprobadores)
          }
        }))

        mailOptions2 = {
          from: 'Secretaria CITDF<secretaria@citdf.org.ar>',
          to: listaAprobadores,
          attachDataUrls: true,
          subject: `Aprobación Pendiente: "${mailer.type} #${mailer.tid}"`,
          html: `<div style="font-family:Helvetica;font-size:14px;">
            <h2 style="color:#10172b;">Hola!</h2>
            
            <p>Un trámite ha cambiado su estado a <strong>Pendiente de Aprobación</strong> por lo que se requiere que sea revisado, firmado y actualizado para completar su ciclo.</p>
            <p>Podrá visualizar los trámites <strong>Pendientes de Aprobación</strong> en la sección de Aprobaciones Pendientes del Menú de Usuario.</p>
  
            <div style="color:#616161;font-style:italic;font-size:10px;">
              <p>
                <strong>Colegio de Ingenieros de Tierra del Fuego</strong><br>
                <a style="font-size:12px;" href="www.citdf.org.ar">www.citdf.org.ar</a><br>
                Rio Grande Tel. (02964) - 430300 - Bernardo Houssay 288 <br>
                Ushuaia Tel. (02901) - 431957 - Gdor Campos  y Yaganes (Sede de la Cámara Fueguina de la Construcción)
              </p>
            </div>
          </div>`
        }
        this.sendEmail(mailOptions2, res)

      }).catch(Sequelize.ValidationError, function(msg) {
        return res.status(422).json({
          message: msg.errors
        });
      }).catch(function(err) {
        console.log('fallo la busqueda de aprobadores', err)
        return res.status(400).json({ message: err });
      });
    }else if (mailer.status === 5) { // SECRETARIAS
      mailOptions2 = {
        from: 'Secretaria CITDF<secretaria@citdf.org.ar>',
        to: 'secretaria.citdf@gmail.com,secretaria.ush.citdf@gmail.com',
        attachDataUrls: true,
        subject: `Nuevo Trámite "${mailer.type} #${mailer.tid}"`,
        html: `<div style="font-family:Helvetica;font-size:14px;">
          <p>Se ha generado un nuevo trámite (#${mailer.tid}). El mismo puede ser visualizado en el panel de Gestión del Sitio.</p>

          <div style="color:#616161;font-style:italic;font-size:10px;">
            <p>
              <strong>Colegio de Ingenieros de Tierra del Fuego</strong><br>
              <a style="font-size:12px;" href="www.citdf.org.ar">www.citdf.org.ar</a><br>
              Rio Grande Tel. (02964) - 430300 - Bernardo Houssay 288 <br>
              Ushuaia Tel. (02901) - 431957 - Gdor Campos  y Yaganes (Sede de la Cámara Fueguina de la Construcción)
            </p>
          </div>
        </div>`
      }
      this.sendEmail(mailOptions2, res)
    }
  } else {
    console.log('data needed to send mail is not present')
  }
})

module.exports = app;