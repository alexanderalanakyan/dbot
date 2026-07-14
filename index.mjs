import { Client, Events, REST, GatewayIntentBits , Routes  } from 'discord.js';
import {configDotenv} from "dotenv";
configDotenv()
const TOKEN = process.env.TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const GUILD_ID = process.env.GUILD_ID

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});


const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
    console.log('Started refreshing application (/) commands.');


    await rest.put(
        Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
    { body: commands }
);
    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}

client.login(TOKEN);