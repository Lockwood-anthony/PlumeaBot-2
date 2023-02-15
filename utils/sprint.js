const { tabGetAtr, tabSetAtr, tabIncrementAtr, tabAddAtr, tabRemoveAtr, tabCreate, tabExist } =  require('../dbObjects')
const mes =  require('../utils/message')
const { config } = require('../config')

module.exports = {

    exists(id){
        return tabExist(S_TAB, id)
    }, 

    async addOne(id){
        const sprint = {
            id: id
        }
        await tabCreate(S_TAB, sprint)
    },

    async isSprinting(id) {
        const time = await this.getTime(id)
        return time !== 0
    },

    getMaxTime(id){
        return tabGetAtr(S_TAB, id, 'maxTime')
    },

    async setMaxTime(id, sec){
        await tabSetAtr(S_TAB, id, 'maxTime', sec)
    },

    getTime(id){
        return tabGetAtr(S_TAB, id, 'time')
    },

    async setTime(id, sec){
        await tabSetAtr(S_TAB, id, 'time', sec)
    },

    async addTime(id, sec){
        await tabIncrementAtr(S_TAB, id, 'time', sec)
    },

    getSprinters(id){
        return tabGetAtr(S_TAB, id, 'sprinters')
    },

    getSprinter(id, sprinterId){
        return this.getSprinters(id).filter(s => {
            return s === sprinterId
        })
    },

    getSprinterWords(id, sprinterId){
        return this.getSprinter(id, sprinterId)[1]
    },

    async addSprinter(id, sprinterId, words){
        await tabAddAtr(S_TAB, id, 'sprinters', [sprinterId][words])
    },

    async removeSprinter(id, sprinterId){
        await tabRemoveAtr(S_TAB, id, 'sprinters', [sprinterId])
    },

    async removeAllSprinters(id){
        await tabSetAtr(S_TAB, id, 'sprinters', [])
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
        return sprinters.includes(id)
    },

    async getMessageId(id){
        await tabGetAtr(S_TAB, id, 'messageId')
    },

    async setMessageId(id, mesId){
        await tabSetAtr(S_TAB, id, 'messageId', mesId)
    },

    async isChannel(id){
        return config.channels.sprint === id

    },




    async beginMessageEdit(id){
        const sec = await this.getTime(id)
        const sprintChannel = config.channels.sprint
        const mesId = this.getMessageId(id)

        let embed = mes.newEmbed()
        .setTitle(('Le sprint commence dans   ' + sec.toString() + ' secondes   :D'))

        const rButton = require('../buttons/sprintRole').get()
        const jButton = require('../buttons/sprintJoin').get()

        await mes.editMes(sprintChannel, mesId, { content: '', embeds: [embed], components: [ rButton, jButton] })

    },
    
    async goMessageEdit(id){
        const sprintChannel = config.channels.sprint
        const mesId = await this.getMessageId(id)

        let description = ''

        const sec = this.getTime(id)
        const sprinters = this.getSprinters(id)

        sprinters.forEach(s => {
            description += '<@'+s[0]+'>\n'
        })

        const embed = mes.newEmbed()
            .setTitle(('__SPRINT !__       ' + sec.toString() + ' ' + sec.toString() + ' ' + sec.toString() + ' '))
            .setDescription(description)


        await mes.editMes(sprintChannel, mesId, { embeds: [embed] })

    },

    async endMessageSend(id){
        const channel = config.channels.sprint
        const mesId = this.getMessageId(id)
        const message = await mes.getMes(channel, mesId)
        await message.reply('**Le sprint est terminé ! :3**')

        this.getSprinters(id).forEach(s =>{
            channel.send('<@'+s[0]+'>')
        })

    },

    async endMessageEdit(id){
        const mesId = await this.getMessageId(id)

        const embed = mes.newEmbed()
            .setTitle(('LE SPRINT EST TERMINE ! :3'))

        await mes.editMes(config.channels.sprint, mesId, { embeds:[embed], components: [ require('../buttons/sprintFinal').get() ] })

    },

    async endMessageUpdate(id, userId, words){
        const channel = config.channels.sprint
        const mesId = this.getMessageId(id)

        const beginWords = this.getSprinterWords(id, userId)
        const message = await mes.getMes(channel, mesId)
        let embed = message.embeds[0]
        let desc = embed.description
        
        desc += '<@'+userId+'> a bien profité du sprint en imaginant ***' + (words-beginWords) + ' ***mots '

        embed = mes.newEmbed()
            .setTitle(('LE SPRINT EST TERMINE ! :3'))
            .setDescription(desc)

        await mes.editMes(channel, id, { embeds:[embed] })

    },


    

    async removeMessageButtons(id){
        await mes.editMes(config.channels.sprint, await this.getMessageId(id), { components:[] })
    },




    async SETUP(id){
        await this.removeMessageButtons(id)

        await this.setTime(id, 0)
        await this.removeAllSprinters(id)

        const mes = mes.sendMes(config.channels.sprint, ':3')

        await this.setMessageId(mes.id)
    },

    async BEGIN(id){

        let BEGIN = setInterval(async function() {
            await this.beginMessageEdit(id)
            await this.addTime(id, +2)

            if(await this.getTime(id) === 0){
                await this.GO(id)
                clearInterval(BEGIN)
            }

        }, 2000)

        await this.setTime(id, this.getMaxTime(id))

    },

    async GO(id){
        const t = this

        let goScope = setInterval(async function() {
            await t.goMessageEdit(id)
            await t.addTime(id, -2)

            if(await this.getTime(id) === 0){
                await t.END(id)
                clearInterval(goScope)
            }

        }, 2000)  

    },

    async END(id){
        await this.setTime(id, 0)
        await this.endMessageSend(id)
        await this.endMessageEdit(id)

    },

}