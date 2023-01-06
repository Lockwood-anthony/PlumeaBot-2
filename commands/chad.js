const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { sendDone } =  require('../utils/message')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName("chad")
        .setDescription("chad")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addIntegerOption(option => option
            .setName("giga_chad_power_intensity")
            .setDescription("Giga Chad power intensity")
            .setRequired(true))

        return data

    },

	async execute(interaction) {
        const n = interaction.options.getInteger("giga_chad_power_intensity")
        interaction.reply({ content: "GIGA CHAD!!!", ephemeral: true })

        const editJsonFile = require("edit-json-file")
        const dataConfig = editJsonFile("DATA_CONFIG.json")
        const chad = dataConfig.get("messageReplies.CHAD")

        for (;i < n;) {
            interaction.channel.send(chad)
        } 

	}

}