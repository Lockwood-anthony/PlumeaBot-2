const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: "sprintJoin",
    async execute(inter){
        const modal = require('../modals/sprintWords')
		await inter.showModal(modal.get())           

    },

	get(){
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(this.name)
                .setLabel("sprintJoin")
                .setStyle(ButtonStyle.Primary)
        )

        return button
    }

}