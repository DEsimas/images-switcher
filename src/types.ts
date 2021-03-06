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
 * Data that should be passed to the ImagesSwitcher constructor
 * @param message Message with images
 * @param images Array of images to switch
 * @param getMessage Function that returns new message, according to the iterator value
 * @param lifetime Time in milliseconds during which the switcher will work
 * @param payload Custom data, will be available from getMessage function
 * @param users List of users, who can use navigation bar 
 */
export interface SwitcherOptions {
    message: Message;
    images: Array<Image>;
    getMessage?: GetMessage;
    lifetime?: number;
    payload?: any;
    users?: string[];
};