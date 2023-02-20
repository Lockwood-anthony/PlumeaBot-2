const { ModalBuilder, TextInputBuilder, ActionRowBuilder } = require('discord.js')
const mes = require("../utils/message")
const sprint = require('../utils/sprint')
const somes = require("../utils/somes")
const { config } = require("../config")

module.exports = {
    name: 'sprintWords',

    async execute(inter){
        const member = inter.member
        let words = inter.fields.getTextInputValue('words')
        words = parseInt(words)
        const id = inter.customId.split("/")[1]

        if(! await sprint.isSprinter(member.user.id)){
            let errorMes = ''
            errorMes += somes.checkIntegerModalInput(words, "Mots")
            if(errorMes !== ''){
                await mes.interError(inter, errorMes)
                return
            }

            await sprint.addSprinter(id, member.user.id, words)

            const mesId = await sprint.getMessageId(id)
            const message = await mes.getMes(config.channels.sprint, mesId)
            let embed = message.embeds[0]
            embed.data.description = await sprint.getRunningMessageDesc(id)

            await mes.editMes(config.channels.sprint, mesId, { embeds: [embed] })

            await mes.interSuccess(inter)

        }else{
            await mes.interError(inter, "Tu en fais déjà parti ! Trop tard ;-;")

        }

    },

    get(id){
        const modal = new ModalBuilder()
            .setCustomId(this.name + "/" + id)
            .setTitle('Nombre de Mots au début :D')

        const words = new TextInputBuilder()
            .setCustomId('words')
            .setLabel('mots')
            .setRequired(true)
            .setMaxLength(6)
            .setStyle("Short")

        const firstActionRow = new ActionRowBuilder().addComponents(words)
        modal.addComponents(firstActionRow)

        return modal
    }

}