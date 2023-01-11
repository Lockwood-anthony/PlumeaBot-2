module.exports = {
	name: 'interactionCreate',
	once: false,

	execute(inter) {

		if (inter.isChatInputCommand()){
			const command = inter.client.commands.get(inter.commandName)
			
			try {
				command.execute(inter)

			} catch (error) {
				console.error(error)
				inter.reply({ content: 'J~y arrive po ;-; Appelle mon papa Astrant', ephemeral: true })

			}

		}else if(inter.isButton()){
			const buttonId = inter.customId.split('/')[0]

			const buttonsPath = path.join(__dirname, 'buttons')
			const buttons = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'))

			for(b of buttons){

				if(b.name == buttonId){
					b.execute(inter)
					return
				}
	
			}

		}else if(inter.isModalSubmit()){
			const modalId = inter.customId.split('/')[0]

			const modalsPath = path.join(__dirname, 'modals')
			const modals = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js'))

			for(m of modals){
	
				if(m.name == modalId){
					m.execute(inter)
					return
				}
	
			}

		}
		
	}

}