const { dbGetAtr, dbSetAtr, dbIncrementAtr, dbAddAtr, dbRemoveAtr, dbCreate, dbExist } =  require('../dbObjects')
const { editMes, getMes, newEmbed } =  require('../utils/message')
const { config } = require('../config')

module.exports = {

    exists(id){
        return dbExist(S_TAB, id)
    }, 

    addOne(id){
        const sprint = {
            id: id
        }
        dbCreate(S_TAB, sprint)    
    },

    getTime(id){
        return dbGetAtr(S_TAB, id, 'time')
    },

    setTime(id, time){
        dbSetAtr(S_TAB, id, 'time', time)
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
        return dbGetAtr(S_TAB, id, 'maxTime')
    },

    setMaxTime(id, sec){
        dbSetAtr(S_TAB, id, 'maxTime', sec)
    },

    getTime(id){
        return dbGetAtr(S_TAB, id, 'time')
    },

    setTime(id, sec){
        dbSetAtr(S_TAB, id, 'time', sec)
    },

    addTime(id, sec){
        dbIncrementAtr(S_TAB, id, 'time', sec)
    },

    getSprinters(id){
        return dbGetAtr(S_TAB, id, 'sprinters')
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
        dbAddAtr(S_TAB, id, 'sprinters', [sprinterId][words])
    },

    removeSprinter(id, sprinterId){
        dbRemoveAtr(S_TAB, id, 'sprinters', [sprinterId][any])
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
        dbGetAtr(S_TAB, id, 'messageId')
    },

    setMessageId(id, mesId){
        dbSetAtr(S_TAB, id, 'messageId', mesId)
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

        const rButton = require('../buttons/sprintRole').get()
        const jButton = require('../buttons/sprintJoin').get()

        editMes(sprintChannel, mesId, { content: '', embeds: [embed], components: [ rButton, jButton] })

    },
    
    goMessageEdit(id){
        sprintChannel = config.channels.sprint
        mesId = this.getMessageId(id)

        description = ''

        const sec = this.getTime(id)
        const sprinters = this.getSprinters(id)

        sprinters.forEach(s => {
            description += '<@'+s[0]+'>\n'
        })

        embed = message.newEmbed()
        .setTitle(('__SPRINT !__       ' + sec.toString() + ' ' + sec.toString() + ' ' + sec.toString() + ' '))
        .setDescription(description)


        editMes(sprintChannel, mesId, { embeds: [embed] })

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

        editMes(channel, mesId, { embeds:[embed], components: [ require('../buttons/sprintFinal').get() ] })

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
        const t = this

        let GOscope = setInterval(function() {      
            t.goMessageEdit(id)
            t.timerProgress(id, -2)

            if(sprint.isFishished(id)){
                t.END(id)
                clearInterval(GOscope)
            }

        }, 2000)  

    },

    END(id){
        this.setTime(id, 0)
        this.endMessageSend(id)
        this.endMessageEdit(id)

    },

}