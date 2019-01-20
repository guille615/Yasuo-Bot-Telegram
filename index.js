const emojis = require("./emojis");
const telegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const config = require('./config.json');
const token = config.telegramToken;
const api = new telegramBot(token, { polling: true });

const listaComandos = [];
const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
    const name = file.substring(0, file.length - 3);
    listaComandos[name] = `./commands/${file}`;
}
api.listaComandos = listaComandos;

console.log('\033c');
console.log('Bot iniciado!!');
const reg = new RegExp(`^${config.prefix}`);
api.onText(reg, (msg) => {
    const chatId = msg.chat.id;
    const commandWithArgs = msg.text.split(' ');
    const comandoWithPrefix = commandWithArgs[0];
    const comandoIntroducido = comandoWithPrefix.substring(1, comandoWithPrefix.length);
    const args = commandWithArgs.slice(1, commandWithArgs.length);
    
    if (listaComandos[comandoIntroducido]) {        
        var comando = require(listaComandos[comandoIntroducido]);
        var mensajeSplit = msg.text.split(' ');
        try {
            comando.execute(api, msg, args);
        }
        catch (error) {
            api.sendMessage(chatId, `Se ha producido un error al ejecutar el comando. ${emojis.ups}`);
            console.log(msg.text, error);
        }
    } else {
        api.sendMessage(chatId, `El comando introducido no existe. ${emojis.jou}`);
    }
});
