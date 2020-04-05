// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.browserAction.onClicked.addListener(function(_) {
  chrome.tabs.query({}, function(tabs) {
        var urls = [];

        console.log('Getting all the tab urls');
        tabs.forEach(tab => {
          urls.push(tab.url);
        });

        // pretty jank, but I guess this is the state of web development
        console.log('Copying to clipboard');
        const ta = document.createElement('textarea');
        ta.style.cssText = 'opacity:0; position:fixed; width:1px; height:1px; top:0; left:0;';
        ta.value = urls.join("\n");
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        ta.remove();

        chrome.storage.local.set({'urls_copied': urls.length});
      });
  });

/* Old clipboard copy code

Doesn't work because of the error 'DOM is not in focus'
This is preferable
        navigator.clipboard.writeText(urls.join("\n"))
          .then(() => {
            console.log('Text copied to clipboard');
          })
          .catch(err => {
            // This can happen if the user denies clipboard permissions:
            // In this script, it happens because the extension background page 
            // is not in focus
            console.error('Could not copy text: ', err);
          });
*/
