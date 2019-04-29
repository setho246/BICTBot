const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content == "ping") {
		message.channel.send("pongx3")
    }
    if (message.content.indexOf("<@!"+ client.user.id + ">") === 0) {
        var str = message.content.slice(22)
        message.channel.send(message.author.username + " said *\"" + str.slice(1) + "\"*  to me. **THE NERVE!**")
		message.author.send("Who tf do you think you are mate?")
	}
	
	if (message.content.startsWith("bot") && message.channel.name === "bot-commands") {
		if(message.content.includes("enrol") && message.guild) { //If user asks for role in a server text channel
			bot_AddRole(message); //Give the user a role
		
		}
	}
});

function bot_AddRole(message) {
	const guild = message.channel.guild //Get the server
	const guildUser = message.member //Get the message sender as a server member
	var roles = guild.roles //Get the list of all roles in the server
	var text = message.content
	
	text = text.slice(text.indexOf("enrol")+6).split(" ")
	text.forEach(roleToAdd => { //For each role the user wants
		found = roles.find(function (role) { //Find the role with the correct name
			return role.name === roleToAdd 
		});
		if(found) { //If it exists
			console.log(found);
			guildUser.addRole(found.id)
		} else { 
			guild.createRole({ //Create role
				name: roleToAdd
			  })
			  .then(role => {
				guildUser.addRole(role.id);
				console.log(`Gave user ${guildUser.displayName} (${guildUser.user.username}) the role of ${role.name}`)
					roleCreationSuccess(role, guild, roleToAdd)
				
				
			  }) //Give the user a role
			  .catch(console.error)
		}
	});
}

function roleCreationSuccess(role, guild, roleToAdd) {
	guild.createChannel(roleToAdd, "category", [{ //Create the category for the role
		id: guild.defaultRole.id,
		denied: [66575680]	//Hide it from @everyone
	}, {		
		id: role.id,	//Give the role access
		allowed: [104193344]
	}])
	.then(catChannel => {
		guild.createChannel(roleToAdd+"-text", "text", [{	//Create the text channel for the role
			id: guild.defaultRole.id,
			denied: [66575680]	//Hide it from @everyone
		}, {		
			id: role.id,
			allowed: [104193344]	//Give access to the role
		}])
		.then(textChannel => textChannel.setParent(catChannel))	//Put the channel in the category
		.catch(console.error);
		guild.createChannel(roleToAdd+"-voice", "voice", [{	//Create the voice channel for the role
			id: guild.defaultRole.id,
			denied: [66575680]	//Hide it from @everyone
		}, {		
			id: role.id,
			allowed: [104193344]	//Give access to the role
		}])
		.then(voiceChannel => voiceChannel.setParent(catChannel))	//Put the channel in the correct category
		.catch(console.error);
	})
	.catch(console.error)

}

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);

