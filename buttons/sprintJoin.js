const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: "sprintJoin",
    async execute(interaction){
        const modal = require('../modals/sprintWords')
		await interaction.showModal(modal.get())           

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