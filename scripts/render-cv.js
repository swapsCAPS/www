/**
 * AI generated and tweaked
 */

const puppeteer = require("puppeteer");
const path = require("path");

async function main() {
  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--font-render-hinting=medium",
    ],
  });
  try {
    const page = await browser.newPage();

    // 1. Set a desktop viewport BEFORE page.goto to bypass mobile media queries
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(
      `file://${path.join(process.cwd(), "src", "cv.html")}?theme=red900`,
      {
        waitUntil: ["load", "networkidle0"],
      },
    );

    // 2. Force screen media type to ignore @media print font-size reductions
    await page.emulateMediaType("screen");

    // Fonts & settle
    try {
      await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
      });
    } catch (_) {}
    await new Promise((r) => setTimeout(r, 300));

    const { width, height } = await page.evaluate(() => {
      // 3. Strip body padding and container margin/min-height for an exact crop
      document.body.style.padding = "0";

      const container = document.querySelector(".container");
      container.style.minHeight = "0";
      container.style.margin = "0";

      return {
        width: container.offsetWidth,
        height: container.offsetHeight,
      };
    });

    console.log(width);
    console.log(height);
    // Set a large viewport and export single page using width/height in pixels -> convert to inches (96 px per inch assumption)
    await page.setViewport({ width, height });
    const pxPerInch = 96 * 1.5; // Increase this value to make the PDF physically smaller
    const scaleFactor = 96 / pxPerInch; // Balances the hardcoded 96 PPI
    const widthIn = (width / pxPerInch).toFixed(2) + "in";
    const heightIn = (height / pxPerInch).toFixed(2) + "in";

    console.log(widthIn);
    console.log(heightIn);

    await page.pdf({
      path: `cv_${new Date().getFullYear()}.pdf`,
      width: widthIn,
      height: heightIn,
      printBackground: true,
      scale: scaleFactor,
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
