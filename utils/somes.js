const db =  require('../dbObjects')
const { sendMes } =  require('../utils/message')
const config = require("../config").config

module.exports = {

    createWeeklyResetTime(){
        const date = new Date()
        date.setDate(date.getDate() + 7)
        tab.dbCreate(PDATES_TAB, {
            id: 'weeklyResetDate',
            date: date
        })

    },

    isWeeklyResetTime(){
        today = new Date()
        resetDay = this.getWeeklyResetDate()

        if (today > resetDay) return true

        return false
    },

    getWeeklyResetDate(){
        return db.tabGetAtr(PDATES_TAB, 'weeklyResetDate', 'date')
    },

    setWeeklyResetDate(){
        const date = new Date()
        date.setDate(date.getDate() + 7)
        db.dbSetAtr(PDATES_TAB, 'weeklyResetDate', 'date', date)
    }, 

    async isWeeklyResetDate(){
        return db.tabExist(PDATES_TAB, 'weeklyResetDate')
    },

    createBumpDate(){
        const date = new Date()
        date.setHours(date.getHours() + 2)
        db.tabCreate(PDATES_TAB, {
            id: 'bumpDate',
            date: date
        })
    },

    getBumpDate(){
        return db.tabGetAtr(PDATES_TAB, 'bumpDate', 'date')
    },

    setBumpDate(){
        date = new Date()
        date.setHours(date.getHours + 2)

        db.tabSetAtr(PDATES_TAB, 'bumpDate', 'date', date)
    }, 

    isBumpDate(){
        return db.tabExist(PDATES_TAB, 'bumpDate')
    },

    plumesRolesSet(member, plumes, inter) {
        json = config.plumesRoles
        const roles = new Map(Object.entries(json))
        
        found =  false
        lower = 0
        roleBefore = 0
        roles.forEach(async (points, roleid)=>{
            const role = inter.guild.roles.cache.get(roleid)
            if(member.roles.cache.find(r => r.id === roleid)){roleBefore = role}

            await member.roles.remove(role)

            if (points <= plumes) {
                lower = role

            }else{

                if(!found && lower != 0){
                    found = true

                    await member.roles.add(lower)

                    if(roleBefore != lower){
                        const channel = config.channels.plumes
                        sendMes(channel, `<@${member.user.id}> devient un  ${lower.name}`)

                    }                

                } 

            }

        })

    }

}