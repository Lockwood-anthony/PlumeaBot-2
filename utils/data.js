const editJsonFile = require("edit-json-file")

module.exports = {
    async save(){
        const request = require(`request`)
        const fs = require(`fs`)
        const dataConfig = editJsonFile(DATA_CONFIG)
        
        await client.channels.fetch(dataConfig.get("channels.logs"))
        .then(channel => 
            channel.messages.fetch(dataConfig.get("messages.data"))
            .then(async m =>
                request.get(m.attachments.first().url)
                .on('error', console.error)
                .pipe(fs.createWriteStream('DATA.json')))  
        
            .catch(console.error)
        ).catch(console.error)
    },

    async upload(){
        const editJsonFile = require("edit-json-file")
        const dataConfig = editJsonFile(DATA_CONFIG);

        client.channels.fetch(dataConfig.get("channels.logs"))
        .then(channel => 
            channel.messages.fetch(dataConfig.get("messages.data"))
            .then(async m =>
                await m.edit({content:"",
                    files: ["./DATA.json"]
                })) 
        
            .catch(console.error)
        ).catch(console.error)

        client.channels.fetch(dataConfig.get("channels.logs"))
        .then(async channel => 
            await channel.send({files: ["./DATA.json"]})
            .catch(console.error)
        ).catch(console.error)
    }
    
}