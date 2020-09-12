module.exports = {
	name: 'help',
	description: 'help command.',
	cooldown: 5,
	execute(message) {
		message.channel.send ( 
      'My prefix is "mio " with a space. \n **e.g mio help** \n Here are my other commands: \n \n **play** - Plays music while you are in a voice channel. Pause, skip and stop are included \n **ping** - Pings the bot and responds with "pong" \n **queue** - Checks the queue of songs played \n **volume** - Adjusts volume or states volume by default. **WARNING: IF VOLUME IS SET TOO HIGH, BOT MIGHT BREAK OR MAY CAUSE EARRAPE** ')

    
    
    


  }
};