<?


$imageUrl = file_get_contents('php://input');

$response = file_get_contents($imageUrl);

if ($response === false) {
    // エラーハンドリング: ダウンロードに失敗した場合の処理
    die("画像をダウンロードできませんでした。");
}

// 2. レスポンスから画像データを取得

// 3. 画像データを保存または処理
file_put_contents("downloaded_image.jpg", $response);

echo "画像をダウンロードしました。";