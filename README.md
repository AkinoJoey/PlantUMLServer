# PlantUML Editor
[PlantUML](https://plantuml.com/ja/)の入力、プレビュー、および図のダウンロードを提供するWEBアプリケーションです。

## URL
https://texttouml.yuki-gakiya.com/

## Demo
### トップページ
![demo](https://github.com/AkinoJoey/PlantUMLServer/assets/124570638/cb6d4197-fa5f-44d4-81e4-968515e196d2)

### 練習ページ
![demo2](https://github.com/AkinoJoey/PlantUMLServer/assets/124570638/42d4ffab-3a75-4d83-9351-8cf5c29e0eee)

## 概要
トップページではPlantUMLを入力するエディターとプレビューを提供しています。PlantUMLの構文に沿ったテキストをエディターに入力すると、プレビュー画面にリアルタイムで図が表示されます。画面上部にあるPNG、SVG、ASCIIのボタンをクリックすると、プレビューの拡張子を変更できます。また、Downloadボタンを押すと現在のプレビュー図をダウンロードできます。

トップページの下部にはPlantUMLの構文を確認できるチートシートも提供されています。

PlantUMLの練習ができる別のページもあります。練習ページでは左側からエディター、プレビュー、および既に用意された図が表示されます。ユーザーは右側の図と同じようになるように、エディターにテキストを入力します。これにより、PlantUMLの入力を練習できます。Show Answerボタンを押すと、答えの図のテキストを表示できます。  
[練習問題の一覧は](https://texttouml.yuki-gakiya.com/Pages/problems.php)トップページ右側のExercisesからアクセスできます。

## 作成の経緯
ソフトウェアエンジニアはユースケース図、クラス図、アクティビティ図など、ソフトウェア設計の際にさまざまな図を使用します。そのため、オンラインで手軽に図を作成およびダウンロードできるアプリケーションの提供が便利だと考え、PlantUML Editorを開発しました。
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
入力されたテキストはFetch APIを使用して非同期にサーバーに送信され、他の操作をブロックせずにリアルタイムでプレビューを表示できるようにしました。また、チートシートの部分も選択されたタブをページを再読み込みせずに表示するために、非同期でデータを取得してレンダリングしています。
### 拡張性を考慮した設計
各問題のページとテーブルは簡単に追加できるように、JSONファイルにID、タイトル、テーマ、UMLを入力するだけで動的に作成できるように設計しました。
### ストレージの効率的な利用
プレビューやチートシート、問題などに表示される画像はすべてオンラインのPlantUML Serverを経由して表示し、サーバーのストレージを効率的に利用しています。

## これからの改善点、拡張案
### ページネーションの作成
問題数が増加する場合を考慮し、[練習問題の一覧ページ](https://texttouml.yuki-gakiya.com/Pages/problems.php)が見やすいようにページネーションの実装を検討中です。

### 回答正解時のアクション
ユーザーが楽しみながら練習問題に取り組めるように、問題に正解した際に達成感や喜びを感じられるようなアクションを実装したいです。
