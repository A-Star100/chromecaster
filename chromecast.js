const ChromecastAPI = require('chromecast-api');
const readline = require('readline');

const client = new ChromecastAPI();
const devices = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Wait for devices to be discovered for a short time
console.log('Searching for Chromecast devices...');

client.on('device', (device) => {
  devices.push(device);
  console.log(`Found device #${devices.length}: ${device.friendlyName}`);
});

// After 5 seconds, prompt user to pick device and enter media info
setTimeout(() => {
  if (devices.length === 0) {
    console.log('No devices found. Exiting.');
    rl.close();
    process.exit(1);
  } else {
    askDevice();
  }
}, 5000);

function askDevice() {
  rl.question(`Select a device (1-${devices.length}): `, (deviceIndex) => {
    const index = parseInt(deviceIndex, 10) - 1;
    if (isNaN(index) || index < 0 || index >= devices.length) {
      console.log('Invalid device number.');
      return askDevice();
    }
    const device = devices[index];
    askUrl(device);
  });
}

function askUrl(device) {
  rl.question('Enter media URL to play: ', (url) => {
    if (!url) {
      console.log('Media URL is required.');
      return askUrl(device);
    }
    askSubtitles(device, url);
  });
}

function askSubtitles(device, url) {
  rl.question('Enter subtitles URL (optional): ', (subtitlesUrl) => {
    askTitle(device, url, subtitlesUrl);
  });
}

function askTitle(device, url, subtitlesUrl) {
  rl.question('Enter title (optional): ', (title) => {
    const media = {
      url: url,
      subtitles: [],
      cover: {
        url: 'https://via.placeholder.com/480x270.png?text=No+Cover',
        title: title || 'Untitled',
      },
      subtitles_style: {
        backgroundColor: '#FFFFFF00',
        foregroundColor: '#FFFFFFFF',
        edgeType: 'OUTLINE',
        edgeColor: '#000000FF',
        fontScale: 1.2,
        fontStyle: 'BOLD',
        fontFamily: 'Droid Sans',
        fontGenericFamily: 'SANS_SERIF'
      }
    };

    if (subtitlesUrl) {
      media.subtitles.push({
        language: 'en-US',
        url: subtitlesUrl,
        name: 'Custom subtitles',
      });
    } else {
      media.subtitles.push({
        language: 'en-US',
        url: 'https://anirudhsevugan.me/misc/blank.vtt',
        name: 'Custom subtitles',
      });
    }

    console.log(`Playing media on "${device.friendlyName}"...`);
    device.play(media, (err) => {
      if (err && !err.message.includes('ECONNRESET')) {
        console.error('Error playing media:', err);
      } else {
        console.log('Playback started!');
      }
      rl.close();
    });
  });
}
