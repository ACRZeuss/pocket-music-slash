module.exports = {
    name: 'shuffle',
    description: 'shuffle the track',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Şu Anda Çalan Bir Şarkı Yok ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });

        if (!queue.tracks[0]) return inter.reply({ content: `Sırada Başka Şarkı Yok ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });

        await queue.shuffle();

        return inter.reply({ content:`Sıradaki Şarkılar Karıştırıldı **${queue.tracks.length}** şarkı(lar) ! ✅`});
    },
};