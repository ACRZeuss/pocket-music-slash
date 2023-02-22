module.exports = {
    name: 'stop',
    description: 'stop the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content:`Şu Anda Çalan Bir Şarkı Yok ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });

        queue.destroy();

        inter.reply({ content: `Müzik bu sunucuda durduruldu, bir dahaki sefere görüşürüz ✅`});
    },
};