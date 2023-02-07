function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPaht = `${urlObj.hostname}${urlObj.pathname}`;
  if(hostPaht.length > 0 && hostPaht.slice(-1)==='/'){
    return hostPaht.slice(0, -1)
  }
  return hostPaht
}

// "https://boot.dev" -> "boot.dev"
// "http://boot.dev" -> "boot.dev"
// "http://Boot.dev" -> "boot.dev"

module.exports = { normalizeURL };
