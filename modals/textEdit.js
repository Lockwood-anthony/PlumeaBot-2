const { ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder } = require('discord.js')

module.exports = {
    name: 'textModal',
    execute(interaction){
        const { getOne, sendOne } = require('../utils/message')
        const mUtils = require("../utils/member.js")
        const member = interaction.member
        const id = member.user.id
        const f = interaction.fields
        const title = f.getTextInputValue('title')

        if(/^[a-zA-Z()]+$/.test(title)){
            let chap1 = f.getTextInputValue('chap1')

            if(/^[0-9()]$/.test(chap1)){
                chap1 = parseInt(chap1)
                let chap2 = f.getTextInputValue('chap2')

                if(chap2!=null){

                    if(/^[0-9()]$/.test(chap2)){
                        chap2 = parseInt(chap2)

                        if(chap2 <= chap1){
                            interaction.reply({content: "Ton chap2 à un nombre inférieur ou égal à ton chap1 !", ephemeral: true})
                            mUtils.removeFileInPosting(id)
                            return
                        }

                    }else{
                        interaction.reply({content: "Ton chap2: Ce n'est pas un nombre que tu as donné là !", ephemeral: true})
                        mUtils.removeFileInPosting(id)
                        return
                    }

                }else{
                    chap2 = 0
                }
                
                let dt_chap = ("000" + chap1).slice(-3)
                
                if(chap2 != 0){
                    dt_chap+='-'+("000" + chap2).slice(-3)
                }

                const dt_title = mUtils.getTextInPost(id)
                const dt_nick = mUtils.getNick(id)
                const dt = (dt_title + dt_chap + dt_nick).toUpperCase()
        
                let file = null

                try{
                    const fileId = mUtils.getFileInPosting(id)
                    file = getOne('safe', fileId)

                }catch(Error){
                    console.log(Error)
                    interaction.reply({content: "le fichier n'existe plus mon cher", ephemeral: true})
                    mUtils.removeFileInPosting(id)
                    return
                }
               
                //rename
                Object.defineProperty(fichier, "name", {
                    writable: true,
                    value: dt + ".pdf"
                })
                
                send()

                function send(){
                    const uuid = interaction.customId.split('/')[1]

                    let words = f.getTextInputValue('words')
                    let toMuchWords = false
                    if(words != null){ 
                        const add = words - tUtils.getWords()
                        if(mUtils.toMuchWeeklyWords(add)){ toMuchWords = true }

                        mUtils.addWeeklyWords()

                    }else{
                        words = tUtils.getWords(uuid)
                    }
        
                    const today = new Date().getDate
                    const desc = interaction.fields.getTextInputValue('desc')
                    const themes = interaction.fields.getTextInputValue('themes')

                    let questions= []
                    for(let i = 0; i < 4;){
                        const q = interaction.fields.getTextInputValue('question'+i)
                        if(q != null){
                            questions.push(q)
                        }else{
                            break
                        }
                    }

                    const password = interaction.fields.getTextInputValue('password')
                    if(password == null){ password = '' }
                    
                    const spaceEmbed = new EmbedBuilder()
                    .setColor(0x2C2F33)
                    .setTitle(".\n.\n.")
                    
                    const mesUtils = require("../utils/message")
                    const textEmbed = mesUtils.newEmbed()
                    .setTitle(title)
                    .setAuthor({ name: dt + " | " + words + " mots", iconURL: "https://i.imgur.com/TYeapMy.png", url: "https://discord.gg/arbnrxWFVu" })
                    .setDescription(desc)
                    .setFooter(uuid)

                    let id1 = 0
                    const editButton = require('../buttons/textEdit').get(uuid)
                    let getButton
                    if(password == ''){
                        getButton = require('../buttons/textGet').get(uuid)
                    }else{
                        getButton = require('../buttons/textPassword').get(uuid)

                    }
                    interaction.channel.send({ embeds: [spaceEmbed, textEmbed], components: [getButton, editButton]}).then(m => id1 = m.id)
    
                    let id2
                    if(dt != getDt(uuid)){
                        deleteOne('safe', tUtils.getMes2(uuid))
                        id2 = sendOne('safe', { content: dt+"\n"+uuid, files: [file] })
                    }
    
                    const tUtils = require("../utils/text.js")
                    tUtils.remove(uuid)
                    tUtils.add(uuid, dt, title, desc, chap1, chap2, words, id1, id2, today, password, themes, questions)
    
                    if(toMuchWords){
                        interaction.reply({content: "En tenant compte de la modification de mot, il s'avère que l'auteur a bypass la limite hebdomadaire !", ephemeral: true})

                    }else{
                        interaction.reply({content: DONE, ephemeral: true})

                    }

                }

            }else{
                interaction.reply({content: "Ton chap1: Ce n'est pas un nombre que tu as donné là !", ephemeral: true})
                mUtils.removeFileInPosting(id)

            }

        }else{
            interaction.reply({content: "Ton titre: Ce n'est pas une lettre de l'alphabet que tu as donné là !", ephemeral: true})
            mUtils.removeFileInPosting(id)
        }    

    },

    get(id, admin){
        const { getTitle, getChap1, getChap2, getDesc, getPassword, getThemes, getQuestions, getDt, getWords, getDt } = require('../utils/text')
        const modal = new ModalBuilder()
        .setCustomId(this.name)
        .setTitle("Formulaire d'edit du texte :")

        if(admin){
            modal.addComponents(
                new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                    .setCustomId('words')
                    .setLabel("Entre le nombre de mots :")
                    .setValue(getWords(id))
                    .setMinLength(1)
                    .setMaxLength(5)
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
    
                )

            )

        }

        modal.addComponents(
            new ActionRowBuilder()
            .addComponents(
                new TextInputBuilder()
                .setCustomId('dt_title')
                .setLabel("Entre les lettres :")
                .setValue(getDt(id).splice(6))
                .setMinLength(6)
                .setMaxLength(6)
                .setStyle(TextInputStyle.Short)
                .setRequired(true)

            )
        )

        modal.addComponents(
            new ActionRowBuilder()
            .addComponents(
                new TextInputBuilder()
                .setCustomId('title')
                .setLabel("Le titre en entier :")
                .setValue(getTitle(id))
                .setMaxLength(64)
                .setStyle(TextInputStyle.Short)
                .setRequired(true)

            )
        )

        modal.addComponents(
            new ActionRowBuilder()
            .addComponents(
                new TextInputBuilder()
                .setCustomId('chap1')
                .setLabel("Premier chapitre d'où commence l'extrait :")
                .setValue(getChap1(id))
                .setMaxLength(3)
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
            )
        )

        modal.addComponents(
            new ActionRowBuilder()
            .addComponents(
                new TextInputBuilder()
                .setCustomId('chap2')
                .setLabel("Dernier chapitre où se termine l'extrait :")
                .setValue(getChap2(id))
                .setMaxLength(3)
                .setStyle(TextInputStyle.Short)
            )
        )

        modal.addComponents(
            new ActionRowBuilder()
            .addComponents(
                new TextInputBuilder()
                .setCustomId('desc')
                .setLabel("Description du texte :")
                .setValue(getDesc(id))
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
            )
        )

        modal.addComponents(
            new ActionRowBuilder()
            .addComponents(
                new TextInputBuilder()
                .setCustomId('password')
                .setLabel("Mot de passe pour limiter l'accès au texte :\n(attention: est save en clair, ne pas utiliser un mdp important)")
                .setValue(getPassword(id))
                .setStyle(TextInputStyle.Short)
                .setMinLength(8)
                .setMaxLength(16)
            )
        )

        let themesOptions = []
        const themes = require('../modals/textModal').themes
        for(e of themes){
            let option = { label: '', description: '', value: '', }
            option.label = e.name
            option.description = e.desc
            option.value = e.name

            themesOptions.push(option)
        }
        modal.addComponents(
            new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('themes')
                .setPlaceholder('Choisis en au moins **1**')
                .setMaxValues(4)
                .setOptions(getThemes(id))
                .addOptions(themesOptions),
            )  
        )

        const q = getQuestions(id)
        for(let i = 0 ;i<4;){
            const question = new TextInputBuilder()
            .setCustomId('question'+i)
            .setLabel("Pose une question à tes lecteurs :")
            .setStyle(TextInputStyle.Short)

            if(i <= q.length()){
                question.setValue(q[i])
            }
            
            modal.addComponents(
                new ActionRowBuilder().addComponents(question)
            )
        }
        
        return modal

    }

}