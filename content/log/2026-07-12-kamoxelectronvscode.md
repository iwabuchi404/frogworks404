---
title: KamoXのElectronとVSCode対応を「使える」ようにした話
date: '2026-07-12'
draft: false
description: KamoXのElectron対応とVSCode対応の話
extra:
  entry_type: article
  project_slug: kamox
taxonomies:
  tags:
    - ai-collaboration
slug: 2026-07-12-kamoxelectronvscode
---

## 対応している、と使える、は違った

前の記事で、KamoXが3プラットフォームに対応していると書いた。嘘ではなかったが、正確でもなかった。当時のElectron対応とVSCode対応は「起動してスクリーンショットが撮れる」レベルで、Chrome拡張と同じ密度で使えるものではなかった。

実際にAIと開発する道具として使い込むと、プラットフォームごとに「スクショだけでは足りない部分」が全然違うことが分かってきた。この記事はその作り込みの記録。

## Electron: 不具合は画面の外で起きる

FubakoをAIと開発していて気づいたのは、Electronの不具合の多くはレンダラーの画面上ではなく、メインプロセスとの間、IPCの向こう側で起きるということだった。【ここに実際の不具合の例を1つ: 画面は正常に見えるがIPCが失敗していた等】

スクショを撮っても画面は正常に見える。DOMも問題ない。でも動かない。原因はIPCハンドラの名前の食い違いだったり、メインプロセス側の例外だったりする。AIにスクショとDOMだけ渡しても「画面は問題なさそうです」と返ってくるだけで、ループが前に進まない。

なのでElectronアダプタにはIPCの監視を入れた。レンダラーとメインプロセスの間で飛んでいるメッセージをKamoXが記録して、`/logs`で取れる。AIは「ボタンを押した→IPCで`save-file`が飛んだ→メイン側で例外」という因果を、テキストで追える。

もう1つがネイティブダイアログ。`dialog.showOpenDialog()`が開くOSのファイル選択ダイアログはDOMの外側なので、Playwrightからは触れない。人間なら手でファイルを選べばいいが、AIの自己確認ループの中では、ここで毎回止まる。なのでダイアログAPIの戻り値をモックできるようにした。「ファイル選択で`/tmp/test.txt`が返ってきた体で続きを動かす」ということがHTTP API経由でできる。

Playwright自体のElectron対応はexperimental扱いだが、`electron.launch`での起動とウィンドウ操作は実行基盤として十分使えている。KamoXが足しているのは、その外側にあるIPCとネイティブUIの層だ。

## VSCode拡張: そもそもWebページではない

VSCode拡張はさらに別の世界だった。VSCode自体はElectronアプリだが、拡張の確認はExtension Development Hostを立ち上げてその中でやることになる。公式のテスト手段もPlaywrightではなく`@vscode/test-electron`系だ。

それ以上に違うのは、確認したい対象がWebページの部品ではないこと。ボタンやフォームではなく、コマンドパレット、通知トースト、ステータスバー、ツリービュー、Problemsパネル。「コマンドを実行して、Problemsが増えていないか見る」がVSCode拡張開発の基本ループで、これはセレクタでDOMを叩く世界観と噛み合わない。

なのでVSCodeアダプタには専用のエンドポイント群を持たせた。`/vscode/command`でコマンドIDを指定して実行、`/vscode/problems`でProblemsパネルのマーカー取得、`/vscode/notifications`で通知の確認、`/vscode/tree-view`でツリービューの中身。AIから見ると「コマンドを打って結果を見る」がcurl2回で済む。

共通APIに寄せる、という方針からすると専用エンドポイントは敗北に見えるかもしれない。でも「ビルド→確認→ログ」の共通の骨格は保ちつつ、プラットフォーム固有の語彙は隠さず出す、という割り切りの方が実際には使いやすかった。VSCodeのProblemsパネルを無理やり`check-ui`のDOM情報に押し込んでも、AIにとって読みやすくはならない。

## 連続操作: 開いたページを維持する

3プラットフォームを使い込む中で、共通側にも直すべき問題が見つかった。`/check-ui`は確認のたびにページを開いて閉じる設計だったので、「さっき確認したpopupのボタンを押す」ができなかった。確認と操作が別のページに向いてしまう。

なので`check-ui`に`keepOpen`オプションを足して、開いたページをpageIdで管理するようにした。操作系のAPIは`pageId`、`pageType`(popup / options / tab)、`pageUrl`などでページを指定できる。「popupを開いたままにして、そのpopupのボタンを押して、変化を見る」が繋がるようになった。

## 分かったこと

共通化できるのはループの形で、確認の中身はプラットフォームごとに違う。「ビルドして、見て、操作して、ログを読む」という骨格は3つとも同じだが、「見る」の意味がChrome拡張ではpopupのDOMで、ElectronではIPCを含み、VSCodeではProblemsパネルを含む。最初の設計はこの骨格の共通性だけ見ていて、中身の違いを甘く見ていた。

道具は対象と一緒に育つ、という当たり前の話でもある。Chrome拡張だけ触っていた頃には、IPCの監視もダイアログのモックも発想として出てこなかった。

## リンク

- [GitHub](https://github.com/iwabuchi404/kamox)
- [npm](https://www.npmjs.com/package/kamox)
- [前の記事: AIにChrome拡張を作らせる — KamoXを作った理由と仕組み](/log/2025-06-25-kamox/)