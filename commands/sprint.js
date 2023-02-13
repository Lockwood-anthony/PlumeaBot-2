const { SlashCommandBuilder} = require('discord.js')
const mes =  require('../utils/message')
const { config } = require('../config')
const { isSprinting, isChannel, addSprinter, setMaxTime, SETUP, BEGIN } = require('../utils/sprint')

module.exports = {
	data(){
        return new SlashCommandBuilder()
        .setName('sprint')
        .addIntegerOption(option => option
            .setName('time')
            .setDescription('Durée de sprint en minutes')
            .setMinValue(1)
            .setMaxValue(60)
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('words')
            .setDescription('Ton nombre de mots de départ')
            .setMinValue(0)
            .setMaxValue(999999)
            .setRequired(true))
        .setDescription('Bah ca lance un Sprint... O.o')

    },

    async execute(inter) {
        const time = inter.options.getInteger('time')
        const words = inter.options.getInteger('words')
        const member = inter.member
        const user = member.user
        const channelId = inter.channel.id

        if(!isSprinting(0)){

            if(isChannel(0, channelId)){
                addSprinter(0, user.id, words)
                setMaxTime(0, time)
                const sprintRole = config.roles.sprinter

                await mes.interSuccess(inter, '***Sprint ! :3***')

                await inter.channel.send('<@&'+sprintRole+'>')
                
                SETUP(0)
                BEGIN(0)

            }else{
                await mes.interError(inter,'Mauvais salon uwu')
            }

        }else{
            await mes.interError(inter, 'Yen a déjà un en cours :3')
        }
    
    }

}