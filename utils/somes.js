const { dbGetAtr, dbSetAtr, ParameterId, dbExist, dbCreate } =  require('../dbObjects')
const { sendMes } =  require('../utils/message')

module.exports = {

    createWeeklyResetTime(){
        const date = new Date()
        date.setDate(date.getDate() + 7)
        dbCreate(PDATES_TAB, {
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
        return dbGetAtr(PDATES_TAB, 'weeklyResetDate', 'date')
    },

    setWeeklyResetDate(){
        const date = new Date()
        date.setDate(date.getDate() + 7)
        console.log(date)
        dbSetAtr(PDATES_TAB, 'weeklyResetDate', 'date', date)
    }, 

    isWeeklyResetDate(){
        return dbExist(PDATES_TAB, 'weeklyResetDate')
    },

    createBumpDate(){
        const date = new Date()
        date.setHours(date.getHours + 2)
        dbCreate(PDATES_TAB, {
            id: 'bumpDate',
            date: date
        })
    },

    getBumpDate(){
        return dbGetAtr(PDATES_TAB, 'bumpDate', 'date')
    },

    setBumpDate(){
        const date = new Date()
        date.setHours(date.getHours + 2)

        dbSetAtr(PDATES_TAB, 'bumpDate', 'date', date)
    }, 

    isBumpDate(){
        return dbExist(PDATES_TAB, 'bumpDate')
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