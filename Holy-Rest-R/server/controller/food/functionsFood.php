<?php

include_once('./../../model/Food.php');
include_once('./../utils.php');
class functionsFood extends Food
{
    public function createAllFoods($allFoods)
    {
        $result = [];
        for ($i = 0; $i < count($allFoods) - 1; $i++) {
            $createFood = Food::insertFood($allFoods[$i]["Food"], $allFoods[$i]["Price"], $allFoods[$i]["IdHotel"]);
            array_push($result, $createFood);
        }
        var_dump($result);

        return null;
    }
}
