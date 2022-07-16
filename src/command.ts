import { CommandInteraction, ChatInputApplicationCommandData, Client, ContextMenuInteraction } from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    //Data handler for commands (https://discord.js.org/#/docs/discord.js/main/class/CommandInteraction)
    handleData(client: Client, interaction: CommandInteraction): Promise<void>;
    //Context menu handler
    handleContextMenu?(client: Client, interaction: ContextMenuInteraction): Promise<void>;
}