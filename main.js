const { crawlPage } = require("./crawl.js");
const { printReport, sortPages } = require("./report.js");

async function main() {
  //   if (process.argv.length < 3) {
  //     console.log("no website provided");
  //     process.exit(1);
  //   }

  //   if (process.argv.length > 3) {
  //     console.log("too many command line args");
  //     process.exit(1);
  //   }

  //   const baseURL = process.argv[2];
  //   console.log(`starting crawl of ${baseURL}`);

  //   const pages = await crawlPage(baseURL, baseURL, {});
  //   printReport(pages)

  const res = await fetch("https://leetcode.com/contest/globalranking");
  const data = await res.text();
  console.log(data);
}

main();
