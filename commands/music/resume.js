module.exports = {
    name: 'resume',
    description: 'play the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Şu Anda Çalan Bir Şarkı Yok ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });
        

        if(!queue.connection.paused) return inter.reply({content: `Şarkı zaten çalıyor, ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true})

        const success = queue.setPaused(false);
        
        return inter.reply({ content:success ? `Şu an Çalan Şarkı: ${queue.current.title} Sürdürüldü ✅` : `Oops! Bir şeyler Ters Gitti ${inter.member}... Tekrar Dene ? ❌`});
    },
};
