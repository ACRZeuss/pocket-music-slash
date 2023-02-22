const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    description: 'search a track',
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the song you want to search',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ client, inter }) {
        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.reply({ content: `Herhangi bir Sonuç Bulamadım ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });

        const queue = await player.createQueue(inter.guild, {
            metadata: inter.channel,
            leaveOnEnd: client.config.opt.leaveOnEnd,
        });
        const maxTracks = res.tracks.slice(0, 10);

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setAuthor({ name: `${song} İçin Sonuçlar`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nŞu Sayılar Arasından Bir Sayı Seç: **1** ile **${maxTracks.length}** ya da **İptal Et** ⬇️`)
        .setTimestamp()
        .setFooter({ text: 'Music comes first - Made with heart by ACRZeuss ❤️', iconURL: inter.member.avatarURL({ dynamic: true })})

        inter.reply({ embeds: [embed] });

        const collector = inter.channel.createMessageCollector({
            time: 15000,
            max: 1,
            errors: ['time'],
            filter: m => m.author.id === inter.member.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return inter.followUp({ content: `Arama İptal Edildi ✅`, ephemeral: true }), collector.stop();

            const value = parseInt(query);
            if (!value || value <= 0 || value > maxTracks.length) return inter.followUp({ content: `Geçersiz Cevap, Şu Satılar Arasından Sayı Seçmeyi Dene: **1** ile **${maxTracks.length}** ya da **İptal Et**... Tekrar Dene ? ❌`, ephemeral: true });

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(inter.member.voice.channel);
            } catch {
                await player.deleteQueue(inter.guildId);
                return inter.followUp({ content: `Ses Kanalına Bağlanamıyorum ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });
            }

            await inter.followUp(`Arama Sonucun Yükleniyor... 🎧`);

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return inter.followUp({ content:`Arama zaman aşımına uğradı ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true })
        });
    },
};