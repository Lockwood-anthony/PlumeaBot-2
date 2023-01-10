const { SlashCommandBuilder } = require('discord.js')
const { cmdSuccess, newEmbed } =  require('../utils/message')
const { getOne } = require('../utils/member')

module.exports = {
	data(){
		let data = new SlashCommandBuilder()
		.setName('profil')
		.setDescription('Profil d'un scripturien')
		.addUserOption(option => option
			.setName('user')
			.setDescription('Scripturien')
			.setRequired(true))

		return data

	},

	async execute(inter) {
		const user = inter.options.getUser('user')
		const id = user.id

		const m = getOne(id)

		message = '**Profil de : <@'+user.id+'>**\n\n'
		message += 'Nick : *'+m.nick+'*\n'
		message += 'Arrivée : *'+m.joinDate+'*\n'
		message += 'Plumes : *'+m.plumes+'*\n'
		message += 'Coins : *'+m.coins+'*\n'
		message += 'MotsHebdo : *'+m.weeklyWords+'*\n\n'

		const textsUUIDs = m.textsUUIDs
		if(textsUUIDs){
			message += 'Textes : \n'
			for(t in m.textsUUIDs){
				message += `- ${t} \n`
			}

		}

        newEmbed().setDescription(message)
		await cmdSuccess(inter, { embeds: [messageEmbed]})

	}

}