const { SlashCommandBuilder } = require('discord.js')
const mes =  require('../utils/message')
const m = require('../utils/member')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName('post')
        .setDescription('Permet de poster votre texte')
        .addAttachmentOption(option => option
            .setName("fichier")
            .setDescription("Votre texte sous format PDF")
            .setRequired(true))

        return data
    },  
        
    execute(inter) {
        let file = inter.options.getAttachment("fichier")
        const id = inter.member.user.id

        if(!m.getPlumes(id) <= 0){
            m.addFileInPosting(id, file)

            if(m.hasNick(id)){
                const modal = require('../modals/textTitle').get()
                inter.showModal(modal)

            }else{
                const modal = require('../modals/textNick').get()
                inter.showModal(modal) 

            }

        }else{
            mes.cmdError(inter, 'Avant de poster un texte, donne au moins un avis et attend de recevoir une plume ;)')
            return

        }

        mes.cmdSuccess(inter)
                
    }

}