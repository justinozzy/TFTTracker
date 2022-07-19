import { CommandInteraction, Client, MessageEmbed, MessageAttachment, DiscordAPIError, Message } from "discord.js";
import { RiotRank, RiotUser } from "src/funcs/RiotUsers";
import { Command } from "../command";
import { rankDivision, rankTier } from "../funcs/RankEnums";
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

        //TFT Image Constants
        const tftIcon = 'https://images.contentstack.io/v3/assets/blt0eb2a2986b796d29/bltf3a04d9af77c8483/6216af02d4d6d062eec35cb3/TFT_Logomark_Gold.png?&height=50&disable=upscale';
        const tftThumbnail = 'https://static.wikia.nocookie.net/leagueoflegends/images/6/60/Reckoning_TFT_set_icon.png/revision/latest/scale-to-width-down/76?cb=20210430004941';

        //Create embed
        const summonerEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('TFT RANK TRACKER')
        .setURL('https://github.com/justinozzy/TFTTracker')
        .setAuthor({ name: interaction.user.tag, iconURL: tftIcon})
        .setThumbnail(tftThumbnail)
        .setTimestamp();

        //Create embed fields based on number of users
        for (let i = 0; i < totalUsers; i++) {
            let tierString = rankTier[riotUsers[i].rank.tier];
            let divString = rankDivision[riotUsers[i].rank.division];
            let lpString = riotUsers[i].rank.lp;

            summonerEmbed.addField(riotUsers[i].username, `${tierString} ${divString}: ${lpString} LP`);
        }

        //Post embed to discord
        await interaction.followUp(
            {embeds: [summonerEmbed]}
        );
    }
}