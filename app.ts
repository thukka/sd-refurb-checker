import { chromium } from "playwright";
import { Resend } from "resend";
import "dotenv/config";

// Check stock status of refurbished Steam Deck
// Currently gets all of the "Out of stock" texts on the page

const checkStockStatus = async (): Promise<number> => {
  const url: string =
    "https://store.steampowered.com/sale/steamdeckrefurbished/";
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle" });

  const outOfStock = await page.locator("text=Out of stock").count();
  await browser.close();

  console.log("Stock status:", outOfStock);

  return outOfStock;
};

// Send email if the stock has changed
const sendEmail = (stock: number) => {
  console.log("Sending email...");

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    resend.emails.send({
      from: process.env.EMAIL_FROM ?? "",
      to: process.env.EMAIL_TO ?? "",
      subject: "Hello World",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });
  } catch (error) {
    console.error('Error sending email: ', error)
  }
};


// TODO: add stock check & make sure email is only sent once
try {
  sendEmail(await checkStockStatus());
} catch (error) {
  console.log(error);
}
