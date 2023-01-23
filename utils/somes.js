const db =  require('../dbObjects')
const { sendMes } =  require('../utils/message')

module.exports = {

    createWeeklyResetTime(){
        const date = new Date()
        date.setDate(date.getDate() + 7)
        db.dbCreate(PDATES_TAB, {
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
        return db.dbGetAtr(PDATES_TAB, 'weeklyResetDate', 'date')
    },

    setWeeklyResetDate(){
        const date = new Date()
        date.setDate(date.getDate() + 7)
        db.dbSetAtr(PDATES_TAB, 'weeklyResetDate', 'date', date)
    }, 

    async isWeeklyResetDate(){
        return db.dbExist(PDATES_TAB, 'weeklyResetDate')
    },

    createBumpDate(){
        const date = new Date()
        date.setHours(date.getHours() + 2)
        db.dbCreate(PDATES_TAB, {
            id: 'bumpDate',
            date: date
        })
    },

    getBumpDate(){
        return db.dbGetAtr(PDATES_TAB, 'bumpDate', 'date')
    },

    setBumpDate(){
        date = new Date()
        date.setHours(date.getHours + 2)

        db.dbSetAtr(PDATES_TAB, 'bumpDate', 'date', date)
    }, 

    isBumpDate(){
        return db.dbExist(PDATES_TAB, 'bumpDate')
    },

    plumesRolesSet(member, plumes, inter) {
        json = config.plumesRoles
        const roles = new Map(Object.entries(json))
        
        found =  false
        lower = 0
        roleBefore = 0
        roles.forEach((points, roleid)=>{
            const role = inter.guild.roles.cache.get(roleid)
            if(member.roles.cache.find(r => r.id === roleid)){roleBefore = role}

            member.roles.remove(role)

            if (points <= plumes) {
                lower = role

            }else{

                if(!found && lower != 0){
                    found = true

                    member.roles.add(lower)

                    if(roleBefore != lower){
                        const channel = config.channels.plumes
                        sendMes(channel, `<@${member.user.id}> devient un  ${lower.name}`)

                    }                

                } 

            }

        })

    }

}