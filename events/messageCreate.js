const { config } = require('../config')
const { getBumpDate, setBumpDate } = require('../utils/somes')
const m = require('../utils/member')

module.exports = {
	name: 'messageCreate',

	execute(message) {
        const messageUtils = require('../utils/message')
        const channelName = message.channel.name
        const channelId = message.channel.id
        const author = message.author
        const id = author.id

        if (!author.bot){
            const content = message.content

            //message.react(':champagne_glass:') //pour noel
            const r = Math.floor(Math.random() * (64 + 1))
            if(r == 64) message.react(config.emotes.love)

            const triggersJson = config.messageReplies
            const triggers = new Map(Object.entries(triggersJson))
            triggers.forEach((reply,trigger)=>{
                if (content.includes(trigger)) {
                    message.reply(reply)
                }
            })

            switch(channelId){

                case config.channels.text:
                    const attach = message.attachments

                    if(!m.getPlumes(id) <= 0){

                        if(attach){
                            m.addFileInPosting(id, attach.first())
                            message.delete()

                            if(m.hasNick(id)){
                                const modal = require('../modals/textTitle').get()
                                message.showModal(modal)
    
                            }else{
                                const modal = require('../modals/textNick').get()
                                message.showModal(modal) 
    
                            }
                            
                        }else{
                            message.delete()
                            author.send('Ton message ne contient pas le fichier de ton texte !')

                        }

                    }else{
                        message.delete()
                        author.send('Avant de poster un texte, donne au moins un avis et attend de recevoir une plume ;)')

                    }

                break

                case config.channels.general:
                    const today = new Date()
                    const recall = getBumpDate()
    
                    if(today > recall){
                        message.reply('***Bumpy ! :3***')
                        today.setFullYear(today.getFullYear()+66)
                        setBumpDate(today)
    
                    }
                break

            }
                        
            const power = message.member.roles.cache.map(r => `${r}`).length
            if (power == 1){
                if (message.attachments.size == 0 && !message.content.includes('http')) return
                message.delete()
                author.send('__**Impossible d~envoyer ce message :**__```md\n#Tu ne peux poster ni lien, ni fichier, ni gif sans n~avoir jamais gagné de plumes :D```')
            }

        }else{
            //messages de bibot
            if(id == 1018969464739467317){

                if(!config.channels.nologs.includes(channelName) && message.flags.bitfield != 64){ //!= 64 => n'est pas un ephemeral
                     messageUtils.log(message,'logs')
                }

            }
            
            //messages disboard
            if(id == 302050872383242240){
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