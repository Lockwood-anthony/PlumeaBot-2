const { DataTypes } = require('sequelize')
const { config } = require('./config')

module.exports = {

    members: 
    sequelize.define('members', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true
        },
        nick: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        joinDate: {
            type: DataTypes.DATEONLY,
            defaultValue: new Date().getDate()

        },
        plumes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        coins: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        weeklyWords: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }

    }),

    texts: 
    sequelize.define('texts', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
        },
        dt: DataTypes.STRING,
        title: DataTypes.STRING,
        desc: DataTypes.TEXT,
        authorId: DataTypes.INTEGER,
        chap1: DataTypes.INTEGER,
        chap2: DataTypes.INTEGER,
        words: DataTypes.INTEGER,
        mes1: DataTypes.INTEGER,
        mes2: DataTypes.INTEGER,
        date: DataTypes.DATE,
        password: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        themes: DataTypes.ARRAY(DataTypes.STRING),
        questions: DataTypes.ARRAY(DataTypes.STRING)

    }),

    opinions: 
    sequelize.define('opinions', {
        n: DataTypes.INTEGER,
        text: DataTypes.UUID,
        sender: DataTypes.INTEGER,
        date: DataTypes.DATE
    }),

    sprints: 
    sequelize.define('sprints', {
        id: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            primaryKey: true,
            unique: true
        },
        time: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        maxTime: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        sprinters: {
            type: DataTypes.ARRAY(DataTypes.INTEGER, DataTypes.INTEGER),
            defaultValue: []
        },
        messageId: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }

    }),

    filesInPosting: 
    sequelize.define('filesInPosting', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
        },
        dt: {
            type: DataTypes.STRING,
            defaultValue: ' '
        },
        fileId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
        },
    }),

    parametersIds: 
    sequelize.define('parametersIds', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        paramId: DataTypes.INTEGER

    }),

    parametersDates: 
    sequelize.define('parametersDates', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        date: DataTypes.DATE
    }),

    async setUp(){
        await this.Sync()
        await setTimeout(() => {  
            this.autoSet()

        }, 2000)
        
    },

    Sync(){
        global.M_TAB = this.members
        global.T_TAB = this.texts
        global.O_TAB = this.opinions
        global.S_TAB = this.sprints
        global.F_TAB = this.filesInPosting
        global.PIDS_TAB = this.parametersIds
        global.PDATES_TAB = this.parametersDates

        M_TAB.sync()
        T_TAB.sync()
        O_TAB.sync()
        S_TAB.sync()
        F_TAB.sync()
        PIDS_TAB.sync()
        PDATES_TAB.sync()

    },

    async autoSet(){
        const sprint = require ('./utils/sprint')
        if(!sprint.exists(0)){ sprint.addOne(0) } 

        const { isWeeklyResetDate, isBumpDate, createWeeklyResetTime, createBumpDate } =  require('./utils/somes')
        if(! await isWeeklyResetDate()){ createWeeklyResetTime() } 
        if(! await isBumpDate()){ createBumpDate() } 

    },

    /*
    logEdit(edit){
        const messageUtil = require('./utils/message')
        const messageEmbed = messageUtil.newEmbed()
        .setTitle('dbEdit')
        .setAuthor({ name: 'o', iconURL: 'https://i.imgur.com/TYeapMy.png', url: 'https://discord.gg/arbnrxWFVu' })
        .setDescription(edit)

        const logsId = config.channels.logs

        client.channels.fetch(logsId)
		.then(channel => channel.send({embeds:[messageEmbed]}))
		.catch(console.error)
    },
    */

    async dbCreate(db, what){
        await db.create(what)
    },

    async dbDestroy(db, id){
        await db.destroy({ where: { id: id } })
    },

    async dbExist(db, id){
        return await db.findOne({ where: { id: id } }) != null
    },

    async dbGetAll(db, Atr){
        return await db.findAll({
            attributes: Atr
        })
    },

    async dbGet(db, id){
        return await db.findOne({ where: { id: id } })
    },

    async dbGetAtr(db, id, atr){
        return await db.findOne({ 
            where: { id: id },
            attributes: [atr]
        })
    },

    async dbSetAtr(db, id, atr, val){
        console.log('c')

        await db.update({ [atr]: val}, { where: { id: id } })
    },

    async dbSetAtrToAll(db, atr, val){
        await db.update({ [atr]: val} )
    },

    async dbAddAtr(db, id, atr, val){
        const append = {[atr]: DataTypes.fn('array_append', DataTypes.col(atr), val)}

        db.update( append, { 'where': { id: id } })
    },

    async dbRemoveAtr(db, id, atr, val){
        const append = {}
        append[atr] = DataTypes.fn('array_remove', DataTypes.col(atr), val)

        await db.update( append, { 'where': { id: id } })
    },

    async dbRemoveAtrIndex(db, id, atr, index){
        const list = this.dbGetAtr(db, id, atr)
        const o = list[index]
        this.dbRemoveAtr(db, id, atr, o)
    },

    async dbIncrementAtr(db, id, atr, i){
        await db.increment(atr, { by: i, where: { id: id }})
    }

}