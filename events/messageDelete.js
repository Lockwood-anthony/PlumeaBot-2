const { log } = require('../utils/message')

module.exports = {
	name: 'messageDelete',

	execute(message) {

		if (message.channel.type === 'dm') {
			return
		}

		log(message,'delete')
	
	}

}