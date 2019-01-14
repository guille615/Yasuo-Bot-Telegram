var telegramBot = require('node-telegram-bot-api');
var fs = require("fs");

let configFile = fs.readFileSync("config.json");
let configFileJSON = JSON.parse(configFile);

var token = configFileJSON.telegramToken;
var api = new telegramBot(token, { polling: true });
api.onText(/\/help/, function (msg, match) {
    var fromId = msg.from.id;
    api.sendMessage(fromId, "I can help you in getting the sentiments of any text you send to me.");
});
api.onText(/\/start/, function (msg, match) {
    var fromId = msg.from.id;
    api.sendMessage(fromId, "They call me MadansFirstTelegramBot. " +
        "I can help you in getting the sentiments of any text you send to me." +
        "To help you i just have few commands.\n/help\n/start\n/sentiments");
});
console.log("MadansFirstTelegramBot has started. Start conversations in your Telegram.");