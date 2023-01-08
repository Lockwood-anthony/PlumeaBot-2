const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { sendDone } =  require('../utils/message')
const path = require('node:path')
const fs = require('node:fs')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName("button")
        .setDescription("Create a button")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

        const buttonsPath = path.join(DIRNAME, 'buttons')
        const buttonsFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'))

        let choices = []
        for(b of buttonsFiles){
            const bPath = path.join(buttonsPath, b)
            b = require(bPath)

            const choice = { name: b.name, value: b.name }
            choices.push(choice)
        }

        data.addStringOption(option => {
            option.setName("name")
                .setDescription("Button's name")
                .setRequired(true)

            for(let i = 0 ; i < choices.length ; i++) {
                console.log(choices[i])
                option.addChoices(choices[i])
            }

            return option
        
        })

        return data
    }, 

	execute(interaction) {
        const value = interaction.options.getString("name")

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
            interaction.channel.send({components: [button.get()]})
        
            sendDone(interaction)

        }catch(Error){
            interaction.reply({ content: 'Impossible de créer ce bouton manuellement', ephemeral: true })

        }

	}

}