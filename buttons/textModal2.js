const { ActionRowBuilder, ButtonBuilder } = require('discord.js')

module.exports = {
    name: 'textModal2',
    async execute(inter){
        const split = inter.customId.split('/')
        const textUUID = split[1]
        const textModelUUID = split[2]
        const PostProcess = split[3]

        inter.showModal(
            await require("../modals/textModal2").get(textUUID, textModelUUID, PostProcess))


    },

    get(textUUID, textModelUUID, PostProcess, row = true){
        const button = new ButtonBuilder()
            .setCustomId(this.name + '/' + textUUID + "/" + textModelUUID + "/" + PostProcess)
            .setLabel('Formulaire 2/2')
            .setStyle('Success')


        if(row){
            return new ActionRowBuilder().setComponents(button)
        }else{
            return button
        }

    }

}