import { Command } from "./command";
import { Ping } from "./commands/ping";
import { TFTprofile } from "./commands/TFTprofile";

export const Commands: Command[] = [Ping, TFTprofile];