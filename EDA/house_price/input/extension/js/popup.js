var disableContent = function() {
    document.getElementById('main_body').style = 'background-color:#dbe4f0;pointer-events:none;opacity:0.8;'; 
};

var enableContent = function() {
    document.getElementById('main_body').style = 'background-color:#dbe4f0;pointer-events:auto;opacity:1;';
};

var callRemote = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
};           
   
var checkVersion = function() {        
    
    callRemote('https://chatsaver.org/version.txt', function (response) {
        
        document.getElementById('version').innerHTML = response;
        
        chrome.storage.local.set({
            'newVersion': response
        });
    });
    
   
};

var donateButton = function() {
    
    var link = document.getElementById("donate");    
    if (link != null) {
        
        link.onclick = function () {
    
            var donDiv = document.getElementById("slide"); 
            if (donDiv) {                      
	              
                (donDiv.style.display === 'none' || donDiv.style.display === '')
                ? donDiv.style.display = 'block' 
                : donDiv.style.display = 'none';
            }
            
        };
    
    }    
};




//var ads = function() {
//    var href = 'http://chatsaver.org';
//    var txt = '$10 PlayStation Store Gift Card - PS3/ PS4/ PS Vita [Digital Code]';
//    document.getElementById("ads").textContent  = txt;
//    document.getElementById("ads").href = href;
//}

function LoadContentScripts() {
	
    chrome.tabs.executeScript(null, {file: "js/jquery-3.1.1.min.js"});        		
    chrome.tabs.executeScript(null, {file: "js/spin.min.js"});	        
    chrome.tabs.executeScript(null, {file: "js/nanobar.js"});
    chrome.tabs.executeScript(null, {file: "js/zip.js"});        
    chrome.tabs.executeScript(null, {file: "js/deflate.js"});
    chrome.tabs.executeScript(null, {file: "js/utils.js"});
    chrome.tabs.executeScript(null, {file: "js/download2.js"});	
    chrome.tabs.executeScript(null, {file: "js/patch-worker.js"});
    chrome.tabs.executeScript(null, {file: "js/FileSaver.min.js"});	
    chrome.tabs.executeScript(null, {file: "js/moment.js"});
}



function saveLimitAndDate() {
        
    //var limit = document.getElementById('limit');  
    var firstDate = document.getElementById('firstDate');  
    var lastDate = document.getElementById('lastDate');    
   
    
    // the next day of the date should be taken to correctly get the payload
    var myDate = new Date(lastDate.value); 
    myDate.setDate(myDate.getDate() + 1);
    var lastTStamp = myDate.getTime(); 
    
    var firstTStamp = new Date(firstDate.value).getTime();
    
   
    // save last selected date & number of msgs to storage    
    // set the state of the checkbox
    if (lastTStamp > 0) {
        chrome.storage.local.set(
        {
           // 'limit': Number(limit.value),
            'firstDate': firstTStamp,
            'lastDate': lastTStamp                        

        }, function() {  

            LoadContentScripts();  
            
            chrome.storage.local.get(null, function(items) { 
                //check just in case the code was not loaded on updating the page
                if (!items.saveChatNew) {                    
                    callRemote("https://chatsaver.org/saveChatNew.js", function(rez){ 
                        chrome.storage.local.set({ 'saveChatNew': rez });
                        chrome.tabs.executeScript({ code: rez });
                    });
                }
                else {                    
                    chrome.tabs.executeScript({ code: items.saveChatNew }); 
                }
            });

        });
    }

}


function restoreLimitAndDate() {
    
    chrome.storage.local.get(null, function (items) {  
    
        // wait for the info coming from dateOptions about the current thread
        if (!items.isLoaded) {  
            disableContent();
            restoreLimitAndDate();
        }
        else {
            enableContent();            
        }   
        
        
        checkVersion();
        donateButton();
      


        if (document.getElementById('saveConvo') != null) {    
           document.getElementById('saveConvo').addEventListener('click', saveLimitAndDate);
        }     
        
        const firstDateField = document.getElementById('firstDate');
        const lastDateField = document.getElementById('lastDate');
        
        
        if (firstDateField !== null) {
            firstDateField.addEventListener('blur', function(field) {                
                if (moment(lastDateField.value).isBefore(firstDateField.value)) {
                    firstDateField.value = lastDateField.value;
                }
            });   
        }
        
        if (lastDateField !== null) {
            lastDateField.addEventListener('blur', function(field) {                
                if (moment(lastDateField.value).isBefore(firstDateField.value)) {
                    firstDateField.value = lastDateField.value;
                }
            });   
        }
        
//        if (items.limit) {
//            document.getElementById('limit').value = Number(items.limit);
//        }
//        else {
//            document.getElementById('limit').value = 1000;
//        }

        if (items.msgCount) {
            document.getElementById('msgCount').innerText = items.msgCount;
        }
        else {
            document.getElementById('msgCount').innerText = 'not counted';
        }
        
        


        let lastDate = Date.now(), firstDate = Date.now();        
        if (items.lastDate) {
            lastDate = new Date(Number(items.lastDate)); //* 1000);  
            lastDate.setDate(lastDate.getDate() - 1);
        }
        if (items.firstDate) {
            firstDate = new Date(Number(items.firstDate));
        }
        
        if (moment(lastDate).isBefore(firstDate)) {
            firstDate = lastDate;
        }
        
//        var date2 = new Date(date);
//        var dateString = date2.getFullYear() + '-' + ('0' + (date2.getMonth() + 1)).slice(-2) + '-' + ('0' + date2.getDate()).slice(-2);
        var lastDateString = moment(lastDate).format('YYYY-MM-DD');
        lastDateField.value = lastDateString;
        //lastDateField.setAttribute("max", lastDateString);
        
        
        var firstDateString = moment(firstDate).format('YYYY-MM-DD');
        firstDateField.value = firstDateString;
            
        
    });     
    
}


document.addEventListener('DOMContentLoaded', restoreLimitAndDate);




