const { config } = require('../config')

module.exports = {
    async roles(member, plumes, interaction) {
        json = config.plumesRoles
        const roles = new Map(Object.entries(json))
        
        found =  false
        lower = 0
        roleBefore = 0
        await roles.forEach(async (points, roleid)=>{
            const role = interaction.guild.roles.cache.get(roleid)
            if(member.roles.cache.find(r => r.id === roleid)){roleBefore = role}

            await member.roles.remove(role)

            if (points <= plumes) {
                lower = role
            }else{
                if(!found && lower != 0){
                    found = true

                    await member.roles.add(lower)

                    if(roleBefore != lower){
                        client.channels.fetch(config.channels.plumes)
                        .then(channel => channel.send("<@"+member.user.id+"> " + "devient un " + lower.name))
                        .catch(console.error)
                    }                

                } 

            }

        })

    }

}