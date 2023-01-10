const { SlashCommandBuilder } = require('discord.js')
const { sendDone } =  require('../utils/message')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName('membercount')
        .setDescription('Donne le nombre de membres (bot exclu)')

        return data

    },

    async execute(interaction) {
        let count = interaction.guild.memberCount
        count -= interaction.guild.members.cache.filter(m => m.user.bot).size

        await interaction.reply("**Aujourd'hui Scriptura compte ||   " + count  + "   || âmes ! :D**")
    
    }
    
}