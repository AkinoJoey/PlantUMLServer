# PlantUML Editor
[PlantUML](https://plantuml.com/ja/)の入力やプレビュー、図のダウンロードなどができるWEBアプリケーションです。

## URL
https://texttouml.yuki-gakiya.com/

## Demo
### エディターページ
![demo](https://github.com/AkinoJoey/PlantUMLServer/assets/124570638/cb6d4197-fa5f-44d4-81e4-968515e196d2)

### Exerciseページ
![demo2](https://github.com/AkinoJoey/PlantUMLServer/assets/124570638/42d4ffab-3a75-4d83-9351-8cf5c29e0eee)

## 概要
トップページの左側にはPlantUMLを入力できるエディタがあります。  
PlantUMLの構文に沿ったテキストをエディタに入力すると、右側にリアルタイムで図が描写されます。  
画面上部にあるPNG, SVG, ASCIIのボタンをクリックすると、押したボタンに合わせてプレビューの拡張子を変更できます。(ASCIIはシーケンス図のみ対応)    
また、Downloadボタンを押すと現在プレビューしている図をダウンロードできます。  

トップページの下部にはPlantUMLの各構文を確認できるチートシートを用意しました。

トップページの他に、PlantUMLの練習ができるページもあります。  
[「ログインシステム」の問題ページ](https://texttouml.yuki-gakiya.com/Pages/problems.php?id=1)を例にして説明します。  
ページ左側からエディタ、プレビュー、既に用意された図があります。  
ユーザーは右側の図と同じようになるように、エディタにテキストを入力します。こうすることでPlantUMLの入力を練習できます。  
Show Answerのボタンを押すと、答えの図のテキストを表示できます。  
[練習問題の一覧は](https://texttouml.yuki-gakiya.com/Pages/problems.php)トップページ右側のExercisesからアクセスできます。

## 作成の経緯
ソフトウェアエンジニアはユースケース図、クラス図、アクティビティ図など様々な図をソフトウェア設計の際に使用するため、オンライン上で手軽に図を作成、ダウンロードできるアプリケーションがあったら便利かと思い作成しました。

## 使用技術
- フロントエンド
  - 使用言語： HTML, CSS, Javascript
  - HTTPリクエスト: Fetch API
  - コードエディタ: Monaco Editor

- バックエンド
  - 使用言語： PHP
  - PlantUML変換: [PlantUML Server](https://plantuml.com/server)
  - パッケージ管理: Composer
  - Webサーバー: Nginx
  - サーバー: Amazon EC2

## 期間
2023年9月11日から9日間かけて開発しました。

## こだわった点
### 非同期プログラミングの活用
入力されたテキストはfetch apiを使用して非同期にサーバー側にレスポンスを送信します。これにより他の操作をブロックせずに、リアルタイムでプレビュー表示できるようにしています。  
また、チートシートの部分も選択されたタブをページの再読み込みせず表示するために、非同期でデータを取得してレンダリングしています。

### 拡張性を考慮した設計
各問題のページとテーブルは簡単に追加できるように、jsonファイルにid, title, theme, umlを入力するだけで動的に作成されるように設計しました。

### ストレージの効率的な利用
プレビューやチートシート、問題などに表示される画像は全てオンラインのPlantUML Serverを経由して表示しています。  
これによりサーバーのストレージを効率的に利用しています。


## これからの改善点、拡張案
### ページネーションの作成
