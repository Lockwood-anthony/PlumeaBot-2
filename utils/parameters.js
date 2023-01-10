const { ParameterId } = require('../dbObjects.js')
const { ParameterDate } = require('../dbObjects.js')
const dbObjects = require('../dbObjects.js')

module.exports() = {

    //ID PARAMETERS//////////////////////////////////////////////////////////////////////////////
    setTextChannel(id){
        const edit = ParameterId.update(
            {id: id},            
            { 'where': { name: 'textChannel' } }
            )
        dbObjects.logEdit(edit)
    },

    getTextChannel(){
        const p = ParameterId.findOne({ where: { name: 'textChannel' } })
        return p.id
    },

    setLogChannel(id){
        const edit = ParameterId.update(
            {id: id},            
            { 'where': { name: 'logChannel' } }
            )
        dbObjects.logEdit(edit)
    },

    getLogChannel(){
        const p = ParameterId.findOne({ where: { name: 'logChannel' } })
        return p.id
    },

    setWelcomeChannel(id){
        const edit = ParameterId.update(
            {id: id},            
            { 'where': { name: 'welcomeChannel' } }
            )
        dbObjects.logEdit(edit)
    },

    getWelcomeChannel(){
        const p = ParameterId.findOne({ where: { name: 'welcomeChannel' } })
        return p.id
    },

    setByeChannel(id){
        const edit = ParameterId.update(
            {id: id},            
            { 'where': { name: 'byeChannel' } }
            )
        dbObjects.logEdit(edit)
    },

    getByeChannel(){
        const p = ParameterId.findOne({ where: { name: 'byeChannel' } })
        return p.id
    },

    setPresentationChannel(id){
        const edit = ParameterId.update(
            {id: id},            
            { 'where': { name: 'presentationChannel' } }
            )
        dbObjects.logEdit(edit)
    },

    getPresentationChannel(){
        const p = ParameterId.findOne({ where: { name: 'presentationChannel' } })
        return p.id
    },

    setLeaderboardChannel(id){
        const edit = ParameterId.update(
            {id: id},            
            { 'where': { name: 'leaderboardChannel' } }
            )
        dbObjects.logEdit(edit)
    },

    getLeaderboardChannel(){
        const p = ParameterId.findOne({ where: { name: 'leaderboardChannel' } })
        return p.id
    },

    setDeleteChannel(id){
        const edit = ParameterId.update(
            {id: id},            
            { 'where': { name: 'deleteChannel' } }
            )
        dbObjects.logEdit(edit)
    },

    getDeleteChannel(){
        const p = ParameterId.findOne({ where: { name: 'deleteChannel' } })
        return p.id
    },

    setLeaderboardMessage(id){
        const edit = ParameterId.update(
            {id: id},            
            { 'where': { name: 'leaderboardMessage' } }
            )
        dbObjects.logEdit(edit)
    },

    getLeaderboardMessage(){
        const p = ParameterId.findOne({ where: { name: 'leaderboardMessage' } })
        return p.id
    },



    //DATE PARAMETERS//////////////////////////////////////////////////////////////////////////////////////////////////
    setNextBump(date){
        const edit = ParameterDate.update(
            {date: date},            
            { 'where': { name: 'nextBump' } }
            )
        dbObjects.logEdit(edit)
    },

    getNextBumpDate(){
        const p = ParameterDate.findOne({ where: { name: 'nextBump' } })
        return p.date
    },

    setWeeklyReset(id){
        const edit = ParameterId.update(
            {id: id},            
            { 'where': { name: 'weeklyReset' } }
            )
        dbObjects.logEdit(edit)
    },

    getWeeklyResetDate(){
        const p = ParameterDate.findOne({ where: { name: 'weeklyResetDate' } })
        return p.date
    },

}