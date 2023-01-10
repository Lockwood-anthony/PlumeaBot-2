const { EmbedBuilder } = require('discord.js')
const { config } = require('../config')

module.exports = {
	name: 'guildMemberRemove',
	once: false,
	async execute(member) {

        const cya = config.channels.cya

        const cyaMessage = new EmbedBuilder()
        .setColor(0x2C2F33)
        .setDescription(`**${member.user} nous a quitté !!!**`)
        .setAuthor({ name: 'Niooon !',iconURL: 'https://i.imgur.com/TYeapMy.png', url: 'https://www.youtube.com/watch?v=xvFZjo5PgG0' })
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()

        const dataUtils = require("../utils/data.js")
        await dataUtils.accountRemove(member.user)
        await client.channels.cache.fetch(cya)
        .then(channel => channel.send({ embeds: [cyaMessage]}))
		
	},
};