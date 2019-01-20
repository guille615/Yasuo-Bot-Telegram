const emojis = require("../emojis");

module.exports = {
    name: 'test',
    description: 'Comando sencillo para comprobar el correcto funcionamiento del bot.',
    execute(api, msg, args) {
        const chatId = msg.chat.id;
        var strinToSend = `Encantado! ${emojis.sonrisa}`;
        if (args.length > 0){
            strinToSend += `\nEstos son los parámetros que has pasado:\n${args.join(' - ')}`;
        }
        api.sendMessage(chatId, strinToSend);
    }
};