const { config } = require('../config')

module.exports = {

    newEmbed(){
        const { EmbedBuilder } = require('discord.js')

        const messageEmbed = new EmbedBuilder()
        .setColor(0x2C2F33)
        .setTimestamp()
        .setFooter({ text: 'scriptubot', iconURL: 'https://i.imgur.com/TYeapMy.png' })
        return messageEmbed
    },

    getFormattedMes(message){
        const attached = message.attachments
		const content = message.content
		const embeds = message.embeds

        let mes = '<#'+message.channel.id+'>  '
		mes += '<@'+message.author.id+'>\n\n'

		if(content != null){
			mes += content
		}
	
		attached.forEach(attach => {	
			isAttached = true
			mes += attach.url + '\n\n'
		})

        return {content:mes,embeds:embeds}

    },

    log(message, type){

        client.channels.fetch(config.channels[type])
		.then(channel => channel.send(this.getFormattedMes(message)))
		.catch(console.error)
    },

    sendMes(cId, mes){

        client.channels.fetch(cId)

        .then(async channel => 
            message = await channel.send(mes)

            .then(m => {
                return m.id

            }).catch(console.error)

        ).catch(console.error)

    },

    delMes(cId, mesId){

        client.channels.fetch(cId)
        .then(channel => 
            channel.messages.fetch(mesId)
            
            .then(async mes => {
                await mes.delete()

            })

            .catch(console.error)

        ).catch(console.error)

    },

    getMes(cId, mesId){

        client.channels.fetch(cId)
        .then(channel => 
            channel.messages.fetch(mesId)
            
            .then(mes => {
                return mes

            })

            .catch(console.error)

        ).catch(console.error)

    },

    editMes(cId, mesId, mes){
        this.getMes(cId, mesId).edit(mes)

    },

    cmdSuccess(inter, reply){
        const mes = {content: 'Action accomplie avec succès ! :D\nhttps://tenor.com/view/mujikcboro-seriymujik-gif-24361533', ephemeral: true}
        if(reply) mes = reply
        
        inter.reply(mes)

        const embed = this.newEmbed()
        .setTitle(`${inter.commandName} | <@${inter.member.user.id}>`)
        .setDescription('success')

        this.sendMes(config.channels.logs, { embeds: [embed] })

    },

    cmdError(inter, error){
        if(!error) error = 'Une erreur est survenue, veuillez appeler mon popa AstrantV#1053'
        inter.reply(error)

        const embed = this.newEmbed()
        .setTitle(`${inter.commandName} | <@${inter.member.user.id}>`)
        .setDescription(error)

        this.sendMes(config.channels.logs, { embeds: [embed] })

    }
    
}