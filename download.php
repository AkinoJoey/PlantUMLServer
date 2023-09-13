<?php
$json = file_get_contents('php://input');
$data = json_decode($json,true);

$format = $data['format'];
$url = $data['url'];
$imageData = file_get_contents($url);

$filename = "./images/downloaded_image.{$format}";
file_put_contents($filename, $imageData);

echo $filename;