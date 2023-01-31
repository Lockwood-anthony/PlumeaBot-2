const fs = require('node:fs')
const path = require('node:path')

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

			const buttonsPath = path.join(DIRNAME, 'buttons')
			const buttons = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'))

			for(b of buttons){
				b = require(path.join(buttonsPath, b))

				if(b.name == buttonId){
					b.execute(inter)
					return
				}
	
			}

		}else if(inter.isModalSubmit()){
			const modalId = inter.customId.split('/')[0]

			const modalsPath = path.join(DIRNAME, 'modals')
			const modals = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js'))

			for(m of modals){
				m = require(path.join(modalsPath, m))

				if(m.name == modalId){
					m.execute(inter)
					return
				}
	
			}

		}
		
	}

}