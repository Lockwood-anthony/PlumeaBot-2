const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { interSuccess } =  require('../utils/message')

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

        interSuccess(inter)

        let i =  0
        let C =  setInterval(function() {    
            let o =  0

            let COUNT =  setInterval(function() {    
                client.channels.fetch(channel)
                .then(c => {
                    let n = c.name
                    c.setName(n+'⭐')
                    o++
                })

                if(o == 8){ 
                    client.channels.fetch(channel)
                    .then(c => {
                        c.setName(name)
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