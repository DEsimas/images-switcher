import { Message, ReactionCollector } from "discord.js";
import { Image } from "./types";

export class ImagesSwitcher {
    private readonly message: Message;
    private readonly images: Array<Image>;
    private readonly botID: string;

    private readonly getMessage: Function;
    private readonly lifetime: number;
    private readonly payload: any;

    private readonly collector: ReactionCollector;

    private readonly nextReaction = "➡️";
    private readonly prevReaction = "⬅️";
    private readonly stopReaction = "🛑";

    private iterator: number = 0;
};