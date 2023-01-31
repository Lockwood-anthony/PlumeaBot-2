const { config } = require('../config')
const path = require("path")

module.exports = {

    newEmbed(color = "00112B"){
        const { EmbedBuilder } = require('discord.js')

        const messageEmbed = new EmbedBuilder()
        .setColor("0x"+color)
        .setTimestamp()
        .setFooter({ text: 'scriptubot', iconURL: 'https://i.imgur.com/TYeapMy.png' })
        return messageEmbed
    },

    async delMessagesBeforeOne(channel, mesId, n, safe){
        let option = {}

        if(mesId != 0){
            option["before"] = mesId
        }

        while(n != 0){
            let fetch
            if(n > 100){
                option["limit"] = 100
                fetch = await channel.messages.fetch(option)

                try{
                    mesId = fetch.last().id

                }catch (e) {
                    return false
                }

                n -= 100

            }else{
                option["limit"] = n
                fetch = await channel.messages.fetch(option)
                n = 0

            }

            this.delBulkMessages(channel, fetch, safe)

        }

        return true

    },

    delBulkMessages(channel, messages, safe = false){
        if(safe){

            messages.forEach(m => {
                m.delete()

            })

        }else{
            channel.bulkDelete(messages, true)

        }

    },

    async logMes(mes, type = "Message"){
        const channel = mes.channel
        const author = mes.author
        const time = mes.createdAt
        const unixTime = parseInt((new Date(time).getTime() / 1000).toFixed(0))

        const embed = this.newEmbed()
            .setTitle(`${type} ↓↓↓`)
            .addFields(
                {name: "Channel", value: `${channel}`, inline: true},
                {name: "Author", value: `${author}`, inline: true},
                {name: "CreatedAt", value: `<t:${unixTime}>`, inline: true},
                )

        if(type === "Updated"){
            const url = mes.url
            embed.addFields({name: "Url", value: url, inline: true})
        }

        const content = mes.content
        const files = Array.from(mes.attachments.values())
        const embeds = Array.from(mes.attachments.values())
        const components = Array.from(mes.attachments.values())

        const sendMes = await this.sendMes(config.channels.delete, {embeds: [embed]})
        await sendMes.reply( {
            content: content,
            files: files,
            embeds: embeds,
            components: components
        })

    },

    async sendMes(cId, mes){
        const channel = await client.channels.fetch(cId)
        const m = await channel.send(mes)
        return await m

    },

    async delMes(cId, mesId){
        const channel = await client.channels.fetch(cId)
        let message
        try { message = await channel.messages.fetch(mesId) } catch {}

        if(message){
            message.delete({ timeout: 1000 })

        }else{
             console.log(__dirname+" l:117 delMes Message doesnt exist")
        }

    },

    async getMes(cId, mesId){
        const channel = await client.channels.fetch(cId)
        const message = await channel.messages.fetch(mesId)
        return message

    },

    async  editMes(cId, mesId, mes){
        const fetchMes = await this.getMes(cId, mesId)
        fetchMes.edit(mes)

    },

    chooseInterMessageTitle(inter){
        let title = { content: "", files: [] }

        if(inter.isChatInputCommand()){
            title.content = '/'+inter.commandName

            const options = inter.options
            options._hoistedOptions.forEach(o => {
                title.content += " `"+o.value+"`"

                if(o.type == 11){
                    title.files.push(o.attachment)
                }

            })

        }else if(inter.isButton()){
            title.content = '$'+inter.customId.split('/')[0]

        }else if(inter.isModalSubmit()){
            title.content = '%'+inter.customId.split('/')[0]

        }

        return title

    },

    isContent(reply){
        try {
            if(reply["content"]) return true
        }catch (e) {
            return false
        }

    },

    checkExtension(file, extensionDesired){
        const extension = path.extname(file.name)

        return extension === '.' + extensionDesired

    },

    async interSuccess(inter, reply = "", modal = null, components= []){

        if(!modal){

            if(this.isContent(reply)){
                await inter.reply(reply)

            }else{
                let desc = "Action accomplie avec succès ! :D"
                if(reply) desc = reply.toUpperCase()

                const embed = this.newEmbed()
                    .setDescription(`**${desc}**`)
                    .setImage("https://media.tenor.com/jHvyFefhKmcAAAAd/mujikcboro-seriymujik.gif")

                await inter.reply({ embeds: [embed], components: components, ephemeral: true })

            }

        }else{
            await inter.showModal(modal)

        }

        const title = this.chooseInterMessageTitle(inter)
        const embed = this.newEmbed("82BE00")
            .setTitle(title.content)
            .setDescription(`**Success** | ${inter.member.user} | <#${inter.channel.id}>`)

        await this.sendMes(config.channels.logs, {embeds: [embed], files: title.files})

    },

    async interError(inter, error, level = 0){
        if(!error) error = 'Une erreur est survenue, veuillez appeler mon popa AstrantV#1053'

        const embed = this.newEmbed()
            .setTitle("Error ;-;")
            .setDescription(`**${error}**`)

        await inter.reply({ embeds: [embed], ephemeral: true })

        const red = "D52B1E"
        const yellow = "FFB612"

        let color = yellow
        if (level === 1) color = red

        const title = this.chooseInterMessageTitle(inter)
        const embed2 = this.newEmbed(color)
            .setTitle(title.content)
            .setDescription(`**Error** | ${inter.member.user} | <#${inter.channel.id}>
                            \`\`\`${error}\`\`\``)

        await this.sendMes(config.channels.logs, { embeds: [embed2] })

    },
    
}