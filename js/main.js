let previewContent = "preview";
const previewContainer = document.getElementById('preview-container');
const pngBtn = document.getElementById('png-btn');
const svgBtn = document.getElementById('svg-btn');
const asciiBtn = document.getElementById('ascii-btn');

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.41.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
    const editor = monaco.editor.create(document.getElementById('editor-container'), {
        value: '@startuml \nBob -> Alice : hello\n@enduml',
        language: 'plaintext',
        automaticLayout: true
    });


    editor.onDidChangeModelContent(async function (event) {
        const plantUmlText = editor.getValue();
        const encoded = await encode(plantUmlText);
        console.log(encoded);
        
    });

});


async function encode(text){
    let res = await fetch('encode.php',{
        method:'POST',
        headers:{'Content-Type': 'text/plain'},
        body:text
    })
    .then(response => response.text())
    
    return res;
}