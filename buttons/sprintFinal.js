const { ActionRowBuilder, ButtonBuilder } = require('discord.js')
const mes = require("../utils/message")

module.exports = {
    name: 'sprintFinal',
    async execute(inter){
        const modal = require('../modals/sprintFinalWords').get()
        await mes.interSuccess(inter, null, modal)

    },

	get(){
        return new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(this.name)
                .setLabel('mooots')
                .setStyle('Primary')
        )

    }

}