const XMLHttpRequest = require("xhr2");
var xhr = new XMLHttpRequest() 
const sendMessageNumber = (name, idOrder)=>{
body = JSON.stringify(
    {
        "messages": [
            {
                "channel": "sms",
                "to": "529631853517",
                "content":`
Pedido nuevo
Nombre del cliente: ${name}
Id del pedido: ${idOrder}
                `
            }
        ]
    }
);
xhr.open('POST', 'https://platform.clickatell.com/v1/message', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Authorization', 'ezD7kcnXS0y2Gzl_2b8sEw==');
xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log('success');
    }
};

xhr.send(body);

}

module.exports = {
sendMessageNumber
}