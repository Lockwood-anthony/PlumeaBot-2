const { ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    name: 'textNickConfirm',
    async execute(interaction){
        const id = interaction.member.user.id
        const nick = interaction.fields.getTextInputValue('nick')
        
        const mUtils = require('../utils/member')
        realNick = mUtils.getNick(id).slice(0, 6)

        if(nick == realNick){
            mUtils.setNick(id, realNick)
            const textTitle = require('../modals/textTitle')
            await interaction.showModal(textTitle.get())

        }else{
            mUtils.setNick(id, '')
            await interaction.reply({content: "Vous vous êtes trompés..", ephemeral: true})
            mUtils.removeFileInPosting(id)
        }

    },

    get(){
        const modal = new ModalBuilder()
        .setCustomId(this.name)
        .setTitle("Saisis ici ton pseudo, il sera le tient ici-bas jusqu'au restant de tes jours !")

        const nick = new TextInputBuilder()
        .setCustomId('nick')
        .setLabel("Confirme ton pseudo :")
        .setMinLength(4)
        .setMaxLength(4)
        .setStyle(TextInputStyle.Short)
        .setRequired(true)

        const firstActionRow = new ActionRowBuilder().addComponents(nick)
        modal.addComponents(firstActionRow)

        return modal
    }

}