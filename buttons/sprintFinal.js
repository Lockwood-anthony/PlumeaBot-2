const { ActionRowBuilder, ButtonBuilder } = require('discord.js')
const mes = require("../utils/message")

module.exports = {
    name: 'sprintFinal',
    async execute(inter){
        const id = inter.customId.split("/")[1]

        await mes.interSuccess(inter, require('../modals/sprintFinalWords').get(id))

    },

	get(id){
        return new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(this.name + "/" + id)
                    .setLabel('mooots')
                    .setStyle('Primary')
        )

    }

}