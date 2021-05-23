<?php

include_once('./../../model/Food.php');
include_once('./../utils.php');
class functionsFood extends Food
{
    public function createAllFoods($allFoods)
    {
        $result = [];
        $deleteTable = Food::deleteALLFoods();
        for ($i = 0; $i < count($allFoods) - 1; $i++) {
            $createFood = Food::insertFood($allFoods[$i]["Food"], $allFoods[$i]["Price"], $allFoods[$i]["IdHotel"]);
            array_push($result, $createFood);
        }
        foreach ($result as $insert) {
            if ($insert !== "New record created successfully") {
                return null;
            }
        }

        return "Correct";
    }

    public function getFoodHotel($data)
    {
        $getFood = Food::getFoods($data['idHotel']);
        if ($getFood === "0 datas") {
            return null;
        }
        return $getFood;
    }
}
