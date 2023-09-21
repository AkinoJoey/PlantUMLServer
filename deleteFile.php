<?php
$filename = file_get_contents('php://input');
$filePath = "./images/{$filename}";

if (file_exists($filePath)) {
    if (unlink($filePath)) {
        echo "ファイルが削除されました。";
    } else {
        echo "ファイルの削除に失敗しました。";
    }
} else {
    echo "ファイルが存在しません。";
}