const { ButtonBuilder } = require('discord.js')

module.exports = {
    name: 'textGet',
    async execute(inter){
        const textId = inter.customId.split('/')[1]
        const confirm = require('../modals/textDelete')

        inter.showModal(confirm.get(textId))
    },

    get(textId){
        return new ButtonBuilder()
            .setCustomId(this.name+'/'+textId)
            .setLabel('DEL')
            .setStyle('Secondary')
            .setEmoji('⚡')

    }

}