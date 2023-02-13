const { ButtonBuilder } = require('discord.js')

module.exports = {
    name: 'textPostLink',
    async execute(inter){},

    get(url){
        return new ButtonBuilder()
            .setLabel('Avis')
            .setURL(url)
            .setStyle('Link')

    }

}