const { SlashCommandBuilder } = require('discord.js')
const mes =  require('../utils/message')
const t = require("../utils/text")

module.exports = {
    data(){
        return new SlashCommandBuilder()
            .setName('unpost')
            .setDescription("Enlève un de vos textes, pas les avis")
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
                await t.delAllMessages(uuid)

            }else{
                await mes.interError(inter, "Ce n'est pas ton texte !")

            }

        }else{
            await mes.interError(inter, "Cette UUID n'existe pas !")

        }

    }

}