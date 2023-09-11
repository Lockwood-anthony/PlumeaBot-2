const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { Op } = require('sequelize')

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
                .setDescription('le thème recherché'))
            .addIntegerOption(option => option
                .setName('max_mots')
                .setDescription('longueur maximale du texte en mots')
                .setMinValue(1)
                .setMaxValue(13))


    },

	async execute(inter) {
        const author = inter.options.getUser('auteur')
        const theme = inter.options.getInteger('theme')
        const max_words = inter.options.getInteger('max_mots')

        const texts = await this.find_texts(author, theme, max_words)

        message = {content: "Résultats :\n\n"}

        max = 20
        while(max != 0){
            texts.forEach(t =>{
                message.content += `- ${t.postId}\n`
                max--
            }) 
        }

        inter.reply(message)

	},

    async find_texts(author, theme, max_words){
        const args = {
            attributes: ["postId"],
            raw: true
        }

        if(author) args["where.authorId"] = author
        if(theme) args["where.theme"][Op.contains][theme]
        if(max_words) args["where.max_words.validate"] = max_words

        const occurrences = await T_TAB.findAll(args)

        const multipleAtr = []
        occurrences.forEach(o => {
            let list = []
            atr.forEach(a => {
                list.push(o[a])
            })
            multipleAtr.push(list)

        })

        return multipleAtr
    }

}