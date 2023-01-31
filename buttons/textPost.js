const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: 'textPost',
    async execute(inter){
        inter.showModal(
            require("../modals/textModal").get())
        
    },

    get(){
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(this.name)
                .setLabel('~~~~~~~~~~~~~~~~~~~~~~~~! POST !~~~~~~~~~~~~~~~~~~~~~~~~')
                .setStyle(ButtonStyle.Success)
        )

        return button
    }

}