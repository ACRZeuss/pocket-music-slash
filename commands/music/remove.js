const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'remove',
    description: "remove a song from the queue",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the name/url of the track you want to remove',
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
        const number =  inter.options.getNumber('number')
        const track = inter.options.getString('song');

        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Şu Anda Çalan Bir Şarkı Yok ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });
        if (!track && !number) inter.reply({ content: `Bir şarkıyı kaldırmak için seçeneklerden birini kullanmalısınız. ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });

        if (track) {

        for (let song of queue.tracks) {
            if (song.title === track || song.url === track ) {
                queue.remove(song)
                return inter.reply({ content: `${track} Sıradan Silindi ✅` });
            }

        }

        return inter.reply({ content: `${track} Bulunamadı ${inter.member}... URL'yi veya şarkının tam adını kullanmayı deneyin ? ❌`, ephemeral: true });    
        }

        if (number) {

            const index = number - 1
            const trackname = queue.tracks[index].title

            if (!trackname) return inter.reply({ content: `Bu şarkı yok gibi görünüyor ${inter.member}...  Tekrar Dene ?❌`, ephemeral: true });   

            queue.remove(index);
            
            return inter.reply({ content: `${trackname} Sıradan Silindi ✅` });
        }


         
    }
}