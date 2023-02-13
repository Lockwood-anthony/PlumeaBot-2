const { ButtonBuilder, ActionRowBuilder } = require('discord.js')

module.exports = {
    name: 'textNick',
    async execute(inter){
        const textUUID = inter.customId.split('/')[1]

        const nickModal = require('../modals/textNick')
        inter.showModal(nickModal.get(textUUID))

    },

    get(textUUID){
        return new ActionRowBuilder()
            .setComponents(
                new ButtonBuilder()
                    .setCustomId(this.name + "/" + textUUID)
                    .setLabel('Plumea Pseudo')
                    .setStyle('Success')
            )

    }

}