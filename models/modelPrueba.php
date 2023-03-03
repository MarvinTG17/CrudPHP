<?php

require_once "conexion.php";

class modelPrueba{

    public function __construct() {

    }

    public static function Listar(){
        $instanciar = new conexion ();
        $conectar = $instanciar->Conectar();
        $resultado = $conectar->prepare("SELECT cli_id, cli_nombre, cli_apellidos FROM tab_clientes WHERE cli_estado = 'Activo' LIMIT 3");
        $resultado->execute();
        $datos = $resultado->fetchAll(PDO::FETCH_OBJ);
        return $datos;
    }

    public static function Listar2(){
        $instanciar = new conexion ();
        $conectar = $instanciar->Conectar();
        $resultado = $conectar->prepare("SELECT cli_id, cli_nombre, cli_apellidos FROM tab_clientes WHERE cli_estado = 'Activo' AND  cli_id >= 4");
        $resultado->execute();
        $datos = $resultado->fetchAll(PDO::FETCH_OBJ);
        return $datos;
    }

    public static function Insertar($nombre,$apellidos){
        $estado = "Activo";

        $instanciar = new conexion ();
        $conectar = $instanciar->Conectar();
        $resultado = $conectar->prepare("INSERT INTO tab_clientes (cli_nombre, cli_apellidos, cli_estado) VALUES(:nam, :ape, :est)");

        $resultado->bindParam(":nam",$nombre,PDO::PARAM_STR);
        $resultado->bindParam(":ape",$apellidos,PDO::PARAM_STR);
        $resultado->bindParam("est",$estado,PDO::PARAM_STR);

        $resultado->execute();
        return $resultado;

    }

    public static function Mostrar($id){
        $instanciar = new conexion ();
        $conectar = $instanciar->Conectar();
        $resultado = $conectar->prepare("SELECT cli_id, cli_nombre, cli_apellidos FROM tab_clientes WHERE cli_id = :i");

        $resultado->bindParam(":i",$id,PDO::PARAM_INT);

        $resultado->execute();
        $datos = $resultado->fetchAll(PDO::FETCH_OBJ);
        return $datos;
    }

    public static function Modificar($int,$nombre,$apellidos){
        //$estado = "Activo";
        $instanciar = new conexion ();
        $conectar = $instanciar->Conectar();
        $resultado = $conectar->prepare("UPDATE tab_clientes SET cli_nombre = :nom, cli_apellidos = :ape WHERE cli_id = :id");

        $resultado->bindParam(":nom",$nombre,PDO::PARAM_STR);
        $resultado->bindParam(":ape",$apellidos,PDO::PARAM_STR);
        $resultado->bindParam(":id",$int,PDO::PARAM_INT);

        $resultado->execute();
        return $resultado;
    }

    public static function Eliminar($intDel){
        $instanciar = new conexion ();
        $conectar = $instanciar->Conectar();
        //$resultado = $conectar->prepare("DELETE FROM tab_clientes WHERE cli_id = :ide");
        $resultado = $conectar->prepare("UPDATE tab_clientes SET cli_estado = 'Desactivo' WHERE cli_id = :ide");

        $resultado->bindParam(":ide",$intDel,PDO::PARAM_INT);

        $resultado->execute();
        return $resultado;
    }
   

}



?>
