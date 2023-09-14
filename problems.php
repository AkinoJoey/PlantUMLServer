<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/chota@latest">
    <link rel="stylesheet" href="css/style.css">
    <title>UML問題集</title>
</head>
<body>
    <h2 class="text-center">PlantUML 問題</h2>
    <div class="is-center mb-1">
        <a id="answer-btn" class="button secondary" >Show Answer</a>
    </div>
    <div class="row is-center is-marginless">
        <div class="col">
            <div id="editor-container" class="monaco-container"></div>
        </div>
        <div class="col">
            <div id="preview-container" class="monaco-container" ></div>
        </div>
        <div class="col">
            <div id="answer-container"  class="monaco-container" ></div>
        </div>
    </div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.41.0/min/vs/loader.min.js"></script>
<script src="js/problem.js"></script>
</body>
</html>