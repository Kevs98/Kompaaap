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
        to: 'ds3Jc5iaj0E:APA91bE7H9CBmAtgw1M8q19EmEyVkKrKU1Y1wGBQRohDu_VEfcKFqlqeXqrjdrClcWvKCBsxowQLkI3pMk7qQC1DCyJPnd2ty65WEwdAe5u7BPwdCXnPh-tQYbLVxQsx_qlHbTJYJh7o',
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
            console.log('UPS algo alió mal');
        } else {
            console.log('Eviado correctamente con los datos: ', response);
        }
    });

    res.send({ estado: "Envio de Notificación Exitoso"});
})

app.use(router);