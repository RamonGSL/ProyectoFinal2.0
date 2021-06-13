<?php
include_once('../../model/Queries.php');

class modelDelete extends Queries
{
    protected function deleteAssessment($IdUser)
    {
        $sql = "SELECT * FROM assessment WHERE IdUser = '$IdUser'";
        $response = Queries::returnDatas($sql);

        if ($response === "0 datas") {
            return "Correct";
        } else {
            $sql = "DELETE FROM assessment where IdUser = '$IdUser'";
            $response = Queries::insertDatas($sql);
            if ($response === "New record created successfully") {
                return "Correct";
            } else {
                return "Error";
            }
        }
    }

    protected function deleteFoods($Email)
    {
        $sql = "SELECT Id FROM hotels WHERE Email = '$Email'";
        $response = Queries::returnDatas($sql);
        if ($response === "0 datas") {
            return "Correct";
        } else {
            $IdHotel = $response[0]["Id"];
            $sql = "DELETE FROM food WHERE IdHotel = '$IdHotel'";
            $response = Queries::insertDatas($sql);
            if ($response === "New record created successfully") {
                return "Correct";
            } else {
                return "Error";
            }
        }
    }

    protected function deleteImages($Email)
    {
        $sql = "SELECT Id FROM hotels WHERE Email = '$Email'";
        $response = Queries::returnDatas($sql);
        if ($response === "0 datas") {
            return "Correct";
        } else {
            $IdHotel = $response[0]["Id"];
            $sql = "DELETE FROM imageshotels WHERE IdHotel = '$IdHotel'";
            $response = Queries::insertDatas($sql);
            if ($response === "New record created successfully") {
                return "Correct";
            } else {
                return "Error";
            }
        }
    }

    protected function deleteRooms($Email)
    {
        $sql = "SELECT Id FROM hotels WHERE Email = '$Email'";
        $response = Queries::returnDatas($sql);
        if ($response === "0 datas") {
            return "Correct";
        } else {
            $IdHotel = $response[0]["Id"];
            $sql = "DELETE FROM room WHERE IdHotel = '$IdHotel'";
            $response = Queries::insertDatas($sql);
            if ($response === "New record created successfully") {
                return "Correct";
            } else {
                return "Error";
            }
        }
    }

    protected function deleteManage($Email)
    {
        $sql = "SELECT Id FROM hotels WHERE Email = '$Email'";
        $response = Queries::returnDatas($sql);
        if ($response === "0 datas") {
            return "Correct";
        } else {
            $IdHotel = $response[0]["Id"];
            $sql = "DELETE FROM manage WHERE IdHotel = '$IdHotel'";
            $response = Queries::insertDatas($sql);
            if ($response === "New record created successfully") {
                return "Correct";
            } else {
                return "Error";
            }
        }
    }

    protected function deleteUser($Email)
    {
        $sql = "DELETE FROM users where Email = '$Email'";
        $response = Queries::insertDatas($sql);
        if ($response ===  "New record created successfully") {
            return "Correct";
        } else {
            return "Error";
        }
    }
}
