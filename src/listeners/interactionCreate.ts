import { BaseCommandInteraction, Client, Interaction } from "discord.js";
import { Commands } from "../commands";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            await slashHandler(client, interaction);
        }
    })
};

const slashHandler = async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "Error handling slash command!"})
        return;
    }

    await interaction.deferReply();

    slashCommand.run(client, interaction);
};