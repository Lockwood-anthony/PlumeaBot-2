const { SlashCommandBuilder} = require('discord.js')
const { sendDone } =  require('../utils/message')

const editJsonFile = require("edit-json-file")
const dataConfig = editJsonFile(DATA_CONFIG)

module.exports = {
	data: new SlashCommandBuilder()
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
    .setDescription("Bah ca lance un Sprint... O.o"),

    async execute(interaction) {
        const sprint = require("../utils/sprint.js")

        const time = interaction.options.getInteger("time")
        const words = interaction.options.getInteger("words")
        const member = interaction.member
        const user = member.user
        const channelId = interaction.channel.id

        if(!sprint.isSprinting()){

            if(sprint.isChannel(channelId)){
                sprint.addSprinter(user.id, words)
                sprint.setMaxTime(time)
                const sprintRole = dataConfig.get("rolesId.sprinter")
                await interaction.reply("***Sprint ! :3***")
                await interaction.channel.send("<@&"+sprintRole+">")  
                
                sprint.SETUP
                sprint.BEGIN

            }else{
                interaction.reply({content:"Mauvais salon uwu", ephemeral:true})
                return
            }

        }else{
            interaction.reply({content:"Y'en a déjà un en cours :3", ephemeral:true})
            return
        }
    
    }

}