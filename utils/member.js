const { Member, FileInPosting, dbAddAtr, dbCreate, dbDestroy, dbExist, dbGetAtr, dbRemoveAtr, dbSetAtr, dbIncrementAtr, dbSetAtrToAll } = require("../dbObjects.js")

module.exports = {

    getOne(id){
        dbGet(Member, id)
    },

    addMember(id){
        const member = {
            id: id
        }
        dbCreate(Member, member)
    },

    removeMember(id){
        dbDestroy(Member, id)
    },

    exists(id){
        return dbExist(id)
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
        return dbGetAtr(Member, id, 'nick')
    },

    setNick(id, nick){
        dbSetAtr(Member, id, 'nick', nick)
    },

    hasNick(id){
        return this.getNick(id).length == 4
    },

    getPlumes(id){
        return dbGetAtr(Member, id, 'plumes')
    },

    addPlumes(id, plumes){
        dbIncrementAtr(Member, id, 'plumes', plumes)
    },

    removePlumes(id, plumes){
        dbIncrementAtr(Member, id, 'plumes', -plumes)
    },

    getCoins(id){
        return dbGetAtr(Member, id, 'coins')
    },

    addCoins(id, coins){
        dbIncrementAtr(Member, id, 'coins', coins)
    },

    removeCoins(id, coins){
        dbIncrementAtr(Member, id, 'coins', -coins)
    },

    getWeeklyWords(id){
        dbGetAtr(Member, id, 'weeklyWords')
    },

    addWeeklyWords(id, weeklyWords){
        dbIncrementAtr(Member, id, 'weeklyWords', weeklyWords)
    },

    removeWeeklyWords(id, weeklyWords){
        dbIncrementAtr(Member, id, 'weeklyWords', -weeklyWords)
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
        dbSetAtrToAll(Member, 'weeklyWords', 0)
    },

    getFileInPostingId(id){
        return dbGetAtr(FileInPosting, id, 'fileId')
    },

    getFileInPostingDt(id){
        return dbGetAtr(FileInPosting, id, 'dt')
    },

    addFileInPosting(id, file){
        const { sendOne } = require('../utils/message')
        const fileInPostingId = sendOne('safe', {content: "Texte en cours de post", attachments: [file]})

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

        const { deleteOne } = require('../utils/message')
        deleteOne('safe', fileId)

        dbDestroy(FileInPosting, id)
    },

    getTextsUUIDs(id){
        return dbGetAtr(Member, id, 'textUUIDs')
    },

    addTextUUID(id, UUID, dt){
        dbAddAtr(Member, id, 'textUUIDs', [UUID, dt])
    },

    removeTextUUID(id, UUID){        
        const dt = require('../utils/text').getDt(UUID)
        dbRemoveAtr(Member, id, 'textUUIDs', [UUID, dt])
    },

    removeAllTexts(id){
        const texts = this.getTextsUUIDs(id)
        const textUtils = require('../utils/text')

        texts.array.forEach(t => {
            textUtils.removeMes1InChannel(t)
            textUtils.removeMes2InChannel(t)
            textUtils.remove(t)
        })

    }

}