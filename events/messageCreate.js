const { config } = require('../config')
const { getBumpDate, setBumpDate } = require('../utils/somes')

module.exports = {
	name: 'messageCreate',

	async execute(message) {
        const channelId = message.channel.id
        const author = message.author
        const id = author.id

        if (!author.bot){
            const content = message.content

            //message.react(':champagne_glass:') //pour noel
            const r = Math.floor(Math.random() * (64 + 1))
            if(r === 64) await message.react(config.emotes.love)

            const triggersJson = config.messageReplies
            const triggers = new Map(Object.entries(triggersJson))
            triggers.forEach((reply,trigger)=>{
                if (content.includes(trigger)) {
                    message.reply(reply)
                }
            })

            switch(channelId){

                case config.channels.text:
                    message.delete()
                    await author.send('Utilise la commande /post pour partager ton texte owo')

                break

                case config.channels.general:
                    const today = new Date()
                    const recall = getBumpDate()
    
                    if(today > recall){
                        message.reply('***Bumpy ! :3***')
                        today.setFullYear(today.getFullYear()+66)
                        await setBumpDate(today)
    
                    }
                break

            }

            const power = message.member.roles.cache.map(r => `${r}`).length
            if (power === 1){
                if (message.attachments.size === 0 && !message.content.includes('http')) return
                message.delete()
                await author.send('__**Impossible d~envoyer ce message :**__```md\n#Tu ne peux poster ni lien, ni fichier, ni gif sans n~avoir jamais gagné de plumes :D```')
            }

        }else{
            
            //messages disboard
            if(id === 302050872383242240){
                const embeds = message.embeds

                embeds.forEach(embed =>{

                    if(embed.data.description.includes('Bump effectué !')){
                        const recall = new Date()
                        recall.setHours(('0' + (recall.getHours() + 2)).slice(-2))
                        recall.setMinutes(('0' + (recall.getMinutes() + 30)).slice(-2))
        
                        setBumpDate(recall)
                    }

                })

            }

        }
		
	}

}