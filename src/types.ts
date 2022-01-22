import { MessageOptions } from "discord.js";

/**
 * One of the switchable images
 * @param url Image url
 * @param data Information about image, can be used from getMessage function
 */
export interface Image {
    url: string;
    data?: Record<string, any>;
};

/**
 * Function that returns new message, according to the iterator value
 * @param images Array of images to swich
 * @param iterator Position for current image
 * @param payload Custom user data
 */
export type GetMessage = (images: Array<Image>, iterator: number, payload: any) => MessageOptions
