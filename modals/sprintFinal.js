const { ModalBuilder, TextInputBuilder, ActionRowBuilder } = require('discord.js')
const mes = require("../utils/message")
const sprint = require("../utils/sprint");
const somes = require("../utils/somes")
const db =  require('../dbObjects')

module.exports = {
    name: 'sprintFinal',

    async execute(inter){
        const userId = inter.member.id
        const id = inter.customId.split("/")[1]

        let words = inter.fields.getTextInputValue('words')
        words = parseInt(words)

        if(sprint.exists(id)){

            if(await sprint.isSprinter(userId)){
                let errorMes = somes.checkIntegerModalInput(words, "Mots")
                if(errorMes !== ''){
                    await mes.interError(inter, errorMes)
                    return
                }

                const beginWords = await sprint.getSprinterWords(id, userId)

                await sprint.endMessageUpdate(id, userId, words, beginWords)
                await db.tabRemoveAtr(S_TAB, id, "sprinters", userId+"/"+beginWords)
                await mes.interSuccess(inter, 'Te voilà inscrit dans le marbre mon cher ; )')

            }else{
                await mes.interError(inter, "Tu faisais pas partie du sprint toi... \n Ou bien ton nom est déjà inscrit sur cette stèle")

            }

        }else{
            await mes.interError(inter, "Ce sprint est effacé ! Trop tard..")

        }

    },

    get(id){
        const modal = new ModalBuilder()
            .setCustomId(this.name + "/" + id)
            .setTitle('Nombre de Mots à la fin :D')

        const words = new TextInputBuilder()
            .setCustomId('words')
            .setLabel('mots :')
            .setRequired(true)
            .setMaxLength(6)
            .setStyle("Short")

        return modal.addComponents(
            new ActionRowBuilder()
                .addComponents(words))

    }

}