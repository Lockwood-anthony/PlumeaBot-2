const db = require('../dbObjects.js')
const { sendMes, delMes } = require('../utils/message')
const { config } = require('../config')

module.exports = {

    getMember(id){
        db.dbGet(M_TAB, id)
    },

    addMember(id){
        db.dbCreate(M_TAB, {
            id: id
        })
    },

    removeMember(id){
        db.dbDestroy(M_TAB, id)
    },

    exists(id){
        return db.dbExist(M_TAB, id)
    },

    getAllNoPlumes(){
        return Member.findAll({
            where: {
                plumes: 0
            },
            attributes: ['id', 'joinDate']
        })
    },

    getNick(id){
        return db.dbGetAtr(M_TAB, id, 'nick')
    },

    setNick(id, nick){
        db.dbSetAtr(M_TAB, id, 'nick', nick)
    },

    hasNick(id){
        return this.getNick(id).length == 4
    },

    getPlumes(id){
        return db.dbGetAtr(M_TAB, id, 'plumes')
    },

    addPlumes(id, plumes){
        db.dbIncrementAtr(M_TAB, id, 'plumes', plumes)
    },

    removePlumes(id, plumes){
        db.dbIncrementAtr(M_TAB, id, 'plumes', -plumes)
    },

    getCoins(id){
        return db.dbGetAtr(M_TAB, id, 'coins')
    },

    addCoins(id, coins){
        db.dbIncrementAtr(M_TAB, id, 'coins', coins)
    },

    removeCoins(id, coins){
        db.dbIncrementAtr(M_TAB, id, 'coins', -coins)
    },

    getWeeklyWords(id){
        db.dbGetAtr(M_TAB, id, 'weeklyWords')
    },

    addWeeklyWords(id, weeklyWords){
        db.dbIncrementAtr(M_TAB, id, 'weeklyWords', weeklyWords)
    },

    removeWeeklyWords(id, weeklyWords){
        db.dbIncrementAtr(M_TAB, id, 'weeklyWords', -weeklyWords)
    },

    toMuchWeeklyWords(id, words){
        const weekly = this.getWeeklyWords(id)

        if (weekly + words > 20000){
            return true
        }else{
            return false
        }

    },

    resetAllWeeklyWords(){
        db.dbSetAtrToAll(M_TAB, 'weeklyWords', 0)
    },

    getFileInPostingId(id){
        return db.dbGetAtr(F_TAB, id, 'fileId')
    },

    getFileInPostingDt(id){
        return db.dbGetAtr(F_TAB, id, 'dt')
    },

    addFileInPosting(id, file){
        const fileInPostingId = sendMes(config.channels.safe, {content: 'Texte en cours de post', attachments: [file]})
        const fileInPosting = {
            id: id,
            fileId: fileInPostingId
        }

    },

    setFileInPostingDt(id, dt){
        db.dbSetAtr(F_TAB, id, 'dt', dt)
    },

    removeFileInPosting(id){
        const fileId = this.getFileInPosting(id)

        delMes(config.channels.safe, fileId)

        db.dbDestroy(F_TAB, id)
    },

    getTextsUUIDs(id){
        return db.dbGetAtr(M_TAB, id, 'textUUIDs')
    },

    addTextUUID(id, UUID, dt){
        db.dbAddAtr(M_TAB, id, 'textUUIDs', [UUID, dt])
    },

    removeTextUUID(id, UUID){        
        const dt = require('../utils/text').getDt(UUID)
        db.dbRemoveAtr(M_TAB, id, 'textUUIDs', [UUID, dt])
    },

    removeAllTexts(id){
        const texts = this.getTextsUUIDs(id)
        const textUtils = require('../utils/text')

        texts.array.forEach(t => {
            textUtils.removeMes1InChannel(t)
            textUtils.removeMes2InChannel(t)
            textUtils.remove(t)
        })

    },

    getAllIdsPlumes(){
        return db.dbGetAll(M_TAB, ['id', 'plumes'])
    }

}