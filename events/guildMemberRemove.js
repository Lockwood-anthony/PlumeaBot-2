const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'guildMemberRemove',
	once: false,
	async execute(member) {
        const editJsonFile = require("edit-json-file")

        const channelfile = editJsonFile(DATA_CONFIG);
        const welcome = channelfile.get("channels.cya")

        const welcomeMessage = new EmbedBuilder()
        .setColor(0x2C2F33)
        .setDescription(`**${member.user} nous a quitté !!!**`)
        .setAuthor({ name: 'Niooon !',iconURL: 'https://i.imgur.com/TYeapMy.png', url: 'https://www.youtube.com/watch?v=xvFZjo5PgG0' })
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()

        const dataUtils = require("../utils/data.js")
        await dataUtils.accountRemove(member.user)
        await client.channels.cache.fetch(welcome)
        .then(channel => channel.send({ embeds: [welcomeMessage]}));
		
	},
};