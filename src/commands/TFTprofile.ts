import { CommandInteraction, Client } from "discord.js";
import { Command } from "../command";
import grabProfile from "../funcs/grabProfile";

//NOTE: THE JOB OF THIS DISCORD COMMAND IS TO MAKE THE DATA FROM grabProfile LOOK PRETTY IN A DISCORD EMBED

export const TFTprofile: Command = {
    name: "tftprofile",
    description: "Returns a TFT profile",
    type: "CHAT_INPUT",
    options: [
        {
            name: "username",
            description: "Enter your League of Legends profile",
            required: true,
            type: "STRING"
        }
    ],
    async handleData(client: Client, interaction: CommandInteraction) {

        const temp = interaction.options.getString("username", true);
        const user = await grabProfile(`${temp}` , "summonerLevel");
        const content = `${user}`;
        
        //DEBUG
        console.log("\n##########################################")
        console.log(user);
        console.log(content);
        console.log("##########################################\n")
        //DEBUG

        await interaction.followUp({
            content
        })
    }
}