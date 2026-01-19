import { chromium } from "playwright";


// Check stock status of refurbished Steam Deck
// Currently gets all of the "Out of stock" texts on the page

const checkStockStatus = async () => {
  const url: string =
    "https://store.steampowered.com/sale/steamdeckrefurbished/";
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle" });

  const outOfStock = await page.locator("text=Out of stock").count();
  await browser.close();

  console.log("Stock status:", outOfStock);

  return outOfStock
};

const sendEmail = () => {

}

checkStockStatus();
