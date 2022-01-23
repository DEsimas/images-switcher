# Images switcher

Library for discord bots. Creates message with changeable embed image

## Intallation

`npm i images-switcher`

## Appearance

### Default

<img src="https://media.discordapp.net/attachments/923812813573599242/934847705526710282/2022-01-23_193050.png?width=303&height=341">

Output can be customized using `getMessage` option

# Usage

## Intents

It is important to include `GUILD_MESSAGE_REACTIONS` intent in intents array

``` javascript
import { Client, Intents } from "discord.js";

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS   // access to message reactions
    ]
});
```

## Creating class

Images switcher is a class that requires options object

### Example

``` typescript 
import { ImagesSwitcher, SwitcherOptions } from "images-switcher";

const msg = await message.channel.send("Loading...");
    const options: SwitcherOptions = {
        message: msg,
        users: [message.author.id],
        images: [
            { url: "https://safebooru.org/images/3290/32e2b9af79934b80c17a6219b4bacc0d6f644da1.png" },
            { url: "https://safebooru.org/images/2092/b9eab49b3cb2648a066a8d3536c7e87531a61873.jpg" },
            { url: "https://safebooru.org/images/3452/6871400c0c15dab61f908ea6ac12611f821982f0.jpg" },
            { url: "https://safebooru.org/images/3249/9e770e73b2e551c262c8cc1fd93406767bbe2376.jpg" },
        ]
    }
    
    new ImagesSwitcher(options)
```

### SwitcherOptions

``` typescript
/**
 * Data that should be passet to the ImagesSwitcher constructor
 * @param message Message with images
 * @param images Array of images to swich
 * @param getMessage Function that returns new message, according to the iterator value
 * @param lifetime Time in milliseconds during which the switcher will work
 * @param payload Custom data, will be availible from getMessage function
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
```

## Options

### getMessage

`getMessage` is a function that returns new message, according to the iterator value

``` typescript
type GetMessage = (images: Array<Image>, iterator: number, payload: any) => Promise<MessageOptions>;
```

If not stated will be used default `getMessage` function

``` typescript
function DefaultGetMessage(images: Array<Image>, iterator: number, payload: any): Promise<MessageOptions> {
    const embed = new MessageEmbed()
    if(this.validateURL(images[iterator].url)) {
        embed.setTitle(`${iterator+1}/${images.length}`);
        embed.setImage(images[iterator].url);
    } else {
        embed.setTitle(`${iterator+1}/${images.length}\nFailed to load image`);
    }

    return { content: "Use reactions to navigate through images!", embeds: [embed] }
}
```

### lifetime

Time after which the message will be deleted. If not stated equals 12 hours.

### payload

Data that will be availible from `getMessage` function

### users

List of users ids that can use navigation bar. If not stated anybody will be able to use it

# Examples

## Javascript

``` javascript
import { Client, Intents } from "discord.js";
import { ImagesSwitcher } from "images-switcher";

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

let switcher;

client.on("messageCreate", async (message) => {
    if(switcher && message.content === "next") return switcher.next();
    if(switcher && message.content === "prev") return switcher.prev();
    if(switcher && message.content === "end") return switcher.end();

    if (message.content !== "show") return;

    const msg = await message.channel.send("Loading...");

    const options = {
        message: msg,
        images: [
            { url: "https://safebooru.org/images/3290/32e2b9af79934b80c17a6219b4bacc0d6f644da1.png" },
            { url: "https://safebooru.org/images/2092/b9eab49b3cb2648a066a8d3536c7e87531a61873.jpg" },
            { url: "https://safebooru.org/images/3452/6871400c0c15dab61f908ea6ac12611f821982f0.jpg" },
            { url: "https://safebooru.org/images/3249/9e770e73b2e551c262c8cc1fd93406767bbe2376.jpg" },
        ],
        lifetime: 1000 * 60 * 60, // 1 hour
        users: [message.author.id]
    }
    
    switcher = new ImagesSwitcher(options);
})

client.login(process.env.TOKEN);
```

## Typescript

``` typescript
import { Client, Intents } from "discord.js";
import { ImagesSwitcher, Image } from "images-switcher";

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

let switcher: ImagesSwitcher | undefined;

client.on("messageCreate", async (message) => {
    if(switcher && message.content === "next") return switcher.next();
    if(switcher && message.content === "prev") return switcher.prev();
    if(switcher && message.content === "end") return switcher.end();

    if (message.content !== "show") return;

    const msg = await message.channel.send("Loading...");

    const images: Array<Image> = [
        { url: "https://safebooru.org/images/3290/32e2b9af79934b80c17a6219b4bacc0d6f644da1.png" },
        { url: "https://safebooru.org/images/2092/b9eab49b3cb2648a066a8d3536c7e87531a61873.jpg" },
        { url: "https://safebooru.org/images/3452/6871400c0c15dab61f908ea6ac12611f821982f0.jpg" },
        { url: "https://safebooru.org/images/3249/9e770e73b2e551c262c8cc1fd93406767bbe2376.jpg" },
    ];

    const options = {
        message: msg,
        images: images,
        lifetime: 1000 * 60 * 60, // 1 hour
        users: [message.author.id]
    }
    
    switcher = new ImagesSwitcher(options);
})

client.login(process.env.TOKEN);
```