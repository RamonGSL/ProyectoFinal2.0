<?php
include_once('Queries.php');

class Assessment extends Queries
{
    protected function createAssesment($IdUser, $IdHotel, $Assessment)
    {
        $sql = "INSERT INTO assessment (IdUser, IdHotel, Assessment )
        	values ('" . $IdUser . "','" . $IdHotel . "','" . $Assessment . "')";
        return Queries::insertDatas($sql);
    }

    protected function putAssesment($IdUser, $IdHotel, $Assessment)
    {
        $sql = "UPDATE assessment SET IdUser = '$IdUser', IdHotel = '$IdHotel', Assessment = '$Assessment'";
        return Queries::insertDatas($sql);
    }

    protected function comproveAssesment($IdUser)
    {
        $sql = "SELECT * FROM assessment WHERE IdUser = '$IdUser'";
        return Queries::returnDatas($sql);
    }
}
