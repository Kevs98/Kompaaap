const express = require("express");
const bodyparser = require("body-parser");
const methodoverride = require("method-override");

const app = express();
const router = express.Router();

app.use(bodyparser.json());
app.use(methodoverride());

app.listen(3000, function() {
    console.log('Operacion exitosa dentro del puerto 3000')
});

router.get("/notificaciones", (req, res) => {
    console.log('Notifications Server');

    var FCM = require("fcm-node");
    var serverkey = 'AAAAG6YSul0:APA91bHKBm2RO8228sUWybPywbg4pVAx-HL3oKqaDIiLhDDeW6UYxZ2hVXAXqiZRP6WOpPDjIO85-V8XsLcMcLmf_PxdhglMen83hSD-vVDkDjwNM3tIotJN4675NsCdx-7527QtocnP';
    var fcm = new FCM(serverkey);

    var message = {
        to: 'd8hwShATiek:APA91bHnufSk0ShggPAPe99M9Nc-uFSGGxcm8GNoDZRgh4Y5Gmi8I9PgvNBb7Y0oCogiJ9mH6b34vdZYjw4qkeL1HWW7wnLMbd1yoi5DOMEocDlRLiWIhrQYhsK6sBs3nB7OhiTFfnO6',
        collapse_key: 'KompaPushNotification',

        notification: {
            title: 'Notificaciones a traves de backend propio',
            body: 'Backend creado para KompaApp',
            click_action: "FCM_PLUGIN_ACTIVITY"
        },

        data: {
            Usuario: 'Kevin Nodejs',
            Email: 'kevinpalma657@gmail.com'
        }
    };

    fcm.send(message, function(err, response) {
        if (err){
            console.log('UPS algo alió mal', err);
        } else {
            console.log('Eviado correctamente con los datos: ', response);
        }
    });

    res.send({ estado: "Envio de Notificación Exitoso"});
})

app.use(router);