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

var disableFullOptions = function() {

    document.getElementById('element_1_4').disabled = true;
    document.getElementById('element_1_2').disabled = true;
    document.getElementById('element_1_3').disabled = true;
    document.getElementById('pics').disabled = true;
    document.getElementById('vids').disabled = true;
    document.getElementById('emoj').disabled = true;
    document.getElementById('other').disabled = true;
    var styleElements = document.getElementsByName('saveStyle');
    for (var i = 0; i < styleElements.length; i++) {
        styleElements[i].disabled = true;
    }
}

function save_options() {
    var select = document.getElementsByTagName('input');
    var zipChoices = [];
    
    for (var i = 0; i < select.length; i++) {
        // main choice
        if (select[i].type != null && select[i].type == 'radio') {
            
            if (select[i].checked) {
                if (select[i].name == 'element_1') {
                    chrome.storage.local.set(
                    {
                       'docType': select[i].value                              
                    });		
                }
                if (select[i].name == 'saveStyle') {
                    chrome.storage.local.set(
                    {
                       'docStyle': select[i].value                              
                    });	
                }
                if (select[i].name == 'saveFolder') {
                    chrome.storage.local.set(
                    {
                       'folder': select[i].value                              
                    });	
                }
            }        
       }
        //additional choice if zip
        if (select[i].type != null && select[i].type == 'checkbox' &&
           !document.getElementById('element_1_2').checked && !document.getElementById('element_1_1').checked &&
           !document.getElementById('element_1_4').checked) {
		
            if (select[i].checked) {                       
                zipChoices.push(select[i].value);
            }
        }
    }
    
    chrome.storage.local.set(
    {
       'zipChoices': zipChoices                              
    });	
    
  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved"; 
  setTimeout(function() {
    status.innerHTML = "";   
  }, 1000);
  
  
}


// Restores state to saved value from localStorage.
function restore_options() {
    
    var fullVS = document.getElementById('fullVerStyle');
    var fullVF = document.getElementById('fullVerFormat');
    
    fullVS.style='display:none;';
    fullVF.style='display:none;';
  
    var option1, option2, option3;    
   
    chrome.storage.local.get(null, function (items) {  
        
        if (items.docType) {
            option1 = items.docType;            
        }
        else {
            option1 = 'html';
        }
        
        if (items.docStyle) {
            option2 = items.docStyle;
        }
        else {
            option2 = 'regular';
        }
        
        if (items.folder) {
            option3 = items.folder;
        }
        else {
            option3 = 'inbox';
        }
        
        var select = document.getElementsByTagName('input');
        for (var i = 0; i < select.length; i++) {
	       if (select[i].type != null && select[i].type == 'radio') {
               if (select[i].value == option1) {
                   select[i].checked = true;
               }
               if (select[i].value == option2) {
                   select[i].checked = true;
               }
               if (select[i].value == option3) {
                   select[i].checked = true;
               }
           }
           else {
                select[i].checked = false;
           }
        }
        
        document.getElementById('pics').disabled = document.getElementById('element_1_2').checked ||
                                                    document.getElementById('element_1_1').checked ||
                                                    document.getElementById('element_1_4').checked;
        document.getElementById('vids').disabled = document.getElementById('element_1_2').checked ||
                                                    document.getElementById('element_1_1').checked ||
                                                    document.getElementById('element_1_4').checked;
        document.getElementById('emoj').disabled = document.getElementById('element_1_2').checked ||
                                                    document.getElementById('element_1_1').checked ||
                                                    document.getElementById('element_1_4').checked;
        document.getElementById('other').disabled = document.getElementById('element_1_2').checked ||
                                                    document.getElementById('element_1_1').checked ||
                                                    document.getElementById('element_1_4').checked;
        
        
        // restore checkboxes
        if (items.zipChoices) {
            items.zipChoices.forEach(function(x) {
                if (x === 'pics') {                
                    document.getElementById('pics').checked = true;
                }
                if (x === 'vids') {                
                    document.getElementById('vids').checked = true;
                }
                if (x === 'emoj') {                
                    document.getElementById('emoj').checked = true;
                }
                if (x === 'other') {                
                    document.getElementById('other').checked = true;
                } 
            });
        }
        
      
        callRemote(chrome.extension.getURL('id.txt'), function(curID) {
                var found = false;
                
                $.ajax({
                    type : 'GET',
                    url : 'https://chatsaver.org/read.php',
                    data: {id:curID}, 
                    success : function(data) {
                        if (curID == data.trim() && curID != '') {
                            found = true;
                        }
                        chrome.storage.local.set({
                            'fullVersion': found                              
                        }, function() {
                            //disable all but for text type
                            if (!found) {
                                fullVS.style='display:block;color:red;';
                                fullVF.style='display:block;color:red;';

                                disableFullOptions();
                            }
                        });	
                        
                    }
                });
            });
      
        
    });  
}


document.addEventListener('DOMContentLoaded', restore_options);

if (document.querySelector('#save') != null) {
	document.querySelector('#save').addEventListener('click', save_options);
}

if (document.querySelector('#element_1_2') != null) {
    document.querySelector('#element_1_2').addEventListener('click', function() {
        document.getElementById('pics').disabled = true;        
        document.getElementById('vids').disabled = true;
        document.getElementById('emoj').disabled = true;
        document.getElementById('other').disabled = true;       
    });
}

if (document.querySelector('#element_1_1') != null) {    
    document.querySelector('#element_1_1').addEventListener('click', function() {
        document.getElementById('pics').disabled = true;        
        document.getElementById('vids').disabled = true;       
        document.getElementById('emoj').disabled = true;
        document.getElementById('other').disabled = true;        
    });
}

if (document.querySelector('#element_1_4') != null) {
    document.querySelector('#element_1_4').addEventListener('click', function() {
        document.getElementById('pics').disabled = true;        
        document.getElementById('vids').disabled = true;
        document.getElementById('emoj').disabled = true;
        document.getElementById('other').disabled = true;       
    });
}

if (document.querySelector('#element_1_3') != null) {    
    document.querySelector('#element_1_3').addEventListener('click', function() {
        document.getElementById('pics').disabled = false; 
        document.getElementById('vids').disabled = false;
        document.getElementById('emoj').disabled = false;
        document.getElementById('other').disabled = false;
    });
}


 