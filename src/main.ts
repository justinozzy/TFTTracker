import key from "./constants/keys.json";
import { Client, ClientOptions } from "discord.js";
import ready from "./listeners/ready";

console.log("Bot loading...")

const client = new Client({
    intents: []
});

ready(client);

client.login(key.DiscordAPIKey);

//console.log(client);