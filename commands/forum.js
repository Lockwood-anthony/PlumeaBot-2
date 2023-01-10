const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const { sendDone } =  require('../utils/message')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName("forum")
        .setDescription("test pour création de post dans un forum")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)

        return data

    },
    
	async execute(inter) {
        inter.reply("FORUM")

	}

}