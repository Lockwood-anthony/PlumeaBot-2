const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { cmdSuccess, cmdError } =  require('../utils/message')

module.exports = {
	ERROR: [
		{id: 'ALL', desc: 'Les publications sur ce serveur sont soumises à des consignes. Elles peuvent être complexes à première vue, mais pas de panique ! Si vous avez besoin d'assistance, n'hésitez pas à solliciter le staff.'},
		{id: 'MAUVAISE_SERIE', desc: 'Le dt_titre n'est pas similaire à la série dont il appartient.'},
		{id: 'BIENSCEANCE', desc: 'Ton texte enfreint les règles de la communauté.'},
		{id: 'COPYRIGHT', desc: 'Ton texte est une fanfiction. Il contient un matériel source étranger au serveur, copyrighté et non original, et donc par conséquent ne peut pas être commenté par tous. Désolé!'},
		{id: 'MAUVAIS_AUTEUR', desc: 'Ton texte porte le dt_auteur d'un autre membre'},
		{id: 'FANFICTION', desc: 'Ton texte est une fanfiction. Compte tenu que tout le monde n'a pas accès au matériaux de base sur lequel se base ton histoire. Ton texte a été retiré, désolé!'},
		{id: 'NON_FONCTION', desc: 'Ton texte n'est pas de la fiction. Nous n'acceptons pas les essais ou biographies car ils sont par essences difficilement critiquables. Ton texte a été retiré, désolé!'},
	],

	data(){
		let data = new SlashCommandBuilder()
		.setName('errpub')
		.setDescription('Ensemble des Commandes relatives aux erreurs de Publication')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addUserOption(option => option
			.setName('target')
			.setDescription('Target')
			.setRequired(true))
	
		let choices = []
		for(e of this.ERROR){
			choices.push( { name: e.id, value: e.id } )
		}
	
		
		for(let i = 0 ; i < this.ERROR.length-1 ; i++){
			required = i==0
			data.addStringOption(option => {
				option.setName('id'+i)
				.setDescription('errpub id')
				.setRequired(required)
			
				for(i = 0 ; i < choices.length ; i++){
					option.addChoices(choices[i])
				}
				return option
	
			})
	
		}
	
		return data
			
	},

	async execute(inter) {
		var target = inter.options.getUser('target')
		var id0 = inter.options.getString('id0')
		var ids = [id0]

		for(let i = 1 ; i < this.ERROR.length-1 ;){

			try {
				ids.push(inter.options.getString('id'+i))
			} catch (error) {
				break
			}

		}

		let message = '__**Erreur de publication ! Ton texte a été supprimé pour la raison suivante :**__```md\n'

		for(e of ERROR){
			if(ids.includes(e.id)){
				message += `#${e.desc}`
			}
		}

		message += '```Toutes nos consignes sont disponibles dans les messages épinglés du salon réservé aux posts :D'

		target.send(message).catch(async error => {
			await cmdError(inter, 'Cet utilisateur ne souhaite hélas pas recevoir mes messages ;-;')
			return
		})

		await cmdSuccess(inter)

	}

}