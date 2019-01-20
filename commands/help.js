module.exports = {
    name: 'help',
    description: 'Muestra una lista con todos los comandos.',
    //  aliases: ['commands'],
    usage: '[Nombre de otro comando]',
    execute(message, args) {
        const { commands } = message.client;
        const data = [];

        if (!args.length) {
            data.push('Aquí tienes una lista con mis comandos:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nPuedes enviar \`${config.prefix}help [nombre del comando]\` para obtener info acerca de un comando específico.`);
        }
        else {
            if (!commands.has(args[0])) {
                return message.reply('No es un comando válido!');
            }

            const command = commands.get(args[0]);

            data.push(`**Name:** ${command.name}`);

            if (command.description) data.push(`**Descripción:** ${command.description}`);
            if (command.aliases) data.push(`**Álias:** ${command.aliases.join(', ')}`);
            if (command.usage) data.push(`**Usos:** ${config.prefix}${command.name} ${command.usage}`);

            data.push(`**Cooldown:** ${command.cooldown || 3} segundos`);
        }
        message.author.send(data, { split: true })
            .then(() => {
                if (message.channel.type !== 'dm') {
                    message.channel.send('Tienes un mensaje privado con toda la lista de comandos.');
                }
            })
            .catch(() => message.reply('No puedo enviarte mensajes privados!'));
    }
};