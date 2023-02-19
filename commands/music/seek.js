const ms = require('ms');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'seek',
    description: 'skip back or foward in a song',
    voiceChannel: true,
    options: [
    {
        name: 'time',
        description: 'time that you want to skip to',
        type: ApplicationCommandOptionType.String,
        required: true,
    }
    ],
    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Şu Anda Çalan Bir Şarkı Yok ${inter.reply}... Tekrar Dene ? ❌`, ephemeral: true });

        const timeToMS = ms(inter.options.getString('time'));

        if (timeToMS >= queue.current.durationMS) return inter.reply({ content:`Belirtilen Süre, Geçerli Şarkının Toplam Süresinden Daha Uzun ${inter.member}... Tekrar Dene ? ❌\n*Örneğin, geçerli bir zamanı deneyin **5s, 10s, 20 saniye, 1m**...*`, ephemeral: true });

        await queue.seek(timeToMS);

        inter.reply({ content: `Geçerli Şarkıda Ayarlanan Süre **${ms(timeToMS, { long: true })}** ✅`});
    },
};