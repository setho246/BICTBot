const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content.indexof("@BICTBot#0125") === 0) {
        var str = message.content.slice(13)
        message.channel.send(message.author+" said *"+str+"* to me. **THE NERVE!**")

    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);