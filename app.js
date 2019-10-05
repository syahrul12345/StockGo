const Telegraf = require('telegraf')
const {getPrice} =  require('./api.js')
require('dotenv').config()
//Creates the bot
const bot = new Telegraf(process.env.BOTTOKEN)
bot.start((ctx) => ctx.reply('This is a stock price bot'))
bot.hears(/^\/([a-z0-9]+$)/i, async (ctx) => {
    const ticker = ctx.match[1]
    const dataArray = await getPrice(ticker)
    if (dataArray == false) {
        let replyString = `Failed to get the price of ${ticker} stock. \nPlease use only stocks registered by Yahoo Finance.`
        ctx.reply(replyString)
    }else{
        let currency = dataArray[0]
        let instrumentType = dataArray[1]
        let symbol = dataArray[2]
        let curPrice = dataArray[3]
        let prevPrice = dataArray[4]
        let diff = Math.round((curPrice - prevPrice)*100) / 100
        let percentageDiff = Math.round((diff/prevPrice)*100*100)/100
        replyString = `Price of ${symbol} stock: \n${currency} ${curPrice} (\$${diff},${percentageDiff}%)\nType: ${instrumentType} `
        ctx.reply(replyString)
    }
    

})
bot.launch()