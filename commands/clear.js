const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const { sendDone } =  require('../utils/message')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Atomise tout les messages du salon")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addIntegerOption(option => option
            .setMinValue(1)
            .setMaxValue(99)
            .setName("clear_intensity")
            .setDescription("Nombre de messages à effacer")
            .setRequired(true))

        return data
    },

	async execute(inter) {
        let n = inter.options.getInteger("clear_intensity")
        let channel = inter.channel
        
        await channel.messages.fetch({limit: n})
        .then(messages => channel.bulkDelete(messages))
		
        await inter.reply({ content: DONE, ephemeral: true })

	}
    
}