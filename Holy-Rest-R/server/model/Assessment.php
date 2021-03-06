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
        $sql = "UPDATE assessment SET IdHotel = '$IdHotel', Assessment = '$Assessment' WHERE IdUser = '$IdUser'";
        return Queries::insertDatas($sql);
    }

    protected function comproveAssesment($IdUser)
    {
        $sql = "SELECT * FROM assessment WHERE IdUser = '$IdUser'";
        return Queries::returnDatas($sql);
    }

    protected function getAllAssessment($IdHotel)
    {
        $sql = "SELECT * FROM assessment WHERE IdHotel = '$IdHotel'";
        return Queries::returnDatas($sql);
    }

    protected function getScores($score, $idHotel)
    {
        $sql = "SELECT IdUser FROM assessment WHERE IdHotel = '$idHotel' AND  Assessment = '$score' ";
        return Queries::returnDatas($sql);
    }

    protected function getUsersId($idHotel)
    {
        $sql = "SELECT IdUser FROM assessment WHERE IdHotel = '$idHotel'";
        return Queries::returnDatas($sql);
    }

    protected function deleteAssessmentForUser($IdUser)
    {
        $sql = "DELETE FROM assessment where IdUser = '$IdUser'";
        return Queries::insertDatas($sql);
    }

    protected function deleteAssessmentForHotel($IdHotel)
    {
        $sql = "DELETE FROM assessment where IdHotel = '$IdHotel'";
        return Queries::insertDatas($sql);
    }
}
