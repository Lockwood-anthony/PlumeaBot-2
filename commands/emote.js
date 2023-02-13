const { SlashCommandBuilder, TextInputBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js')
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
		await mes.interSuccess(inter, {content: config.emotes.plume} )

	}

}