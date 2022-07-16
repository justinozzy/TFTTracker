import { CommandInteraction, ChatInputApplicationCommandData, Client, ContextMenuInteraction } from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    handleData(client: Client, interaction: CommandInteraction): Promise<void>;

    handleContextMenu?(client: Client, interaction: ContextMenuInteraction): Promise<void>;
}