const { dbGetAtr, ParameterDate, dbSetAtr, ParameterId, dbExist } =  require('../dbObjects')
const { sendMes } =  require('../utils/message')

module.exports = {

    isWeeklyResetTime(){
        today = new Date()
        resetDay = this.getWeeklyResetDate()

        if (today > resetDay) return true

        return false
    },

    getWeeklyResetDate(){
        return dbGetAtr(ParameterDate, 'weeklyResetDate', 'date')
    },

    setWeeklyResetDate(){
        const date = new Date()
        date.setDate(date.getDate() - date.getDay() + 7);
        dbSetAtr(ParameterDate, 'weeklyResetDate', 'date', date)
    }, 

    isWeeklyResetDate(){
        return dbExist(ParameterDate, 'weeklyResetDate')
    },

    getBumpDate(){
        return dbGetAtr(ParameterDate, 'bumpDate', 'date')
    },

    setBumpDate(){
        const date = new Date()
        dbSetAtr(ParameterDate, 'bumpDate', 'date', date)
    }, 

    isBumpDate(){
        return dbExist(ParameterDate, 'bumpDate')
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