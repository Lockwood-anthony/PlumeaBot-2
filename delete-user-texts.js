const { SlashCommandBuilder, PermissionFlagsBits, CommandInteractionOptionResolver } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('delete-user-texts')
    .addMentionableOption(option => option
        .setName('user')
        .setDescription("Le pauvre chou qui va perdre tous ses textes ;-;")
        .setRequired(true))
    .setDescription("Supprime l'entièreté des textes du pauvre chou"),

    async execute(interaction) {
        const text = require("./utils/text.js")
        const memberUtil = require("./utils/member.js")

        const userId = interaction.options.getString("dt")
        const member = interaction.member
        const user = member.user

        const texts = memberUtil.getTexts()

        texts.array.forEach(t => {
            text.delete(t)
        })

        interaction.reply({content:"Yeah ! Tu es un vériatble adepte du grand renouveau !", ephemeral:true})
    
    }

}