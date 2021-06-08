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

    public function getALLAssesment($datas)
    {
        $getAssements = Assessment::getAllAssessment($datas['IdHotel']);
        if ($getAssements == "0 datas") {
            return null;
        } else {
            $media = $this->mediaAssement($getAssements);
            return $media;
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

    protected function mediaAssement($arrayAssements)
    {
        try {
            $puntuation = 0;
            foreach ($arrayAssements as $assessment) {
                $puntuation += intval($assessment["Assessment"]);
            }
            $puntuation = $puntuation / count($arrayAssements);
            return strval($puntuation);
        } catch (\Throwable $th) {
            return "Error";
        }
    }
}
