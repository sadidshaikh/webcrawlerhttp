function comparePage(a, b) {
  if (a[1] > b[1]) {
    return -1;
  }
  if (a[1] < b[1]) {
    return 1;
  }
  return 0;
}

function sortPages(pages) {
  const pageArray = Object.entries(pages);
  pageArray.sort(comparePage);
  return pageArray;
}

function printReport(pages) {
  console.log("===========");
  console.log("REPORT");
  console.log("===========");
  const sortedPages = sortPages(pages);
  for (const sortedPage of sortedPages) {
    const [url, hits] = sortedPage;
    console.log(`Found ${hits} links to page: ${url}`);
  }
  console.log("===========");
  console.log("END REPORT");
  console.log("===========");
}

module.exports = { sortPages, printReport };
