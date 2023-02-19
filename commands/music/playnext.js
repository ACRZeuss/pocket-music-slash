const { ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'playnext',
    description: "song you want to playnext",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the song you want to playnext',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) {
	await inter.deferReply();
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.editReply({ content: `Şu Anda Çalan Bir Şarkı Yok ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });

        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.editReply({ content: `Sonuç Bulunamadı ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });

       if (res.playlist) return inter.editReply({ content: `Bu komut çalma listeleri için geçerli değildir ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });

        queue.insert(res.tracks[0], 0)

        await inter.editReply({ content:`Track has been inserted into the queue... it will play next 🎧`});

    }
}
