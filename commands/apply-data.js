const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const { sendDone } =  require('../utils/message')

module.exports = {
	data(){
        let data = new SlashCommandBuilder()
        .setName("apply-data")
        .setDescription("Apply data")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addAttachmentOption(option => option
            .setName("data")
            .setDescription("Fichier DATA.json")
            .setRequired(true))

        return data

    },    

	async execute(inter) {
        const data = inter.options.getAttachment("data")
        const url = data.url
        const dataUtil = require("../utils/data.js")

        let request = require("request")
        let fs = require("fs")
        await request.get(url)
            .on("error", console.error)
            .pipe(fs.createWriteStream(DATA))

        function upload(){
            dataUtil.upload()
        }
        await setTimeout(upload, 4*1000, "Data !") //timout to wait file writing
        
        sendDone(inter)

	}

}