import { CommandInteraction, Client } from "discord.js";
import { RiotRank, RiotUser } from "src/funcs/RiotUsers";
import { Command } from "../command";
import sortUsers from "../funcs/SortUsers";
import callRiotAPI from "../funcs/GrabProfile";

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
        let riotUsers: RiotUser[] = [];

        //Track number of accounts requested
        let totalUsers: number = 0;

        //Iterate through all username parameters
        for (let i = 1; i < 4; i++){
            //Check username at i
            if (interaction.options.getString(`username${i}`)){
                //Get the username from the options given above
                const user = interaction.options.getString(`username${i}`, true);
                //Grab summonerLevel from user profile
                const rank: RiotRank | undefined = await callRiotAPI(`${user}` , "id");
                //Check if the profile wasn't acquired successfully (Error: -1)
                if (rank === undefined || rank.tier === undefined) {
                    break;
                }
                //Store the username and level in riotUsers array
                riotUsers.push({username: user, rank:rank});
                totalUsers++;
            }
            else {
                break;
            }
        }

        //Check if there is more than one summoner in riotUsers
        if (!(totalUsers <= 1)){
            riotUsers = sortUsers(riotUsers);
        }

        const content = `TEMP: ${riotUsers[0].username}`;
        
        //DEBUG
        console.log("\n##########################################")
        //console.log("Post-Sort: " + JSON.stringify(riotUsers, null, 2));
        console.log(riotUsers[0].rank);
        console.log(content);
        console.log("##########################################\n")
        //DEBUG

        await interaction.followUp({
            content
        })
    }
}