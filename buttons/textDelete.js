const { ButtonBuilder } = require('discord.js')
const mes = require("../utils/message")
const confirm = require("../modals/textDelete");

module.exports = {
    name: 'textDelete',
    async execute(inter){
        const textId = inter.customId.split('/')[1]

        await mes.interSuccess(inter, confirm.get(textId))
    },

    get(textId){
        return new ButtonBuilder()
            .setCustomId(this.name+'/'+textId)
            .setLabel('DETRUIRE')
            .setStyle('Secondary')
            .setEmoji('⚡')

    }

}