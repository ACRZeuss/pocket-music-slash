const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'jump',
    description: "Jumps to particular track in queue",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the name/url of the track you want to jump to',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'the place in the queue the song is in',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) { 
        const track = inter.options.getString('song');
        const number =  inter.options.getNumber('number')

        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Şu Anda Çalan Bir Şarkı Yok ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });
        if (!track && !number) inter.reply({ content: `Bu şarkıyı atlamak için seçeneklerden birini kullanmalısınız. ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });

            if (track) {
        for (let song of queue.tracks) {
            if (song.title === track || song.url === track ) {
                queue.skipTo(song)
                return inter.reply({ content: `${track} adlı şarkıya geçildi ✅` });
            }
        }
        return inter.reply({ content: `${track} Bulunamadı ${inter.member}... URL'yi veya şarkının tam adını kullanmayı deneyin ? ❌`, ephemeral: true });    
    }
    if (number) {
        const index = number - 1
        const trackname = queue.tracks[index].title
        if (!trackname) return inter.reply({ content: `Bu şarkı yok gibi görünüyor ${inter.member}...  Tekrar Dene ?❌`, ephemeral: true });   
        queue.skipTo(index);
        return inter.reply({ content: `${trackname} adlı şarkıya atlandı  ✅` });
    }
         
    }
}