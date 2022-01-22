import { Message, ReactionCollector, MessageOptions } from "discord.js";
import { GetMessage, Image, SwitcherOptions } from "./types";

export class ImagesSwitcher {
    private readonly message: Message;
    private readonly images: Array<Image>;
    private readonly botID: string;

    private readonly getMessage: GetMessage;
    private readonly lifetime: number;
    private readonly payload: any;

    private readonly collector: ReactionCollector;

    private readonly nextReaction = "➡️";
    private readonly prevReaction = "⬅️";
    private readonly stopReaction = "🛑";

    private iterator: number = 0;

    constructor(options: SwitcherOptions) {
        this.message = options.message;
        this.images = options.images;
        this.botID = options.botID;

        this.getMessage = options.getMessage || this.DefaultGetMessage;
        this.lifetime = options.lifetime || 1000*60*60*12;
        this.payload = options.payload;
    }

    private async DefaultGetMessage(images: Array<Image>, iterator: number, payload: any): Promise<MessageOptions> {
        return {};
    }
};