const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName('membercount')
        .setDescription('Donne le nombre de membres (bot exclu)')

        return data

    },

    execute(inter) {
        let count = inter.guild.memberCount
        count -= inter.guild.members.cache.filter(m => m.user.bot).size

        require('../utils/message').
        interSuccess(inter, '**Aujourdhui Plumea compte ||   ' + count  + '   || âmes ! :D**')

    }
    
}