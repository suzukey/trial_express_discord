const { Client } = require("discord.js")

const anonymouslyClient = new Client()

anonymouslyClient.on("ready", () => {
  console.log(`Bot logged in as ${anonymouslyClient.user.tag}`)
})

module.exports = anonymouslyClient
