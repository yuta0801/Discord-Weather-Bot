require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const request = require('request')
const japanese = require('./japanese.json')
const url = 'http://api.openweathermap.org/data/2.5/weather'
const location = 'yamaguchi-ken,jp'
const units = 'metric'

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
  if (message.content === '!山口県の天気') {
    request(url, {
      method: 'get',
      qs: {
        q: location,
        units: units,
        appid: process.env.APIKEY,
      },
    }, (err, res, data) => {
      if (err) return message.reply('エラー', err.toString())
      if (res.statusCode !== 200) return message.reply('エラー', data)
      message.channel.send({embed: {
        color: 3447003,
        author: {
          name: 'OpenWeatherMap',
          icon_url: 'https://raw.githubusercontent.com/danyweis/pics4codepen/master/weather/icon/openweathermap.png',
        },
        title: '盛岡市のお天気情報',
        url: 'https://openweathermap.org',
        description: 'OpenWeatherMapのAPI叩いたデータです。',
        fields: [
          { name: '天気', value: japanese[data.weather[0].id]},
          { name: '気温', value: data.main.temp + '°C' },
          { name: '風力', value: data.wind.speed + 'm' },
          { name: '風向', value: data.wind.deg + '°' },
          { name: '雲量', value: data.clouds.all + '%' },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: 'http://openweathermap.org/img/w/' + data.weather[0].icon +'.png',
          text: 'This bot is corded by 3mdev. All rights reserved.',
        },
      }})
    })
  }
})

client.login(process.env.TOKEN)
