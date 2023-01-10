module.exports = {

    async setWeeklyReset(){
        const data = editJsonFile(DATA)

        const date = new Date()
        date.setDate(date.getDate() - date.getDay() + 7)
        date.setHours(('0' + 23).slice(-2))
        date.setMinutes(('0' + 0).slice(-2))
        
        await data.set('weeklyReset',date.toString())
        await data.save()
    },

    isWeeklyResetTime(){
        const data = editJsonFile(DATA)

        today = new Date()
        resetDay = new Date(data.get('weeklyReset'))

        if (today > resetDay){
            return true
        }else{
            return false
        }

    }

}