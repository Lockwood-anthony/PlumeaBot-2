const db = require('../dbObjects.js')
const mes = require('../utils/message')
const { config } = require('../config')
const tUtils = require('../utils/text')

module.exports = {

    async getMember(id){
        db.tabGet(M_TAB, id)
    },

    async addMember(id){
        const date = new Date()

        db.tabCreate(M_TAB, {
            id: id,
            joinDate: date
        })
    },

    async removeMember(id){
        db.tabDestroy(M_TAB, id)
    },

    async exists(id){
        return db.tabExist(M_TAB, id)
    },

    async getAllNoPlumes(){
        return Member.findAll({
            where: {
                plumes: 0
            },
            attributes: ['id', 'joinDate']
        })
    },

    async getNick(id){
        return db.tabGetAtr(M_TAB, id, 'nick')
    },

    async setNick(id, nick){
        await db.tabSetAtr(M_TAB, id, 'nick', nick)
    },

    async hasNick(id){
        const nick = await this.getNick(id)
        return await nick.length == 4
    },

    async getPlumes(id){
        return db.tabGetAtr(M_TAB, id, 'plumes')
    },

    async addPlumes(id, plumes){
        db.tabIncrementAtr(M_TAB, id, 'plumes', plumes)
    },

    async removePlumes(id, plumes){
        db.tabIncrementAtr(M_TAB, id, 'plumes', -plumes)
    },

    async getCoins(id){
        return db.tabGetAtr(M_TAB, id, 'coins')
    },

    async addCoins(id, coins){
        db.tabIncrementAtr(M_TAB, id, 'coins', coins)
    },

    async removeCoins(id, coins){
        db.tabIncrementAtr(M_TAB, id, 'coins', -coins)
    },

    async getWeeklyWords(id){
        return db.tabGetAtr(M_TAB, id, 'weeklyWords')
    },

    async addWeeklyWords(id, weeklyWords){
        db.tabIncrementAtr(M_TAB, id, 'weeklyWords', weeklyWords)
    },

    async removeWeeklyWords(id, weeklyWords){
        db.tabIncrementAtr(M_TAB, id, 'weeklyWords', -weeklyWords)
    },

    async toMuchWeeklyWords(id, words){
        const weekly = this.getWeeklyWords(id)

        if (weekly + words > 20000){
            return true
        }else{
            return false
        }

    },

    async resetAllWeeklyWords(){
        db.tabSetAtrToAll(M_TAB, 'weeklyWords', 0)
    },

    async isFileInPosting(id){
        return await this.getFileInPostingMesId(id) !== 0
    },

    async setFileInPostingMesId(id, fileInPostingMesId){
        db.tabSetAtr(M_TAB, id, 'fileInPostingMesId', fileInPostingMesId)
    },

    async getFileInPostingMesId(id){
        return db.tabGetAtr(M_TAB, id, 'fileInPostingMesId')
    },

    async addFileInPosting(user, file){
        const embed = mes.newEmbed()
            .setTitle("Texte en /post")
            .setDescription(`par ${user}`)

        const fileInPostingMes = await mes.sendMes(config.channels.safe, {embeds: [embed], files: [file]})
        this.setFileInPostingMesId(user.id, fileInPostingMes.id)

    },

    async setTextInPostingUUID(id, textInPostingUUID){
        db.tabSetAtr(M_TAB, id, 'textInPostingUUID', textInPostingUUID)
    },

    async getTextInPostingUUID(id){
        return db.tabGetAtr(M_TAB, id, 'textInPostingUUID')
    },

    async getTextInPosting(id){
        const uuid = await this.getTextInPostingUUID(id)
        return tUtils.get(uuid)
    },

    async getTextsUUIDs(id){
        return await db.tabGetAtr(M_TAB, id, 'textsUUIDs')
    },

    async addTextUUID(id, UUID){
        await db.tabAddAtr(M_TAB, id, 'textsUUIDs', UUID)
    },

    async removeTextUUID(id, UUID){
        const dt = require('../utils/text').getDt(UUID)
        db.tabRemoveAtr(M_TAB, id, 'textsUUIDs', [UUID, dt])
    },

    async removeAllTextsUUIDs(id){
        await db.tabSetAtr(M_TAB, id, "textsUUIDs", [])
    },

    async getAllIdsPlumes(){
        return db.tabGetMultipleAtr(M_TAB, null, ['id', 'plumes'])
    }

}