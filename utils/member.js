const db = require('../dbObjects.js')
const mes = require('../utils/message')
const { config } = require('../config')

module.exports = {

    getMember(id){
        db.tabGet(M_TAB, id)
    },

    addMember(id){
        const date = new Date()

        db.tabCreate(M_TAB, {
            id: id,
            joinDate: date
        })
    },

    removeMember(id){
        db.tabDestroy(M_TAB, id)
    },

    exists(id){
        return db.tabExist(M_TAB, id)
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
        return db.tabGetAtr(M_TAB, id, 'nick')
    },

    setNick(id, nick){
        db.tabSetAtr(M_TAB, id, 'nick', nick)
    },

    async hasNick(id){
        const nick = await this.getNick(id)
        return await nick.length == 4
    },

    getPlumes(id){
        return db.tabGetAtr(M_TAB, id, 'plumes')
    },

    addPlumes(id, plumes){
        db.tabIncrementAtr(M_TAB, id, 'plumes', plumes)
    },

    removePlumes(id, plumes){
        db.tabIncrementAtr(M_TAB, id, 'plumes', -plumes)
    },

    getCoins(id){
        return db.tabGetAtr(M_TAB, id, 'coins')
    },

    addCoins(id, coins){
        db.tabIncrementAtr(M_TAB, id, 'coins', coins)
    },

    removeCoins(id, coins){
        db.tabIncrementAtr(M_TAB, id, 'coins', -coins)
    },

    getWeeklyWords(id){
        db.tabGetAtr(M_TAB, id, 'weeklyWords')
    },

    addWeeklyWords(id, weeklyWords){
        db.tabIncrementAtr(M_TAB, id, 'weeklyWords', weeklyWords)
    },

    removeWeeklyWords(id, weeklyWords){
        db.tabIncrementAtr(M_TAB, id, 'weeklyWords', -weeklyWords)
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
        db.tabSetAtrToAll(M_TAB, 'weeklyWords', 0)
    },

    async isFileInPosting(id){
        return await this.getFileInPostingMesId(id) !== 0
    },

    async deleteFileInPostingMessage(id){
        await mes.delMes(config.channels.safe, await this.getFileInPostingMesId(id))
    },

    getFileInPostingDt(id){
        return db.tabGetAtr(M_TAB, id, 'fileInPostingDt')
    },

    setFileInPostingDt(id, fileInPostingDt){
        db.tabSetAtr(M_TAB, id, 'fileInPostingMesId', fileInPostingDt)
    },

    setFileInPostingMesId(id, fileInPostingMesId){
        db.tabSetAtr(M_TAB, id, 'fileInPostingMesId', fileInPostingMesId)
    },

    getFileInPostingMesId(id){
        return db.tabGetAtr(M_TAB, id, 'fileInPostingMesId')
    },

    async addFileInPosting(user, file){
        const embed = mes.newEmbed()
            .setTitle("Texte en /post")
            .setDescription(`par ${user}`)

        const fileInPostingMes = await mes.sendMes(config.channels.safe, {embeds: [embed], files: [file]})
        this.setFileInPostingMesId(user.id, fileInPostingMes.id)

    },

    async getTextsUUIDs(id){
        return await db.tabGetAtr(M_TAB, id, 'textsUUIDs')
    },

    addTextUUID(id, UUID, dt){
        db.tabAddAtr(M_TAB, id, 'textsUUIDs', [UUID, dt])
    },

    removeTextUUID(id, UUID){        
        const dt = require('../utils/text').getDt(UUID)
        db.tabRemoveAtr(M_TAB, id, 'textsUUIDs', [UUID, dt])
    },

    async removeAllTextsUUIDs(id){
        await db.tabSetAtr(M_TAB, id, "textsUUIDs", [])
    },

    getAllIdsPlumes(){
        return db.tabGetMultipleAtr(M_TAB, null, ['id', 'plumes'])
    }

}