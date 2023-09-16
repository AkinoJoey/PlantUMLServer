<?php
require __DIR__ . '/vendor/autoload.php';

use function Jawira\PlantUml\encodep;

$json = file_get_contents('./problems/problems.json');
$data = json_decode($json, true);

$id = $_GET['id'] ?? 0;
$title = $data[$id]['title'];
$uml = $data[$id]['uml'];
$encode = encodep($uml);
$encodeUrl = "https://www.plantuml.com/plantuml/png/{$encode}";
?>


<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/chota@latest">
    <link rel="stylesheet" href="css/style.css">
    <title><?php echo $title ?></title>
</head>
<body>
    <h2 class="text-center"><?php echo $title ?></h2>
    <div class="is-center mb-1">
        <a id="answer-btn" class="button secondary" >Show Answer</a>
    </div>

    <div class="row is-center is-marginless">
        <div class="col-4">
            <div id="editor-container" class="monaco-container"></div>
        </div>
        <div class="col-4">
            <div id="preview-container" class="monaco-container" ></div>
        </div>
        <div class="col-4">
            <div id="answer-container"  class="monaco-container" >
                <img src="<?php echo $encodeUrl ?>">
                <p class="is-hidden"><?php echo $uml ?></p>
            </div>
        </div>
    </div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.41.0/min/vs/loader.min.js"></script>
<script src="js/problems.js"></script>
</body>
</html>