var obj = this;


function DownloadAsZip(doc, images, title, cb) {
    
    var count = 0;
    var files = [];
    files.push({name: title + '.html', file: doc});
   

    if (images.length > 0) {
        downloadFile(images[count], onDownloadComplete);
    }
    else {
        zipBlob(files, title);
    }
    


    function downloadFile(file, success) {
                
        var xhr = new XMLHttpRequest(); 
        xhr.open('GET', file.url, true); 
        xhr.responseType = "blob";
        xhr.onreadystatechange = function () { 
            if (xhr.readyState == 4) {
                if (success) onDownloadComplete(xhr.response);
            }
        };
        xhr.send(null);
    }
    

        function onDownloadComplete(blobData){
            
            if (count < images.length) {
                
                
                // add downloaded file to array                        
                files.push({name: images[count].name, file: blobData});                 
                if (count < images.length -1){
                    count++;                                    
                    nanobar.go( (count*50)/images.length );
                    downloadFile(images[count], onDownloadComplete);
                }
                else {        
                    zipBlob(files, title);
                }
            }
        }
    
    function zipBlob(files, title) {
        zip.createWriter(new zip.BlobWriter("application/zip"), function(writer) {
            var start = new Date().getTime();
       
            var f = 0;
            var curNanoBar = nanobar.bars[0].here;

            function nextFile(f) {
               
                fblob = new Blob([files[f].file], { type: "text/plain" });
                writer.add(files[f].name, new zip.BlobReader(fblob), function() {
                    // callback
                    f++;                            
                    nanobar.go(curNanoBar + (f*50)/files.length);
                   
                    if (f < files.length) {
                        nextFile(f);
                    } else close();
                });
            }

            function close() {
                // close the writer
                writer.close(function(blob) {
                    // save with FileSaver.js
                    saveAs(blob, title + '.zip');                                     
                    cb();
                });
            }

            nextFile(f);

        }, onerror);
    }
    
    
}