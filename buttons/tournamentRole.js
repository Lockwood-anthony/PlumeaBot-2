const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { config } = require('../config')

module.exports = {
    name: 'tournamentRole',
    async execute(inter){
        const member = inter.member
        const tournamentRole = config.roles.tournament

        if(member.roles.cache.has(tournamentRole)){
            await member.roles.remove(tournamentRole)
            await inter.reply({content:'Okay... ;-;',ephemeral:true})

        }else{
            await member.roles.add(tournamentRole)
            await inter.reply({
                content: `Vous avez désormais accès aux salons <#${config.channels.tournamentRules}> et <#${config.channels.monthlyNovel}>`,
                ephemeral: true})

        }

    },

    get(){
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(this.name)
                .setStyle(ButtonStyle.Danger)
                .setEmoji(config.emotes.plume)
                
        )

        return button
    }

}