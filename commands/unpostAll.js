const { SlashCommandBuilder, PermissionsBitField } = require('discord.js')
const mes =  require('../utils/message')
const t = require("../utils/text")
const m = require("../utils/member")

module.exports = {
    data(){
        return new SlashCommandBuilder()
            .setName('unpost-all')
            .setDescription("Enlève TOUS LES POSTS d'un utilisateur, pas les commentaire")
            .addUserOption(option => option
                .setName("user")
                .setDescription("L'utilisateur qui va perdre tout ses textes postés"))

    },

    async execute(inter) {
        const user = inter.user
        let userId = user.id

        try{
            userId = inter.options.getUser("user").id

            if(!user.permissions.has(PermissionsBitField.Administrator)){
                await mes.interError(inter, "Il faut être admin pour spécifier l'utilisateur ! Ne spécifie aucun paramètre pour que la commande agisse sur ton compte ;")

            }
        }catch(e){}

        const textsUUIDs = await m.getTextsUUIDs(userId)

        if(textsUUIDs.length !== 0){

            await textsUUIDs.forEach(async uuid => {
                await t.vanish(uuid)
            })

            await m.removeAllTextsUUIDs(userId)

            await mes.interSuccess(inter)

        }else{
            await mes.interError(inter, "Cet utilisateur n'a pas de texte !")

        }

    }

}