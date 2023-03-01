const { ActionRowBuilder, StringSelectMenuBuilder  } = require('discord.js')
const { config } =  require("../config")
const mUtils = require("../utils/member")
const mes = require("../utils/message")

module.exports = {
    name: 'inactivesCheck',

    async execute(inter){
        inter.deferReply()

        const membersIds = inter.values

        membersIds.forEach(async (id, i) => {

            if(await mUtils.exists(id)){

                setTimeout(async () => {
                    await mUtils.removeMember(id)
                    const m = await inter.guild.members.fetch(id)
                    await m.roles.remove(config.roles.pluméen)

                }, i * 1000)

            }

        })

        await mes.interSuccess(inter, null, true)

    },

    async get(inactivesIds, inter){
        let components = []
        let menu = new StringSelectMenuBuilder()
            .setCustomId(this.name)
            .setPlaceholder('Choisis les gens')

        let n = 24

        await inactivesIds.forEach(async id => {
            const m = await inter.guild.members.fetch(id.id)

            if(await m.roles.cache.size <= 2){
                menu.addOptions({ label: m.user.tag, description: id.id, value: id.id })
                nothing = false

            }

            n--
            if(n === 0){
                components.push(new ActionRowBuilder().addComponents(menu))

                menu = new StringSelectMenuBuilder()
                    .setCustomId(this.name)
                    .setPlaceholder('Choisis les gens')

                n = 24
            }

        })

        return components

    }

}