const { SlashCommandBuilder } = require('discord.js')
const mes = require("../utils/message")

module.exports = {
	data(){
        return new SlashCommandBuilder()
            .setName('membercount')
            .setDescription('Donne le nombre de membres (bot exclu)')

    },

    async execute(inter) {
        let count = inter.guild.memberCount
        count -= inter.guild.members.cache.filter(m => m.user.bot).size

        await mes.interSuccess(inter, '**Aujourdhui Plumea compte ||   ' + count  + '   || âmes ! :D**')

    }
    
}