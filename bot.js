const Discord = require('discord.js');
const client = new Discord.Client();

const { Client } = require('pg');

const dbclient = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});

dbclient.connect();


dbclient.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
	if (err) throw err;
	for (let row of res.rows) {
		console.log(JSON.stringify(row));
	}
	dbclient.end();
});


client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', message => {

	if (message.content.indexOf("<@!" + client.user.id + ">") === 0) {
		var str = message.content.slice(27)
		var commands = str.split(', ')
		if (commands.length === 2) {
			createRole(message.member, commands[0], commands[1])
		} else {
			message.reply('Unknown sytanx. Correct method is \`@me role {roleName}, {roleColour}\` where roleColour is a hex value (with or without the #)')
		}
	}
});


function createRole(user, title, colour) {
	var roles = user.roles.array()
	var roleToUpdate = null

	console.log("Client id for this bot is " + client.user.id)
	roleToUpdate = roles.filter(role => {
		console.log("Client for role \"" + role.name + "\" is \"" + role.client.user.id)
		role.client.user.id === client.user.id
	})





	console.log("role update is:" + roleToUpdate)
	console.log(typeof roleToUpdate)

	if (roleToUpdate == null) {
		console.log("About to create Role even though I dont need to")
		user.guild.createRole({
			name: title,
			color: colour
		}).then(role => {
			user.addRole(role)
		})
	} else {
		console.log("no role needed")
	}

}

function bot_AddRole(message) {
	const guild = message.channel.guild //Get the server
	const guildUser = message.member //Get the message sender as a server member
	var roles = guild.roles //Get the list of all roles in the server
	var text = message.content

	text = text.slice(text.indexOf("enrol") + 6).split(" ")
	text.forEach(roleToAdd => { //For each role the user wants
		found = roles.find(function (role) { //Find the role with the correct name
			return role.name === roleToAdd
		});
		if (found) { //If it exists
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
			guild.createChannel(roleToAdd + "-text", "text", [{	//Create the text channel for the role
				id: guild.defaultRole.id,
				denied: [66575680]	//Hide it from @everyone
			}, {
				id: role.id,
				allowed: [104193344]	//Give access to the role
			}])
				.then(textChannel => textChannel.setParent(catChannel))	//Put the channel in the category
				.catch(console.error);
			guild.createChannel(roleToAdd + "-voice", "voice", [{	//Create the voice channel for the role
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
client.login(process.env.BOT_TOKEN)

