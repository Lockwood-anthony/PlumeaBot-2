const { SlashCommandBuilder } = require("discord.js")

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName("txtsearch")
        .setDescription("Chercher un texte dans un channel")
        .addStringOption(option => option
            .setName("dt")
            .setDescription("Déterminant du texte à rechercher")
            .setRequired(true))

        return data
    },

	async execute(interaction) {
        let dt = interaction.options.getString("dt");
        let channel = interaction.channel;

        await interaction.reply({ content: "Action accomplie avec succès ! :D", ephemeral: true });
	}

}