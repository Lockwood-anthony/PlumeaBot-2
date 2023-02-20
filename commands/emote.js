const { SlashCommandBuilder } = require('discord.js')
const { config } = require('../config')
const mes = require("../utils/message")

module.exports = {
	data(){
		return new SlashCommandBuilder()
			.setName('emote')
			.setDescription('plume')

	},

	async execute(inter) {
		await mes.interSuccess(inter, { content: config.emotes.plume, ephemeral: false } )

	}

}