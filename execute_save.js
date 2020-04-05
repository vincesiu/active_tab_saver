'use strict';

let textArea = document.getElementById('resultMsg');

chrome.storage.local.get(['urls_copied'], function(result) {
	textArea.value =  result + ' urls were copied to clipboard'
});