const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { sendDone } =  require('../utils/message')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName("fast-nick")
        .setDescription("rename user")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
        .addUserOption(option => option
            .setName("user")
            .setDescription("user to rename")
            .setRequired(true))
        .addStringOption(option => option
            .setName("nick")
            .setDescription("new nick")
            .setRequired(true))

        return data

    },

	async execute(interaction) {
        const member = interaction.options.getMember("user")
        const nick = interaction.options.getString("nick")
        const owner = await interaction.guild.fetchOwner()

        if(member != owner){
            member.setNickname(nick)
            await interaction.reply({content:DONE,ephemeral:true})

        }else{
            await interaction.reply({content:"On ne peut changer le pseudo du owner",ephemeral:true})

        }

	}

}