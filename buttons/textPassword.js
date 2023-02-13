const { ButtonBuilder } = require('discord.js')

module.exports = {
    name: 'textPassword',
    async execute(inter){
        const uuid = inter.customId.split('/')[1]
        const passModal = require('../modals/textGetPassword')
        inter.showModal(passModal.get(uuid))

    },

    get(uuid){
        return new ButtonBuilder()
            .setCustomId(this.name+'/'+uuid)
            .setLabel('Mot de passe')
            .setStyle('Danger')

    }

}