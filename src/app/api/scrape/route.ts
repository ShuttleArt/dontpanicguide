// api/scrape.js – Runs daily at 6AM UTC
import { Resend } from 'resend';  // npm install resend

const resend = new Resend(process.env.RESEND_API_KEY);  // Free tier signup at resend.com

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    // Scrape SpaceX launches page
    const response = await fetch('https://www.spacex.com/launches/');
    const html = await response.text();

    // Simple parse (use cheerio for prod: npm i cheerio)
    const cheerio = require('cheerio');
    const $ = cheerio.load(html);

    const newLaunches = [];
    $('.launch-card').each((i, el) => {  // Adjust selector based on SpaceX HTML
      const name = $(el).find('.name').text().trim();
      const date = $(el).find('.date').text().trim();
      const type = $(el).find('.type').text().includes('Starlink') ? 'Starlink' : 'Other';
      if (date > '2025-11-22') newLaunches.push({ name, date, type });  // Future only
    });

    const starlinkBatch = newLaunches.filter(l => l.type === 'Starlink').length * 28;  // Avg 28/sat batch
    const totalLaunched = 10406 + starlinkBatch;  // Update from current

    // Email diff (or push to Supabase/JSON file)
    await resend.emails.send({
      from: 'scraper@dontpanic.guide',
      to: 'robert.berer@icloud.com',
      subject: 'Daily SpaceX Update: New Launches Detected',
      html: `<p>New: ${newLaunches.length} launches (incl. ${starlinkBatch} Starlink sats)</p><p>Total launched: ${totalLaunched}</p>`
    });

    res.status(200).json({ success: true, newLaunches, totalLaunched });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}