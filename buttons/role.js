const { ButtonBuilder, ActionRowBuilder} = require('discord.js')
const mes = require("../utils/message");

module.exports = {
    name: 'role',

    async execute(inter){
        const member = inter.member
        const roleId = inter.customId.split('/')[1]

        if(member.roles.cache.has(roleId)){
            await member.roles.remove(roleId)
            await mes.interSuccess(
                inter,
                `Tu as renoncé au role : <@&${roleId}>`
            )

        }else{
            await member.roles.add(roleId)
            await mes.interSuccess(
                inter,
                `Tu as recu le role : <@&${roleId}>`
            )

        }

    },

    async get(roleId, inter, emote= '🥨', row = false){
        const role = await inter.guild.roles.fetch(roleId)

        const button = new ButtonBuilder()
            .setCustomId(this.name + "/" + roleId)
            .setEmoji(emote)
            .setLabel(role.name)
            .setStyle('Success')

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