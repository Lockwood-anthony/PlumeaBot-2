const { dbGetAtr, ParameterDate, dbSetAtr, ParameterId } =  require('../dbObjects')
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
        dbSetAtr(ParameterDate, 'weeklyResetDate', 'date', date)
    }, 

    getBumpDate(){
        return dbGetAtr(ParameterDate, 'BumpDate', 'date')
    },

    setBumpDate(){
        const date = new Date()
        dbSetAtr(ParameterDate, 'BumpDate', 'date', date)
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