import { MessageOptions, Message } from "discord.js";

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
export type GetMessage = (images: Array<Image>, iterator: number, payload: any) => Promise<MessageOptions>;


/**
 * Data that should be passet to the ImagesSwitcher constructor
 * @param message Message with images
 * @param images Array of images to swich
 * @param botID Id of the bot for filtering it's reactions
 * @param getMessage Function that returns new message, according to the iterator value
 * @param lifetime Time in milliseconds during which the switcher will work
 * @param payload Custom data, will be availible from getMessage function
 */
export interface SwitcherOptions {
    message: Message;
    images: Array<Image>;
    botID: string;
    getMessage?: GetMessage;
    lifetime?: number;
    payload?: any;
};