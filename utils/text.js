const { dbGet, dbCreate, dbExist, dbDestroy, dbGetAtr, dbSetAtr, dbAddAtr, dbRemoveAtrIndex } = require('../dbObjects.js')
const { config } = require('../config')

module.exports = {

    get(id){
        dbGet(Text, id)
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
        dbCreate(Text, text)
    },

    exist(id){
        dbExist(Text, id)
    },

    remove(id){
        const { removeTextUUID } = require('../utils/member')
        const authorId = dbGet(Text, id, 'authorId')
        removeTextUUID(authorId, id)

        this.removeMes1InChannel(id)
        this.removeMes2InChannel(id)
        
        dbDestroy(Text, id)
    },

    countWords(str) {
        str = str.replace(/(^\s*)|(\s*$)/gi,'')
        str = str.replace(/[ ]{2,}/gi,' ')
        str = str.replace(/\n /,'\n')
        words = str.split(' ').length
    },

    getDt(id){
        return dbGetAtr(Text, id, 'dt')
    },

    setDt(id, dt){
        dbSetAtr(Text, id, 'dt', dt)
    },

    getTitle(id){
        dbGetAtr(Text, id, 'title')
    },

    setTitle(id, title){
        dbSetAtr(Text, id, 'title', title)
    },

    getDesc(id){
        dbGetAtr(Text, id, 'desc')
    },

    setDesc(id, desc){
        dbSetAtr(Text, id, 'desc', desc)
    },

    getAuthorId(id){
        dbGetAtr(Text, id, 'author')
    },

    setAuthorId(id, authorId){
        dbGetAtr(Text, id, 'authorId', authorId)
    },

    getChap1(id){
        dbGetAtr(Text, id, 'chap1')
    },

    setChap1(id, chap1){
        dbSetAtr(Text, id, 'chap1', 'chap1')
    },

    getChap2(id){
        dbGetAtr(Text, id, 'chap2')
    },

    setChap2(id, chap2){
        dbSetAtr(Text, id, 'chap2', chap2)
    },

    getWords(id){
        dbGetAtr(Text, id, 'words')
    },

    setWords(id, words){
        dbSetAtr(Text, id, 'words', words)
    },

    getMes1(id){
        dbGetAtr(Text, id, 'mes1')
    },

    setMes1(id, mes1){
        dbSetAtr(Text, id, 'mes1', mes1)
    },

    getMes2(id){
        dbGetAtr(Text, id, 'mes2')
    },

    setMes2(id, mes2){
        dbSetAtr(Text, id, 'mes2', mes2)
    },

    getDate(id){
        dbGetAtr(Text, id, 'date')
    },

    setDate(id, date){
        dbSetAtr(Text, id, 'date', date)
    },
    
    getPassword(id){
        dbGetAtr(Text, id, 'password')
    },

    setPassword(id, password){
        dbSetAtr(Text, id, 'password', password)
    },

    getThemes(id){
        dbGetAtr(Text, id, 'themes')
    },

    setThemes(id, themes){
        dbSetAtr(Text, id, 'themes', themes)
    },

    getQuestions(id){
        dbGetAtr(Text, id, 'questions')
    },
    
    addQuestion(id, questionIndex){
        dbAddAtrIndex(Text, id, 'questions', questionIndex)
    },

    removeQuestion(id, questionIndex){
        dbRemoveAtrIndex(Text, id, 'questions', questionIndex)
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
        const text_channel = config.channels.text
        const mes1 = this.getMes1(id)

        client.channels.fetch(text_channel)
        .then(channel =>{

            channel.messages.fetch(mes1)
            .then(async m =>
                await m.delete())  
            .catch(console.error)

        }).catch(console.error)

    },

    removeMes2InChannel(id){
        const safe = config.channels.safe
        const mes2 = this.getMes1(id)

        client.channels.fetch(safe)
        .then(channel =>{

            channel.messages.fetch(mes2)
            .then(async m =>
                await m.delete())  
            .catch(console.error)

        }).catch(console.error)

    },

    async sendMessage(message1){
        const text_channel = config.channels.text
        let id = 0
        client.channels.fetch(text_channel)
        .then(async channel => 
            await channel.send(message1).then(sent => {
                console.log(sent.id)
                return sent.id
              })
        ).catch(console.error)

    },

    isAuthor(id, userId){
        const author = this.getAuthorId(id)
        return author == userId
    },

    sendFile(id, member){
        const safe = config.channels.text
        const textUtil = require('../utils/text')
        const mes2 = textUtil.getMes2(id)

        let file
        client.channels.fetch(safe)
        .then(channel => 
            channel.messages.fetch(mes2)
            .then(mes =>
                file = mes.attachments.first())
            .catch(console.error)
        ).catch(console.error)

        member.send({content: id, attachments: [file]})
    }

}