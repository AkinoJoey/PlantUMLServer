let previewContent = "preview";
let format = 'png';
const previewContainer = document.getElementById('preview-container');
const pngBtn = document.getElementById('png-btn');
const svgBtn = document.getElementById('svg-btn');
const asciiBtn = document.getElementById('ascii-btn');
const downloadBtn = document.getElementById('download-btn');

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

        if(format == "png" || format == "svg"){
            previewContainer.innerHTML = `<img src="${encoded}">`;
        }if(format == "txt"){
            let ascii = await getAscii(encoded);
            previewContainer.innerHTML = `<pre>${ascii}</pre>`;
        }
    }

    editor.onDidChangeModelContent(async function (event) {
        const plantUmlText = editor.getValue();
        displayPreview(plantUmlText);
    });

    pngBtn.addEventListener('click',async function(){
        if(format != 'png'){
            const plantUmlText = editor.getValue();
            const encoded = await encode(plantUmlText,'png');
            previewContainer.innerHTML = `<img src="${encoded}">`;
        }

        format = 'png';
    })

    svgBtn.addEventListener('click',async function(){
        if(format != 'svg'){
            const plantUmlText = editor.getValue();
            const encoded = await encode(plantUmlText,'svg');
            previewContainer.innerHTML = `<img src="${encoded}">`;
        }
        format = 'svg';
    })

    asciiBtn.addEventListener('click',async function(){
        if(format != 'txt'){
            const plantUmlText = editor.getValue();
            const encoded = await encode(plantUmlText,'txt');
            let ascii = await getAscii(encoded);
            previewContainer.innerHTML = `<pre>${ascii}</pre>`;
        }

        format = 'txt';
    })

    downloadBtn.addEventListener('click', async function(){
        let plantUmlText = editor.getValue();
        let encoded = await encode(plantUmlText,format);
        let filePath = await download(encoded ,format);

        fetch(filePath)
            .then(function(res){
                return res.blob();
            })
            .then(async function(blob){
                const downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(blob);
                
                downloadLink.download = `plantUML.${format}`;

                downloadLink.click();

                window.URL.revokeObjectURL(downloadLink.href);
                let resDeletedFile = await deleteFile(filePath);
                console.log(resDeletedFile);
            })
    });
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

async function getAscii(encoded){
    let res = await fetch(encoded, {
        method: 'GET'
    })
    .then(response=> response.text())

    return res;
}

async function download(url,format) {
    let res = await fetch('download.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'format': format, 'url':url})
    })
    .then(response => response.text())

    return res;
}

async function deleteFile(filePath){
    let res = await fetch('deleteFile.php',{
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: filePath
    })
    .then(response => response.text())
    
    return res;
}

// tabボタンの処理
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContent = document.getElementById('tab-content');

    tabButtons.forEach(button =>  {

        button.addEventListener('click', async function () {
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            this.classList.add('active');
            
            let id = this.id;
            let html = await getCheatSheetData(id);
            
            tabContent.innerHTML = html;
            
    });

    tabButtons[0].click();

    });
});

async function getCheatSheetData(id){
    let res = await fetch(`../CheatSheets/${id}.html`)
        .then(response => response.text())

        return res;
}