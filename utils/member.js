const { FileInPosting, dbAddAtr, dbCreate, dbDestroy, dbExist, dbGetAtr, dbRemoveAtr, dbSetAtr, dbIncrementAtr, dbSetAtrToAll, dbGetAll } = require('../dbObjects.js')
const { sendMes, delMes } = require('../utils/message')

module.exports = {

    getMember(id){
        dbGet(M_TAB, id)
    },

    addMember(id){
        const member = {
            id: id
        }
        dbCreate(M_TAB, member)
    },

    removeMember(id){
        dbDestroy(M_TAB, id)
    },

    exists(id){
        return dbExist(M_TAB, id)
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
        return dbGetAtr(M_TAB, id, 'nick')
    },

    setNick(id, nick){
        dbSetAtr(M_TAB, id, 'nick', nick)
    },

    hasNick(id){
        return this.getNick(id).length == 4
    },

    getPlumes(id){
        return dbGetAtr(M_TAB, id, 'plumes')
    },

    addPlumes(id, plumes){
        dbIncrementAtr(M_TAB, id, 'plumes', plumes)
    },

    removePlumes(id, plumes){
        dbIncrementAtr(M_TAB, id, 'plumes', -plumes)
    },

    getCoins(id){
        return dbGetAtr(M_TAB, id, 'coins')
    },

    addCoins(id, coins){
        dbIncrementAtr(M_TAB, id, 'coins', coins)
    },

    removeCoins(id, coins){
        dbIncrementAtr(M_TAB, id, 'coins', -coins)
    },

    getWeeklyWords(id){
        dbGetAtr(M_TAB, id, 'weeklyWords')
    },

    addWeeklyWords(id, weeklyWords){
        dbIncrementAtr(M_TAB, id, 'weeklyWords', weeklyWords)
    },

    removeWeeklyWords(id, weeklyWords){
        dbIncrementAtr(M_TAB, id, 'weeklyWords', -weeklyWords)
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
        dbSetAtrToAll(M_TAB, 'weeklyWords', 0)
    },

    getFileInPostingId(id){
        return dbGetAtr(FileInPosting, id, 'fileId')
    },

    getFileInPostingDt(id){
        return dbGetAtr(FileInPosting, id, 'dt')
    },

    addFileInPosting(id, file){
        const fileInPostingId = sendMes('safe', {content: 'Texte en cours de post', attachments: [file]})

        const fileInPosting = {
            id: id,
            fileId: fileInPostingId
        }
        dbCreate(FileInPosting, fileInPosting)
    },

    setFileInPostingDt(id, dt){
        dbSetAtr(FileInPosting, id, 'dt', dt)
    },

    removeFileInPosting(id){
        const fileId = this.getFileInPosting(id)

        delMes('safe', fileId)

        dbDestroy(FileInPosting, id)
    },

    getTextsUUIDs(id){
        return dbGetAtr(M_TAB, id, 'textUUIDs')
    },

    addTextUUID(id, UUID, dt){
        dbAddAtr(M_TAB, id, 'textUUIDs', [UUID, dt])
    },

    removeTextUUID(id, UUID){        
        const dt = require('../utils/text').getDt(UUID)
        dbRemoveAtr(M_TAB, id, 'textUUIDs', [UUID, dt])
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
        return dbGetAll(M_TAB, ['id', 'plumes'])
    }

}