const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

// Endpoint to scrape data
app.get('/scrape', async (req, res) => {
  const phoneNumber = req.query.phoneNumber;
  const emailAddress = req.query.emailAddress;

  const platforms = ['WhatsApp', 'Truecaller', 'Facebook', 'Gpay', 'Telegram', 'Signal', 'Botim', 'Skype', 'PhonePay', 'Paytm'];

  const scrapedData = {};

  for (const platform of platforms) {
    if (platform === 'WhatsApp') {
      const whatsappData = await scrapeWhatsApp(phoneNumber);
      scrapedData[platform] = whatsappData;
    } else if (platform === 'Truecaller') {
      const truecallerData = await scrapeTruecaller(phoneNumber);
      scrapedData[platform] = truecallerData;
    } else if (platform === 'Facebook') {
      const facebookData = await scrapeFacebook(phoneNumber);
      scrapedData[platform] = facebookData;
    } else if (platform === 'Gpay') {
      const gpayData = await scrapeGpay(phoneNumber);
      scrapedData[platform] = gpayData;
    } else {
      scrapedData[platform] = {};
    }
  }

  res.json(scrapedData);
});

// Function to scrape WhatsApp data
async function scrapeWhatsApp(phoneNumber) {
  try {
    // Any whatsapp API 
    const response = await axios.get(`https://web.whatsapp.com/${phoneNumber}`);
    const $ = cheerio.load(response.data);
    // console.log($)
    
    const registered = $('div._2FBdJ').length === 0 ? 'Yes' : 'No';
    const name = $('span[title]').attr('title');
    const status = $('span[data-testid="status"]').text();
    const lastSeen = $('span[data-testid="status-datetime"]').text();
    const profilePicture = $('img[data-testid="default-user-avatar"]').attr('src') || '';

    return {
      Registered: registered,
      Name: name,
      Status: status,
      'Last Seen': lastSeen,
      'Profile Picture': profilePicture,
    };
  } catch (error) {
    console.error('Error scraping WhatsApp:', error);
    return {};
  }
}

// Function to scrape Truecaller data
async function scrapeTruecaller(phoneNumber) {
  try {
    // Any API for  Truecaller
    // ...
    return {};
  } catch (error) {
    console.error('Error scraping Truecaller:', error);
    return {};
  }
}

// Function to scrape Facebook data
async function scrapeFacebook(phoneNumber) {
  try {
    // Any facebook API 
    // ...
    return {};
  } catch (error) {
    console.error('Error scraping Facebook:', error);
    return {};
  }
}

// Function to scrape Gpay data
async function scrapeGpay(phoneNumber) {
  try {
    // Any Gpay API 
    // ...
    return {};
  } catch (error) {
    console.error('Error scraping Gpay:', error);
    return {};
  }
}

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
