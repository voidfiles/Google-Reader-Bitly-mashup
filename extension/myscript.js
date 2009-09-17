
var long_url = $("#url").val();


var port = chrome.extension.connect({name: "notifyChannel"});
port.postMessage({long_url:long_url});

$("#submit-button").attr("disabled","disabled");
chrome.extension.onConnect.addListener(function(port){
    port.onMessage.addListener( function(msg){
        console.log("got message back", msg);
        if( msg["errorCode"] && msg["errorCode"] == "203"){
            alert("You need to login to bit.ly before we can continue");
            $("#submit-button").attr("disabled","");
            return;
        }
        try{
            for(var url in msg["results"]){
               var short_url = msg["results"][url]["shortUrl"];
               $("#url").val(short_url);
               var img =  "<br><img style='height:1px;width:1px;' src='"+short_url+"'>";
               var text = $("#snippet").val(); 
               text = text + img;
               $("#snippet").val(text); 
               var html = $("#snippet-preview").html();
               html = html + img;
               $("#snippet-preview").html(html);
               
            }
            
        } catch(e) {};
        
        $("#submit-button").attr("disabled","");
        
    });
});









