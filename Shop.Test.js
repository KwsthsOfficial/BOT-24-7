const { 
  Client, 
  GatewayIntentBits, 
  PermissionsBitField 
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ]
});

const prefix = "!";

client.on("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  // 🗣 !say
  if (cmd === "say") {
    const text = args.join(" ");
    if (!text) return message.reply("❌ Γράψε κάτι να πω.");
    message.channel.send(text);
  }


  if (cmd === "antinuke") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator))
      return message.reply("❌ Δεν έχεις permission.");

    message.channel.send("🛡️ Anti-nuke system ενεργοποιήθηκε.");
  }


  if (cmd === "automove") {
    const member = message.mentions.members.first();
    const channel = message.member.voice.channel;

    if (!member) return message.reply("❌ Κάνε mention κάποιον.");
    if (!channel) return message.reply("❌ Μπες σε voice channel.");

    member.voice.setChannel(channel);
    message.channel.send(`🔄 Έγινε automove στον ${member.user.username}`);
  }


  if (cmd === "vouch") {
    const user = message.mentions.users.first();
    if (!user) return message.reply("❌ Κάνε mention κάποιον.");

    message.channel.send(`✅ **Vouch** στον ${user} από ${message.author}`);
  }


  if (cmd === "ticket") {
    message.guild.channels.create({
      name: `ticket-${message.author.username}`,
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: message.author.id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages
          ]
        }
      ]
    });

    message.reply("🎫 Το ticket σου δημιουργήθηκε.");
  }


  if (cmd === "lock") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels))
      return message.reply("❌ Δεν έχεις permission.");

    message.channel.permissionOverwrites.edit(
      message.guild.id,
      { SendMessages: false }
    );

    message.channel.send("🔒 Το channel κλειδώθηκε.");
  }


  if (cmd === "unlock") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels))
      return message.reply("❌ Δεν έχεις permission.");

    message.channel.permissionOverwrites.edit(
      message.guild.id,
      { SendMessages: true }
    );

    message.channel.send("🔓 Το channel ξεκλειδώθηκε.");
  }
});

client.login("MTQ2NzI0MDU5ODE3MDg5NDQ3OQ.GpPlHu.P1ed7WNBPjK8713qbh2aMblbFDGnTA6WBvIEPc");
