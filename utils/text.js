const mesUtils = require('../utils/message')
const { config } = require('../config')
const db = require("../dbObjects")
const {Op} = require("sequelize")

module.exports = {

    async get(id){
        return db.tabGet(T_TAB, id)
    },

    async addText(text){
        await db.tabCreate(T_TAB, text)
    },

    async exist(id){
        return db.tabExist(T_TAB, id)
    },

    async dtExist(dt, authorId){

        return T_TAB.count({ where: { dt: dt, authorId: authorId } })
            .then(count => {
                return count !== 0

            })
    },

    async remove(id){
        await db.tabDestroy(T_TAB, id)
    },

    async vanish(id){
        const m = require('../utils/member')
        const authorId = db.tabGet(T_TAB, id, 'authorId')
        await m.removeTextUUID(authorId, id)

        await this.removeMes1InChannel(id)
        await this.removeMes2InChannel(id)
        
        await db.tabDestroy(T_TAB, id)
    },

    async getDt(id){
        return db.tabGetAtr(T_TAB, id, 'dt')
    },

    async setDt(id, dt){
        await db.tabSetAtr(T_TAB, id, 'dt', dt)
    },

    async getDtTitle(id){
        return db.tabGetAtr(T_TAB, id, 'dt_title')
    },

    async setDtTitle(id, dtTitle){
        await db.tabSetAtr(T_TAB, id, 'dt_title', dtTitle)
    },

    async getTitle(id){
        return db.tabGetAtr(T_TAB, id, 'title')
    },

    async setTitle(id, title){
        db.tabSetAtr(T_TAB, id, 'title', title)
    },

    async getDesc(id){
        return db.tabGetAtr(T_TAB, id, 'desc')
    },

    async setDesc(id, desc){
        db.tabSetAtr(T_TAB, id, 'desc', desc)
    },

    async getAuthorId(id){
        return db.tabGetAtr(T_TAB, id, 'authorId')
    },

    async setAuthorId(id, authorId){
        db.tabGetAtr(T_TAB, id, 'authorId', authorId)
    },

    async getChap1(id){
        return db.tabGetAtr(T_TAB, id, 'chap1')
    },

    async setChap1(id, chap1){
        db.tabSetAtr(T_TAB, id, 'chap1', chap1)
    },

    async getChap2(id){
        return db.tabGetAtr(T_TAB, id, 'chap2')
    },

    async setChap2(id, chap2){
        await db.tabSetAtr(T_TAB, id, 'chap2', chap2)
    },

    async getWords(id){
        return db.tabGetAtr(T_TAB, id, 'words')
    },

    async setWords(id, words){
        db.tabSetAtr(T_TAB, id, 'words', words)
    },

    async getMes1Id(id){
        return db.tabGetAtr(T_TAB, id, 'mes1')
    },

    async setMes1Id(id, mes1){
        db.tabSetAtr(T_TAB, id, 'mes1', mes1)
    },

    async getMes2Id(id){
        return db.tabGetAtr(T_TAB, id, 'mes2')
    },

    async setMes2Id(id, mes2){
        db.tabSetAtr(T_TAB, id, 'mes2', mes2)
    },

    async setPostId(id, postId){
        db.tabSetAtr(T_TAB, id, 'postId', postId)
    },

    async getPostId(id){
        return db.tabGetAtr(T_TAB, id, 'postId')
    },

    async setPostMesId(id, postMesId){
        await db.tabSetAtr(T_TAB, id, 'postMesId', postMesId)
    },

    async getPostMesId(id){
        return db.tabGetAtr(T_TAB, id, 'postMesId')
    },


    async delAllMessages(id){
        const cId = config.channels.text
        const mes1Id = await this.getMes1Id(id)
        await mesUtils.delMes(cId, mes1Id)
        const mes2Id = await this.getMes1Id(id)
        await mesUtils.delMes(cId, mes2Id)

    },

    async getDate(id){
        return db.tabGetAtr(T_TAB, id, 'date')
    },

    async setDate(id, date){
        db.tabSetAtr(T_TAB, id, 'date', date)
    },

    async getPassword(id){
        return db.tabGetAtr(T_TAB, id, 'password')
    },

    async setPassword(id, password){
        db.tabSetAtr(T_TAB, id, 'password', password)
    },

    async getThemes(id){
        return db.tabGetAtr(T_TAB, id, 'themes')
    },

    async setThemes(id, themes){
        db.tabSetAtr(T_TAB, id, 'themes', themes)
    },

    async getQuestions(id){
        return db.tabGetAtr(T_TAB, id, 'questions')
    },

    async setQuestions(id, questions){
        db.tabSetAtr(T_TAB, id, 'questions', questions)
    },

    async removeMes1InChannel(id){
        await mesUtils.delMes(config.channels.text, this.getMes1Id(id))
    },

    async removeMes2InChannel(id){
        await mesUtils.delMes(config.channels.safe, this.getMes2Id(id))
    },

    async sendMessage(message1){
        return await mesUtils.sendMes(config.channels.text, message1)

    },

    async isAuthor(id, userId){
        const author = this.getAuthorId(id)
        return author === userId
    },

    async sendFile(id, member){
        const mes = await mesUtils.getMes(config.channels.safe, await this.getMes2Id(id))
        const file = mes.attachments.first()
        const authorId = await this.getAuthorId(id)
        const author = await client.users.fetch(authorId)

        const embed = mesUtils.newEmbed()
            .setTitle("Voici le texte demandé !")
            .setDescription(`Les bannissements et poursuites judiciaires sont éprouvants pour tout le monde... Alors ne diffuse pas cette oeuvre et prends en soin, ${author.username} compte sur toi :) \n\n || ${id} ||`)

        await member.send( {embeds: [embed], files: [file]} )
        
    },

    async sendPostTutorial(){
        const { ButtonBuilder, ActionRowBuilder } = require('discord.js')

        const button = new ActionRowBuilder()
            .setComponents(
                new ButtonBuilder()
                    .setLabel('Comment poster son texte ?')
                    .setEmoji('🤔')
                    .setStyle('Link')
                    .setURL("https://discord.com/channels/1066783578140180520/1066783579079716895/1074400898744332418")
            )

        const buttonMes = { content: '|\n|\n|\n|', components: [button] }

        const postMesId = await db.tabGetAtr(PIDS_TAB, 'textPostMessage', 'paramId')
        await mesUtils.delMes(config.channels.text, postMesId)

        const mes = await mesUtils.sendMes(config.channels.text, buttonMes)
        await db.tabSetAtr(PIDS_TAB, 'textPostMessage', 'paramId', mes.id)

    },

    async getSimilarTextUUID(dt_title, id, uuid){
        const serie = await T_TAB.findAll({
            where: {'dt_title': dt_title, 'authorId': id, 'id': { [Op.not]: uuid }},
            attributes: ['id', 'chap1', 'chap2'],
            raw: true
        })

        let max = 0
        if(serie.length !== 0){

            let text = serie[0]
            for(let t of serie){
                if(t.chap1 > max){
                    max = t.chap1
                    text = t
                }else if(t.chap2 > max) {
                    max = t.chap2
                    text = t
                }

            }
            return text.id

        }else{
            return 0

        }

    }


}