const ChromecastAPI = require('chromecast-api')

const media = {
  url : 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4',
  subtitles: [
    {
      language: 'en-US',
      url: 'https://raw.githubusercontent.com/alxhotel/chromecast-api/master/test/captions_styled.vtt',
      name: 'English',
    },
    {
      language: 'es-ES',
      url: 'https://raw.githubusercontent.com/alxhotel/chromecast-api/master/test/captions_styled_es.vtt',
      name: 'Spanish',
    }
  ],
  cover: {
    title: 'Training',
    url: 'http://localhost:8080/'
  },
  subtitles_style: {
    backgroundColor: '#FFFFFF00', // see http://dev.w3.org/csswg/css-color/#hex-notation
    foregroundColor: '#FFFFFFFF', // see http://dev.w3.org/csswg/css-color/#hex-notation
    edgeType: 'OUTLINE', // can be: "NONE", "OUTLINE", "DROP_SHADOW", "RAISED", "DEPRESSED"
    edgeColor: '#000000FF', // see http://dev.w3.org/csswg/css-color/#hex-notation
    fontScale: 1.2, // transforms into "font-size: " + (fontScale*100) +"%"
    fontStyle: 'BOLD', // can be: "NORMAL", "BOLD", "BOLD_ITALIC", "ITALIC",
    fontFamily: 'Droid Sans',
    fontGenericFamily: 'SANS_SERIF', // can be: "SANS_SERIF", "MONOSPACED_SANS_SERIF", "SERIF", "MONOSPACED_SERIF", "CASUAL", "CURSIVE", "SMALL_CAPITALS",
    //windowColor: '#AA00FFFF', // see http://dev.w3.org/csswg/css-color/#hex-notation
    //windowRoundedCornerRadius: 10, // radius in px
    //windowType: 'ROUNDED_CORNERS' // can be: "NONE", "NORMAL", "ROUNDED_CORNERS"
  }
}

const client = new ChromecastAPI()

client.on('device', function (device) {
  device.play(media, function (err) {
    if (!err) console.log('Playing in your chromecast')
  })
})