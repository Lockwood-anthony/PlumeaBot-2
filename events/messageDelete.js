module.exports = {
	name: 'messageDelete',
	async execute(message) {
		const messageUtil = require('../utils/message')

		if (message.channel.type === 'dm') {
			return
		}

		messageUtil.log(message,'delete')
	
	}

}