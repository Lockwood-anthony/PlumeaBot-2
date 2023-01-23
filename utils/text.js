const { dbGet, dbCreate, dbExist, dbDestroy, dbGetAtr, dbSetAtr, dbRemoveAtrIndex } = require('../dbObjects.js')
const { delMes, sendMes, getMes } = require('../utils/message')
const { config } = require('../config')

module.exports = {

    get(id){
        dbGet(T_TAB, id)
    },

    add(id, dt, title, desc, author, chap1, chap2, words, mes1, mes2, date, password, themes, questions){
        const text = {
            id: id,
            dt: dt,
            title: title,
            desc: desc,
            author: author,
            chap1: chap1,
            chap2: chap2,
            words: words,
            mes1: mes1,
            mes2: mes2,
            date: date,
            password: password,
            themes: themes,
            questions: questions
        }
        dbCreate(T_TAB, text)
    },

    exist(id){
        dbExist(T_TAB, id)
    },

    remove(id){
        const { removeTextUUID } = require('../utils/member')
        const authorId = dbGet(T_TAB, id, 'authorId')
        removeTextUUID(authorId, id)

        this.removeMes1InChannel(id)
        this.removeMes2InChannel(id)
        
        dbDestroy(T_TAB, id)
    },

    countWords(str) {
        str = str.replace(/(^\s*)|(\s*$)/gi,'')
        str = str.replace(/[ ]{2,}/gi,' ')
        str = str.replace(/\n /,'\n')
        words = str.split(' ').length
    },

    getDt(id){
        return dbGetAtr(T_TAB, id, 'dt')
    },

    setDt(id, dt){
        dbSetAtr(T_TAB, id, 'dt', dt)
    },

    getTitle(id){
        dbGetAtr(T_TAB, id, 'title')
    },

    setTitle(id, title){
        dbSetAtr(T_TAB, id, 'title', title)
    },

    getDesc(id){
        dbGetAtr(T_TAB, id, 'desc')
    },

    setDesc(id, desc){
        dbSetAtr(T_TAB, id, 'desc', desc)
    },

    getAuthorId(id){
        dbGetAtr(T_TAB, id, 'author')
    },

    setAuthorId(id, authorId){
        dbGetAtr(T_TAB, id, 'authorId', authorId)
    },

    getChap1(id){
        dbGetAtr(T_TAB, id, 'chap1')
    },

    setChap1(id, chap1){
        dbSetAtr(T_TAB, id, 'chap1', 'chap1')
    },

    getChap2(id){
        dbGetAtr(T_TAB, id, 'chap2')
    },

    setChap2(id, chap2){
        dbSetAtr(T_TAB, id, 'chap2', chap2)
    },

    getWords(id){
        dbGetAtr(T_TAB, id, 'words')
    },

    setWords(id, words){
        dbSetAtr(T_TAB, id, 'words', words)
    },

    getMes1(id){
        dbGetAtr(T_TAB, id, 'mes1')
    },

    setMes1(id, mes1){
        dbSetAtr(T_TAB, id, 'mes1', mes1)
    },

    getMes2(id){
        dbGetAtr(T_TAB, id, 'mes2')
    },

    setMes2(id, mes2){
        dbSetAtr(T_TAB, id, 'mes2', mes2)
    },

    getDate(id){
        dbGetAtr(T_TAB, id, 'date')
    },

    setDate(id, date){
        dbSetAtr(T_TAB, id, 'date', date)
    },
    
    getPassword(id){
        dbGetAtr(T_TAB, id, 'password')
    },

    setPassword(id, password){
        dbSetAtr(T_TAB, id, 'password', password)
    },

    getThemes(id){
        dbGetAtr(T_TAB, id, 'themes')
    },

    setThemes(id, themes){
        dbSetAtr(T_TAB, id, 'themes', themes)
    },

    getQuestions(id){
        dbGetAtr(T_TAB, id, 'questions')
    },
    
    addQuestion(id, questionIndex){
        dbAddAtrIndex(T_TAB, id, 'questions', questionIndex)
    },

    removeQuestion(id, questionIndex){
        dbRemoveAtrIndex(T_TAB, id, 'questions', questionIndex)
    },

    /*
    async forumPost(dt, file, description, author, title){
        const { config } = require('../config')
        const forumId = config.channels.textForum

        client.channels.fetch(forumId)
		.then(async forum => {

            await forum.threads.create({ 
                name: dt, 
                message: {content: description,files:[file]}, 
                appliedTags: [author, title, dt] 
            })

        })
		.catch(console.error)

    },
    */

    words(dt){
        const data = editJson(DATA)

        const words = data.get('texts.'+dt+'.words')

        return words
    },

    removeMes1InChannel(id){
        delMes(config.channels.text, this.getMes1(id))
    },

    removeMes2InChannel(id){
        delMes(config.channels.safe, this.getMes2(id))
    },

    async sendMessage(message1){
        return sendMes(config.channels.text, message1)

    },

    isAuthor(id, userId){
        const author = this.getAuthorId(id)
        return author == userId
    },

    sendFile(id, member){
        const mes = getMes(config.channels.text, this.getMes2(id))
        const file = mes.attachments.first()
        member.send({content: id, attachments: [file]})
        
    }, 

    sendPostButton(){
        const mes = (config.channels.text, {content: '```o\no\no\no```', components: [ require('../buttons/textPost').get() ]})

        if(dbExist(PIDS_TAB, 'textPostMessage')){
            const id = sendMes(mes)
            dbSetAtr(PIDS_TAB, 'textPostMessage', 'paramId', id)

        }else{
            const postMesId = dbGetAtr(PIDS_TAB, 'textPostMessage', 'paramId')
            delMes(config.channels.text, postMesId)

            const id = sendMes(mes)
            dbCreate(PIDS_TAB, {
                id: 'textPostMessage',
                paramId: id
            })

        }

    }

}