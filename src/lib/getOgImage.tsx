import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

import { isDev } from '@/lib/constants';

export default async function getOgImage(html: string) {
  const exePath =
    process.platform === 'win32'
      ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
      : process.platform === 'linux'
      ? '/usr/bin/google-chrome'
      : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

  async function getOptions(isDev: boolean) {
    let options;
    if (isDev) {
      options = {
        args: [],
        executablePath: exePath,
        headless: true,
      };
    } else {
      options = {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      };
    }
    return options;
  }

  const options = await getOptions(isDev);

  // Add fonts
  await chrome.font('../../public/fonts/Inter-VariableFont_slnt,wght.ttf');

  // launch a new headless browser with dev / prod options
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();

  // set the viewport size
  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 1,
  });

  await page.setContent(html);

  return isDev
    ? await page.content()
    : await page.screenshot({
        type: 'png',
      });
}
