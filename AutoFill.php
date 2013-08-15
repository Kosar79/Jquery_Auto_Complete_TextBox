<?php

    include("AutoFillSourceClass.php");
    $autofill=new AutoFillSourceClass();
    $ar_result = $autofill->GetItems();
    echo json_encode($ar_result);
?>
