const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { cmdSuccess } =  require('../utils/message')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName('light')
        .setDescription('be light')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)

        return data
    },

    execute(inter) {
        const name = inter.channel.name
        const channel =  inter.channel.id

        cmdSuccess(inter)

        let i =  0
        let C =  setInterval(function() {    
            let o =  0

            let COUNT =  setInterval(function() {    
                client.channels.fetch(channel)
                .then(c => {
                    console.log(c.name)
                    let n = c.name
                    c.setName(n+'⭐')
                    o++
                })

                if(o == 8){ 
                    client.channels.fetch(channel)
                    .then(c => {
                        c.setName(name)
                        console.log('reset')
                        i++
                        clearInterval(COUNT) 
                    })

                }

            }, 1000)

            if(i == 8){ 
                clearInterval(C) 
            }

        }, 10000)

    }

}