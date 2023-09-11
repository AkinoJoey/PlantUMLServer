let previewContent = "preview";
const previewContainer = document.getElementById('preview-container');
const pngBtn = document.getElementById('png-btn');
const svgBtn = document.getElementById('svg-btn');
const asciiBtn = document.getElementById('ascii-btn');

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.41.0/min/vs' }});
    
require(['vs/editor/editor.main'], function() {
    const editor = monaco.editor.create(document.getElementById('editor-container'), {
        value: '<!-- ここにテキスト入力してください -->\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
        language: 'plaintext',
        automaticLayout: true 
    });

    editor.onDidChangeModelContent(function(event) {
        const plantUmlText = editor.getValue();

        previewContainer.innerHTML = plantUmlText;

        
    });

});



