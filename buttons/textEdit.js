const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: 'textEdit',
    async execute(inter){
        const textId = inter.customId.split('/')[1]
        const tUtils = require('../utils/text')
        const textAuthor = tUtils.getAuthorId(textId)

        const member = inter.member
        if(member.user.id == textAuthor){
            const {get} = require('../modals/textEdit')
            inter.showModal(get(textId, false))

        }else if(member.hasPermission('ADMINISTRATOR', true)){

        }else{
            inter.reply({content: 'bruh, t'es pas l'auteur, tu peux pas faire ca..', ephemeral: true})
            
        }

    },

    get(textId){
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(this.name+'/'+textId)
                .setLabel('Etit')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji(':gear:')

        )

        return button
    }

}