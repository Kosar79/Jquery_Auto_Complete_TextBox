Jquery_Auto_Complete_TextBox
============================

A Jquery auto complete drop down text box which reads from a xml file


To place your text box:
========================================================
1- Download the zipcode and copy it in your server root

2-add links to js files

        <script src="http://code.jquery.com/jquery-1.9.1.min.js" type="text/javascript" language="javascript"></script>
        <script src="jquery_AutoFill.js" type="text/javascript" language="javascript"></script>
========================================================
3- Make a div or span with a unique id

4- Copy this code somewhere in your page

        <script type="text/javascript">
            $("#spn_text").addTextBox({     
                "location":"spn_text", // element that holds the text box such as a div or span
                "textBoxId":"textBoxId",//if you have more than one textbox in a page, set this unique
                "divHintName":"divHintName",//if you have more than one textbox in a page, set this unique
                "value":"",
                "maxlength":"70",
                "size":"30",
                "textBox_css_class":"auto",//you could use your css class for textbox
                "dropdown_css_class":"auto"//you could use your css class for textbox
            });
        </script>
        
"spn_text" is the id of the element you want to place your text box. You can change it to whatever you want
just make to change it in $("#spn_text").addTextBox and "location":"spn_text"
Also you can customise it to some degree such as size, css class for text box and drop down list

5-Fill out source.xml with items you want to be viewed based on user input(in the example it has name of cities). 

6- You are all set! Contact me with any question or feedback or comments (kosarh79@gmail.com)
