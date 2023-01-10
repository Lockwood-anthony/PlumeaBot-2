const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { config } = require('../config')

module.exports = {
    name: "sprintRole",
    async execute(inter){
        const member = inter.member
        const sprintRole = config.roles.sprinter

        if(member.roles.cache.has(sprintRole)){
            await member.roles.remove(sprintRole)
            await inter.reply({content:"Tu n'es plus un sprinter à présent ! :3\nTu seras donc plus jamais mentionné ! Tous du moins pour les sprints...",ephemeral:true})

        }else{
            await member.roles.add(sprintRole)
            await inter.reply({content:"Tu es sprinter à présent ! :3\nTu seras donc mentionné à chaque sprint...",ephemeral:true})

        }

    },

    get(){
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(this.name)
                .setLabel(this.name)
                .setStyle(ButtonStyle.Primary)
        )

        return button
    }

}