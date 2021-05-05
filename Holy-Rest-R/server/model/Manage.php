<?php
include_once('Queries.php');

class Manage extends Queries
{
    protected function comproveAdmin($Id)
    {
        $sql = "SELECT * FROM manage where idUser = '$Id'";
        return Queries::returnDatas($sql);
    }

    protected function createManage($IdHotel, $IdUser)
    {
        $sql = "INSERT INTO manage (IdHotel, IdUser)
        values ('" . $IdHotel . "','" . $IdUser . "')";
        return Queries::insertDatas($sql);
    }
}
