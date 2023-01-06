module.exports = {

    newEmbed(){
        const { EmbedBuilder } = require('discord.js');

        const messageEmbed = new EmbedBuilder()
        .setColor(0x2C2F33)
        .setTimestamp()
        .setFooter({ text: 'scriptubot', iconURL: 'https://i.imgur.com/TYeapMy.png' });
        return messageEmbed
    },

    getOneFormatted(message){
        const attached = message.attachments
		const content = message.content
		const embeds = message.embeds

        let mes = "<#"+message.channel.id+">  "
		mes += "<@"+message.author.id+">\n\n"

		if(content != null){
			mes += content
		}
	
		attached.forEach(attach => {	
			isAttached = true
			mes += attach.url + "\n\n"
		})

        return {content:mes,embeds:embeds}

    },

    log(message, type){
        const editJsonFile = require("edit-json-file")
        const dataConfig = editJsonFile(DATA_CONFIG)

        client.channels.fetch(dataConfig.get("channels."+type))
		.then(channel => channel.send(this.getOneFormatted(message)))
		.catch(console.error)
    },

    getChannelId(name){
        const editJsonFile = require("edit-json-file")
        const dataConfig = editJsonFile(DATA_CONFIG)
        return dataConfig.get(`channels.${name}`)
    },

    sendOne(cName, mes){
        const cId = this.getChannelId(cName)

        client.channels.fetch(cId)

        .then(channel => 
            message = channel.send(mes)

            .then(m => {
                return m.id

            }).catch(console.error)

        ).catch(console.error)

    },

    deleteOne(cName, mesId){
        const cId = this.getChannelId(cName)

        client.channels.fetch(cId)
        .then(channel => 
            channel.messages.fetch(mesId)
            
            .then(mes => {
                mes.delete()

            })

            .catch(console.error)

        ).catch(console.error)

    },

    getOne(cName, mesId){
        const cId = this.getChannelId(cName)

        client.channels.fetch(cId)
        .then(channel => 
            channel.messages.fetch(mesId)
            
            .then(mes => {
                return mes

            })

            .catch(console.error)

        ).catch(console.error)

    },

    editOne(cName, mesId, mes){
        this.getOne(cName, mesId).edit(mes)

    },

    sendDone(interaction){
        const mes = "Action accomplie avec succès ! :D\nhttps://tenor.com/view/mujikcboro-seriymujik-gif-24361533"
        interaction.reply({content: mes, ephemeral: true})

    },

    sendError(interaction, error){
        const { EmbedBuilder } = require('discord.js');

        const embed = new EmbedBuilder()
        .setColor(0xF92F41)
        .setDescription(error)
        .setTimestamp()
        .setFooter({ text: 'error', iconURL: 'https://i.imgur.com/TYeapMy.png' });

        interaction.reply({embeds: [embed], ephemeral: true})

    }
    
}