import { Message, ReactionCollector, MessageOptions, MessageReaction, User } from "discord.js";
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

        this.collector = this.message.createReactionCollector(
            (reaction, user) => (this.filter(reaction, user)),
            { time: this.lifetime }
        );

        this.setReactions().then(() => {
            this.collector.on("collect", (reaction: MessageReaction, user: User) => {});
            this.collector.on("remove", (reaction: MessageReaction, user: User) => {});
            this.collector.on("end", () => {});
        })
    }

    private async DefaultGetMessage(images: Array<Image>, iterator: number, payload: any): Promise<MessageOptions> {
        return {};
    }

    private filter(reaction: MessageReaction, user: User): boolean {
        return (reaction.emoji.name === this.nextReaction ||
            reaction.emoji.name === this.prevReaction ||
            reaction.emoji.name === this.stopReaction) &&
            user.id != this.botID;
    }

    private async setReactions(): Promise<void> {
        await this.message.react(this.prevReaction);
        await this.message.react(this.stopReaction);
        await this.message.react(this.nextReaction);
    }
};