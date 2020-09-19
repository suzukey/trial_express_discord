const { Client } = require("discord.js")

const adminClient = new Client()
const anonymouslyClient = new Client()

adminClient.on("ready", async () => {
  console.log(`Bot logged in as ${adminClient.user.tag}`)
})

anonymouslyClient.on("ready", () => {
  console.log(`Bot logged in as ${anonymouslyClient.user.tag}`)
})

// --------------------------------------

const WebSocket = require("ws")

const wss = new WebSocket.Server({ port: 5000, host: "127.0.0.1" }, () => {
  console.log(`WebSocket server is listening to port ${wss.address().port}`)
})

wss.on("connection", function connection(ws, req) {
  console.log("client connected.")
  ws.on("close", () => {
    console.log("client disconnected.")
  })
})

// --------------------------------------

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
