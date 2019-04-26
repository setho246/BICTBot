# BICTBot
## A bot for the BICT

# Getting started with the bot
- Ask me (Seth) to add you as a contributer to this git repo so you can make changes straight to source
- If you don't have it yet, install [git](https://git-scm.com/)
- Clone it to a local repository with "`git clone https://github.com/setho246/BICTBot.git`"
- The simplest way to wrap your head around git is to use Visual Studio Code's built in source control helper on the lefthand side
- **IMPORTANT: run command "`git checkout staging`" in  /BICTBot/**

You now have two options:

1. [Always commit to staging and wait for heroku to detect changes(~30 seconds before commited changes go live)](#the-simple-way-(wait-for-heroku))  
or for the more impatient...
2. [Set up heroku to run locally](#set-up-local-running)  

---
### The simple way (wait for heroku)
---
1. Make your changes and commit  
2. Go to the bot on heroku, click "More" (upper right) then "View logs"
3. Once you see the bot say "I am ready!", test changes in the discord

---
### Set up Local running
---
- If you don't have it, install [node.js](https://nodejs.org/en/) 
- Fetch Discord.js using npm: "`npm install discord.js`"  
1. [Install the Heroku CLI from here](https://devcenter.heroku.com/articles/heroku-cli)  
2. Run the command: "`heroku login`", then hit any key, login using credentials from pinned message  
3. Run the command pinned in the Discord channel (note: this is done to keep the private bot token out of github)
4. Run "`heroku local`" to start the bot locally
  * Additional Step  
If you know that no-one else is currently developing on the bot, run `heroku maintenance:on` to prevent dual messages  
**_DO NOT FORGET TO TURN THIS BACK OFF WITH "`heroku maintenance:off`"_**
