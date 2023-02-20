const { ButtonBuilder, ActionRowBuilder } = require('discord.js')
const mes = require("../utils/message")

module.exports = {
    name: 'textNick',
    async execute(inter){
        const textUUID = inter.customId.split('/')[1]

        await mes.interSuccess(inter, require('../modals/textNick').get(textUUID))

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