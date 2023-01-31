const { doesNotMatch } = require('assert')
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')

module.exports = {
    name: 'textDelete',
    async execute(inter){
        const tUtils = require('../utils/text')
        const uuid = inter.customID.split('/')[1]
        const dt = inter.fields.getTextInputValue('dt')
        const trueDt = tUtils.getDt(uuid)

        if(dt == trueDt){
            tUtils.remove(uuid)
            inter.reply({cotent: doesNotMatch, ephemeral: true})

        }else{
            inter.reply({content: 'Mauvais dt !', ephemeral: true})

        }

    },

    get(uuid){
        const modal = new ModalBuilder()
        .setCustomId(this.name+'/'+uuid)
        .setTitle('DESTRUCTION D~UN TEXTE EN COURS')

        const nick = new TextInputBuilder()
        .setCustomId('dt')
        .setLabel('Entre son dt pour confirmation :')
        .setPlaceholder('Le texte disparaitra à jamais !')
        .setMinLength(13)
        .setMaxLength(17)
        .setStyle(TextInputStyle.Short)
        .setRequired(true)

        const firstActionRow = new ActionRowBuilder().addComponents(nick)
        modal.addComponents(firstActionRow)

        return modal
    }

}