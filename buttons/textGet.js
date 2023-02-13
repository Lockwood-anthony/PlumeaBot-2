const { ButtonBuilder, ActionRowBuilder } = require('discord.js')
const mes = require("../utils/message")

module.exports = {
    name: 'textGetPassword',
    async execute(inter){
        const tUtils = require('../utils/text')

        const textId = inter.customId.split('/')[1]
        const member = inter.member

        await tUtils.sendFile(textId, member)

        await mes.interSuccess(inter)

    },

    get(textId){
        return new ButtonBuilder()
            .setCustomId(this.name+'/'+textId)
            .setLabel('Prend moi')
            .setStyle('Success')

    }

}