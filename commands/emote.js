const { SlashCommandBuilder } = require("discord.js")
const { sendDone } =  require('../utils/message')
const { config } = require('../config')

module.exports = {
	data(){
	let data = new SlashCommandBuilder()
		.setName("emote")
		.setDescription("plume")

	return data
	},

	async execute(interaction) {

        await interaction.reply(config.emotes.plume)

	}

}