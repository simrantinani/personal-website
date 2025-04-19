const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  // Load your Hugo page
  await page.goto('http://localhost:1313/cv/', {
    waitUntil: 'networkidle0' // Wait for everything to load
  });

  // Create PDF
  await page.pdf({
    path: 'Simran-Tinani-CV.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0.4in',
      right: '0.3in',
      bottom: '0.3in',
      left: '0in'
    }
  });

  await browser.close();
})();
