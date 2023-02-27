const { ActionRowBuilder, StringSelectMenuBuilder  } = require('discord.js')
const mes = require("../utils/message")

module.exports = {
    name: 'confirm',

    async execute(inter){
        const answer = inter.values

        if(answer.includes('1')){
            let path = inter.customId.split("/")[1]
            path = path.replace('|', '/')

            let customId = inter.customId.split("/")[2]
            customId = customId.replace('|', '/')

            await require(path).execute(inter, true, customId)

        }else{
            await mes.interSuccess(inter, "Oki, action non exécutée avec succès")
        }

    },

    get(inter, path, customId = "null"){
        path = path.replace('/', '|')
        customId = customId.replace('/', '|')

        return new ActionRowBuilder()
            .setComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(this.name + "/" + path + "/" + customId)
                    .setPlaceholder('Veux-tu vraiment exécuter cette action ?')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .setOptions(
                        { label: "non", description: "non, je ne veux pas", value: '0' },
                        { label: "oui", description: "oui, je le veux", value: '1' }

                    ))

    }

}