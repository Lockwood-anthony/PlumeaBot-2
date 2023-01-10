const { SlashCommandBuilder} = require('discord.js')
const { sendDone } =  require('../utils/message')
const { config } = require('../config')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName('sprint')
        .addIntegerOption(option => option
            .setName('time')
            .setDescription("Durée de sprint en minutes")
            .setMinValue(1)
            .setMaxValue(60)
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('words')
            .setDescription("Ton nombre de mots de départ")
            .setMinValue(0)
            .setMaxValue(999999)
            .setRequired(true))
        .setDescription("Bah ca lance un Sprint... O.o")

        return data

    },

    async execute(inter) {
        const sprint = require("../utils/sprint.js")

        const time = inter.options.getInteger("time")
        const words = inter.options.getInteger("words")
        const member = inter.member
        const user = member.user
        const channelId = inter.channel.id

        if(!sprint.isSprinting()){

            if(sprint.isChannel(channelId)){
                sprint.addSprinter(user.id, words)
                sprint.setMaxTime(time)
                const sprintRole = config.roles.sprinter
                await inter.reply("***Sprint ! :3***")
                await inter.channel.send("<@&"+sprintRole+">")  
                
                sprint.SETUP
                sprint.BEGIN

            }else{
                inter.reply({content:"Mauvais salon uwu", ephemeral:true})
                return
            }

        }else{
            inter.reply({content:"Y'en a déjà un en cours :3", ephemeral:true})
            return
        }
    
    }

}