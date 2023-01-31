const { config } = require('../config')
const mes =  require('../utils/message')
const { getAllIdsPlumes } = require('../utils/member')

module.exports = {
    async edit(){
        const channelId = config.channels.leaderboard
        const mesId = config.messages.leaderboard

        mes.editMes(channelId, mesId, {content:'', embeds: [await this.create()]} )

    },

    async create(){
		const members = await getAllIdsPlumes()
        let winnersPlumes = []
        let winnersId = []

        members.forEach(m => {
            plumes = m[1]
            higher = true
            const l = winnersPlumes.length
            for (let i = 0 ; i < l ; i++) {

                if(plumes < winnersPlumes[i]){

                    for (let o = l ; o > i ; o--) {
                        winnersPlumes[o] = winnersPlumes[o-1]
                        winnersId[o] = winnersId[o-1]
                    }

                    winnersPlumes[i] = plumes
                    winnersId[i] = m[0]

                    higher = false
                    break
                }

            }

            if (higher){
                winnersPlumes.push(plumes)
                winnersId.push(m[0])
            }

        })

        let message = '\n'
        const l = winnersId.length
        for(i = l-1 ; (i >= l-10 && i >= 0) ; i--){
            id = winnersId[i]

            m = ''
            if(i == l-1){
                m += ':first_place: '
            }else if(i == l-2){
                m += ':second_place: '
            }else if(i == l-3){
                m += ':third_place: '
            }

            message+= m+'<@'+id+'>: ' + winnersPlumes[i]+'\n---\n'

        }

        const Leaderboard = mes.newEmbed()
        .setTitle('LEADERBOARD :')
        .setDescription(message)

        return Leaderboard
    }

}