let previewContent = "preview";
let format = 'png';
const previewContainer = document.getElementById('preview-container');
const answerBtn = document.getElementById('answer-btn');

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.41.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
    const editor = monaco.editor.create(document.getElementById('editor-container'), {
        value: '@startuml \nBob -> Alice : hello\n@enduml',
        language: 'plaintext',
        automaticLayout: true
    });

    // 初期の表示
    displayPreview(editor.getValue());

    async function displayPreview(text){
        const encoded = await encode(text,format);
        previewContainer.innerHTML = `<img src="${encoded}">`;
    }

    editor.onDidChangeModelContent(async function() {
        const plantUmlText = editor.getValue();
        displayPreview(plantUmlText);
    });

    answerBtn.addEventListener('click',function(){
        if(answerBtn.textContent == 'Show Answer'){
            answerBtn.textContent = 'Hide Answer';
        }else{
            answerBtn.textContent = 'Show Answer';
        }
    })

})

async function encode(text,format) {
    let res = await fetch('encode.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'format': format, 'text':text})
    })
        .then(response => response.text())

    return res;
}
