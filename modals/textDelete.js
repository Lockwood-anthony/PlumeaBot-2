const { doesNotMatch } = require('assert')
const { ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    name: 'textNick',
    async execute(interaction){
        const tUtils = require('../utils/text')
        const uuid = interaction.customID.split('/')[1]
        const dt = interaction.fields.getTextInputValue('dt')
        const trueDt = tUtils.getDt(uuid)

        if(dt == trueDt){
            tUtils.remove(uuid)
            interaction.reply({cotent: doesNotMatch, ephemeral: true})

        }else{
            interaction.reply({content: "Mauvais dt !", ephemeral: true})

        }

    },

    get(uuid){
        const modal = new ModalBuilder()
        .setCustomId(this.name+"/"+uuid)
        .setTitle("DESTRUCTION D'UN TEXTE EN COURS")

        const nick = new TextInputBuilder()
        .setCustomId('dt')
        .setLabel("Entre son dt pour confirmation :")
        .setPlaceholder("Le texte disparaitra à jamais !")
        .setMinLength(13)
        .setMaxLength(17)
        .setStyle(TextInputStyle.Short)
        .setRequired(true)

        const firstActionRow = new ActionRowBuilder().addComponents(nick)
        modal.addComponents(firstActionRow)

        return modal
    }

}