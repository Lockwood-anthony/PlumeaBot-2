const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: "sprintFinal",
    async execute(interaction){
        const modal = require('../modals/sprintFinalWords')
		await interaction.showModal(modal.get()) 

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