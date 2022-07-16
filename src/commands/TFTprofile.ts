import { CommandInteraction, Client } from "discord.js";
import { RiotUser } from "src/funcs/RiotUsers";
import { Command } from "../command";
import grabProfile from "../funcs/GrabProfile";

//NOTE: THE JOB OF THIS DISCORD COMMAND IS TO MAKE THE DATA FROM grabProfile LOOK PRETTY IN A DISCORD EMBED

export const TFTprofile: Command = {
    name: "tftprofile",
    description: "Returns a TFT profile",
    type: "CHAT_INPUT",
    options: [
        {
            name: "username1",
            description: "Enter your League of Legends profile",
            required: true,
            type: "STRING"
        },
        {
            name: "username2",
            description: "Second League of Legends profile",
            required: false,
            type: "STRING"
        },
        {
            name: "username3",
            description: "Third League of Legends profile",
            required: false,
            type: "STRING"
        }
    ],
    async handleData(client: Client, interaction: CommandInteraction) {
        //Initialize array for future summoners
        const riotUsers: RiotUser[] = [];

        //Iterate through all username parameters
        for (let i = 1; i < 4; i++){
            //Check username at i
            if (interaction.options.getString(`username${i}`)){
                //Get the username from the options given above
                const user = interaction.options.getString(`username${i}`, true);
                //Grab summonerLevel from user profile
                const summonerLevel = await grabProfile(`${user}` , "summonerLevel")
                //Store the username and level in riotUsers array
                riotUsers.push({username:user, level:summonerLevel});
            }
            else {
                break;
            }
        }

        const content = `${riotUsers.forEach(user => {console.log(user.level)})}`;
        
        //DEBUG
        console.log("\n##########################################")
        console.log(riotUsers);
        console.log(content);
        console.log("##########################################\n")
        //DEBUG

        await interaction.followUp({
            content
        })
    }
}