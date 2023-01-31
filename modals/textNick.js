const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')
const mUtils = require("../utils/member")
const mes = require("../utils/message")
module.exports = {
    name: 'textNick',
    async execute(inter){
        const id = inter.member.user.id
        const nick = inter.fields.getTextInputValue('nick')
        const nickConfirm = inter.fields.getTextInputValue('nickConfirm')

        if(/^[a-zA-Z()]+$/.test(nick)){

            if(nick == nickConfirm){
                const mUtils = require('../utils/member')
                nick.toUpperCase()
                mUtils.setNick(id, nick)

                mes.interSuccess(inter,
                    "Tu peux poster ton texte à présent ! \n __appuis sur le bouton__",
                    false,
                    [require("../buttons/textPost").get()]
                    )


            }else{
                mes.interError(inter, "Tu as mal confirmé ton pseudo")

            }

        }else{
            mes.interError(inter, "Seuls les caractères alphabétiques sont autorisés")

        }

    },

    get(){
        const modal = new ModalBuilder()
        .setCustomId(this.name)
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