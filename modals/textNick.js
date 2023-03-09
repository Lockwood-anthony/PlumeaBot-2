const { ModalBuilder, TextInputBuilder, ActionRowBuilder } = require('discord.js')
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
                await mUtils.setNick(id, nick.toUpperCase() )

                if(textUUID === '0'){
                    await mes.interSuccess(inter)

                }else{
                    await mes.interSuccess(
                        inter,
                        {
                            content: "Tu peux poster ton texte à présent ! \n __Appuis sur le bouton__  ↓↓↓",
                            components: [require("../buttons/textModalTitle").get(textUUID, 0, 1)]
                        }

                    )

                }


            }else{
                await mes.interError(
                    inter,
                    {
                        content: "Tu as mal confirmé ton pseudo \n __Appuis sur le bouton__  ↓↓↓",
                        components: [require("../buttons/textNick").get(textUUID)]
                    }
                )

            }

        }else{
            await mes.interError(
                inter,
                {
                    content: "Seuls les caractères alphabétiques sont autorisés \n __Appuis sur le bouton__  ↓↓↓",
                    components: [require("../buttons/textNick").get(textUUID)]
                }
            )

        }

    },

    get(textUUID){
        const modal = new ModalBuilder()
            .setCustomId(this.name + "/" + textUUID)
            .setTitle('Pseudo affiché sur tes textes :)')

        const nick =
            new ActionRowBuilder()
                .addComponents(new TextInputBuilder()
                    .setCustomId('nick')
                    .setLabel('Entre le :')
                    .setPlaceholder("4 premières lettres du pseudo discord")
                    .setMinLength(4)
                    .setMaxLength(4)
                    .setStyle("Short"))

        const nickConfirm =
            new ActionRowBuilder()
                .addComponents( new TextInputBuilder()
                    .setCustomId('nickConfirm')
                    .setLabel('Confirme le :')
                    .setPlaceholder("4 premières lettres du pseudo discord")
                    .setStyle("Short"))

        modal.addComponents( [nick, nickConfirm] )

        return modal
    }

}