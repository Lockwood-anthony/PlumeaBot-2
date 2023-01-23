module.exports = {
	name: 'ready',

	async execute(client) {
		//CommandHandler
		require('../deploy-commands')
		
		console.log(`Bibot is ready ! ;3 ${client.user.tag}`)

	},

}