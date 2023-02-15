const { ButtonBuilder, ActionRowBuilder} = require('discord.js')
const mes = require("../utils/message")
const oUtils = require("../utils/opinion")
const  { config } = require("../config")

module.exports = {
    name: 'opinionReject',

    async execute(inter){
        const uuid = inter.customId.split('/')[1]
        const senderId = await oUtils.getSenderId(uuid)

        await oUtils.delOne(uuid)

        await inter.message.edit({ components: [] })

        const ticket = await client.channels.fetch(config.channels.ticket)
        const embed = mes.newEmbed(mes.color.yellow)
            .setDescription(`Désolé mais ton avis a été invalidé... Si aucune explication n'est fournie ci-dessous, crée un ${ticket}`)

        await mes.interSuccess(inter, { content: `<@${senderId}>`, embeds: [embed]})

    },

    get(uuid, row){
        const button = new ButtonBuilder()
            .setCustomId(this.name + "/" + uuid)
            .setLabel('Rejeter')
            .setStyle('Danger')

        if(row){
            return new ActionRowBuilder()
                .setComponents(buttons)
        }
        return button

    }

}