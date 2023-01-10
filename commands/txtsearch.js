const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName('txtsearch')
        .setDescription('Chercher le post d'un certains texte')
        .addStringOption(option => option
            .setName('uuid')
            .setDescription('uuid du texte')
            .setRequired(true))

        return data
    },

	async execute(inter) {
        await cmdSuccess(inter)
	}

}