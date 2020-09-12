require('dotenv').config();
const { readdirSync } = require('fs');
const { join } = require('path');
const MusicClient = require('./struct/Client');
const { Collection } = require('discord.js');
const client = new MusicClient({ token: process.env.DISCORD_TOKEN, prefix: process.env.DISCORD_PREFIX });

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(join(__dirname, 'commands', `${file}`));
	client.commands.set(command.name, command);
}

client.on('ready', () => {
console.log('Mio is online!');
   
   client.user.setPresence({ activity: { name: 'Mio eat borgar' }, status: 'idle' })
  .then(console.log)
  .catch(console.error);

   client.user.setActivity('Mio eat borgar', { 
     type: 'WATCHING',
     details: "Mio is vigorously eating that borgar",
     emoji: 'hamburger'
      })
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);

   /*
   client.user.setActivity(`this won't appear in the bot's custom status!`, {type: 4})
   */

   // --------
   
   /* client.user.setStatus('online')
    client.user.setActivity({
        game: {
            name: 'Use f!help' ,
            type: "Streaming",
            url: "https://discordapp.com/"
        }
    }); */
});

/*
client.once('ready', () =>  
  
  console.log('Mio is Online!'))
  bot.user.setActivity('Playing Bass'); */

client.on('message', message => {
	if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;
	const args = message.content.slice(client.config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
	if (command.guildOnly && message.channel.type !== 'text') return message.reply('I can\'t execute that command inside DMs!');
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		if (command.usage) reply += `\nThe proper usage would be: \`${client.config.prefix}${command.name} ${command.usage}\``;
		return message.channel.send(reply);
	}
	if (!client.cooldowns.has(command.name)) {
		client.cooldowns.set(command.name, new Collection());
	}
	const now = Date.now();
	const timestamps = client.cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

// Don't Change the above code//

 client.login("NzQwOTU4ODcxOTU0MjYwMDU5.XywluQ.9_8_LlUF3hHUhvzNTqTnG-kV8sk")


/* client.on('ready', () => {
    // #3
    console.log("Logged in.");
    client.login("token");
});

// #2
client.user.setPresence('test', { type: 'PLAYING' }); */