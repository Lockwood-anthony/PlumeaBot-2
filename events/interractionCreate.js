const dataUtil = require("../utils/data.js")

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction) {
		const member = interaction.member

		if (interaction.isChatInputCommand()){
			const command = interaction.client.commands.get(interaction.commandName)
	
			if (!command) return
		
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error)
				await interaction.reply({ content: "J'y arrive po ;-; Appelle mon papa Asra", ephemeral: true })
			}

		}else if(interaction.isButton()){
			const buttonId = interaction.customId.split('/')[0]

			const buttonsPath = path.join(__dirname, 'buttons')
			const buttons = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'))

			for(b of buttons){

				if(b.name == buttonId){
					b.execute(interaction)
					return
				}
	
			}

		}else if(interaction.isModalSubmit()){
			const modalId = interaction.customId.split('/')[0]

			const modalsPath = path.join(__dirname, 'modals')
			const modals = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js'))

			for(m of modals){
	
				if(m.name == modalId){
					m.execute(interaction)
					return
				}
	
			}

		}
		
	}

}