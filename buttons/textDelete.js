const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: "textGet",
    async execute(interaction){
        const textId = interaction.customId.split("/")[1]
        const confirm = require('../modals/textDelete')

        interaction.showModal(confirm.get(textId))
    },

    get(textId){
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(this.name+"/"+textId)
                .setLabel('DEL')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji(':zap:')
        )

        return button
    }

}