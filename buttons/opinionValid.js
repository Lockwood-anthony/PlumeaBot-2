const { ButtonBuilder, ActionRowBuilder} = require('discord.js')
const oUtils = require("../utils/opinion")
const mes = require("../utils/message")
const tUtils = require("../utils/text")

module.exports = {
    name: 'opinionValid',

    async execute(inter){
        const member = inter.member
        const uuid = inter.customId.split('/')[1]
        const id = inter.member.id
        const senderId = await oUtils.getSenderId(uuid)

        await oUtils.setValidate(uuid, id)

        await inter.message.edit({ components: [] })

        const embed = mes.newEmbed()
            .setDescription("Bravo ! Ton avis a été validé ! :D")

        const p = await oUtils.getWords(uuid)
        const textUUID = await oUtils.getTextUUID(uuid)
        const fileMes = await tUtils.getFileMes(textUUID)

        const message = await oUtils.confirm(member, p, `[${textUUID}](${fileMes.url})`, member, inter)

        const button = new ActionRowBuilder()
            .setComponents(
                new ButtonBuilder()
                    .setLabel("Lien")
                    .setStyle('Link')
                    .setURL(message.url))


        await mes.interSuccess(inter, { content: `<@${senderId}>`, embeds: [embed], components: [button]})

        const opinionButton = new ActionRowBuilder()
            .setComponents(
                new ButtonBuilder()
                    .setLabel("Avis")
                    .setStyle('Link')
                    .setURL(inter.message.url))

        message.edit({ components: [opinionButton] })

    },

    get(uuid, row){
        const button = new ButtonBuilder()
            .setCustomId(this.name + "/" + uuid)
            .setLabel('Valider')
            .setStyle('Success')

        if(row){
            return new ActionRowBuilder()
                .setComponents(button)
        }
        return button

    }

}