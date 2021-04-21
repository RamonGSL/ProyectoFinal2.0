<?php
include_once('Conexion.php');
class Queries
{
    public $conexion;

    public function automaticConexion()
    {
        $mvc_bd_conexion = new mysqli(Conexion::$mvc_bd_hostname, Conexion::$mvc_bd_usuario, Conexion::$mvc_bd_clave, Conexion::$mvc_bd_nombre);
        $error = $mvc_bd_conexion->connect_errno;
        if ($error != null) {
            echo "<p>Error " . $error . "conectando a la base de datos: ";
            echo $mvc_bd_conexion->connect_error . "</p>";
            exit();
        }
        $this->conexion = $mvc_bd_conexion;
    }

    protected function insertDatas($sql)
    {
        $this->automaticConexion();
        if (mysqli_query($this->conexion, $sql)) {
            return "New record created successfully";
        } else {
            return "Error: " . $sql . "<br>" . mysqli_error($this->conexion);
        }
        mysqli_close($this->conexion);
    }

    protected function returnDatas($sql)
    {

        $this->automaticConexion();
        $result = $this->conexion->query($sql);
        if ($result->num_rows > 0) {

            //Crea un array asociativo y mete todos los resultados en resp  
            for ($resp = array(); $row = $result->fetch_assoc(); $resp[] = $row);
        } else {
            $resp = "0 datas";
        }

        mysqli_close($this->conexion);
        if ($resp == "0 datas") {
            return $resp;
        } else {
            return $resp;
        }
    }
}
