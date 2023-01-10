const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: "sprintFinal",
    async execute(inter){
        const modal = require('../modals/sprintFinalWords')
		await inter.showModal(modal.get()) 

    },

	get(){
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(this.name)
                .setLabel("mooots")
                .setStyle(ButtonStyle.Primary)
        )

        return button
    }

}