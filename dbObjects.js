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
            medals: {
                type: DataTypes.ARRAY(DataTypes.UUID),
                defaultValue: []
            },
            cards: {
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
            all: {
                type: DataTypes.CHAR,
                defaultValue: 'a'
            },
            textInPostingUUID: DataTypes.UUID

        }),

        texts:
        sequelize.define('texts', {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                unique: true,
            },
            dt_title: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            dt: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            title: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            desc: {
                type: DataTypes.TEXT,
                defaultValue: ''
            },
            authorId: {
                type: DataTypes.BIGINT,
                defaultValue: 0
            },
            chap1: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            chap2: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            words: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            mes1: {
                type: DataTypes.BIGINT,
                defaultValue: 0
            },
            mes2: {
                type: DataTypes.BIGINT,
                defaultValue: 0
            },
            postId: {
                type: DataTypes.BIGINT,
                defaultValue: 0
            },
            postMesId: {
                type: DataTypes.BIGINT,
                defaultValue: 0
            },
            password: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            themes: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: []
            },
            questions: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: []
            }

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
                    type: DataTypes.ARRAY(DataTypes.BIGINT),
                    defaultValue: []
                },
                words: {
                    type: DataTypes.ARRAY(DataTypes.INTEGER),
                    defaultValue: []
                },
                messageId: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                }

            }),

        opinions:
            sequelize.define('opinions', {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    unique: true
                },
                textId: DataTypes.UUID,
                words: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0
                },
                messageId: {
                    type: DataTypes.BIGINT,
                    defaultValue: 0
                },
                senderId: {
                    type: DataTypes.BIGINT,
                    defaultValue: 0,
                },
                validate: {
                    type: DataTypes.BIGINT,
                    defaultValue: 0,
                }

            }),

        parametersIds:
            sequelize.define('parametersIds', {
                id: {
                    type: DataTypes.STRING,
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
            setTimeout(() => {
                this.autoSet()

            }, 2000)

        },

        Sync(){
            global.M_TAB = this.members
            global.T_TAB = this.texts
            global.S_TAB = this.sprints
            global.O_TAB = this.opinions
            global.PIDS_TAB = this.parametersIds
            global.PDATES_TAB = this.parametersDates

            M_TAB.sync()
            T_TAB.sync()
            S_TAB.sync()
            O_TAB.sync()
            PIDS_TAB.sync()
            PDATES_TAB.sync()

        },

        async autoSet(){
            const sprint = require ('./utils/sprint')
            if(!sprint.exists(0)){ await sprint.addOne(0) }

            const { isWeeklyResetDate, isBumpDate, createWeeklyResetTime, createBumpDate } =  require('./utils/somes')
            if(! await isWeeklyResetDate()){ await createWeeklyResetTime() }
            if(! await isBumpDate()){ await createBumpDate() }

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
                    return count !== 0

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
            if(id){ args["where"] = { id: id } }
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
            await tab.update({ [atr]: val}, { 'where': { all: 'a' } } )
        },

        async tabAddAtr(tab, id, atr, val){
            const append = {[atr]: sequelize.fn('array_append', sequelize.col(atr), val)}

            tab.update( append, { 'where': { id: id } })
        },

        async tabRemoveAtr(tab, id, atr, val){
            await tab.update({ [atr]: sequelize.fn('array_remove',sequelize.col(atr), val) }, { 'where': { id: id } })
        },

        async tabRemoveAtrIndex(tab, id, atr, index){
            const list = this.tabGetAtr(tab, id, atr)
            const o = list[index]
            await this.tabRemoveAtr(tab, id, atr, o)
        },

        async tabIncrementAtr(tab, id, atr, i){
            await tab.increment(atr, { by: i, where: { id: id }})
        }

    }