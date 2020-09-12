module.exports = {
	name: 'ping',
	description: 'pings back pong command.',
	execute(message, args) {
		message.channel.send ('Pong!')
	}
};
