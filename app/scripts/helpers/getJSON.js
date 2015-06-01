var CACHE_ENABLED = true;

function getJSON(url) {
  // If cache enabled flag is unset, set to true by
  // default. This lets us optionally disable it.
  if (getJSON._cacheEnabled === undefined) {
    getJSON._cacheEnabled = CACHE_ENABLED;
  }

  // If cache is enabled and a cached version exists, use it
  if (getJSON._cacheEnabled && getJSON._cache[url]) {
    return Promise.resolve(getJSON._cache[url]);
  }

  return new Promise((resolve, reject) => {
    var req = new XMLHttpRequest();

    req.onload = function() {
      var data;

      if (req.status === 404) {
        reject(new Error('not found'));
      } else {
        // Parse response
        data = JSON.parse(req.response);

        // Resolve promise
        resolve(data);

        // Cache response
        getJSON._cache[url] = data;
      }
    };

    req.open('GET', url);
    req.send();
  });
}

getJSON._cache = {};

getJSON.emptyCache = function() {
  getJSON._cache = {};
};

getJSON.disableCache = function() {
  getJSON._cacheEnabled = false;
};

getJSON.enableCache = function() {
  getJSON._cacheEnabled = true;
};

getJSON.timedCacheStart = function(interval=30) {
  getJSON.timedCache.interval = setInterval(getJSON.emptyCache, interval);
};

getJSON.timedCacheStop = function() {
  clearInterval(getJSON.timedCache.interval);
};

export default getJSON;
