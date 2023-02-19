const { QueryType } = require("discord-player");
const { ApplicationCommandOptionType } = require("discord.js");
module.exports = {
  name: "play",
  description: "play a song!",
  voiceChannel: true,
  options: [
    {
      name: "song",
      description: "the song you want to play",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  async execute({ inter }) {
    await inter.deferReply();
    const song = inter.options.getString("song");
    const res = await player.search(song, {
      requestedBy: inter.member,
      searchEngine: QueryType.AUTO,
    });

    if (!res || !res.tracks.length)
      return inter.editReply({
        content: `Herhangi bir Sonuç Bulamadım ${inter.member}... Tekrar Dene ? ❌`,
        ephemeral: true,
      });

    const queue = await player.createQueue(inter.guild, {
      metadata: inter.channel,
      spotifyBridge: client.config.opt.spotifyBridge,
      initialVolume: client.config.opt.defaultvolume,
      leaveOnEnd: false,
      leaveOnEmpty: false,
    });

    try {
      if (!queue.connection) await queue.connect(inter.member.voice.channel);
    } catch {
      await player.deleteQueue(inter.guildId);
      return inter.editReply({
        content: `Ses Kanalına Bağlanamıyorum. ${inter.member}... Tekrar Dene ? ❌`,
        ephemeral: true,
      });
    }

    await inter.editReply({
      content: `İstediğin ${res.playlist ? "Çalma Listesini" : "Şarkıyı"} Açıyorum... 🎧`,
    });

    res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

    if (!queue.playing) await queue.play();
  },
};
