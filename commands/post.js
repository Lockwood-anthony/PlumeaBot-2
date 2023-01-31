const { SlashCommandBuilder } = require('discord.js')
const mes =  require('../utils/message')
const m = require('../utils/member')

module.exports = {
	data(){
        return new SlashCommandBuilder()
        .setName('post')
        .setDescription('Permet de poster votre texte')
        .addAttachmentOption(option => option
            .setName("fichier")
            .setDescription("Votre texte sous format PDF")
            .setRequired(true))

    },

    async execute(inter) {
        let file = inter.options.getAttachment("fichier")
        const user = inter.member.user
        const id = user.id

        if(!await m.getPlumes(id) <= 0){

            if(mes.checkExtension(file, "pdf")){

                if(await m.isFileInPosting(id)){

                    try{
                        await m.deleteFileInPostingMessage(id)
                    }catch (e) {}

                }
                await m.addFileInPosting(user, file)

                if(await m.hasNick(id)){
                    const modal = require('../modals/textTitle').get()
                    await mes.interSuccess(inter, '', modal)

                }else{
                    const modal = require('../modals/textNick').get()
                    await mes.interSuccess(inter, '', modal)

                }

            }else{
                await mes.interError(inter, "Ce n'est pas un pdf que tu me donnes là... Pour convertir ton fichier en pdf tu peux aller sur ce site et regarder dans le menu **convertir en pdf** https://www.ilovepdf.com/fr")

            }

        }else{
            await mes.interError(inter, 'Avant de poster un texte, donne au moins un avis et attend de recevoir une plume ;)')

        }

    }

}