const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')

module.exports = {
    name: 'textNick',
    async execute(inter){
        const id = inter.member.user.id
        const nick = inter.fields.getTextInputValue('nick')
        
        if(/^[a-zA-Z()]+$/.test(nick)){
            const mUtils = require('../utils/member')
            mUtils.setNick(id, nick+0)
    
            const confirm = require('../modals/textNickConfirm')
            await inter.showModal(confirm.get()) 

        }else{
            await inter.reply({content: 'Seuls les caractères alphabétiques sont autorisés', ephemeral: true})
            mUtils.removeFileInPosting(id)
        }

    },

    get(){
        const modal = new ModalBuilder()
        .setCustomId(this.name)
        .setTitle('Saisis ici ton pseudo !')

        const nick = new TextInputBuilder()
        .setCustomId('nick')
        .setLabel('Entre ton pseudo :')
        .setMinLength(4)
        .setMaxLength(4)
        .setStyle(TextInputStyle.Short)
        .setRequired(true)

        const firstActionRow = new ActionRowBuilder().addComponents(nick)
        modal.addComponents(firstActionRow)

        return modal
    }

}