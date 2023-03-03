<?php 
include_once "datosConexion.php";

    class conexion {

        public function Conectar() {

            try{
                $conexion = new PDO("mysql:host=".SERVER.";dbname=".DBNAME,USER,PASSWORD);
                //$conexion = new PDO("sqlsrv:server=".SERVER.";database=".DBNAME,USER,PASSWORD);
                
                return $conexion;
            
            }catch(Exception $error){
                die("El error es:".$error->getMessage());
            }
            
        }

    } 

?>