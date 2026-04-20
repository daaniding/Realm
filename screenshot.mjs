import puppeteer from "puppeteer";

const url = process.argv[2] || "http://localhost:3000";
const out = process.argv[3] || "/tmp/realm-home.png";

const browser = await puppeteer.launch({
  headless: "new",
  executablePath: "/Users/daaniding/.cache/puppeteer/chrome-headless-shell/mac_arm-146.0.7680.153/chrome-headless-shell-mac-arm64/chrome-headless-shell",
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: out, fullPage: false });
await browser.close();
console.log(out);
