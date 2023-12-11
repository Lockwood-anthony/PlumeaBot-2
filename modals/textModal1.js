const { ModalBuilder, TextInputBuilder, ActionRowBuilder } = require('discord.js')
const tUtils = require("../utils/text")
const mes = require("../utils/message")

module.exports = {
    name: 'textModal1',

    async execute(inter){
        const split = inter.customId.split('/')
        const textUUID = split[1]
        const textModelUUID = split[2]
        const PostProcess = split[3]

        const oldQuestions = await tUtils.getQuestions(textUUID)

        let questions = []
        for(let i = 0 ; i < 4 ; i++){
            const question = inter.fields.getTextInputValue('question'+i)
            questions.push(question)
        }

        await tUtils.setQuestions(textUUID, questions)

        if(PostProcess === '1'){
            const button = require("../buttons/textThemes").get(textUUID, textModelUUID, PostProcess)
            await mes.interSuccess(
                inter,
                {
                    content:
                        "Choisissez 1 à 3 thèmes qui définissent votre oeuvre." +
                        " \n __Appuis sur le bouton__  ↓↓↓",
                    components: [button]
                })

        }else{

            if(oldQuestions !== questions){
                const postId = await tUtils.getPostId(textUUID)
                const postMesId = await tUtils.getPostMesId(textUUID)
                const message = await mes.getMes(postId, postMesId)

                await mes.editMes(
                    postId,
                    postMesId,
                    { embeds: [message.embeds[0], tUtils.getQuestionsEmbed(questions)] }
                )
                await mes.interSuccess(inter)
            }


        }

    },

    async get(textUUID, textModelUUID, postProcess){
        const modal = new ModalBuilder()
            .setCustomId(this.name + "/" + textUUID + "/" + textModelUUID + "/" + postProcess)
            .setTitle('Formulaire 1/3 - Questions :')

        let questions = []
        if(textModelUUID !== '0'){
            questions = await tUtils.getQuestions(textModelUUID)
        }

        let comp = []
        for(let i = 0 ; i < 4 ; i++){
            const question = new TextInputBuilder()
                .setCustomId('question'+i)
                .setLabel('Questionne tes lecteurs : (facultatif)')
                .setStyle('Short')
                .setMaxLength(255)
                .setRequired(false)

            //autocompletion
            if(textModelUUID !== '0'){
                question.setValue(questions[i])
            }

            comp.push(question)

        }

        comp.forEach(c => {

            modal.addComponents(
                new ActionRowBuilder()
                    .addComponents(c)

            )

        })

        return modal

    }

}