const { Client } = require("discord.js")

const anonymouslyClient = new Client()

// クライアントが作業を開始する準備ができると発生します。
anonymouslyClient.on("ready", () => {
  console.log(`Bot logged in as ${anonymouslyClient.user.tag}`)
})

// ユーザーがチャンネルへの入力を開始するたびに発生します。
anonymouslyClient.on("typingStart", (channel, user) => {})

// メッセージが作成されるたびに発生します。
anonymouslyClient.on("message", (message) => {})

// メッセージが削除されるたびに発生します。
anonymouslyClient.on("messageDelete", (message) => {})

module.exports = anonymouslyClient
