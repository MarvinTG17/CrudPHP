<?php

include_once "../models/modelPrueba.php";

$prueba = new modelPrueba();

$accion = $_GET["accion"];

switch ($accion) {
    case "listar":
        $read = $prueba->Listar();
        //var_dump($data);
        //print_r($data);
        echo json_encode($read);
    break;

    case "listar2":
        $read2 = $prueba->Listar2();
        echo json_encode($read2);
    break;

    case "guardar":
        $ide       = $_POST["id"];
        $nombre    = $_POST["nombre"];
        $apellidos = $_POST["apellidos"];
        
        $int = intval($ide);
        //intval: para convertir un valor en entero
        //var_dump(is_int($entero));

        if (empty($ide)) {
            $insert = $prueba->Insertar($nombre,$apellidos);
            if ($insert) {
                echo "Insert";
            } else {
                echo json_encode($insert);
            }
        } else {
            $update = $prueba->Modificar($int,$nombre,$apellidos);
            if ($update) {
                echo "Update";
            } else {
                echo json_encode($update);
            }
        }
        

       
    break;

    case "mostrar":
        $id = $_POST["id"];
        $read = $prueba->Mostrar($id);
        echo json_encode($read);
    break;

    case "eliminar":
        $del = $_POST["ide"];
        $intDel = intval($del);

        //var_dump(is_int($del)); false
        //var_dump(is_int($intDel)); true

        $resp = $prueba->Eliminar($intDel);
        
        $result = json_encode($resp);
        if ($result) {
            echo "Eliminado";
            //echo $result;
        }else{
            echo "Error";
        }
        
    break;

}      
 

/*
PDO::FETCH_BOTH
PDO::FETCH_BOUND
PDO::FETCH_CLASS
PDO::FETCH_ASSOC
PDO::FETCH_NUM
PDO::FETCH_OBJ
PDO::FETCH_PROPS_LATE
PDO::FETCH_INTO
PDO::FETCH_LAZY
PDO::FETCH_NAMED
*/

?>