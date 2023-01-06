const { Sequelize } = require("sequelize")

module.exports = {

    Sync(){
        global.Member = this.Member().sync()
        global.Opinion = this.Opinion().sync()
        global.Sprint = this.Sprint().sync()
        global.Text = this.Text().sync()
        global.ParameterId = this.ParameterId().sync()
        global.ParameterDate = this.ParameterId().sync()

    },

    logEdit(edit){
        const messageUtil = require("./utils/message")
        const messageEmbed = messageUtil.newEmbed()
        .setTitle("dbEdit")
        .setAuthor({ name: "o", iconURL: "https://i.imgur.com/TYeapMy.png", url: "https://discord.gg/arbnrxWFVu" })
        .setDescription(edit)

        const editJsonFile = require("edit-json-file")
        const dataConfig = editJsonFile(DATA_CONFIG)
        const logsId = dataConfig.get("channels.logs")

        client.channels.fetch(logsId)
		.then(channel => channel.send({embeds:[messageEmbed]}))
		.catch(console.error)
    },
    
    Member(){
        member = sequelize.define('members', {
            id: {
                type: Sequelize.INTEGER,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(),
                defaultValue : ""

            },
            joinDate: {
                type : Sequelize.DATEONLY,
                defaultValue : new Date().getDate

            },
            plumes: {
                type : Sequelize.INTEGER,
                defaultValue: 0,
            },
            coins: {
                type : Sequelize.INTEGER,
                defaultValue: 0,
            },
            weeklyWords: {
                type : Sequelize.INTEGER,
                defaultValue: 0,
            },
            textsUUIDs: {
                type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.UUIDV4, Sequelize.STRING(6))),
                defaultValue: [[]]
            }

        })

        return member

    },

    Text(){
        text = sequelize.define('text', {
            id: {
                type: Sequelize.UUIDV4,
                unique: true,
            },
            dt : Sequelize.STRING,
            title : Sequelize.STRING,
            desc: Sequelize.TEXT,
            authorId: Sequelize.INTEGER,
            chap1 : Sequelize.INTEGER,
            chap2 : Sequelize.INTEGER,
            words : Sequelize.INTEGER,
            mes1 : Sequelize.INTEGER,
            mes2 : Sequelize.INTEGER,
            date: Sequelize.DATE,
            password: "",
            themes: Sequelize.ARRAY[Sequelize.STRING],
            questions: Sequelize.ARRAY[Sequelize.STRING],

        })

        return text

    },

    Opinion(){
        opinion = sequelize.define('opinion', {
            n : Sequelize.INTEGER,
            text : Sequelize.UUIDV4,
            sender : Sequelize.INTEGER,
            date : Sequelize.DATE
        })

        return opinion
    },

    Sprint(){
        sprint = sequelize.define('sprint', {
            timer : Sequelize.INTEGER,
            maxTimer : Sequelize.INTEGER,
            desc : Sequelize.TEXT,
            sprinters : Sequelize.ARRAY(Sequelize.INTEGER),
            message : Sequelize.INTEGER,
            words : Sequelize.ARRAY(Sequelize.INTEGER),

        })

        return sprint
    },

    FileInPosting(){
        fileInPosting = sequelize.define('fileInPosting', {
            id: {
                type: Sequelize.INTEGER,
                unique: true,
            },
            dt: {
                type: Sequelize.STRING,
                defaultValue: ''
            },
            fileId: {
                type: Sequelize.INTEGER,
                unique: true,
            },
        })

        return fileInPosting
    },

    ParameterId(){
        parameterId = sequelize.define('parameterId', {
            name: {
                type: Sequelize.STRING,
                unique: true,
            },
            id : Sequelize.INTEGER

        })

        return parameterId
    },

    ParameterDate(){
        parameterDate = sequelize.define('parameterDate', {
            name: {
                type: Sequelize.STRING,
                unique: true,
            },
            date : Sequelize.DATE

        })

        return parameterDate
    },

    dbCreate(db, what){
        const edit = db.create(what)
        dbObjects.logEdit(edit)
    },

    dbDestroy(db, id){
        const edit = db.destroy({ where: { id: id } })
        dbObjects.logEdit(edit)
    },

    dbExist(db, id){
        db.count({ where: { id: id } })
        .then(count => {
          return count == 0
        })
    },

    dbGet(db, id){
        return db.findOne({ where: { id: id } })
    },

    dbGetAtr(db, id, atr){
        return db.findOne({ 
            where: { id: id },
            attributes: atr
        })
    },

    dbSetAtr(db, id, atr, val){
        edit = db.update({ [atr]: val}, { where: { id: id } })
        this.logEdit(edit)
    },

    dbSetAtrToAll(db, atr, val){
        edit = db.update({ [atr]: val} )
        this.logEdit(edit)
    },

    dbAddAtr(db, id, atr, val){
        const append = {[atr]: sequelize.fn('array_append', sequelize.col(atr), val)}

        edit = db.update( append, { 'where': { id: id } })
        this.logEdit(edit)
    },

    dbRemoveAtr(db, id, atr, val){
        const append = {}
        append[atr] = sequelize.fn('array_remove', sequelize.col(atr), val)

        edit = db.update( append, { 'where': { id: id } })
        this.logEdit(edit)
    },

    dbRemoveAtrIndex(db, id, atr, index){
        const list = this.dbGetAtr(db, id, atr)
        const o = list[index]
        this.dbRemoveAtr(db, id, atr, o)
    },

    dbIncrementAtr(db, id, atr, i){
        const edit = db.increment(atr, { by: i, where: { id: id }})
        this.logEdit(edit)
    }

}