const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content == "ping") {
        message.channel.send("pong")
    }
    if (message.content.indexOf("<@!"+ client.user.id + ">") === 0) {
        var str = message.content.slice(22)
        message.channel.send(message.author.username + " said *\"" + str.slice(1) + "\"*  to me. **THE NERVE!**")
		message.author.send("Who tf do you think you are mate?")
    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
