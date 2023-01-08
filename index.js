require('dotenv').config({path: __dirname + '/.env'})
//Faut créer un fichier .env dans le root du prijet et mettre les variables TOKEN, CLIENT_ID, GUILD_ID
const { Client, GatewayIntentBits } = require('discord.js')
const path = require('path')
const fs = require('fs')
global.DATA = "DATA.json"
global.DATA_CONFIG = "DATA_CONFIG.json"
global.DIRNAME = __dirname

global.client = new Client({
    intents: [
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ]
})

//DATABASE
const Sequelize = require('sequelize')
global.sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
})

//CommandHandler
require('./deploy-commands')

//EventHandler
const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file)
	const event = require(filePath)
    
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args))
		
	} else {
		client.on(event.name, (...args) => event.execute(...args))
	}
}

console.log("Bibot is ready ! ;3")

//start
start()

function start(){
    client.login(process.env.TOKEN)
    
    const sprint = require("./utils/sprint.js")

    if (sprint.isSprinting()){
        const time = sprint.getTime()

        if(time < 0){
            sprint.BEGIN()
        }else{
            sprint.GO()
        }

    }

}