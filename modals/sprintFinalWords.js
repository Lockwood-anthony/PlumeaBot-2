const { ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    name: 'sprintFinalWords',
    async execute(interaction){
        const member = interaction.member
        const sprint = require("../utils/sprint.js")

        let words = interaction.fields.getTextInputValue("words")     
        try {
            if(sprint.isSprinter(member.user.id)){
                words = parseInt(words)
                sprint.updateFinishMessage(member.user.id, words)
                interaction.reply({content:"**Te voilà inscrit dans le marbre mon cher ; )**", ephemeral:true})

            }else{
                interaction.reply({content:"**Tu faisais pas partie du sprint toi...**", ephemeral:true})

            }

        }catch (error) {
            console.log(error)
            interaction.reply({content:"**C'est pas nombre ca ! :D**", ephemeral:true})

        }

    },

    get(){
        const modal = new ModalBuilder()
        .setCustomId(this.name)
        .setTitle('Nombre de Mots à la fin :D')

        const words = new TextInputBuilder()
        .setCustomId('words')
        .setLabel("mots :")
        .setRequired(true)
        .setMaxLength(6)
        .setStyle(TextInputStyle.Short)

        const firstActionRow = new ActionRowBuilder().addComponents(words)
        modal.addComponents(firstActionRow)

        return modal
    }

}