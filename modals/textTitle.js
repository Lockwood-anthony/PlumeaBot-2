const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')
const { text } = require('stream/consumers')

module.exports = {
    name: 'textTitle',
    async execute(inter){
        const id = inter.member.user.id
        const title = inter.fields.getTextInputValue('dt_title') 
        
        if(/^[a-zA-Z()]+$/.test(title)){
            const mUtils = require('../utils/member')
            const texts = mUtils.getTextsUUIDs(id)
            mUtils.setFileInPostingDt(id, title)

            let serie = []
            const tUtils = require('../utils/text')
            for(t of texts){

                if(t[1] == title){
                    serie.push(tUtils.get(t[0]))

                }

            }

            text = null
            for(t of serie){
                if(t.chapter1 > text.chapter1){
                    text = t
                }

            }

            const textModal = require('../modals/textModal')
            await inter.showModal(textModal.get(text)) 


        }else{
            await inter.reply({content: 'Seuls les caractères alphabétiques sont autorisés', ephemeral: true})
        }

    },

    get(){
        const modal = new ModalBuilder()
        .setCustomId(this.name)
        .setTitle('6 lettres se rapportant à votre oeuvre (ex:LGUIDE pour Le Guide de Para')

        const dt_title = new TextInputBuilder()
        .setCustomId('dt_title')
        .setLabel('Entre les lettres :')
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