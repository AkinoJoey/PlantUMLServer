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

    async function displayPreview(text) {
        const encoded = await encode(text, format);

        if (format == "png" || format == "svg") {
            previewContainer.innerHTML = `<img src="${encoded}">`;
        } if (format == "txt") {
            let ascii = await getAscii(encoded);
            previewContainer.innerHTML = `<pre>${ascii}</pre>`;
        }
    }

    editor.onDidChangeModelContent(async function (event) {
        const plantUmlText = editor.getValue();
        displayPreview(plantUmlText);
    });

    pngBtn.addEventListener('click', async function () {
        handleFormatChange('png');
    })

    svgBtn.addEventListener('click', async function () {
        handleFormatChange('svg');
    })

    asciiBtn.addEventListener('click', async function () {
        handleFormatChange('txt');
    })

    async function handleFormatChange(newFormat) {
        if (format != newFormat) {
            let plantUmlText = editor.getValue();
            let encoded = await encode(plantUmlText, newFormat)

            if (newFormat === "png" || newFormat === "svg") {
                previewContainer.innerHTML = `<img src="${encoded}">`;
            } else if (newFormat == "txt") {
                let ascii = await getAscii(encoded);
                console.log(ascii);
                previewContainer.innerHTML = `<pre>${ascii}</pre>`;
            }
            format = newFormat;
        }
    }

    downloadBtn.addEventListener('click', async function () {
        let plantUmlText = editor.getValue();
        let encoded = await encode(plantUmlText, format);
        await downloadImage(encoded);
    });
})

async function downloadImage(url) {
    const response = await fetch(url);
    const blob = await response.blob();

    const blobURL = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobURL;
    a.download = `plantUML.${format}`;
    a.click();
}

async function encode(text, format) {
    let res = await fetch('encode.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'format': format, 'text': text })
    })

    return await res.text();
}

async function getAscii(encoded) {
    let res = await fetch(encoded, {
        method: 'GET'
    })

    return await res.text();
}

// tabボタンの処理
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContent = document.getElementById('tab-content');

    tabButtons.forEach(button => {

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

async function getCheatSheetData(id) {
    let res = await fetch(`../CheatSheets/${id}.html`)

    return await res.text();
}