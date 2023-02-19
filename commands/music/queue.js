const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Get the songs in the queue',
    voiceChannel: true,

    execute({ client, inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Şu Anda Çalan Bir Şarkı Yok  ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });

        if (!queue.tracks[0]) return  inter.reply({ content: `Sırada Başka Şarkı Yok ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });

        const methods = ['', '🔁', '🔂'];

        const songs = queue.tracks.length;

        const nextSongs = songs > 5 ? `Ve **${songs - 5}** diğer şarkı(lar)...` : `Çalma listesinde **${songs}** şarkı(lar)...`;

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (${track.requestedBy.username} tarafından istendi.)`)

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
        .setAuthor({name: `Sunucu Sırası - ${inter.guild.name} ${methods[queue.repeatMode]}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setDescription(`Şu an Çalan Şarkı: ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`)
        .setTimestamp()
        .setFooter({ text: 'Music comes first - Made with heart by ACRZeuss ❤️', iconURL: inter.member.avatarURL({ dynamic: true })})

        inter.reply({ embeds: [embed] });
    },
};