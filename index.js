require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const request = require('request')
const geocoder = require('geocoder')
const data = require('./data.json')
const url = 'http://api.openweathermap.org/data/2.5/weather'
const location = 'yamaguchi-ken,jp'
const units = 'metric'

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
  if (/^.+の天気$/.test(message.content)) {
    const place = message.content.match(/^!(.+)の天気$/)[1]
    geocoder.geocode(place, (err, geo) => {
      if (err) return message.reply('エラー', err.toString())
      request(url, {
        method: 'get',
        json: true,
        qs: {
          q: location,
          units: units,
          appid: process.env.APIKEY,
          lat: geo.results[0].geometry.location.lat,
          lng: geo.results[0].geometry.location.lng,
        },
      }, (err, res, json) => {
        if (err) return message.reply('エラー', err.toString())
        if (res.statusCode !== 200) return message.reply('エラー', json)
        message.channel.send({embed: {
          color: 3447003,
          author: {
            name: 'OpenWeatherMap',
            icon_url: 'https://raw.githubusercontent.com/danyweis/pics4codepen/master/weather/icon/openweathermap.png',
          },
          title: place + 'のお天気情報',
          url: 'https://openweathermap.org',
          description: 'OpenWeatherMapのAPI叩いたデータです。',
          fields: [
            { name: '天気', value: data.weather[json.weather[0].id]},
            { name: '気温', value: json.main.temp + '°C' },
            { name: '風力', value: json.wind.speed + 'm' },
            { name: '風向', value: data.direction[Math.round(json.wind.deg / 22.5)] },
            { name: '雲量', value: json.clouds.all + '%' },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: 'http://openweathermap.org/img/w/' + json.weather[0].icon.replace('n', 'd') +'.png',
            text: 'This bot is corded by 3mdev. All rights reserved.',
          },
        }})
      })
    })
  }
})

client.login(process.env.TOKEN)
