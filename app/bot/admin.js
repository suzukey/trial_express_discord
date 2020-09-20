const { Client } = require("discord.js")

const adminClient = new Client()

// クライアントが作業を開始する準備ができると発生します。
adminClient.on("ready", async () => {
  console.log(`Bot logged in as ${adminClient.user.tag}`)
})

// ギルドメンバーが変更されるたびに呼び出されます。
adminClient.on("guildMemberUpdate", (before, after) => {})

// メンバーが音声状態を変更するたびに発生します。
adminClient.on("voiceStateUpdate", (before, after) => {})

module.exports = adminClient
