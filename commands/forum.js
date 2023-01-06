const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { sendDone } =  require('../utils/message')

module.exports = {
	datat(){
    let data = new SlashCommandBuilder()
        .setName("forum")
        .setDescription("rename user")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)

    return data

    },
    
	async execute(interaction) {

        client.channels.fetch("1028005940504572025")
        .then(channel => 
            console.log(channel.name)

        ).catch(console.error)

        interaction.reply("FORUM")

	}

}