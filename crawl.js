const { JSDOM } = require("jsdom");

async function crawlPage(currentURL) {
  try {
    console.log(`actively crawling: ${currentURL}`);
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(
        `error in fetch with status code: ${resp.status} on page: ${currentURL}`
      );
      return;
    }
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `non html response, content-type: ${contentType} on page: ${currentURL}`
      );
      return;
    }
    console.log("TRUE");
    const data = await resp.text();
    console.log(data);
  } catch (err) {
    console.log(`error in fetch: ${err.message}, on page: ${currentURL}`);
  }
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`error with realtive url: ${err.message}`);
      }
    } else {
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`error with absolute url: ${err.message}`);
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPaht = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPaht.length > 0 && hostPaht.slice(-1) === "/") {
    return hostPaht.slice(0, -1);
  }
  return hostPaht;
}

// "https://boot.dev" -> "boot.dev"
// "http://boot.dev" -> "boot.dev"
// "http://Boot.dev" -> "boot.dev"

module.exports = { normalizeURL, getURLsFromHTML, crawlPage };
