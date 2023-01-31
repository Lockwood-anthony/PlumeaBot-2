const { SlashCommandBuilder, GuildForumThreadManager, ThreadAutoArchiveDuration } = require('discord.js')
const { config } = require('../config')
const mes = require("../utils/message")

module.exports = {
	data(){
	let data = new SlashCommandBuilder()
		.setName('emote')
		.setDescription('plume')

	return data
	},

	async execute(inter) {
		await require('../utils/message').interSuccess(inter, {content: config.emotes.plume} )

		const forum = await client.channels.fetch("1069894556356718592")

		new GuildForumThreadManager(forum).create({
			name: 'Food Talk',
			message: {
				content: 'Discuss your favorite food!',
			},
			reason: 'Needed a separate thread for food',
		})
			.then(threadChannel => console.log(threadChannel))
			.catch(console.error);
	}

}