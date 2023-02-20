const fs = require('node:fs')
const path = require('node:path')
const mes = require("../utils/message")

module.exports = {
	name: 'interactionCreate',
	once: false,

	async execute(inter) {

		try{

			if (inter.isChatInputCommand()){
				const command = inter.client.commands.get(inter.commandName)
				command.execute(inter)

			}else if(inter.isButton()){
				this.interactionsManager(inter, "buttons")
				//is ephemeral
				if(inter.message.flags.bitfield === 64){}

			}else if(inter.isModalSubmit()){
				this.interactionsManager(inter, "modals")

			}else if(inter.isStringSelectMenu() || inter.isChannelSelectMenu() || inter.isMentionableSelectMenu() || inter.isRoleSelectMenu() || inter.isUserSelectMenu()){
				this.interactionsManager(inter, "selectMenus")

			}

		}catch(e){
			console.log(e)
			const mes = require("../utils/message")
			await mes.interError(inter, e, 1)

		}
		
	},

	interactionsManager(inter, type){
		const id = inter.customId.split('/')[0]

		const itemsPath = path.join(DIRNAME, type)
		const items = fs.readdirSync(itemsPath).filter(file => file.endsWith('.js'))

		for(let i of items){
			i = require(path.join(itemsPath, i))

			if(i.name === id){
				i.execute(inter)
				return
			}

		}

	}

}