const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: 'textTitle',
    async execute(inter){
        inter.showModal(
            require("../modals/textTitle").get())

    },

    get(){
        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(this.name)
                    .setLabel('                        Post !                            ')
                    .setStyle(ButtonStyle.Success)
            )

        return button
    }

}