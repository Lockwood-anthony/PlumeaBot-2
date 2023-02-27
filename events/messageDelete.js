const mes = require('../utils/message')

module.exports = {
	name: 'messageDelete',

	async execute(message) {

		if(!message.author.bot){
			await mes.logMes(message, "Deleted")

		}

	}

}