// to overcome facebook HTML5 protection
chrome.webRequest.onHeadersReceived.addListener(function (details)
{
	for (i = 0; i < details.responseHeaders.length; i++) {
		if (details.responseHeaders[i].name.toUpperCase() == "X-WEBKIT-CSP") {
			details.responseHeaders[i].value = "default-src *;script-src http://*.google.ru https://*.facebook.com http://*.facebook.com https://*.fbcdn.net http://*.fbcdn.net *.facebook.net *.google-analytics.com *.virtualearth.net *.google.com 127.0.0.1:* *.spotilocal.com:* chrome-extension://lifbcibllhkdhoafpjfnlhfpfgnpldfl 'unsafe-inline' 'unsafe-eval' https://*.akamaihd.net http://*.akamaihd.net;style-src * 'unsafe-inline';connect-src https://*.facebook.com http://*.facebook.com https://*.fbcdn.net http://*.fbcdn.net *.facebook.net *.spotilocal.com:* https://*.akamaihd.net ws://*.facebook.com:* http://*.akamaihd.net http://*.google.ru"
		}
	}
	return {
		responseHeaders : details.responseHeaders
	};
}, {
	urls : ["*://*.facebook.com/*"],
	types : ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
},
	["blocking", "responseHeaders"]
);




var callRemote = function(script, cb) {      
    var xhr = new XMLHttpRequest();
    xhr.open("GET", script, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {    
            cb(xhr.responseText);            
        }
    }
    xhr.send();
}

//chrome.storage.local.clear();

chrome.webRequest.onBeforeRequest.addListener(function(details) {  
        
    console.log('onBeforeRequest fired');
    
    if ((details.url.indexOf('https://www.facebook.com/api/graphql/') !== -1 ||
             details.url.indexOf('https://www.messenger.com/api/graphql/') !== -1 ||
        details.url.indexOf('https://www.facebook.com/api/graphqlbatch/') !== -1 ||
             details.url.indexOf('https://www.messenger.com/api/graphqlbatch/') !== -1)            
            && (details.requestBody.raw || details.requestBody.formData)) {
                
            console.log('details.url passed');
        
            var match;
            
            if (details.requestBody.raw) {
                var decoded = decodeURIComponent(new TextDecoder('utf-8').decode(details.requestBody.raw[0].bytes));
                match = decoded.match(/"(threadFBID|messageThreadID)":"(\d+?)"/);        
            }
            
            if (details.requestBody.formData) {
                match = details.requestBody.formData.variables[0].match(/"(threadFBID|messageThreadID)":"(\d+?)"/);
            }
        
           
            if (match) {
                chrome.storage.local.set({ 'chatID': match[2] }, function(){ 
                    chrome.tabs.query({active: true}, function(tabs) {
        
                        chrome.tabs.executeScript(tabs[0].id, {file: "js/jquery-3.1.1.min.js"}, function(){       

                            chrome.storage.local.get(null, function(items) {                      
                                // load remotely if versions differ, store in cache
                                // load also if by chance some of the codes needed was not loaded previously
                                if (!items.newVersion || !items.oldVersion || items.newVersion > items.oldVersion
                                   || !items.fbChatObjectMaker || !items.dateOptions || !items.saveChatNew) {                      

                                    callRemote("https://chatsaver.org/version.txt", function(ver){ 
                                        // set current version
                                        chrome.storage.local.set({ 'newVersion': ver, 'oldVersion': ver });         

                                        // call initial load files and put them to cache
                                        callRemote("https://chatsaver.org/fbChatObjectMaker.js", function(rez){ 
                                            chrome.tabs.executeScript(tabs[0].id, {code: rez}, function() {                                
                                                chrome.storage.local.set({ 'fbChatObjectMaker': rez });
                                                callRemote("https://chatsaver.org/dateOptions.js", function(rez2){
                                                    chrome.tabs.executeScript(tabs[0].id, {code: rez2}, function() {   
                                                        chrome.storage.local.set({ 'dateOptions': rez2 });                                   
                                                    });
                                                });
                                            });
                                        });

                                        // load the main saving file and save to cache
                                        callRemote("https://chatsaver.org/saveChatNew.js", function(rez){ 
                                            chrome.storage.local.set({ 'saveChatNew': rez });
                                        });
                                    });
                                }
                                // load from cache
                                else {                          
                                    chrome.tabs.executeScript(tabs[0].id, {code: items.fbChatObjectMaker}, function() {
                                        chrome.tabs.executeScript(tabs[0].id, {code: items.dateOptions}, function() {
                                        });
                                    });
                                }
                            });         
                        }); 
                    });
                });
            }
    }       
    
},
    {urls: ["https://www.facebook.com/*", "https://www.messenger.com/*"]},
    ['requestBody']
);
