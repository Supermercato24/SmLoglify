'use strict';
/**
 * webRequest for in-fly request. webNavigation for tab init
 * 
 * @returns
 */
chrome.webRequest.onCompleted.addListener(function(request) {

  var tabId = request.tabId;

  chrome.browserAction.getBadgeText({
    tabId: tabId
  }, function(badge) {

    var badglePlusOne = ~~badge + 1;
    chrome.browserAction.setBadgeText({
      text: badglePlusOne.toString(),
      tabId: tabId
    }); // increment badge counter for right tabId

    chrome.tabs.sendMessage(tabId, request); // dispatch message to ContentScripts
  });
}, {
  urls: [ '*://*.supermercato24.it/*api*', '*://*.s24srl.com/*api*' ],
  types: [ chrome.webRequest.ResourceType.XMLHTTPREQUEST ]
});

/**
 * Fired when a navigation is about to occur, set badge color with url filters
 * 
 * onBeforeNavigate -> onCommitted -> onDOMContentLoaded -> onCompleted
 * 
 * @returns
 */
chrome.webNavigation.onBeforeNavigate.addListener(function(navigation) {

  chrome.browserAction.setBadgeBackgroundColor({
    color: [ 225, 0, 0, 100 ]
  });
}, {
  url: [ {
    hostContains: 'supermercato24.it',
    ports: [ 80, 443 ]
  }, {
    hostContains: 's24srl.com',
    ports: [ 80, 443 ]
  } ]
});
