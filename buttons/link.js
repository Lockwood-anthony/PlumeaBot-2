const { ButtonBuilder, ActionRowBuilder} = require('discord.js')

module.exports = {
    name: 'link',

    get(url, name = 'Lien', emote = '🔗', row = false){
        const button = new ButtonBuilder()
            .setURL(url)
            .setEmoji(emote)
            .setLabel(name)
            .setStyle('Link')

        if(row){
            return new ActionRowBuilder()
                .setComponents(
                    button
                )
        }else{
            return button

        }

    }

}