module.exports = {
    name: 'skip',
    description: 'stop the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

         if (!queue || !queue.playing) return inter.reply({ content:`Şu Anda Çalan Bir Şarkı Yok ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });

        const success = queue.skip();

        return inter.reply({ content: success ? `Şu anki Şarkı: ${queue.current.title} Geçildi ✅` : `Oops! Bir şeyler Ters Gitti ${inter.member}... Tekrar Dene ? ❌`});
    },
};