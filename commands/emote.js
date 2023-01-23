const { SlashCommandBuilder } = require('discord.js')
const { config } = require('../config')

module.exports = {
	data(){
	let data = new SlashCommandBuilder()
		.setName('emote')
		.setDescription('plume')

	return data
	},

	execute(inter) {
		require('../utils/message').cmdSuccess(inter, config.emotes.plume)

	}

}