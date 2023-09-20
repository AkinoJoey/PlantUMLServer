<?php
require "../vendor/autoload.php";

use function Jawira\PlantUml\encodep;

$json = file_get_contents('../problems/problems.json');
$data = json_decode($json, true);

$id = $_GET['id'] ?? 0;
$title = "UML Exercises";

if($id > 0 && $id <= count($data)){
    $index = $id - 1;
    $title = $data[$index]['title'];
    $uml = $data[$index]['uml'];
    $encode = encodep($uml);
    $encodeUrl = "https://www.plantuml.com/plantuml/png/{$encode}";
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/chota@latest">
    <link rel="stylesheet" href="../css/style.css">
    <title><?php echo $title ?></title>
</head>
<body>
    <?php if($id == 0 ) : ?>
        <nav class="nav">
            <div class="nav-right">
                <div class="tabs">
                    <a href="../">Editor</a>
                    <a class="active"  href="./problems.php">Exercises</a>
                </div>
            </div>
        </nav>
        <h2 class="text-center"><?php echo $title ?></h2>
        <div class="container">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Theme</th>
                </tr>
            </thead>
            <tbody>
                <?php for($i=0; $i < count($data); $i++): ?>
                    <tr class="clickable-row" data-href="./problems.php?id=<?php echo $i+1 ?>">
                        <td><?php echo $data[$i]['id'] ?></td>
                        <td><?php echo $data[$i]['title'] ?></td>
                        <td><?php echo $data[$i]['theme'] ?></td>
                    </tr>
                <?php endfor; ?>
            </tbody>
        </table>
        </div>
        
        <script>
            const linkElements = document.querySelectorAll('tr[data-href]');
            linkElements.forEach(linkElement => {
                const dataHref = linkElement.getAttribute('data-href');
                linkElement.addEventListener('click', () => {
                window.location.href = dataHref;
                });
            });
        </script>
        

    <?php elseif($id > 0 && $id <= count($data)): ?>
        <nav class="nav">
            <div class="nav-right">
                <div class="tabs">
                    <a href="../">Editor</a>
                    <a href="../Pages/problems.php">Exercises</a>
                </div>
            </div>
        </nav>
        <h2 class="text-center"><?php echo $title ?></h2>
        <div class="is-center mb-1">
            <a id="answer-btn" class="button secondary" >Show Answer</a>
        </div>

        <div class="row is-center is-marginless">
            <div class="col-4">
                <div id="editor-container" class="monaco-container"></div>
            </div>
            <div class="col-4">
                <div id="preview-container" class="monaco-container overflow-auto" ></div>
            </div>
            <div class="col-4">
                <div id="answer-container"  class="monaco-container overflow-auto" >
                    <img src="<?php echo $encodeUrl ?>">
                    <p class="is-hidden"><?php echo $uml ?></p>
                </div>
            </div>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.41.0/min/vs/loader.min.js"></script>
        <script src="../js/problems.js"></script>
    <?php else: ?>
        <h1 class="text-center">404<br>Page not found</br></h1>
    <?php endif; ?>

</body>
</html>