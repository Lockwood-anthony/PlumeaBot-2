const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const mes =  require('../utils/message')
const { config } = require('../config')
const { getPlumes, addPlumes } = require('../utils/member')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName('plumes')
        .setDescription('Ajoute un nombre de points à un scripturien, négatif ou positif, au choix')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option => option
            .setName('user')
            .setDescription('Utilisateur')
            .setRequired(true))
        .addStringOption(option => option
            .setName('dt')
            .setDescription('12-15 lettres rapportant au texte')
            .setMinLength(12)
            .setMaxLength(15)
            .setRequired(true))
        .addIntegerOption(option => option
            .setMinValue(-99)
            .setMaxValue(99)
            .setName('plumes')
            .setDescription('Nombre de Points à rajouter/enlever'))
        
        return data
    },  
        
    async execute(inter) {
        const member = inter.options.getMember('user')
        const dt = inter.options.getString('dt')
        const id = member.id
        let p = inter.options.getInteger('plumes')    

        try {
            if(!p.length){}

        }catch (error) {
            const text = require('../utils/text.js')

            if(text.exist(dt)){
                p = Math.floor(text.words(dt)/1000)

            }else{
                mes.interError(inter, '**Ce dt n~existe point owo**')
                return

            }

        }

        await addPlumes(id, p)
        const plumes = await getPlumes(id)

        message = `**${member} possède maintenant *${plumes}* ${config.emotes.plume}**\n`
        message += `${p} plumes\n`
        message += `${dt}\n`

        require('../utils/somes')
        .plumesRolesSet(member, plumes, inter)

        require('../utils/leaderboard.js')
        .edit()

        mes.interSuccess(inter, { content: message })
                
    }

}