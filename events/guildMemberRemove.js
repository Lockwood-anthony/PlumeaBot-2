const { EmbedBuilder } = require('discord.js')
const { sendMes } = require('../utils/message')
const { removeMember } =  require('../utils/member')
const { config } = require('../config')

module.exports = {
	name: 'guildMemberRemove',
	once: false,

	execute(member) {
                const user = member.user

                const cyaMessage = new EmbedBuilder()
                .setColor(0x2C2F33)
                .setDescription(`**${user} nous a quitté !!!**`)
                .setAuthor({ name: 'Niooon !',iconURL: 'https://i.imgur.com/TYeapMy.png', url: 'https://www.youtube.com/watch?v=xvFZjo5PgG0' })
                .setThumbnail(user.displayAvatarURL())
                .setTimestamp()

                removeMember(user.id)

                const cya = config.channels.cya
                sendMes(cya, {embeds: [cyaMessage]})
		
	},
}