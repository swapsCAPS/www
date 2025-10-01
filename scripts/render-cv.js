/**
 * AI generated and tweaked
 */

const puppeteer = require("puppeteer");
const path = require("path");

async function main() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--font-render-hinting=medium"],
  });
  try {
    const page = await browser.newPage();

    await page.goto(`file://${path.join(process.cwd(), "src", "cv.html")}?theme=red900`, {
      waitUntil: ["load", "networkidle0"],
    });

    // Fonts & settle
    try {
      await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
      });
    } catch (_) {}
    await new Promise((r) => setTimeout(r, 300));

    const { width, height } = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      const w = 1024;
      const h = Math.max(
        body.scrollHeight,
        html.scrollHeight,
        body.offsetHeight,
        html.offsetHeight,
        body.clientHeight,
        html.clientHeight,
      );
      return { width: w, height: h };
    });

    console.log(width);
    console.log(height);
    // Set a large viewport and export single page using width/height in pixels -> convert to inches (96 px per inch assumption)
    await page.setViewport({ width, height });
    const pxPerInch = 96;
    const widthIn = (width / pxPerInch).toFixed(2) + "in";
    const heightIn = (height / pxPerInch).toFixed(2) + "in";

    console.log(widthIn);
    console.log(heightIn);

    await page.pdf({
      path: `cv_${new Date().getFullYear()}.pdf`,
      width: widthIn,
      height: heightIn,
      printBackground: true,
      pageRanges: "1",
    });
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("Failed to render CV PDF:", err);
  process.exit(1);
});
