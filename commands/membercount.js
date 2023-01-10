const { SlashCommandBuilder } = require('discord.js')
const { sendDone } =  require('../utils/message')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName('membercount')
        .setDescription('Donne le nombre de membres (bot exclu)')

        return data

    },

    async execute(inter) {
        let count = inter.guild.memberCount
        count -= inter.guild.members.cache.filter(m => m.user.bot).size

        await inter.reply("**Aujourd'hui Scriptura compte ||   " + count  + "   || âmes ! :D**")
    
    }
    
}