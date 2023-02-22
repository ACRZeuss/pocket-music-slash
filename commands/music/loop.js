const { QueueRepeatMode } = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'enable or disable looping of song\'s or the whole queue',
    voiceChannel: true,
    options: [
        {
        name: 'action' ,
        description: 'what action you want to preform on the loop',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            { name: 'Queue', value: 'enable_loop_queue' },
            { name: 'Disable', value: 'disable_loop'},
            { name: 'Song', value: 'enable_loop_song' },
        ],
    }
    ],
    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Şu Anda Çalan Bir Şarkı Yok ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });
        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === 1) return inter.reply({ content:`Önce döngü modunda mevcut müziği devre dışı bırakmalısınız. (/loop Disable) ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode( QueueRepeatMode.QUEUE);

                return inter.reply({ content:success ? `Döngü modu **etkin** tüm sıra sonsuza kadar tekrarlanacak 🔁` : `Oops! Bir şeyler Ters Gitti ${inter.member}... Tekrar Dene ? ❌` });
                break
            }
            case 'disable_loop': {
                const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                return inter.reply({ content:success ? `Döngü modu **devre dışı**` : `Oops! Bir şeyler Ters Gitti ${inter.member}... Tekrar Dene ? ❌` });
                break
            }
            case 'enable_loop_song': {
                if (queue.repeatMode === 2) return inter.reply({ content:`Önce döngü modunda mevcut müziği devre dışı bırakmalısınız. (/loop Disable) ${inter.member}... Tekrar Dene ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode( QueueRepeatMode.TRACK);
                
                return inter.reply({ content:success ? `Döngü modu **etkin** tüm sıra sonsuza kadar tekrarlanacak (**/loop disable** ile döngüyü sonlandırabilirsiniz)` : `Oops! Bir şeyler Ters Gitti ${inter.member}... Tekrar Dene ? ❌` });
                break
            }
        }
       
    },
};