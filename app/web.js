const adminClient = require("./bot/admin")
const anonymouslyClient = require("./bot/anonymously")

const express = require("express")
const multer = require("multer")
const upload = multer()

const app = express()
app.use(express.json())

const server = app.listen(3000, "127.0.0.1", () => {
  console.log(`HTTP server is listening to port ${server.address().port}`)
})

app.get("/", (req, res) => {
  res.json({
    adminClient: adminClient.ws,
    anonymouslyClient: anonymouslyClient.ws,
  })
})

app.post("/bots/admin", upload.none(), (req, res) => {
  try {
    adminClient.login(req.body.token)
  } catch (err) {
    console.log(err)
    res.json({ status: "error" })
    return
  }
  res.json({ status: "success" })
})

app.post("/bots/anonymously", upload.none(), (req, res) => {
  try {
    anonymouslyClient.login(req.body.token)
  } catch (err) {
    console.log(err)
    res.json({ status: "error" })
    return
  }
  res.json({ status: "success" })
})

app.get("/guilds", (req, res) => {
  const client = adminClient
  const guilds = client.guilds.cache.clone()
  const ownerGuilds = guilds.filter((guild) => guild.ownerID === client.user.id)
  const filteredGuilds = ownerGuilds.map((guild) => {
    return {
      id: guild.id,
      name: guild.name,
      memberCount: guild.memberCount,
      region: guild.region,
      iconURL: guild.iconURL,
    }
  })
  res.json(filteredGuilds)
})

app.post("/guilds", upload.none(), (req, res) => {
  const client = adminClient
  const name = req.body.name
  const options = {}

  client.guilds
    .create(name, options)
    .then(() => res.json({ status: "success" }))
    .catch((err) => {
      console.log(err)
      res.json({ status: "error" })
    })
})

app.delete("/guilds/:guildId", (req, res) => {
  const client = adminClient
  client.guilds
    .fetch(req.params.guildId)
    .then((guild) => {
      guild
        .delete()
        .then(() => res.json({ status: "success" }))
        .catch((err) => {
          console.log(err)
          res.json({ status: "error" })
        })
    })
    .catch((err) => res.json({ status: "error" }))
})

app.get("/regions", async (req, res) => {
  const regions = await adminClient.fetchVoiceRegions()
  const regionNames = regions.map((region) => {
    return {
      id: region.id,
      name: region.name,
    }
  })

  res.json(regionNames)
})
