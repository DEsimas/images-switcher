import { MessageOptions } from "discord.js";

export interface Image {
    url: string;
    data?: Record<string, any>;
};

export type GetMessage = (images: Array<Image>, iterator: number, payload: any) => MessageOptions