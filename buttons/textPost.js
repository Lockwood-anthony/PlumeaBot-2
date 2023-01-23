const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: 'textPost',
    async execute(inter){
        
    },

    get(textId){
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(this.name)
                .setLabel('Fait /post dans ce channel')
                .setStyle(ButtonStyle.Success)
                .setURL('https://discord.com/channels/1027089727360344144/1060675312955961384/1064623854984646696')
        )

        return button
    }

}