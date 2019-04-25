const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    console.log("Recieved message from " + message.member.tag + " and it said" + message.content)
    if (message.content.indexOf(client.user.tag) === 0) {
        var str = message.content.slice(13)
        message.channel.send(message.author.tag+" said *"+str+"* to me. **THE NERVE!**")

    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
