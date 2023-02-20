const { ModalBuilder, TextInputBuilder, ActionRowBuilder } = require('discord.js')
const mes = require("../utils/message")
const tUtils = require("../utils/text")

module.exports = {
    name: 'textDtTitle',

    async execute(inter){
        const split = inter.customId.split('/')
        const textUUID = split[1]
        let textModelUUID = split[2]
        const PostProcess = split[3]

        const dt_title = inter.fields.getTextInputValue('dt_title')
        const id = inter.member.id

        if(/^[a-zA-Z()]+$/.test(dt_title)){
            await tUtils.setDtTitle(textUUID, dt_title)

            if(PostProcess === '1'){
                const textModelUUID = await tUtils.getSimilarTextUUID(dt_title, id, textUUID)
                const button = await require("../buttons/textModal1").get(textUUID, textModelUUID, PostProcess)
                await mes.interSuccess(
                    inter,
                    { content: "Tu peux poster ton texte :D \n __appuis sur le bouton__  ↓↓↓", components: [button] })

            }else{
                await mes.interSuccess(inter)
            }


        }else{
            const button = require("../buttons/textModalTitle").get(textUUID, textModelUUID, PostProcess)
            await mes.interError(
                inter,
                { content: "Seuls les caractères alphabétiques sont autorisés\n __appuis sur le bouton__  ↓↓↓", components: [button] }

            )

        }

    },

    async get(textUUID, textModelUUID, postProcess){
        const modal = new ModalBuilder()
            .setCustomId(this.name + "/" + textUUID + "/" +textModelUUID + "/" + postProcess)
            .setTitle('Dt Titre')

        const dt_title = new TextInputBuilder()
            .setCustomId('dt_title')
            .setLabel('ex : LGUIDE pour Le Guide de Para :')
            .setPlaceholder('Vas-y ! Entre les ! Hmmmm, j~en frémis déjà~')
            .setMinLength(6)
            .setMaxLength(6)
            .setStyle("Short")
            .setRequired(true)

        if(textModelUUID !== '0'){
            dt_title.setValue(await tUtils.getDtTitle(textModelUUID))
        }

        return modal.addComponents(
            new ActionRowBuilder()
                .addComponents(dt_title))

    }

}