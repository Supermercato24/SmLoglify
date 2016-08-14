'use strict';
/**
 * inject message to console on message from background controller
 * 
 * @returns
 */
chrome.runtime.onMessage.addListener(function(message) {

  var log = console.log;
  if (~~(message.statusCode / 100) !== 2) { // not a 2xx statusCode
    log = console.warn; // logger override
  }

  console.groupCollapsed('SmLoglify');
  log('url', message.url);
  log('method', message.method);
  log('statusCode', message.statusCode);
  log('timeStamp', message.timeStamp);
  console.groupEnd();
});
