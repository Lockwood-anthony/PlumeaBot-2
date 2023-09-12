const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { Op } = require('sequelize')
const mesUtil = require('../utils/message')
const config = require("../config")

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
                .setName('max_mots')
                .setDescription('longueur maximale du texte en mots')
                .setMinValue(1000)
                .setMaxValue(20000))


    },

	async execute(inter) {
        const cmdChannel = config.config.channels.cmd
        if(inter.channel.id != cmdChannel){
            inter.reply(`va dans <#${cmdChannel}>`)
            return
        }

        const author = inter.options.getUser('auteur')
        const max_words = inter.options.getInteger('max_mots')

        const texts = await this.find_texts(author, max_words)

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

    async find_texts(author, max_words){
        const args = {
            attributes: ["postId", "postMesId"],
            raw: true,
            limit: 10,
            where : {}
        }

        if(author) args["where"]["authorId"] = author.id
        if(max_words) args.where["words"] = {[Op.lt]: max_words}

        const occurrences = await T_TAB.findAll(args)

        return occurrences
    }

}