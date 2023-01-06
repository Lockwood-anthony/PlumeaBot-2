const { SlashCommandBuilder } = require("discord.js")
const { sendDone } =  require('../utils/message')

module.exports = {
	data: new SlashCommandBuilder()
	.setName("random")
    .setDescription("Donne un nombre au hasard")
    .addIntegerOption(option => option
        .setMinValue(1)
        .setMaxValue(100)
        .setName("faces")
		.setDescription("Nombre de faces du dé virtuel (1-100")
        .setRequired(true)),

	async execute(interaction) {
        let n = interaction.options.getInteger("faces")
        const r = Math.floor(Math.random() * (n + 1))

        await interaction.reply("Tu avais une chance sur " + n + ", et c'est un : ||     " + r + "     || !\n**^^**")

	}

}