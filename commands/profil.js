const { SlashCommandBuilder } = require("discord.js");
const { sendDone } =  require('../utils/message')

module.exports = {
	data: new SlashCommandBuilder()
	.setName("profil")
    .setDescription("Profil d'un scripturien")
	.addUserOption(option => option
        .setName("user")
		.setDescription("Scripturien")
        .setRequired(true)),
	async execute(interaction) {
		const json = require("../utils/json")
		const editJsonFile = require("edit-json-file")

		let data = editJsonFile(DATA);
		const user = interaction.options.getUser("user")
		const id = json.intToABC(user.id)
		const plumes = data.get("members."+id+".plumes")
		const date = data.get("members."+id+".date")
		const scriptucoins = data.get("members."+id+".scriptucoins")

		message = "**Profil de : <@"+user.id+">**\n\n"
		message += "Plumes : *"+plumes+"*\n"
		message += "Arrivée : *"+date+"*\n"
		message += "Scriptucoins : *"+scriptucoins+"*\n"

		const messageUtil = require("../utils/message");
        const messageEmbed = messageUtil.newEmbed()
        .setDescription(message)
        await interaction.reply({ embeds: [messageEmbed]});

	}

}