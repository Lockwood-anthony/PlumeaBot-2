const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')
const mUtils = require('../utils/member')
const mes = require("../utils/message")

module.exports = {
    name: 'textTitle',

    async execute(inter){
        const id = inter.member.user.id
        const title = inter.fields.getTextInputValue('dt_title') 
        
        if(/^[a-zA-Z()]+$/.test(title)){
            const textsUUIDs = await mUtils.getTextsUUIDs(id)
            await mUtils.setFileInPostingDt(id, title)

            let serie = []
            const tUtils = require('../utils/text')
            for(let t of textsUUIDs){

                if(t[1] === title){
                    serie.push(tUtils.get(t[0]))

                }

            }

            let text = null
            for(let t of serie){
                if(t.chapter1 > text.chapter1){
                    text = t
                }

            }

            const t = require('../modals/textModal')
            const textModal = await t.get(text)
            await inter.showModal(textModal)

        }else{
            await inter.reply({content: 'Seuls les caractères alphabétiques sont autorisés', ephemeral: true})
        }

    },

    get(){
        const modal = new ModalBuilder()
        .setCustomId(this.name)
        .setTitle('Id du Texte')

        const dt_title = new TextInputBuilder()
        .setCustomId('dt_title')
        .setLabel('ex : LGUIDE pour Le Guide de Para :')
        .setPlaceholder('Vas-y ! Entre les ! Hmmmm, j~en frémis déjà~')
        .setMinLength(6)
        .setMaxLength(6)
        .setStyle(TextInputStyle.Short)
        .setRequired(true)

        const firstActionRow = new ActionRowBuilder().addComponents(dt_title)
        modal.addComponents(firstActionRow)

        return modal
    }

}