(function($){
    $.fn.addTextBox = function(ar){
       var divHintName=ar["divHintName"];
       var location=ar["location"];
       var textBoxId=ar["textBoxId"];
       //location is the element to include textbox in
        var txtBox = PrintTextBox(ar);
        var div_hint ='<div id="'+divHintName+'" class="divHint"></div>';
        $('#'+location).append(txtBox);
        $('#'+location).append(div_hint);
        $("#"+textBoxId).keyup(function(e) {
            //Enter key
            if(e.keyCode !== 32){//if the key is not space bar
                    FillSuggestionBox(ar,textBoxId,divHintName,location);
              }
        });
        // hide hint list when user clicks on the page
        $('html').click(function () {
            if ($('.div_hint:hover').length == 0 && $('#magnifydiv:hover').length == 0) {
             $('.divLivesearch').css('display', 'none');
             $('.divHint').css('display', 'none');
            }
        });
        
 };
    function PrintTextBox(ar){
   //prepares text box and its events
       var textBoxId=ar["textBoxId"];
       //var value=ar["value"];
       var maxlength=ar["maxlength"];
       var css_class=ar["textBox_css_class"];
       if (css_class==="auto")
           css_class="input";
       var size=ar["size"];
       if(size===undefined){
           size="30";
       }
   var txtBox = '<input type="text" id="'+textBoxId+'" class="'+css_class+'"';
   txtBox +=' name="'+textBoxId+'" maxlength="'+maxlength+'"';
   txtBox +=' size="'+size+'"';
   txtBox +=' />';
   return txtBox;
}		
function FillSuggestionBox(ar,TextBoxId,div_hint,location){
        var userInput = $("#"+TextBoxId).val();
          var xhr_search = declareXMLHttpRequest();
   xhr_search.onreadystatechange=function(){
      if (xhr_search.readyState===4 && xhr_search.status===200){
        var ss = xhr_search.responseText; //for debugging purposes
        var res = JSON.parse(xhr_search.responseText);
             //fill out text box with fetched items
              PrintSuggestedMaterials(ar,res,TextBoxId,div_hint,location);
      }
   };
   var url = "AutoFill.php?userInput="+userInput;
   xhr_search.open("GET",url,true); 
   xhr_search.send();
}  
    function PrintSuggestedMaterials(ar,response,TextBoxId,div_hint,location){
      $("#"+location).undelegate();
      $("#"+div_hint).empty();
        var hint="";
         var dropdown_css_class=ar["dropdown_css_class"];
         if (dropdown_css_class==="auto")
           dropdown_css_class="hint";
        for(var i=0; i<response.length; i++){
          var id = "item"+i;
          var hint0 = '<div id="'+id+'" class="'+dropdown_css_class+'">';
           hint0 += response[i]+'</div>';
           hint +=hint0;
        $("#"+location).delegate("#"+id,'click',function(){
            SetText(this.id,TextBoxId,div_hint);
      });
        }
        $("#"+div_hint).html(hint);
        $("#"+div_hint).css("display","block");
}

function declareXMLHttpRequest()
{
   var xmlhttpVar;
   if (window.XMLHttpRequest)
   {// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttpVar=new XMLHttpRequest();
   }
   else
   {// code for IE6, IE5
      xmlhttpVar=new ActiveXObject("Microsoft.XMLHTTP");
   }
   return xmlhttpVar;
}

 function SetText(spanID,TextBoxId,div_hint){
   var mat =  $("#"+spanID).html();
   $("#"+TextBoxId).val(mat);
   $('.div_hint').css('display', 'none');
   $('.divLivesearch').css('display', 'none');
   $("#"+div_hint).empty();
}
})(jQuery);
