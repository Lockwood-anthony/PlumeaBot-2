const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { sendDone } =  require('../utils/message')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName("account-create")
        .setDescription("Crée un compte /!\ ECRASE TOUTES LES DONNEES DE L'UTILISATEUR !!!")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option => option
            .setName("user")
            .setDescription("user")
            .setRequired(true))

        return data

    },

	async execute(interaction) {
        const member = interaction.options.getUser('user')

        const memberUtils = require("../utils/member")
        memberUtils.add(member.user.id)

        sendDone(interaction)
        interaction.reply({content: "test", ephemeral: true})

	}

}