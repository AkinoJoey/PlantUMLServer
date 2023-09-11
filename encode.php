<?php
require __DIR__ . '/vendor/autoload.php';
use function Jawira\PlantUml\encodep;

$text = file_get_contents('php://input');

$encode = encodep($text);
echo "http://www.plantuml.com/plantuml/uml/{$encode}";