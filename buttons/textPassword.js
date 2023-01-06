const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: "textPassword",
    async execute(interaction){
        const uuid = interaction.customId.split('/')[1]
        const passModal = require('../modals/textPassword')
        interaction.showModal(passModal.get(uuid))

    },

    get(uuid){
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(this.name+"/"+uuid)
                .setLabel('Mot de passe')
                .setStyle(ButtonStyle.Danger)
        )

        return button
    }

}