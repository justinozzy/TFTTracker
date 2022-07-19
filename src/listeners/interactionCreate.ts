import { CommandInteraction, Client, Interaction, ContextMenuInteraction } from "discord.js";
import { Commands } from "../commands";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand()) {
            await slashHandler(client, interaction);
        }
    })
};

const slashHandler = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "Error handling slash command!"})
        return;
    }

    slashCommand.handleData(client, interaction);
};