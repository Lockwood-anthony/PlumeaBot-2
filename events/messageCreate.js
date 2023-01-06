const { InteractionCollector } = require("discord.js")

module.exports = {
	name: 'messageCreate',
	async execute(message) {
        const editJsonFile = require("edit-json-file")
        const dataUtils = require("../utils/data.js")
        const messageUtils = require("../utils/message")
        const dataConfig = editJsonFile(DATA_CONFIG)
        const data = editJsonFile(DATA)
        const channelName = message.channel.name
        const channelId = message.channel.id
        const id = message.author.id

        if (!message.author.bot){
            const content = message.content
            const roles = message.member.roles.cache.map(r => `${r}`).length

            //message.react(":champagne_glass:")

            /*
            if(userId == 865929450109009941){
                let rand = Math.floor(Math.random() * 38) //para choosed 38 ^^

                if (rand == 32){
                    await message.delete()
                    await message.author.send("**Bravo ! Tu avais 1 chance sur 38 de faire 32 ^^\n et Souviens-toi, il ne faut pas oublier :3**```"+message.content+"```")

                }

            }
            */

            const triggersJson = dataConfig.get("messageReplies")
            const triggers = new Map(Object.entries(triggersJson))
            triggers.forEach((reply,trigger)=>{
                if (content.includes(trigger)) {
                    message.reply(reply)
                }
            })

            switch(channelId){
                case dataConfig.get("channels.text"):
                    const attach = message.attachments
                    const mUtils = require('../utils/member')

                    if(!mUtils.getPlumes <= 0){

                        if(attach.length() == 1){
                            mUtils.addFileInPosting(id, attach.first())
                            message.delete()

                            if(mUtils.hasNick(id)){
                                const textTitle = require('../modals/textTitle')
                                await interaction.showModal(textTitle.get()) 
    
                            }else{
                                const textNick = require('../modals/textNick')
                                await interaction.showModal(textNick.get()) 
    
                            }
                            
                        }else{
                            message.delete()
                            message.author.send("Ton message ne contient pas le fichier de ton texte !")

                        }

                    }else{
                        message.delete()
                        message.author.send("Avant de poster un texte, donne au moins un avis et attend de recevoir une plume ;)")

                    }

                break

                case dataConfig.get("channels.general"):
                    const today = new Date()
                    const recall = new Date(data.get("bump"))
    
                    if(today > recall){
                        await message.reply("***Bumpy ! :3***")
                        today.setFullYear(today.getFullYear()+66)
                        await data.set("bump", today.toString())
    
                        await data.save()
                        await dataUtils.upload()
                    }
                break

            }
                        
            if (roles == 1){
                if (message.attachments.size == 0 && !message.content.includes("http")) return
                message.delete()
                await message.author.send("__**Impossible d'envoyer ce message :**__```md\n#Tu ne peux poster ni lien, ni fichier, ni gif sans n'avoir jamais gagné de plumes :D```")
            }

        }else{

            if(id == 1018969464739467317){

                if(!dataConfig.get("channels.nologs").includes(channelName) && message.flags.bitfield != 64){
                    await messageUtils.log(message,"logs")
                }

            }

            if(id == 302050872383242240){
                const embeds = message.embeds

                embeds.forEach(embed =>{

                    if(embed.data.description.includes("Bump effectué !")){
                        const recall = new Date()
                        recall.setHours(("0" + (recall.getHours() + 2)).slice(-2))
                        recall.setMinutes(("0" + (recall.getMinutes() + 30)).slice(-2))
        
                        data.set("bump", recall.toString())
    
                        data.save()
                        dataUtils.upload()
                    }

                })

            }

        }
		
	}

}