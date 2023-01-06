const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const { sendDone } =  require('../utils/message')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName("plumes")
        .setDescription("Ajoute un nombre de points à un scripturien, négatif ou positif, au choix")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option => option
            .setName("user")
            .setDescription("Utilisateur")
            .setRequired(true))
        .addStringOption(option => option
            .setName("dt")
            .setDescription("12-15 lettres rapportant au texte")
            .setMinLength(12)
            .setMaxLength(15)
            .setRequired(true))
        .addIntegerOption(option => option
            .setMinValue(-99)
            .setMaxValue(99)
            .setName("plumes")
            .setDescription("Nombre de Points à rajouter/enlever"))
        
        return data
    },  
        
    async execute(interaction) {
        const plume = require("../utils/plume.js")
        const json = require("../utils/json.js")
        const leaderboard = require("../utils/leaderboard.js")
        const editJsonFile = require("edit-json-file")

        const member = interaction.options.getMember("user")
        const dt = interaction.options.getString("dt")
        const memberId = member.id
        const stringId = json.intToABC(memberId)
        let p = interaction.options.getInteger("plumes")    
        const data = editJsonFile(DATA)
        const dataConfig = editJsonFile(DATA_CONFIG)

        try {
            if(!p.length){}

        } catch (error) {
            const text = require("../utils/text.js")

            if(text.exists(dt)){
                p = Math.floor(text.words(dt)/1000)

            }else{
                interaction.reply({content:"**Ce dt n'existe point owo**",ephemeral:true})
                return

            }

        }

        await (plumes = parseInt(data.get("members."+stringId + ".plumes")), 
        plumes +=  p)

        await data.set("members." + stringId + ".plumes", plumes)
        await data.save()

        await( message = "**<@" + memberId + "> possède maintenant *" + plumes + "* "+dataConfig.get("emotes.plume")+"**\n",
        message += p+" plumes\n",
        message += dt+"\n") //DONT MOVE ! or plumes will be equal to 0 bruh

        await plume.roles(member, plumes, interaction)

        await leaderboard.edit()

        await interaction.reply(message)
                
    }

}