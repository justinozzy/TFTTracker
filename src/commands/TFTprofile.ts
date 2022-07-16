import { BaseCommandInteraction, Client, Message } from "discord.js";
import { Command } from "../command";
import grabProfile from "../funcs/grabProfile";

//NOTE: THE JOB OF THIS DISCORD COMMAND IS TO MAKE THE DATA FROM grabProfile LOOK PRETTY IN A DISCORD EMBED

export const TFTprofile: Command = {
    name: "tftprofile",
    description: "Returns a TFT profile",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const temp = await grabProfile("Zunatobi", "summonerLevel");

        const content = `${temp}`;
        
        //DEBUG
        console.log("\n##########################################")
        console.log(content);
        console.log("##########################################\n")
        //DEBUG

        await interaction.followUp({
            ephemeral: true,
            content
        })
    }
}