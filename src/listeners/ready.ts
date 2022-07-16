import { Client } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";
import { Commands } from "../commands";

export default (client: Client): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }
        client.user.setActivity('TRACKING LP GAINS/LOSS', {type: ActivityTypes.COMPETING});

        await client.application.commands.set(Commands);

        console.log(`${client.user.username} online`);
    })
}