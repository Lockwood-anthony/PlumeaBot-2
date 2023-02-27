const { ActionRowBuilder, ButtonBuilder } = require('discord.js')
const mes = require("../utils/message")
const tUtils = require("../utils/text")

module.exports = {
    name: 'textProtect',
    async execute(inter){
        const split = inter.customId.split('/')
        const textUUID = split[1]
        const member = inter.member
        const textAuthorId = await tUtils.getAuthorId(textUUID)

        if(member.user.id === textAuthorId || member.permissions.has('ADMINISTRATOR'))

        await mes.interSuccess(inter, { content: "Veux-tu limiter l'accès à ce texte ?", components: [await require("../selectMenus/textProtect").get(textUUID)] })

    },

    get(textUUID, lock, row = false, ){
        const button = new ButtonBuilder()
            .setCustomId(this.name + "/" + textUUID)
            .setStyle('Primary')

        if(lock){
            button.setEmoji('🔏')

        }else{
            button.setEmoji('🔓')

        }

        if(row){
            return new ActionRowBuilder().setComponents(button)
        }else{
            return button
        }

    }

}