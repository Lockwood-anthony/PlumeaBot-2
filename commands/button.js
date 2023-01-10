const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { cmdSuccess, cmdError } =  require('../utils/message')

const path = require('node:path')
const fs = require('node:fs')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName('button')
        .setDescription('Create a button')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

        const buttonsPath = path.join(DIRNAME, 'buttons')
        const buttonsFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'))

        //CE NEST PAS UN ARRAY, c'est une suite d'élément json, et je ne sais pas comment une telle suite, dou la suite un peu laborieuse
        let choices = []
        for(b of buttonsFiles){
            const bPath = path.join(buttonsPath, b)
            b = require(bPath)

            const choice = { name: b.name, value: b.name }
            choices.push(choice)
        }

        data.addStringOption(option => {
            option.setName('name')
                .setDescription('Button's name')
                .setRequired(true)

            for(let i = 0 ; i < choices.length ; i++) {
                option.addChoices(choices[i])
            }

            return option
        
        })

        return data
    }, 

	execute(inter) {
        const value = inter.options.getString('name')

        const buttonsPath = path.join(__dirname, 'buttons')
        const buttons = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'))

        let button
        for(b of buttons){

            if(b.name == value){
                button = b
                break
            }

        }
        try{
            inter.channel.send({components: [button.get()]})
        
            cmdSuccess(inter)

        }catch(Error){
            cmdError(inter, 'Impossible de créer ce bouton manuellement')

        }

	}

}