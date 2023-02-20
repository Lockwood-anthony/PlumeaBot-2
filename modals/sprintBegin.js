const { ModalBuilder, TextInputBuilder, ActionRowBuilder } = require('discord.js')
const mes = require("../utils/message")
const sUtils = require("../utils/sprint")
const somes = require("../utils/somes")

module.exports = {
    name: 'sprintBegin',

    async execute(inter){
        let errorMes = ''

        let duration = inter.fields.getTextInputValue('duration')
        errorMes += somes.checkIntegerModalInput(duration, "Durée", 30)

        let wait = inter.fields.getTextInputValue('wait')
        if(wait){
            errorMes += somes.checkIntegerModalInput(wait, "Attente", 5)
        }else{
            wait = 1
        }

        let words = inter.fields.getTextInputValue('words')
        if(words){
            errorMes += somes.checkIntegerModalInput(words, "Mots")
        }else{
            words = 0
        }

        if(errorMes !== ''){
            await mes.interError(inter, errorMes)
            return
        }

        await mes.interSuccess(inter, '***Sprint ! :3***')

        await sUtils.SETUP(0, wait*60, duration*60, words, inter)
        await sUtils.BEGIN(0)


    },

    get(){
        const modal = new ModalBuilder()
            .setCustomId(this.name)
            .setTitle('Crée le Sprint ! :D')

        const duration = new ActionRowBuilder()
            .setComponents(
                new TextInputBuilder()
                    .setCustomId('duration')
                    .setLabel('Durée du Sprint :')
                    .setPlaceholder("1~30 min")
                    .setMaxLength(2)
                    .setStyle("Short")
            )

        const wait = new ActionRowBuilder()
            .setComponents(
                new TextInputBuilder()
                    .setCustomId('wait')
                    .setLabel('Attente avant le sprint :')
                    .setPlaceholder("1~5 min")
                    .setRequired(false)
                    .setMaxLength(2)
                    .setStyle("Short")
            )

        const words = new ActionRowBuilder()
            .setComponents(
                new TextInputBuilder()
                    .setCustomId('words')
                    .setLabel('Ton nombre actuel de mots')
                    .setRequired(false)
                    .setMaxLength(6)
                    .setStyle("Short")
            )

        modal.addComponents(duration, wait, words)

        return modal
    }

}