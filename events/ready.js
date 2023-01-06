module.exports = {
	name: 'ready',
	execute(client) {
		const dbObjects = require("../dbObjects.js")
		dbObjects.Sync()
		
		console.log(`Scriptubot pret ! ${client.user.tag}`);
	},
};