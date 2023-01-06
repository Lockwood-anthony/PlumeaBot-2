const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const editJsonFile = require("edit-json-file")
const dataConfig = editJsonFile("DATA_CONFIG.json")

module.exports = {
    name: "tournamentRole",
    async execute(interaction){
        const member = interaction.member
        const tournamentRole = dataConfig.get("rolesId.tournament")

        if(member.roles.cache.has(tournamentRole)){
            await member.roles.remove(tournamentRole)
            await interaction.reply({content:"Okay... ;-;",ephemeral:true})

        }else{
            await member.roles.add(tournamentRole)
            await interaction.reply({
                content: `Vous avez désormais accès aux salons <#${dataConfig.get("channels.tournamentRules")}> et <#${dataConfig.get("channels.monthlyNovel")}>`,
                ephemeral: true})

        }

    },

    get(){
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(this.name)
                .setStyle(ButtonStyle.Danger)
                .setEmoji("<:Scriptuplume:1027094890099781673>")
                
        )

        return button
    }

}