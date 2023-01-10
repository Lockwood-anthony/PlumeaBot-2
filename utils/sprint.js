const { Sprint, dbGetAtr, dbSetAtr, dbIncrementAtr, dbAddAtr, dbRemoveAtr, dbCreate } =  require('../dbObjects')
const { editMes, getMes, newEmbed } =  require('../utils/message')
const { config } = require('../config')

module.exports = {

    addOne(id){
        const sprint = {
            id: id
        }
        dbCreate(Sprint, sprint)    
    },

    getTime(id){
        return dbGetAtr(Sprint, id, 'time')
    },

    setTime(id, time){
        dbSetAtr(Sprint, id, 'time', time)
    },

    isSprinting(id) {
        time = this.getTime(id)

        if(time == 0){
            return false
        }else{
            return true
        }

    },

    getMaxTime(id){
        return dbGetAtr(Sprint, id, 'maxTime')
    },

    setMaxTime(id, sec){
        dbSetAtr(Sprint, id, 'maxTime', sec)
    },

    getTime(id){
        return dbGetAtr(Sprint, id, 'time')
    },

    setTime(id, sec){
        dbSetAtr(Sprint, id, 'time', sec)
    },

    addTime(id, sec){
        dbIncrementAtr(Sprint, id, 'time', sec)
    },

    getSprinters(id){
        return dbGetAtr(Sprint, id, 'sprinters')
    },

    getSprinter(id, sprinterId){
        return this.getSprinters(id).filter(s => {
            s[0] == sprinterId
        })
    },

    getSprinterWords(id, sprinterId){
        return this.getSprinter(id, sprinterId)[1]
    },

    addSprinter(id, sprinterId, words){
        dbAddAtr(Sprint, id, 'sprinters', [sprinterId][words])
    },

    removeSprinter(id, sprinterId){
        dbRemoveAtr(Sprint, id, 'sprinters', [sprinterId][any])
    },

    removeAllSprinters(id){
        dbSetAtr(Srpint, id, 'sprinters', [])
    },

    getSprintersIds(id){
        const ids = []
        this.getSprinters(id).forEach(s => {
            ids.push(s[0])
        })
        return ids
        
    },

    isSprinter(id){
        const sprinters = this.getSprintersIds()
        if(sprinters.includes(id)){
            return true
        }else{
            return false
        }
    },

    getMessageId(id){
        dbGetAtr(Sprint, id, 'messageId')
    },

    setMessageId(id, mesId){
        dbSetAtr(Sprint, id, 'messageId', mesId)
    },

    isChannel(id){
        sprintChannel = config.channels.sprint

        if(sprintChannel == id){
            return true
        }else{
            return false
        }

    },




    beginMessageEdit(id){
        const sec = sprint.getTime(id)
        const sprintChannel = config.channels.sprint
        const mesId = this.getMessageId(id)

        let embed = message.newEmbed()
        .setTitle(('Le sprint commence dans   ' + sec.toString() + ' secondes   :D'))

        editMes(sprintChannel, mesId, { content: '', embeds: [embed], components: [ this.roleButton(),  this.joinButton()] })

    },
    
    goMessageEdit(id){
        sprintChannel = config.channels.sprint
        mesId = this.getMessageId(id)

        description = ''

        const sec = sprint.getTime(id)
        const sprinters = this.getSprinters(id)

        sprinters.forEach(s => {
            description += '<@'+s[0]+'>\n'
        })

        embed = message.newEmbed()
        .setTitle(('__SPRINT !__       ' + sec.toString() + ' ' + sec.toString() + ' ' + sec.toString() + ' '))
        .setDescription(description)

        editMes(sprintChannel, mesId, { embeds:[embed],components: [this.roleButton(),  this.joinButton()] })

    },

    endMessageSend(id){
        const channel = config.channels.sprint
        const mesId = this.getMessageId(id)
        getMes(channel, mesId).reply('**Le sprint est terminé ! :3**')

        this.getSprinters(id).forEach(s =>{
            channel.send('<@'+s[0]+'>')
        })

    },

    endMessageEdit(id){
        channel = config.channels.sprint
        mesId = this.getMessageId(id)

        embed = message.newEmbed()
        .setTitle(('LE SPRINT EST TERMINE ! :3'))

        editMes(channel, mesId, { embeds:[embed],components: [ this.finalButton()] })

    },

    endmessageUpdate(id, userId, words){
        const channel = config.channels.sprint
        const mesId = this.getMessageId(id)

        const beginWords = this.getSprinterWords(id, userId)
        let embed = getMes(channel, mesId).embeds[0]
        let desc = embed.description
        
        desc += '<@'+userId+'> a bien profité du sprint en imaginant ***' + (words-beginWords) + ' ***mots '

        embed = newEmbed()
        .setTitle(('LE SPRINT EST TERMINE ! :3'))
        .setDescription(description)

        editMes(channel, id, { embeds:[embed] })

    },


    

    removeMessageButtons(id){
        const messageId = this.getMessageId(id)
        const ChannelId = config.channels.sprint

        editMes(ChannelId, messageId, { components:[] })
    },




    SETUP(id){
        this.removeMessageButtons(id)

        this.setTime(id, 0)
        this.removeAllSprinters(id)

        sprintChannel = config.channels.sprint
        const mes = sprintChannel.send(':3')

        this.setMessage(mes.id)
    },

    BEGIN(id){

        let BEGIN = setInterval(function() {
            this.beginMessage(id, sprint.getTime())
            this.addTime(id, +2)

            if(this.isFishished(id)){
                this.GO(id)
                clearInterval(BEGIN)
            }

        }, 2000)

        this.setTime(id, this.getMaxTime(id))

    },

    GO(id){

        let GO = setInterval(function() {      
            this.goMessageEdit(id)
            this.timerProgress(id, -2)

            if(sprint.isFishished(id)){
                this.END(id)
                clearInterval(GO)
            }

        }, 2000)  

    },

    END(id){
        this.setTime(id, 0)
        this.endMessageSend(id)
        this.endMessageEdit(id)

    },

}