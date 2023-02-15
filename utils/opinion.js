const db = require("../dbObjects")
const m = require("./member");
const {config} = require("../config");
const mes = require("./message");

module.exports = {

    async createOne(id, words, textUUID, senderId, messageId){
        const date = new Date()

        await db.tabCreate(O_TAB, {
            id: id,
            words: words,
            textId: textUUID,
            senderId: senderId,
            date: date,
            messageId: messageId
        })

    },

    async confirm(member, p, textUUID, who, inter){
        await m.addPlumes(member.id, p)
        const plumes = await m.getPlumes(member.id)

        let embed = mes.newEmbed()
            .setDescription(`**${member} Possède maintenant *${plumes}*  ${config.emotes.plume}**\n\n ${p} plumes par ${who}\n\n ||${textUUID}||`)

        await require('../utils/somes').plumesRolesSet(member, plumes, inter)

        await require('../utils/leaderboard.js').edit()

        return await mes.sendMes(config.channels.plumes, { embeds: [embed] })

    },

    memberOpinionExist(textUUID, id){
        return O_TAB.count({ where: { textId: textUUID, senderId: id } })
            .then(count => {
                return count !== 0

            })

    },

    async delOne(id){
        await db.tabDestroy(O_TAB, id)
    },

    async setValidate(id, validate){
        await db.tabSetAtr(O_TAB, id, "validate", validate)
    },

    async getWords(id){
        return db.tabGetAtr(O_TAB, id, "words")
    },

    async getTextUUID(id){
        return db.tabGetAtr(O_TAB, id, "textId")
    },

    async getSenderId(id){
        return db.tabGetAtr(O_TAB, id, "senderId")
    }



}