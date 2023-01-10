const { config } = require('../config')

module.exports = {
    edit(){
        const channel_id = config.channels.leaderboard
        const id = config.messages.leaderboard

        client.channels.fetch(channel_id)
        .then(channel => 
            channel.messages.fetch(id)
            .then(async m =>
                await m.edit({content:'', embeds: [await this.create()]}))      
            .catch(console.error)

        ).catch(console.error)

    },

    create(){

		const members = data.get('members.list')
        let winnersPlumes = []
        let winnersId = []

        members.forEach(m=>{
            plumes = data.get('members.'+m+'.plumes')
            higher = true
            const l = winnersPlumes.length
            for (let i = 0; i < l; i++) {

                if(plumes < winnersPlumes[i]){

                    for (let o = l; o > i; o--) {
                        winnersPlumes[o] = winnersPlumes[o-1]
                        winnersId[o] = winnersId[o-1]

                    }
                    winnersPlumes[i] = plumes
                    winnersId[i] = m

                    higher = false
                    break
                }

            }

            if (higher){
                winnersPlumes.push(plumes)
                winnersId.push(m)
            }             

        })

        let message = '\n'
        const l = winnersId.length
        for(i = l-1 ; (i >= l-10 && i >= 0) ; i--){
            id = winnersId[i]
            intId = json.ABCtoInt(id)

            m = ''
            if(i == l-1){
                m += ':first_place: '
            }else if(i == l-2){
                m += ':second_place: '
            }else if(i == l-3){
                m += ':third_place: '
            }

            message+= m+'<@'+intId+'>: ' + winnersPlumes[i]+'\n---\n'

        }

        const messageUtil = require('./message')
        const Leaderboard = messageUtil.newEmbed()
        .setTitle('LEADERBOARD :')
        .setDescription(message)

        return Leaderboard
    }

}