const { ModalBuilder, TextInputBuilder, ActionRowBuilder } = require('discord.js')
const mes = require("../utils/message")

module.exports = {
    name: 'textGetPassword',

    async execute(inter){
        const tUtils = require('../utils/text')

        const uuid = inter.customId.split('/')[1]
        const member = inter.member
        const password = inter.fields.getTextInputValue('password')
        const truePassword = await tUtils.getPassword(uuid)

        if(password === truePassword){
            const sent = await tUtils.sendFile(uuid, member)

            if(sent){
                await mes.interSuccess(inter)

            }else{
                await mes.interError(inter, "Ouvre tes mp -_- Tu crois que je vais t'envoyer le fichier comment sinon ...")

            }

        }else{
            await mes.interError(inter, "Mauvais mot de passe !")

        }

    },

    get(uuid){
        const modal = new ModalBuilder()
            .setCustomId(this.name+'/'+uuid)
            .setTitle("Fenetre d'obtention du fichier")

        const password = new TextInputBuilder()
            .setCustomId('password')
            .setLabel('Entre le mot de passe du texte :')
            .setMinLength(8)
            .setMaxLength(16)
            .setStyle("Short")
            .setRequired(true)

        return modal.setComponents(
            new ActionRowBuilder()
                .addComponents(password))

    }

}