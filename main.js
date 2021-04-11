//constants
const Discord = require('discord.js');
const client = new Discord.Client();

//variables
var token = "";
var prefix = ".";

//commands
var commands = [
    {
        "Name" : (prefix + "help"),
        "Description" : "Gives a list of the current commands",
        "Command" : function(msg){
            var chnl = msg.channel;
            const helpEmbed = new Discord.MessageEmbed();
            helpEmbed.setColor("#8f66cc");
            helpEmbed.setTitle("Help Menu");
            for(i = 0; i < Object.keys(commands).length; i++){
                var cmd = commands[i];
                helpEmbed.addField(cmd.Name, cmd.Description);
            }
            chnl.send(helpEmbed);
        }
    },
    {
        "Name" : (prefix + "swag"),
        "Description" : "Does a little bit of trolling...",
        "responses" : ["🧙: Swag", "Epic moment", "Swag?", "SWAG", "😎"],
        "Command" : function(msg) {
            msg.channel.send(this.responses[Math.floor(Math.random()*this.responses.length)]);
            msg.react("😎");
        }

    },
    {
        "Name" : (prefix + "reminder"),
        "Description" : "Tells you the name of the server that you are in",
        "Command" : function(msg){
            msg.channel.send(msg.author.toString() + " the server name is " + msg.guild.toString());
        }
    },
    {
        "Name" : (prefix + "insult"),
        "Description" : "Insults the other user mentioned",
        "Insults" : ["isn't swag 🙃", "eats sand", "has no drip", "has an empty brain"],
        "Command" : function(msg){
            var splitString = msg.content.split(" ");
            msg.channel.send(splitString[1] + " " + this.Insults[Math.floor(Math.random()*this.Insults.length)]);
        }
    }
]

client.on("ready", () => {
    console.log("Connected as " + client.user.tag);
    client.user.setActivity("Type .help for help!");
})

client.on("message", (msg) => {
    if (msg.author == client.user || msg.guild == null) {
        return;
    }
    for (i = 0; i < Object.keys(commands).length; i++){
        var command = commands[i];
        var commandName = command.Name;
        var lowerMsg = msg.content.toLocaleLowerCase();
        var stringTable = lowerMsg.split(" ");
        if(stringTable[0] == commandName){
            command.Command(msg);
        }
    }
})

client.login(token);