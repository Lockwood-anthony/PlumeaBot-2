    const { DataTypes } = require('sequelize')

    module.exports = {

        members:
        sequelize.define('members', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                unique: true
            },
            nick: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            joinDate: DataTypes.DATE,
            textsUUIDs: {
                type: DataTypes.ARRAY(DataTypes.UUID),
                defaultValue: []
            },
            plumes: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            coins: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            weeklyWords: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            fileInPostingMesId: {
                type: DataTypes.BIGINT,
                defaultValue: 0
            },
            fileInPostingDt: DataTypes.STRING


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
            authorId: DataTypes.BIGINT,
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
            sender: DataTypes.BIGINT,
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
                type: DataTypes.ARRAY(DataTypes.BIGINT, DataTypes.INTEGER),
                defaultValue: []
            },
            messageId: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            }

        }),

        parametersIds:
        sequelize.define('parametersIds', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                unique: true,
            },
            paramId: DataTypes.BIGINT

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
            global.PIDS_TAB = this.parametersIds
            global.PDATES_TAB = this.parametersDates

            M_TAB.sync()
            T_TAB.sync()
            O_TAB.sync()
            S_TAB.sync()
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

        async tabCreate(tab, what){
            await tab.create(what)
        },

        async tabDestroy(tab, id){
            await tab.destroy({ where: { id: id } })
        },

        tabExist(tab, id){
            return tab.count({ where: { id: id } })
                .then(count => {
                    return count != 0

                })
        },

        async tabGet(tab, id){
            return await tab.findOne({ where: { id: id } })
        },

        async tabGetAtr(tab, id, atr){
            const args = {
                attributes: [atr],
                raw: true
            }
            if(id) args["where"] = { id: id }
            const a = await tab.findOne(args)

            return a[atr]

        },

        async tabGetMultipleAtr(tab, id, atr){
            const args = {
                attributes: atr,
                raw: true
            }
            if(id) args["where"] = { id: id }

            const occurrences = await tab.findAll(args)

            const multipleAtr = []
            occurrences.forEach(o => {
                let list = []
                atr.forEach(a => {
                    list.push(o[a])
                })
                multipleAtr.push(list)

            })

            return multipleAtr

        },

        async tabSetAtr(tab, id, atr, val){
            await tab.update({ [atr]: val}, { where: { id: id } })
        },

        async tabSetAtrToAll(tab, atr, val){
            await tab.update({ [atr]: val} )
        },

        async tabAddAtr(tab, id, atr, val){
            const append = {[atr]: DataTypes.fn('array_append', DataTypes.col(atr), val)}

            tab.update( append, { 'where': { id: id } })
        },

        async tabRemoveAtr(tab, id, atr, val){
            const append = {}
            append[atr] = DataTypes.fn('array_remove', DataTypes.col(atr), val)

            await tab.update( append, { 'where': { id: id } })
        },

        async tabRemoveAtrIndex(tab, id, atr, index){
            const list = this.tabGetAtr(tab, id, atr)
            const o = list[index]
            this.tabRemoveAtr(tab, id, atr, o)
        },

        async tabIncrementAtr(tab, id, atr, i){
            await tab.increment(atr, { by: i, where: { id: id }})
        }

    }