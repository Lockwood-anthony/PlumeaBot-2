const { config } = require('../config')

module.exports = {
    isSprinting() {
        const data = editJsonFile(DATA)

        time = this.getTime()

        if(time == 0){
            return false
        }else{
            return true
        }

        const { config } = require('../config')
        config.channels.cya

    },

    getTime(){
        const data = editJsonFile(DATA)

        time = data.get('sprint.timer')

        return time
    },

    setMaxTime(s){
        const data = editJsonFile(DATA)
        data.set('sprint.maxTime',s)
        data.save()
    },

    getMaxTime(){
        const data = editJsonFile(DATA)
        return data.get('sprint.maxTime',s)
    },

    async setTime(s){
        const data = editJsonFile(DATA)
        await data.set('sprint.timer',s)
        await data.save()
    },

    async addTime(sec){
        const data = editJsonFile(DATA)

        time = this.getTime()
        await data.set('sprint.timer',time+sec)
        await data.save()
    },

    isSprinter(id){
        const sprinters = this.getSprinters()
        id = json.intToABC(id)

        if(sprinters.includes(id)){
            return true
        }else{
            return false
        }
    },

    getSprinters(){
        const data = editJsonFile(DATA)

        const sprinters = data.get('sprint.sprinters')

        return sprinters
    },

    async addSprinter(id, words){
        const data = editJsonFile(DATA)
        id = json.intToABC(id)

        const sprinters = data.get('sprint.sprinters')

        sprinters.push(id)

        await data.set('sprint.sprinters',sprinters)
        await data.set('sprint.'+id.toString(),words.toString())
        await data.save()
    },

    async removeSprinter(id){
        const data = editJsonFile(DATA)
        id = json.intToABC(id)

        const sprinters = data.get('sprint.sprinters')

        sprinters.filter(s => s == id)

        await data.set('sprint.sprinters',sprinters)
        await data.unset('sprint.'+id)
        await data.save()
    },

    async setMessage(id){
        const data = editJsonFile(DATA)

        await data.set('sprint.message',id.toString())
        await data.save()
    },

    isChannel(id){
        sprintChannel = config.channels.sprint

        if(sprintChannel == id){
            return true
        }else{
            return false
        }

    },




    async beginMessageEdit(){
        const data = editJsonFile(DATA)
        const message = require('./message.js')

        const sec = sprint.getTime()
        const sprintChannel = config.channels.sprint
        const id = data.get('sprint.message')

        let embed = message.newEmbed()
        .setTitle(('Le sprint commence dans   ' + sec.toString() + ' secondes   :D'))

        client.channels.fetch(sprintChannel)
        .then(channel => 
            channel.messages.fetch(id)
            .then(async m =>
                await m.edit({content:'',embeds:[embed],components: [await this.roleButton(), await this.joinButton()] }))      
            .catch(console.error)

        ).catch(console.error)

    },
    
    async goMessageEdit(){
        const data = editJsonFile(DATA)
        const message = require('./message.js')

        sprintChannel = config.channels.sprint
        id = data.get('sprint.message')

        description = ''

        const sec = sprint.getTime()
        const sprinters = this.getSprinters()

        sprinters.forEach(s => {
            description += '<@'+json.ABCtoInt(s)+'>\n'
        })

        embed = message.newEmbed()
        .setTitle(('__SPRINT !__       ' + sec.toString() + ' ' + sec.toString() + ' ' + sec.toString() + ' '))
        .setDescription(description)

        client.channels.fetch(sprintChannel)
        .then(channel => 
            channel.messages.fetch(id)
            .then(async m =>
                await m.edit({embeds:[embed],components: [this.roleButton(), await this.joinButton()]}))      
            .catch(console.error)

        ).catch(console.error)

    },

    endMessageSend(){
        const data = editJsonFile(DATA)

        const id = data.get('sprint.message')
        const channel = config.channels.sprint

        client.channels.fetch(channel)
        .then(channel =>{
            channel.messages.fetch(id)
            .then(m =>
                m.reply('**Le sprint est terminé ! :3**')

            ).catch(console.error)

            this.getSprinters().forEach(sprinterABC =>{
                sprinterId = json.ABCtoInt(sprinterABC)

                channel.send('<@'+sprinterId+'>')
            })

        }).catch(console.error)


    },

    endMessageEdit(){
        const data = editJsonFile(DATA)
        const message = require('./message.js')

        sprintChannel = config.channels.sprint
        id = data.get('sprint.message')

        embed = message.newEmbed()
        .setTitle(('LE SPRINT EST TERMINE ! :3'))

        client.channels.fetch(sprintChannel)
        .then(channel => 
            channel.messages.fetch(id)
            .then(async m =>
                await m.edit({embeds:[embed],components: [await this.finalButton()]}))      
            .catch(console.error)

        ).catch(console.error)

    },

    endmessageUpdate(userId, words){
        const data = editJsonFile(DATA)
        const message = require('./message.js')

        const sprintChannel = config.channels.sprint
        const id = data.get('sprint.message')

        const beginWords = data.get('sprint.'+json.intToABC(userId))
        let description = data.get('sprint.description')
        
        description += '<@'+userId+'> a bien profité du sprint en imaginant ***' + (words-beginWords) + ' ***mots '

        embed = message.newEmbed()
        .setTitle(('LE SPRINT EST TERMINE ! :3'))
        .setDescription(description)

        client.channels.fetch(sprintChannel)
        .then(channel => 
            channel.messages.fetch(id)
            .then(async m =>
                await m.edit({embeds:[embed],components: [await this.finalButton()]}))      
            .catch(console.error)

        ).catch(console.error)
    },


    

    removeMessageButtons(){
        const data = editJsonFile(DATA)
        const messageId = data.get('sprint.message')
        const ChannelId = config.channels.sprint

        client.channels.fetch(ChannelId)
        .then(channel => 
            channel.messages.fetch(messageId)
            .then(async m =>
                await m.edit({components:[]}))
 
            .catch(console.error)
        ).catch(console.error)
    },




    SETUP(){
        const data = editJsonFile(DATA)

        this.removeMessageButtons()
        data.unset('sprint')
        data.save()

        data.set('sprint.timer',0)
        data.set('sprint.description','')
        const none = []
        data.set('sprint.sprinters',none)
        data.save()

        sprintChannel = config.channels.sprint
        sprintChannel.send(':3')
        this.setMessage(messageId)
    },

    BEGIN(){

        let BEGIN = setInterval(function() {      
            this.beginMessage(sprint.getTime())
            this.timerProgress(+2)

            if(this.isFishished()){
                this.GO()
                clearInterval(BEGIN)
            }

        }, 2000)

        this.setTime(this.getMaxTime())


    },

    GO(){

        let GO = setInterval(function() {      
            this.goMessageEdit()
            this.timerProgress(-2)

            if(sprint.isFishished()){
                this.END()
                clearInterval(GO)
            }

        }, 2000)  
    },

    END(){
        const data = editJsonFile(DATA)

        data.set('timer',0)
        data.save()
        this.endMessageSend()
        this.endMessageEdit()

    },

}