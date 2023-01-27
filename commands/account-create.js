const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const m =  require('../utils/member')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName('account-create')
        .setDescription('Crée un compte pour un utilisateur')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option => option
            .setName('user')
            .setDescription('Utilisateur')
            .setRequired(true))

        return data
    }, 

	execute(inter) {
        const user = inter.options.getUser('user')

        m.addMember(user.id)

        require('../utils/message').cmdSuccess(inter)

	}

}