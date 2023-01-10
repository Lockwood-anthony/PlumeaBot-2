const { config } = require('../config')

module.exports = {
    async save(){
        const request = require(`request`)
        const fs = require(`fs`)
        
        await client.channels.fetch(config.channels.logs)
        .then(channel => 
            channel.messages.fetch(config.messages.data)
            .then(async m =>
                request.get(m.attachments.first().url)
                .on('error', console.error)
                .pipe(fs.createWriteStream('DATA.json')))  
        
            .catch(console.error)
        ).catch(console.error)
    },

    async upload(){

        client.channels.fetch(config.channels.logs)
        .then(channel => 
            channel.messages.fetch(config.messages.data)
            .then(async m =>
                await m.edit({content:'',
                    files: ['./DATA.json']
                })) 
        
            .catch(console.error)
        ).catch(console.error)

        client.channels.fetch(config.channels.logs)
        .then(async channel => 
            await channel.send({files: ['./DATA.json']})
            .catch(console.error)
        ).catch(console.error)
    }
    
}