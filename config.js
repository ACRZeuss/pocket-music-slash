module.exports = {
  app: {
    global: true,
    guild: "826867748763074620",
  },

  opt: {
    DJ: {
      enabled: false,
      roleName: "sarı",
      commands: [],
    },
    maxVol: 100,
    leaveOnEnd: true,
    loopMessage: false,
    spotifyBridge: true,
    defaultvolume: 75,
    discordPlayer: {
      ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
      },
    },
  },
};
