const { ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    name: 'sprintWords',
    async execute(inter){
        const member = inter.member
        const sprint = require('../utils/sprint.js')

        let words = inter.fields.getTextInputValue('words')     
        try {
            if(!sprint.isSprinter(member.user.id)){
                words = parseInt(words)
                sprint.addSprinter(member.user.id, words)
                inter.reply({content:'**Youpiii ! :D**', ephemeral:true})

            }else{
                inter.reply({content:'**Tu en fais déjà parti ! Trop tard ;-;**', ephemeral:true})

            }

        }catch (error) {
            inter.reply({content:'**C~est pas nombre ca ! :D**', ephemeral:true})

        }

    },

    get(){
        const modal = new ModalBuilder()
        .setCustomId(this.name)
        .setTitle('Nombre de Mots au début :D')

        const words = new TextInputBuilder()
        .setCustomId('words')
        .setLabel('mots')
        .setRequired(true)
        .setMaxLength(6)
        .setStyle(TextInputStyle.Short)

        const firstActionRow = new ActionRowBuilder().addComponents(words)
        modal.addComponents(firstActionRow)

        return modal
    }

}