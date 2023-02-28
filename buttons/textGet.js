const { ButtonBuilder, ActionRowBuilder } = require('discord.js')
const mes = require("../utils/message")
const tUtils = require("../utils/text")
const rUtils = require("../utils/textRequests")
const m = require("../utils/member")

module.exports = {
    name: 'textGet',

    async execute(inter){
        const textId = inter.customId.split('/')[1]
        const userId =  inter.customId.split('/')[2]

        const member = inter.member

        if(userId === '0'){
            await send(member)

        }else{

            if(userId === member.id){
                const sent = await send(await inter.guild.members.fetch(userId))
                if(sent){
                    await inter.message.delete()
                    await rUtils.setOut(userId, textId)
                }

            }else{
                await mes.interSuccess(inter, "Non, tu n'es pas <@" + member.id + ">")

            }

        }

        async function send(mem){

            if(! await m.exists(userId)){
                const sent = await tUtils.sendFile(textId, mem)

                if(sent){
                    await mes.interSuccess(inter)
                    return true
                }else{
                    await mes.interError(
                        inter,
                        "Oups ! Tes messages privés sont fermés par défauts. Nous te recommandons de les ouvrir **uniquement** sur Pluméa afin de recevoir les textes demandés *(pas d'inquiètude, nous ne te spammerons pas...)*.\n" +
                        "> Clic droit sur Pluméa > [Paramètres de confidentialité] > [Messages privés]\n",
                        0,
                        false,
                        "https://cdn.discordapp.com/attachments/1075907880055742494/1077992029956608050/plumea_demo.gif")
                    return false
                }

            }else{
                await mes.interError(
                    inter,
                    "Tu n'est pas inscrit comme membre de Pluméa"),
                    1
                return false

            }

        }

    },

    get(textId, userId = 0, row = false){
        const button = new ButtonBuilder()
            .setCustomId(this.name + '/' + textId + '/' + userId)
            .setLabel('Lire')
            .setStyle('Success')

        if(row){
            return new ActionRowBuilder()
                .setComponents(button)
        }
        return button


    }

}