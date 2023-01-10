const { SlashCommandBuilder } = require('discord.js')
const { cmdSuccess } =  require('../utils/message')
const { config } = require('../config')

module.exports = {
	data(){
	let data = new SlashCommandBuilder()
		.setName('emote')
		.setDescription('plume')

	return data
	},

	async execute(inter) {
		await cmdSuccess(inter, config.emotes.plume)
        await inter.reply(config.emotes.plume)

	}

}