const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')
const mUtils = require("../utils/member")
const mes = require("../utils/message")

module.exports = {
    name: 'textNick',

    async execute(inter){
        const id = inter.member.user.id
        const nick = inter.fields.getTextInputValue('nick')
        const nickConfirm = inter.fields.getTextInputValue('nickConfirm')
        const textUUID = inter.customId.split('/')[1]

        if(/^[a-zA-Z()]+$/.test(nick)){

            if(nick === nickConfirm){
                nick.toUpperCase()
                await mUtils.setNick(id, nick)

                if(textUUID === '0'){
                    await mes.interSuccess(inter)

                }else{
                    await mes.interSuccess(inter,
                        "Tu peux poster ton texte à présent ! \n __appuis sur le bouton__  ↓↓↓",
                        false,
                        [require("../buttons/textModalTitle").get(textUUID, 0, 1)]
                    )
                }


            }else{
                await mes.interError(inter, "Tu as mal confirmé ton pseudo")

            }

        }else{
            await mes.interError(inter, "Seuls les caractères alphabétiques sont autorisés")

        }

    },

    get(textUUID){
        const modal = new ModalBuilder()
        .setCustomId(this.name + "/" + textUUID)
        .setTitle('CE SERA TON PSEUDO A JAMAIS')

        const nick =
            new ActionRowBuilder()
                .addComponents(new TextInputBuilder()
                    .setCustomId('nick')
                    .setLabel('Entre ton pseudo :')
                    .setMinLength(4)
                    .setMaxLength(4)
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true))

        const nickConfirm =
            new ActionRowBuilder()
                .addComponents( new TextInputBuilder()
                    .setCustomId('nickConfirm')
                    .setLabel('Confirme le :')
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true))

        modal.addComponents( [nick, nickConfirm] )

        return modal
    }

}