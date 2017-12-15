# Discord-Weather-Bot

OpenWeatherAPIから取得した天気を表示するDiscordボット

## Description

Discordで`!{地名}の天気`と打つとgeocoderで緯度経度を
割り出しOpenWeatherAPIを使用して天気を取得して返すものです。

![DEMO](https://i.imgur.com/80wH1TG.png)

## Requirement

- discord.js
- geocoder
- request

## Usage

1. インストール
2. `.env`を編集
3. 実行
```
$ node main
```

## Installation

1, clone
```
$ git clone https://github.com/yuta0801/Discord-Weather-Bot
```

2, install
```
$ npm install
```

## Author

- [Makoto Ito](https://github.com/MakotiaFrontia)
- [yuta0801](https://github.com/yuta0801)

## License

[MIT](https://github.com/yuta0801/Discord-Weather-Bot/blob/master/LICENSE)
