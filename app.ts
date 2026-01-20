import "dotenv/config";
import sendEmail from "./utils/sendEmail.js";
import checkStockStatus from "./utils/checkStockStatus.js";

// TODO: make sure email is only sent once
try {
  const sdCurrentStock = 6;
  const sdLiveStockStatus = await checkStockStatus();

  if (sdCurrentStock != sdLiveStockStatus) {
    sendEmail();
  }
} catch (error) {
  console.log(error);
}
