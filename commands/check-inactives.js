const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const { sendDone } =  require('../utils/message')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName("check-inactives")
        .setDescription("Renvoie une liste des membres sans point et présents depuis au moins un mois")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

        return data
    },

    async execute(inter) {
        let message = "\n"

        const today = new Date()
        const limit = today.setDate(today.getDate() - 32)

        const memberUtil = require('../utils/member')
        const noPlumes = memberUtil.getAllNoPlumes()
        let n = 0
        for(m of noPlumes){
            date = m.joinDate

            let messageNumber = 1

            if(date <= limit){
                message += ("<@"+m.id+"> - Arrivée : **"+date+"**\n")
                n++

                if(n > messageNumber*32-1 || n == noPlumes.length){
                    const messageUtil = require("../utils/message")
                    const messageEmbed = messageUtil.newEmbed()
                    .setTitle("__**Liste des membres sans plume et présents depuis au moins un mois : **__" + n)
                    .setDescription(message)

                    if(messageNumber == 1){
                        await inter.reply({ embeds: [messageEmbed]})

                    }else{
                        await inter.channel.send({ embeds: [messageEmbed]})
                    }

                    messageNumber++
                    
                }

            }

        }
    
    }

}