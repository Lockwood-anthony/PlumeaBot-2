const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const mes =  require('../utils/message')
const { config } = require('../config')
const oUtils = require("../utils/opinion")
const m = require("../utils/member")

module.exports = {
	data(){
        return new SlashCommandBuilder()
        .setName('plumes')
        .setDescription('Ajoute un nombre de plumes à un' + config.string.inhab + ', négatif ou positif, au choix')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option => option
            .setName('user')
            .setDescription('Utilisateur')
            .setRequired(true))
        .addIntegerOption(option => option
            .setMinValue(-99)
            .setMaxValue(99)
            .setName('plumes')
            .setDescription('Nombre de Plumes à rajouter/enlever')
            .setRequired(true))

    },
        
    async execute(inter) {
        const user = inter.options.getMember('user')
        let p = inter.options.getInteger('plumes')

        if(await m.exists(user.id)){
            await oUtils.confirm(user, p, "Plumes ajoutées à la main", inter.member, inter)

            await mes.interSuccess(inter)

        }else{
            await mes.interError(inter, "Cet utilisateur n'est pas enregistré dans la db !", 1)

        }
                
    }

}