const { config } = require('../config')
const { newEmbed, sendMes } = require('../utils/message')
const { exists, addMember } =  require('../utils/member')

module.exports = {
	name: 'guildMemberAdd',
	once: false,

	execute(member) {
                const presentation = config.channels.presentation
                const user = member.user
                const id = user.id

                welcomeMessage = newEmbed()
                .setDescription(`**Bienvenue sur Scriptura ${user}.**`)
                .setAuthor({ name: 'Youpiii !',iconURL: 'https://i.imgur.com/TYeapMy.png', url: 'https://tenor.com/view/rickroll-roll-rick-never-gonna-give-you-up-never-gonna-gif-22954713' })
                .setThumbnail(user.displayAvatarURL())
                        
                if(!exists(id) && !user.bot){
                        addMember(id)
                }
        
                const welcome = config.channels.welcome
                sendMes(welcome, { embeds: [welcomeMessage]})

	}

}