<?php

include_once('./../../model/Images.php');
include_once('./../utils.php');
class functionsImages extends Images
{
    public function createAllImages($allImages)
    {
        $result = [];
        $this->generateFolder($allImages[0]["IdHotel"]);
        $deleteTable = Images::deleteALLImages($allImages[0]["IdHotel"]);
        for ($i = 0; $i < count($allImages) - 1; $i++) {
            $imageName = $this->generateRandomString();
            $type = 0;

            if ($allImages[$i]["Type"] === "principal") {
                $type = 1;
            }
            $createImage = Images::insertImage($allImages[$i]["IdHotel"], $type,  $imageName);
            array_push($result, $createImage);
            //$this->generateFolder($allImages[$i]["IdHotel"]);
            $this->generateImage($allImages[$i]["Image"], $allImages[$i]["IdHotel"], $imageName);
        }
        foreach ($result as $insert) {
            if ($insert !== "New record created successfully") {
                return null;
            }
        }

        return "Correct";
    }

    public function getImagesForHotel($data)
    {
        $getImages = Images::getImages($data['idHotel']);
        $arrayImgExt = [];
        if ($getImages === "0 datas") {
            return null;
        }
        foreach ($getImages as $image) {
            $count = 0;
            $direction = utils::returnDirection();

            $imageDirection = $direction . "ImagesHotels/" . $image["IdHotel"] . "/";
            if (is_dir($imageDirection)) {
                if ($dh = opendir($imageDirection)) {
                    while (($file = readdir($dh)) !== false) {
                        if (strpos($file, $image['NameImage']) !== false) {
                            array_push($arrayImgExt, $file);
                            //$getImages[$count]['NameImage'] = $file;
                        }
                    }
                    closedir($dh);
                }
            }
            $count++;
        }

        for ($i = 0; $i < count($arrayImgExt); $i++) {
            $getImages[$i]["NameImage"] = $arrayImgExt[$i];
        }

        $this->getImg($getImages);
        return $this->getImg($getImages);
    }

    private function generateFolder($idHotel)
    {
        $direction = utils::returnDirection();
        $folderDirection = $direction . "ImagesHotels/" . $idHotel;

        if (scandir($folderDirection)) {
            $this->removeImages($folderDirection);
        }

        mkdir($folderDirection);
    }

    private function generateImage($image, $idHotel, $imageName)
    {
        try {
            $imageB64 = explode(',', $image);
            $extension = explode('/', $image);
            $extension = $extension[1];
            $extension = explode(";", $extension);
            $extension = $extension[0];

            $nameReturn = $imageName . "." . 'jpg';

            while ($imageName == Images::checkNameImage($imageName)) {
                $imageName = $this->generateRandomString();
            }

            $direction = utils::returnDirection();
            $imageDirection = $direction . "ImagesHotels/" . $idHotel . "/";
            $imageName = $imageDirection . $imageName . ".jpg";


            $fp = fopen($imageName, 'w+');
            fwrite($fp, base64_decode($imageB64[1]));
            fclose($fp);

            return $nameReturn;
        } catch (\Throwable $th) {
            return "error";
        }
    }

    private function  generateRandomString($word = 30)
    {
        $characters  = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $word; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }

        return $randomString;
    }

    private function removeImages($carpeta)
    {
        try {
            foreach (glob($carpeta . "/*") as $archivos_carpeta) {
                if (is_dir($archivos_carpeta)) {
                    $this->removeImages($archivos_carpeta);
                } else {
                    unlink($archivos_carpeta);
                }
            }
            rmdir($carpeta);
        } catch (\Throwable $th) {
            return "error";
        }
    }

    private function getImg($images)
    {
        $direction = utils::returnDirection();
        $folderDirection = $direction . "ImagesHotels/";
        try {

            for ($i = 0; $i < count($images); $i++) {
                $image = $folderDirection . $images[$i]["IdHotel"] . "/" . $images[$i]["NameImage"];
                $fp = fopen($image, "r");
                $contents = fread($fp, filesize($image));
                $imgB64 = base64_encode($contents);
                $images[$i]["base64"] = $imgB64;
            }
            return $images;
        } catch (\Throwable $th) {
            return null;
        }
    }

    public function getALLImages()
    {
        $totalImages = Images::returnALLImages();
        if ($totalImages == "0 datas") {
            	return null;
        }else{

		return $totalImages;
	}

    }

    public function getUrl()
    {
    }
}
