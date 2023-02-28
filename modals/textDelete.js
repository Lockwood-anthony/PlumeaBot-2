const { ModalBuilder, TextInputBuilder, ActionRowBuilder } = require('discord.js')
const mes = require("../utils/message")

module.exports = {
    name: 'textDelete',
    async execute(inter){
        const tUtils = require('../utils/text')
        const uuid = inter.customId.split('/')[1]
        const id_text = inter.fields.getTextInputValue('id_text')
        const trueId_Text = await tUtils.getId_Text(uuid)

        if(id_text === trueId_Text){
            await tUtils.vanish(uuid)
            await mes.interSuccess(inter)

        }else{
            await mes.interError(inter, 'Mauvais id_text !')

        }

    },

    get(uuid){
        const modal = new ModalBuilder()
            .setCustomId(this.name+'/'+uuid)
            .setTitle('DESTRUCTION D~UN TEXTE EN COURS')

        const nick = new TextInputBuilder()
            .setCustomId('id_text')
            .setLabel('Entre son id_text pour confirmation :')
            .setPlaceholder('Le texte disparaitra à jamais !')
            .setMinLength(13)
            .setMaxLength(17)
            .setStyle("Short")

        const firstActionRow = new ActionRowBuilder().addComponents(nick)
        modal.addComponents(firstActionRow)

        return modal
    }

}