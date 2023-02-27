const { ActionRowBuilder, ButtonBuilder } = require('discord.js')
const mes = require("../utils/message")

module.exports = {
    name: 'sprintJoin',
    async execute(inter){
        const id = inter.customId.split("/")[1]
        const modal = require('../modals/sprintJoin')
        await mes.interSuccess(inter, modal.get(id))

    },

	get(id){
        return new ButtonBuilder()
            .setCustomId(this.name + "/" + id)
            .setLabel(this.name)
            .setStyle('Success')

    }

}