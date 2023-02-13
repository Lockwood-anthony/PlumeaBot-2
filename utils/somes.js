const tab =  require('../dbObjects')
const { sendMes } =  require('../utils/message')
const config = require("../config").config

module.exports = {

    async createWeeklyResetTime(){
        const date = new Date()
        date.setDate(date.getDate() + 7)
        await tab.tabCreate(PDATES_TAB, {
            id: 'weeklyResetDate',
            date: date
        })

    },

    async isWeeklyResetTime(){
        const today = new Date()
        const resetDay = await this.getWeeklyResetDate()

        return today > resetDay;

    },

    async getWeeklyResetDate(){
        return await tab.tabGetAtr(PDATES_TAB, 'weeklyResetDate', 'date')
    },

    async setWeeklyResetDate(){
        const date = new Date()
        date.setDate(date.getDate() + 7)
        await tab.tabSetAtr(PDATES_TAB, 'weeklyResetDate', 'date', date)
    }, 

    async isWeeklyResetDate(){
        return tab.tabExist(PDATES_TAB, 'weeklyResetDate')
    },

    async createBumpDate(){
        const date = new Date()
        date.setHours(date.getHours() + 2)
        await tab.tabCreate(PDATES_TAB, {
            id: 'bumpDate',
            date: date
        })
    },

    async getBumpDate(){
        return tab.tabGetAtr(PDATES_TAB, 'bumpDate', 'date')
    },

    async setBumpDate(){
        let date = new Date()
        date.setHours(date.getHours + 2)

        await tab.tabSetAtr(PDATES_TAB, 'bumpDate', 'date', date)
    }, 

    async isBumpDate(){
        return tab.tabExist(PDATES_TAB, 'bumpDate')
    },

    plumesRolesSet(member, plumes, inter) {
        const json = config.plumesRoles
        const roles = new Map(Object.entries(json))
        
        let found =  false
        let lower = 0
        let roleBefore = 0
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