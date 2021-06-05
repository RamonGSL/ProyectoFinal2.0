<?php

include_once('./../../model/Assessment.php');
include_once('./../utils.php');
class functionsAssessment extends Assessment
{
    public function insertAssesment($datas)
    {
        $comproveAssessment = Assessment::comproveAssesment($datas['IdUser']);
        if ($comproveAssessment === "0 datas") {
            $createAssesment = Assessment::createAssesment($datas['IdUser'], $datas['IdHotel'], $datas['Assessment']);
            if ($createAssesment == "New record created successfully") {
                return "Correct";
            }
            return "Error";
        } else {
            $this->updateAssesment($datas);
        }
    }

    protected function updateAssesment($datas)
    {
        $updateAssesment = Assessment::putAssesment($datas['IdUser'], $datas['IdHotel'], $datas['Assessment']);
        if ($updateAssesment == "New record created successfully") {
            return "Correct";
        }

        return "Error";
    }
}
