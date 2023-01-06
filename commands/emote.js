const { SlashCommandBuilder } = require("discord.js");
const { sendDone } =  require('../utils/message')

module.exports = {
	data(){
	let data = new SlashCommandBuilder()
		.setName("emote")
		.setDescription("plume")

	return data
	},

	async execute(interaction) {
		const editJsonFile = require("edit-json-file")
        const dataConfig = editJsonFile(DATA_CONFIG)

        await interaction.reply(dataConfig.get("emotes.plume"))

	}

}