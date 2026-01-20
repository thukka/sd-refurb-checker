import { chromium } from "playwright";

// Check stock status of refurbished Steam Deck
// Currently gets all of the "Out of stock" texts on the page

const checkStockStatus = async (): Promise<number> => {
  const url: string = process.env.SD_URL ?? "";
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle" });

  const outOfStock = await page.locator("text=Out of stock").count();
  await browser.close();

  console.log("Stock status:", outOfStock);

  return outOfStock;
};

export default checkStockStatus;
