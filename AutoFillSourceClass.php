<?php
class AutoFillSourceClass{ 
    function GetItems(){
        //load xml source file
        $xmlDoc=new DOMDocument();
        $xmlDoc->load("source.xml");
        //read xml source into $x
        $x=$xmlDoc->getElementsByTagName('SubNode');
        //use check_input to control if the user input is secure and doesn't have any harmful code in it
        $input=$this->check_input($_GET["userInput"]);
        $input=trim($input);
        $ar_result= array();
        if (!$this->is_blank($input)){
            //strip the input 
            $input = preg_replace('/\s+/',' ',$input);
            //break the user input into seperate strings if there are more than one words in it
            $ar_chunks = explode(" ", $input);
            //$k=0;
            //find all items that have the fitst word of user input
            for($i=0; $i<($x->length); $i++){
                $y=$x->item($i)->getElementsByTagName('SubNode');
                    //find a material matching the search text
                $val = $x->item($i)->nodeValue;
                if (stristr($val,$ar_chunks[0])){
                        array_push($ar_result,$val);
                    }
            }
            //check if the rest of words in user input exit in initial findings
            if(count($ar_chunks)>1 && count($ar_result)){
                for ($j=1; $j<count($ar_chunks); $j++){	
                    for($i=0; $i<count($ar_result); $i++){
                        if(!stristr($ar_result[$i], $ar_chunks[$j])){
                            array_splice($ar_result, $i, 1);
                             $i-=1;
                        }
                    }
                }
            }
         }
         return $ar_result;
    }
    function check_input($value){
        // Stripslashes
        if (get_magic_quotes_gpc()) {
          $value = stripslashes($value);
          }
        // Quote if not a number
        if (!is_numeric($value)){
           $value = mysql_real_escape_string($value);
          }
        return $value;
    }
    function is_blank($value) {
        return empty($value) && !is_numeric($value);
    }
}

?>
