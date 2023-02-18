const mes = require('../utils/message')
const m =  require('../utils/member')
const { config } = require('../config')

module.exports = {
	name: 'guildMemberRemove',
	once: false,

	async execute(member) {
        const cyaMessage = mes.newEmbed()
            .setDescription(`**${member}  | ${member.user.username} nous a quitté !!!**`)
            .setAuthor({ name: 'Niooon !', iconURL: 'https://i.imgur.com/TYeapMy.png', url: 'https://www.youtube.com/watch?v=xvFZjo5PgG0' })
            .setThumbnail(member.displayAvatarURL())

        await m.removeMember(member.id)

        const cya = config.channels.cya
        await mes.sendMes(cya, {embeds: [cyaMessage]})
		
	},
}