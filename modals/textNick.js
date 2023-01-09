const { ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    name: 'textNick',
    async execute(interaction){
        const id = interaction.member.user.id
        const nick = interaction.fields.getTextInputValue('nick')
        
        if(/^[a-zA-Z()]+$/.test(nick)){
            const mUtils = require('../utils/member')
            mUtils.setNick(id, nick+0)
    
            const confirm = require('../modals/textNickConfirm')
            await interaction.showModal(confirm.get()) 

        }else{
            await interaction.reply({content: "Seuls les caractères alphabétiques sont autorisés", ephemeral: true})
            mUtils.removeFileInPosting(id)
        }

    },

    get(){
        const modal = new ModalBuilder()
        .setCustomId(this.name)
        .setTitle("Saisis ici ton pseudo, il sera le tient ici-bas jusqu'au restant de tes jours !")

        const nick = new TextInputBuilder()
        .setCustomId('nick')
        .setLabel("Entre ton pseudo :")
        .setMinLength(4)
        .setMaxLength(4)
        .setStyle(TextInputStyle.Short)
        .setRequired(true)

        const firstActionRow = new ActionRowBuilder().addComponents(nick)
        modal.addComponents(firstActionRow)

        return modal
    }

}