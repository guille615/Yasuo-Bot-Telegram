const https = require('https');
const config = require('../config.json');
const emojis = require("../emojis");

module.exports = {
    name: 'coche',
    description: 'Comando sencillo para comprobar el correcto funcionamiento del bot.',
    execute(api, msg, args) {
        const chatId = msg.chat.id;
        if (args.length > 0) {
            const matricula = args[0];
            var pathPeticion = config.rutaPuedoCircular + matricula;
            https.get(pathPeticion, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data += chunk;
                });
                response.on('end', () => {
                    const dataJSON = JSON.parse(data);
                    // console.log(dataJSON);
                    if (!dataJSON.error) {
                        var resultado = `Información para la matrícula ${matricula}:\n`;
                        resultado += `${getPegatina(dataJSON.sticker)}\n`;
                        resultado += `**Hoy:** ${getEscenario(dataJSON.scenario.today)}\n`;
                        resultado += `Mañana: ${getEscenario(dataJSON.scenario.tomorrow)}`;
                        api.sendMessage(chatId, resultado);
                    } else {
                        api.sendMessage(chatId, `Comprueba que la matrícula introducida sea válida o no esté de baja en tráfico. ${emojis.jou}`);
                    }
                });
            }).on("error", (err) => {
                api.sendMessage(chatId, `Se produjo un error al hacer la petición. ${emojis.jou}`);
                console.log("Error: " + err.message);
            });;
        } else {
            api.sendMessage(chatId, `Es necesario mandar la matrícula! ${emojis.ups}`);
        }
    }
};

function getPegatina(pegatina) {
    switch (pegatina) {
        case 'old':
            return 'Tu vehículo no lleva distintivo';        
        default:
            return `Tu vehículo lleva distintivo ${pegatina.toUpperCase()}`;
    }
}

function getEscenario(nivelEscenario) {

    var result;
    switch (nivelEscenario) {
        case '0':
            result = '(Escenario 0)\nPodrás circular y aparcar, no hay previsto activar ningún escenario de contaminación.';            
            break;
        case '1':
            result = '(Escenario 1)\nPueden circular y aparcar todos los vehículos.';            
            break;
        case '2':
            result = '(Escenario 2)';
            break;
        case '3':
            result = '(Escenario 3)';
            break;
        case '4':
            result = '(Escenario 4)';
            break;
        case '5':
            result = '(Escenario 5)';
            break;
        default:
            result = 'No se conoce información sobre el escenario.';
            break;
    }
    return result;
}