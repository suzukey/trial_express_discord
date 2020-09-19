const { Client } = require("discord.js")

const adminClient = new Client()

adminClient.on("ready", async () => {
  console.log(`Bot logged in as ${adminClient.user.tag}`)
})

module.exports = adminClient
