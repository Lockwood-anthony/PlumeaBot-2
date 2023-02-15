const { SlashCommandBuilder, ActionRowBuilder} = require('discord.js')
const mes =  require('../utils/message')
const tUtils = require("../utils/text")
const { config } = require("../config")
const oUtils = require("../utils/opinion")
const uuidCreate = require("uuid");

module.exports = {
    data(){
        return new SlashCommandBuilder()
            .setName('avis')
            .setDescription('Offffficialiiiise un avis')

    },

    async execute(inter) {
        const postId = inter.channel.id
        const textUUID = await tUtils.getTextUUIDByPostId(postId)
        const member = inter.member

        if(!textUUID){
            const postChannel = await client.channels.fetch(config.channels.opinions)
            await mes.interError(inter, `Va dans le channel associé au texte pour poster ton ${postChannel} \n Et si ce poste est fermé c'est que l'auteur a retiré son texte`)
            return
        }

        if(await oUtils.memberOpinionExist(textUUID, member.id)){
            await mes.interError(inter, "Tu as déjà commenté ce texte ! Si des mises à jours importantes du texte méritent un nouveau retour demande à l'auteur d'effacer son ancien texte et de le reposter et pas d'utiliser /repost, en effet ce la permet de mettre au courrant tout le monde que leurs avis comptent à nouveau ! :D")
            return
        }

        let words = await tUtils.getWords(textUUID)
        words = Math.floor(words/1000)

        let fileUrl = await tUtils.getMes2(textUUID)
        fileUrl = fileUrl.url

        const uuid  = uuidCreate.v4()

        const embed =
            mes.newEmbed()
                .setAuthor({
                    name: `Avis de ${words} Plumes`,
                    iconURL: member.displayAvatarURL(),
                    url: fileUrl })
                .setDescription(`Par ${member} \n\n||${uuid}||`)

        const refuseButton = require("../buttons/opinionReject").get(uuid)
        const validButton = require("../buttons/opinionValid").get(uuid)
        const buttons = new ActionRowBuilder()
            .setComponents(validButton, refuseButton)

        const message = await inter.channel.send({ content: `<@&${config.roles.staff}>`, embeds: [embed], components: [buttons] })

        await oUtils.createOne(uuid, words, textUUID, member.id, message.id)

        await mes.interSuccess(inter)



    }

}