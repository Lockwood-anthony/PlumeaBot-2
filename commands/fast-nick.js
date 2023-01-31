const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const mes =  require('../utils/message')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName('fast-nick')
        .setDescription('rename user')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
        .addUserOption(option => option
            .setName('user')
            .setDescription('user to rename')
            .setRequired(true))
        .addStringOption(option => option
            .setName('nick')
            .setDescription('new nick')
            .setRequired(true))

        return data

    },

	async execute(inter) {
        const member = inter.options.getMember('user')
        const nick = inter.options.getString('nick')
        const owner = await inter.guild.fetchOwner()

        if(member != owner){
            member.setNickname(nick)
            await mes.interSuccess(inter)

        }else{
            await mes.interError(inter, 'On ne peut changer le pseudo du owner')

        }

	}

}