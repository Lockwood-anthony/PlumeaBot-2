const { config } = require('../config')

module.exports = {
	name: 'guildMemberAdd',
	once: false,
	async execute(member) {
                const message = require('../utils/message')

                const welcome = config.channels.welcome
                const presentation = config.channels.presentation
                const user = member.user
        
                welcomeMessage = message.newEmbed()
                .setDescription(`**Bienvenue sur Scriptura ${member.user}.**`)
                .setAuthor({ name: 'Youpiii !',iconURL: 'https://i.imgur.com/TYeapMy.png', url: 'https://tenor.com/view/rickroll-roll-rick-never-gonna-give-you-up-never-gonna-gif-22954713' })
                .setThumbnail(member.user.displayAvatarURL())
                
                const json = require('../utils/json.js')
                const id = json.intToABC(member.user.id)
        
                members = data.get('members.list')
                if(!members.includes(id)&& !user.bot){
                        const dataUtil = require('../utils/data')
                        dataUtil.accountCreate(member.user)
                }
        
                await client.channels.cache.fetch(welcome)
                .then(channel => channel.send({ embeds: [welcomeMessage]}))

	}

}