const { ButtonBuilder } = require('discord.js')
const mes = require("../utils/message")

module.exports = {
    name: 'textPassword',
    async execute(inter){
        const uuid = inter.customId.split('/')[1]
        await mes.interSuccess(inter, require('../modals/textGetPassword').get(uuid))

    },

    get(uuid){
        return new ButtonBuilder()
            .setCustomId(this.name+'/'+uuid)
            .setLabel('Mot de passe')
            .setStyle('Danger')

    }

}