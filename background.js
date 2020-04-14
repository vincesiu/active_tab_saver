// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function copy_to_clipboard(text_to_copy) {
  // pretty jank, but I guess this is the state of web development
  console.log('Copying to clipboard');
  const ta = document.createElement('textarea');
  ta.style.cssText = 'opacity:0; position:fixed; width:1px; height:1px; top:0; left:0;';
  ta.value = text_to_copy;
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  document.execCommand('copy');
  ta.remove();
  console.log('Copied text to clipboard');
}

chrome.browserAction.onClicked.addListener(function(_) {
  chrome.tabs.query({}, function(tabs) {
        var urls = [];
        console.log('Getting all the tab urls');
        tabs.forEach(tab => {
          urls.push(tab.url);
        });
        var values = urls.join("\n");
        console.log('Got ' + urls.length + ' tabs');

        copy_to_clipboard(values);
        chrome.notifications.create({
          type: 'image',
          message: 'Copied ' + urls.length + ' urls to clipboard',
          iconUrl:  chrome.runtime.getURL("images/copy_successful.png"),
          imageUrl:  chrome.runtime.getURL("images/copy_successful.png"),
          title: 'Active Tab Saver',
        });
      });
  });
