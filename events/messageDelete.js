const mes = require('../utils/message')

module.exports = {
	name: 'messageDelete',

	async execute(message) {

		if(!message.author.bot){
			const content = message.content
			const files = message.attachments.values()
			const embeds = message.embeds.values()
			const components = message.components.values()

			if(content === '' && files.size === undefined && embeds.length === undefined && components.length === undefined){
				return
			}

			await mes.logMes(message, "Deleted")

		}

	}

}