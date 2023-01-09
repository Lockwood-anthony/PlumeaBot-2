const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: "textGet",
    async execute(interaction){
        const textId = interaction.customId.split("/")[1]
        const member = interaction.member

        const tUtils = require('../utils/text')
        tUtils.sendFile(textId, member)

    },

    get(textId){
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(this.name+"/"+textId)
                .setLabel('Prend moi')
                .setStyle(ButtonStyle.Success)
        )

        return button
    }

}