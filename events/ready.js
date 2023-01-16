module.exports = {
	name: 'ready',

	execute(client) {
		//CommandHandler
		require('./deploy-commands')
		
		console.log(`Scriptubot pret ! ${client.user.tag}`)
	},

}