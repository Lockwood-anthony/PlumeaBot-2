const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')

module.exports = {
    name: 'textPassword',
    async execute(inter){
        const password = inter.fields.getTextInputValue('password') 
        const textId = inter.customId.split('/')[1]
        const textUtils = require('../utils/text')
        const truePassword = textUtils.getPassword(textId)

        if(truePassword == password){
            const tUtils = require('../utils/text')
            tUtils.sendFile(textId, member)

        }else{
            inter.reply({content: 'MAUVAIS MOT DE PASSE è-é', ephemeral: true})
        }

    },

    get(textId){
        const modal = new ModalBuilder()
        .setCustomId(this.name+'/'+textId)
        .setTitle('Mot de passe :')

        const password = new TextInputBuilder()
        .setCustomId('password')
        .setLabel('Entre le mot de passe :')
        .setPlaceholder('Vas-y ! Entre le ! Hmmmm, j~en frémis déjà~')
        .setMinLength(8)
        .setMaxLength(16)
        .setStyle(TextInputStyle.Short)
        .setRequired(true)

        const firstActionRow = new ActionRowBuilder().addComponents(password)
        modal.addComponents(firstActionRow)

        return modal
    }

}