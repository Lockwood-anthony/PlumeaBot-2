const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const { config } = require('../config')
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

        const chad = config.messageReplies.CHAD

        for (i = 0 ; i < n ; i++) {
            interaction.channel.send(chad)
        } 

	}

}