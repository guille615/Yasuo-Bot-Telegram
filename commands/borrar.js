module.exports = {
    name: 'borrar',
    description: 'Comando de prueba para borrar.',
    execute(api, msg, args) {
        api.deleteMessage(msg.from.id,msg.message_id);
        api.sendMessage(fromId, "Borrado correctamente");
    }
};