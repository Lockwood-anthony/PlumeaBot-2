const { SlashCommandBuilder } = require('discord.js')
const mes =  require('../utils/message')
const t = require("../utils/text")
const { config } =  require("../config")

module.exports = {
    data(){
        return new SlashCommandBuilder()
            .setName('repost')
            .setDescription("Permet de reposter le fichier d'un de vos texte")
            .addAttachmentOption(option => option
                .setName("fichier")
                .setDescription("Votre texte sous format PDF")
                .setRequired(true))
            .addStringOption(option => option
                .setName("uuid")
                .setDescription("L'UUID de votre texte, ex : uuid4gr4s444a4daz4scsss4ds4")
                .setRequired(true))

    },

    async execute(inter) {
        const uuid = inter.options.getString("uuid")

        if(t.exist(uuid)){
            const mId = inter.member.id

            if(await t.getAuthorId(uuid) === mId){
                let file = inter.options.getAttachment("fichier")

                if(mes.checkExtension(file, "pdf")){
                    const mes1Id = t.getMes1Id(uuid)
                    await mes.editMes(config.channels.text, mes1Id, {files: [file]})

                    await mes.interSuccess(inter)

                }else{
                    await mes.interError(inter, "Ce fichier n'est pas un .pdf")

                }

            }else{
                await mes.interError(inter, "Ce n'est pas ton texte !")

            }

        }else{
            await mes.interError(inter, "Cette UUID n'existe pas !")

        }

    }

}