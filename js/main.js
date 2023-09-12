let previewContent = "preview";
let format = 'png';
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
        const encoded = await encode(plantUmlText,format);

        if(format == "png" || format == "svg"){
            previewContainer.innerHTML = `<img src="${encoded}">`;
        }if(format == "txt"){
            let ascii = await getAscii(encoded);
            previewContainer.innerHTML = `<pre>${ascii}</pre>`;
        }
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

});


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