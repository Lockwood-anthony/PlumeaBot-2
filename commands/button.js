const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { sendDone } =  require('../utils/message')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName("button")
        .setDescription("Create a button")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

        const buttonsPath = path.join(__dirname, 'buttons')
        const buttons = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'))

        let choices = []
        for(b of buttons){
            let choice = { name: "", value: "" }
            choice.name = b.name
            choice.value = b.name
            choices.push()
        }

        data.addStringOption(option =>
            option.setName("name")
                .setDescription("Button's name")
                .addChoices(choices)
                .setRequired(true))

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