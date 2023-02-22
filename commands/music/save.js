const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'save',
    description: 'save the current track!',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Şu Anda Çalan Bir Şarkı Yok ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });

        inter.member.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(`:arrow_forward: ${queue.current.title}`)
                    .setURL(queue.current.url)
                    .addFields(
                        { name: ':hourglass: Süre:', value: `\`${queue.current.duration}\``, inline: true },
                        { name: 'Kanal:', value: `\`${queue.current.author}\``, inline: true },
                        { name: 'İzlenme Sayısı :eyes:', value: `\`${Number(queue.current.views).toLocaleString()}\``, inline: true },
                        { name: 'Şarkı Linki:', value: `\`${queue.current.url}\`` }
                    )
                    .setThumbnail(queue.current.thumbnail)
                    .setFooter({text:`from the server ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false })})
            ]
        }).then(() => {
            return inter.reply({ content: `Şarkının adını özel mesaj ile gönderdim. ✅`, ephemeral: true });
        }).catch(error => {
            return inter.reply({ content: `Size özel mesaj gönderilemiyor... Tekrar Dene ? ❌`, ephemeral: true });
        });
    },
};