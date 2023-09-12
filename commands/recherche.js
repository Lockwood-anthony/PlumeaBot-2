const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { Op } = require('sequelize')
const mesUtil = require('../utils/message')

module.exports = {

    recherche_forms : [],

	data(){
        return new SlashCommandBuilder()
            .setName('recherche')
            .setDescription('trouve les textes')
            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
            .addUserOption(option => option
                .setName('auteur')
                .setDescription("l'auteur du texte"))
            .addIntegerOption(option => option
                .setName('theme')
                .setDescription('le thème recherché')
                .setMinValue(1)
                .setMaxValue(13))
            .addIntegerOption(option => option
                .setName('max_mots')
                .setDescription('longueur maximale du texte en mots')
                .setMinValue(1000)
                .setMaxValue(20000))


    },

	async execute(inter) {
        const author = inter.options.getUser('auteur')
        const theme = inter.options.getInteger('theme')
        const max_words = inter.options.getInteger('max_mots')

        const texts = await this.find_texts(author, theme, max_words)

        let message = {content: "Résultats :\n\n", embeds: []}

        for(const t of texts){
            const mes = await mesUtil.getMes(t.postId, t.postMesId)

            if(mes){
                embed = mes.embeds[0]

                postUrl = (await client.channels.fetch(t.postId)).url
                embed.data.url = postUrl
                embed.author.url = postUrl

                message.embeds.push(embed )
            }

        }

        await inter.channel.send(message)

	},

    async find_texts(author, theme, max_words){
        const args = {
            attributes: ["postId", "postMesId"],
            raw: true,
            limit: 10,
            where : {}
        }

        if(author) args["where"]["authorId"] = author.id
        if(theme) args["where"][theme][Op.contains][theme]
        if(max_words) args.where["words"] = {[Op.lt]: max_words}

        const occurrences = await T_TAB.findAll(args)

        return occurrences
    }

}