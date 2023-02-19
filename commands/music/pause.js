module.exports = {
  name: "pause",
  description: "pause the track",
  voiceChannel: true,

  execute({ inter }) {
    const queue = player.getQueue(inter.guildId);

    if (!queue)
      return inter.reply({
        content: `Şu Anda Çalan Bir Şarkı Yok ${inter.member}... Tekrar Dene ? ❌`,
        ephemeral: true,
      });

    if (queue.connection.paused)
      return inter.reply({
        content: "Şarkı şu anda duraklatılmış durumda!",
        ephemeral: true,
      });

    if (queue.connection.paused)
      return inter.reply({
        content: `Şarkı şu anda duraklatılmış durumda, ${inter.member}... Tekrar Dene ? ❌`,
        ephemeral: true,
      });

    const success = queue.setPaused(true);

    return inter.reply({
      content: success
        ? `Şu an Çalan Şarkı ${queue.current.title} durduruldu ✅`
        : `Oops! Bir şeyler Ters Gitti ${inter.member}... Tekrar Dene ? ❌`,
    });
  },
};
