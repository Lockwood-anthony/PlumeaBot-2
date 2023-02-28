const { SlashCommandBuilder } = require('discord.js')
const mes =  require('../utils/message')
const { config } =  require("../config")
const pdf = require("../utils/pdf")

module.exports = {
    data(){
        return new SlashCommandBuilder()
            .setName('repost')
            .setDescription("Permet de reposter le fichier d'un de vos texte")
            .addStringOption(option => option
                .setName("dt")
                .setDescription("Le dt du texte, ex : LGUIDE002-000ASRA")
                .setMinLength(17)
                .setMaxLength(17)
                .setRequired(true))
            .addAttachmentOption(option => option
                .setName("fichier")
                .setDescription("Votre texte sous format PDF")
                .setRequired(true))

    },

    async execute(inter) {
        const dt = inter.options.getString("dt")
        const file = inter.options.getAttachment("fichier")
        const id = inter.member.id

        const fileId = await T_TAB.findOne({ where: { authorId: id, dt: dt }, attributes: ['fileMesId'], raw: true })

        if(fileId){

            if(pdf.checkExtension(file, "pdf")){
                pdf.rename(file, dt)
                await mes.editMes(config.channels.safe, fileId.fileMesId, { files: [file] })

                await mes.interSuccess(inter)

            }else{
                await mes.interError(inter, "Ce fichier n'est pas un .pdf")

            }

        }else{
            await mes.interError(inter, "Ce dt n'existe pas !")

        }

    }

}