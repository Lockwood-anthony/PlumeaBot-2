const { ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder } = require('discord.js')

module.exports = {
    themes: [
        {name: 'amour', desc: 'uwu !'},
        {name: 'autobiographie', desc: 'Car le réel est toujours mieux que l~imaginaire'},
        {name: 'chronique', desc: 'Je saispa cé qué cé'},
        {name: 'conte', desc: 'pas réservé aux enfants !'},
        {name: 'contemporain', desc: 'c~était po mieux avant'},
        {name: 'fantasy', desc: 'pas d~elfes à la Légolas, pitié ;-;'},
        {name: 'fantastique', desc: 'bouhouhou'},
        {name: 'historique', desc: 'À la lanterne ! Bahaha..'},
        {name: 'horreur', desc: 'Tronçonneuse'},
        {name: 'humour', desc: 'Aaaah, humur'},
        {name: 'jeunesse', desc: 'c~est jeune ?'},
        {name: 'policier', desc: 'pan pan'},
        {name: 'tragédie', desc: 'valls devient président'}
    ],
    name: 'textModal',
    execute(inter){
        const mUtils = require('../utils/member.js')
        const { getOne, sendOne } = require('../utils/message')
        const member = inter.member
        const id = member.user.id
        const title = inter.fields.getTextInputValue('title')

        if(/^[a-zA-Z()]+$/.test(title)){
            let chap1 = inter.fields.getTextInputValue('chap1')

            if(/^[0-9()]$/.test(chap1)){
                chap1 = parseInt(chap1)
                let chap2 = inter.fields.getTextInputValue('chap2')

                if(chap2!=null){

                    if(/^[0-9()]$/.test(chap2)){
                        chap2 = parseInt(chap2)

                        if(chap2 <= chap1){
                            inter.reply({content: 'Ton chap2 à un nombre inférieur ou égal à ton chap1 !', ephemeral: true})
                            mUtils.removeFileInPosting(id)
                            return
                        }

                    }else{
                        inter.reply({content: 'Ton chap2: Ce n~est pas un nombre que tu as donné là !', ephemeral: true})
                        mUtils.removeFileInPosting(id)
                        return
                    }

                }else{
                    chap2 = 0
                }
                
                let dt_chap = ('000' + chap1).slice(-3)
                
                if(chap2 != 0){
                    dt_chap+='-'+('000' + chap2).slice(-3)
                }

                const dt_title = mUtils.getFileInPostingDt(id)
                const dt_nick = mUtils.getNick(id)
                const dt = (dt_title + dt_chap + dt_nick).toUpperCase()
        
                let file = null

                try{
                    file  = getOne('safe', ).attachments.first()

                }catch(Error){
                    console.log(Error)
                    inter.reply({content: 'le fichier n~existe plus mon cher', ephemeral: true})
                    mUtils.removeFileInPosting(id)
                    return
                }

                const extension = path.extname(file.name)
        
                if(extension != '.pdf'){
                    inter.reply({ content: 'C~est pas .PDF ca ;-;\nVa donc sur ce site :\n\n https://www.ilovepdf.com/fr', ephemeral: true })
                    mUtils.removeFileInPosting(id)
                    return
                }
               
                //rename
                Object.defineProperty(fichier, 'name', {
                    writable: true,
                    value: dt + '.pdf'
                })
        
                let words
        
                const tUtils = require('../utils/text.js')
                pdf(fichier.url).then(function(data) {
                    words = tUtils.countWords(data.text)    
                    send()
                    
                }) 

                function send(){
            
                    const somesUtils = require('../utils/somes')
                    if(somesUtils.isWeeklyResetTime()){
                        mUtils.resetAllWeeklyWords()
                        somesUtils.setWeeklyResetDate()
                    }
        
                    if(mUtils.toMuchWeeklyWords(user.id, words)){
                        weekly = mUtils.getWeeklyWords(user.id)
                        inter.reply({ content: '**NO !** Pas plus de 20k par semaine bro\nMots: '+words+' | Mots de la semaine: '+weekly+'\nhttps://tenor.com/view/no-chad-giga-chad-giga-chet-gif-25063092', ephemeral: true })
                        mUtils.removeFileInPosting(id)

                    }else if (words < 1000){
        
                        try{
                            inter.reply({ content: '**NO !**  Soit un chad et envoie plus de 1000 mots.\nMots Comptés: '+words
                            +'\nhttps://tenor.com/view/no-chad-giga-chad-giga-chet-gif-25063092'+
                            '\nSi c~est largement éloigné du nombre de mots réel, converti ton fichier en pdf grâce à ce site :'
                            +'\nhttps://www.ilovepdf.com/fr/word_en_pdf'
                            , ephemeral: true })
                            mUtils.removeFileInPosting(id)

                        }catch(Error){
                            member.send('Hhhh... appelle asra, le gars qui s~occupe du bot et dit lui de ma part que ton pdf est bizarre et que j~ai faillit crash... Hhhh... bisou')
                            mUtils.removeFileInPosting(id)
                        }
        
                    }else{ 
                        const today = new Date().getDate
                        const desc = inter.fields.getTextInputValue('desc')
                        const themes = inter.fields.getTextInputValue('themes')
                        const questions = inter.fields.getTextInputValue('questions')
                        const password = inter.fields.getTextInputValue('password')
                        if(password == null){ password = '' }

                        const { fromString} = require('uuidv4')
                        const uuid  = fromString(today.toString()+dt+id)
                        
                        const spaceEmbed = new EmbedBuilder()
                        .setColor(0x2C2F33)
                        .setTitle('.\n.\n.')
                        
                        const mesUtils = require('../utils/message')
                        const textEmbed = mesUtils.newEmbed()
                        .setTitle(title)
                        .setAuthor({ name: dt + ' | ' + words + ' mots', iconURL: 'https://i.imgur.com/TYeapMy.png', url: 'https://discord.gg/arbnrxWFVu' })
                        .setDescription(desc)
                        .setFooter(uuid)
                        
                        const delButton = require('../buttons/textDelete').get(uuid)
                        const editButton = require('../buttons/textEdit').get(uuid)

                        let getButton
                        if(password == ''){
                            getButton = require('../buttons/textGet').get(uuid)
                        }else{
                            getButton = require('../buttons/textPassword').get(uuid)
                        }

                        let id1 = 0
                        inter.channel.send({ embeds: [spaceEmbed, textEmbed], components: [getButton, editButton, delButton]}).then(m => id1 = m.id)
        
                        const id2 = sendOne('safe', { content: dt+'\n'+uuid, files: [file] })
        
                        tUtils.add(uuid, dt, title, desc, chap1, chap2, words, id1, id2, today, password, themes, questions)
        
                        mUtils.addWeeklyWords(user.id,words)
                        mUtils.addText(id, uuid)
                        mUtils.removeFileInPosting(id)

                    }

                }

            }else{
                inter.reply({content: 'Ton chap1: Ce n~est pas un nombre que tu as donné là !', ephemeral: true})
                mUtils.removeFileInPosting(id)

            }

        }else{
            inter.reply({content: 'Ton titre: Ce n~est pas une lettre de l~alphabet que tu as donné là !', ephemeral: true})
            mUtils.removeFileInPosting(id)
        }

    },

    get(text){
        const modal = new ModalBuilder()
        .setCustomId(this.name)
        .setTitle('Formulaire de post du texte :')

        modal.addComponents(
            new ActionRowBuilder()
            .addComponents(
                new TextInputBuilder()
                .setCustomId('title')
                .setLabel('Le titre en entier :')
                .setValue(text.title)
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
                .setLabel('Premier chapitre d~où commence l~extrait :')
                .setValue(text.chapter1+1)
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
                .setLabel('Dernier chapitre où se termine l~extrait :')
                .setMaxLength(3)
                .setStyle(TextInputStyle.Short)
            )
        )

        modal.addComponents(
            new ActionRowBuilder()
            .addComponents(
                new TextInputBuilder()
                .setCustomId('desc')
                .setLabel('Description du texte :')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
            )
        )

        modal.addComponents(
            new ActionRowBuilder()
            .addComponents(
                new TextInputBuilder()
                .setCustomId('password')
                .setLabel('Mot de passe pour limiter l~accès au texte :')
                .setStyle(TextInputStyle.Short)
                .setMinLength(8)
                .setMaxLength(16)
            )
        )

        let themesOptions = []
        for(e of this.themes){
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
                .setOptions(text.themes)
                .addOptions(themesOptions),
            )  
        )

        const maxQuestion = text.questions.length()
        for(let i = 0 ;i<4;){
            const question = new TextInputBuilder()
            .setCustomId('question'+i)
            .setLabel('Pose une question à tes lecteurs :')
            .setStyle(TextInputStyle.Short)

            if(i <= maxQuestion){
                question.setValue(text.questions[i])
            }
            
            modal.addComponents(
                new ActionRowBuilder().addComponents(question)
            )
        }
        
        return modal

    }

}