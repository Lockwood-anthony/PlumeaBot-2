const { tabGet, tabCreate, tabExist, tabDestroy, tabGetAtr, tabSetAtr, tabRemoveAtrIndex } = require('../dbObjects.js')
const { delMes, sendMes, getMes } = require('../utils/message')
const { config } = require('../config')

module.exports = {

    get(id){
        return tabGet(T_TAB, id)
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
        tabCreate(T_TAB, text)
    },

    exist(id){
        return tabExist(T_TAB, id)
    },

    remove(id){
        const { removeTextUUID } = require('../utils/member')
        const authorId = tabGet(T_TAB, id, 'authorId')
        removeTextUUID(authorId, id)

        this.removeMes1InChannel(id)
        this.removeMes2InChannel(id)
        
        tabDestroy(T_TAB, id)
    },

    countWords(str) {
        str = str.replace(/(^\s*)|(\s*$)/gi,'')
        str = str.replace(/[ ]{2,}/gi,' ')
        str = str.replace(/\n /,'\n')
        words = str.split(' ').length
    },

    getDt(id){
        return tabGetAtr(T_TAB, id, 'dt')
    },

    setDt(id, dt){
        tabSetAtr(T_TAB, id, 'dt', dt)
    },

    getTitle(id){
        return tabGetAtr(T_TAB, id, 'title')
    },

    setTitle(id, title){
        tabSetAtr(T_TAB, id, 'title', title)
    },

    getDesc(id){
        return tabGetAtr(T_TAB, id, 'desc')
    },

    setDesc(id, desc){
        tabSetAtr(T_TAB, id, 'desc', desc)
    },

    getAuthorId(id){
        return tabGetAtr(T_TAB, id, 'author')
    },

    setAuthorId(id, authorId){
        tabGetAtr(T_TAB, id, 'authorId', authorId)
    },

    getChap1(id){
        return tabGetAtr(T_TAB, id, 'chap1')
    },

    setChap1(id, chap1){
        tabSetAtr(T_TAB, id, 'chap1', 'chap1')
    },

    getChap2(id){
        return tabGetAtr(T_TAB, id, 'chap2')
    },

    setChap2(id, chap2){
        tabSetAtr(T_TAB, id, 'chap2', chap2)
    },

    getWords(id){
        return tabGetAtr(T_TAB, id, 'words')
    },

    setWords(id, words){
        tabSetAtr(T_TAB, id, 'words', words)
    },

    getMes1Id(id){
        return tabGetAtr(T_TAB, id, 'mes1')
    },

    setMes1Id(id, mes1){
        tabSetAtr(T_TAB, id, 'mes1', mes1)
    },

    getMes2Id(id){
        return tabGetAtr(T_TAB, id, 'mes2')
    },

    setMes2Id(id, mes2){
        tabSetAtr(T_TAB, id, 'mes2', mes2)
    },

    async delAllMessages(id){
        const cId = config.channels.text
        const mes1Id = await this.getMes1Id(id)
        await delMes(cId, mes1Id)
        const mes2Id = await this.getMes1Id(id)
        await delMes(cId, mes2Id)

    },

    getDate(id){
        tabGetAtr(T_TAB, id, 'date')
    },

    setDate(id, date){
        tabSetAtr(T_TAB, id, 'date', date)
    },
    
    getPassword(id){
        tabGetAtr(T_TAB, id, 'password')
    },

    setPassword(id, password){
        tabSetAtr(T_TAB, id, 'password', password)
    },

    getThemes(id){
        tabGetAtr(T_TAB, id, 'themes')
    },

    setThemes(id, themes){
        tabSetAtr(T_TAB, id, 'themes', themes)
    },

    getQuestions(id){
        tabGetAtr(T_TAB, id, 'questions')
    },
    
    addQuestion(id, questionIndex){
        dbAddAtrIndex(T_TAB, id, 'questions', questionIndex)
    },

    removeQuestion(id, questionIndex){
        tabRemoveAtrIndex(T_TAB, id, 'questions', questionIndex)
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
        delMes(config.channels.text, this.getMes1Id(id))
    },

    removeMes2InChannel(id){
        delMes(config.channels.safe, this.getMes2Id(id))
    },

    async sendMessage(message1){
        return sendMes(config.channels.text, message1)

    },

    isAuthor(id, userId){
        const author = this.getAuthorId(id)
        return author == userId
    },

    sendFile(id, member){
        const mes = getMes(config.channels.text, this.getMes2Id(id))
        const file = mes.attachments.first()
        member.send({content: id, attachments: [file]})
        
    }, 

    sendPostButton(){
        const mes = (config.channels.text, {content: '```o\no\no\no```', components: [ require('../buttons/textPost').get() ]})

        if(tabExist(PIDS_TAB, 'textPostMessage')){
            const id = sendMes(mes)
            tabSetAtr(PIDS_TAB, 'textPostMessage', 'paramId', id)

        }else{
            const postMesId = tabGetAtr(PIDS_TAB, 'textPostMessage', 'paramId')
            delMes(config.channels.text, postMesId)

            const id = sendMes(mes)
            tabCreate(PIDS_TAB, {
                id: 'textPostMessage',
                paramId: id
            })

        }

    }

}