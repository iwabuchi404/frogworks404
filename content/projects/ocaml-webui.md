---
title: ocaml-webui
date: '2026-07-18'
description: OCamlのアプリに、HTML・CSS・JSの画面を付けるためのWebUIランタイム。画面とのやり取りのコードを型の定義から生成し、処理の流れをトレースで追える。
template: pages/project.html
slug: ocaml-webui
taxonomies:
  tags:
    - developer-tools
    - interface
extra:
  entry_type: project
  project: true
  status: prototype
  github_url: https://github.com/iwabuchi404/ocaml-webui
  cover_image: /uploads/2026/11/key-visual.png
  stack: OCaml 5 / WebView / ATD / TypeScript
---

## これは何か

OCamlでデスクトップアプリを作るための土台。画面はOS標準のWebView（WindowsはWebView2、LinuxはWebKitGTK）にHTML・CSS・JSで描き、アプリの処理はOCamlで書く。

Tauriのような汎用のフレームワークではない。画面とOCamlのあいだのやり取りを、型の定義と1本のトレースで扱えるようにすることに絞っている。基本は1つのOCamlプロセスで動かし、重い処理はOCamlのDomainで並列に、落ちやすい処理や別のランタイムが必要な処理だけをWorker（別プロセス）に分ける。

## 作った動機

Electronで作ったアプリ（FubakoやKoeNote）で、一番手間がかかったのはプロセス間のやり取りだった。機能を1つ足すたびに、呼び出し側、preload、チャンネル名、ハンドラ、型を合わせて書く必要があり、デバッグのときもログが分かれていて追いにくい。

以前からOCamlを使ってみたかったが、GUIの環境構築でつまずいて止まっていた。そのGUIの部分を自分で作り、Electronで困っていたことを減らせないかと考えて作り始めた。経緯は[記事](/log/2026-11-22-ocaml-webui/)に書いた。

## 特徴

### 型の定義から、境界のコードを作る

Commandの入力・出力・エラーをATDのスキーマで定義し、OCamlとTypeScriptの両方のコードを生成する。画面側は生成された関数を呼ぶだけで、チャンネル名を文字列で書く必要はない。Commandを1つ足すときに手で合わせる場所が減り、生成した型を使っている範囲では、型のずれにコンパイル時に気づける。

### 処理をトレースで追う

画面で作ったトレースIDを、OCamlの処理とWorkerへの依頼まで引き継ぐ。Commandの受付、処理の開始と終了、例外、キャンセル、タイムアウトなどをOCaml側で記録する。画面側の記録はまだない。

### 普段は1プロセス、必要な処理だけWorkerへ

重い処理はOCamlのDomainで動かし、UIスレッドには結果だけを返す。外部プロセスのWorkerは、行区切りのJSON-RPCでやり取りし、落ちたときの再起動、タイムアウト、キャンセルをランタイムが受け持つ。

### そのほか

- 非同期のCommand（キャンセルとタイムアウト）
- ウィンドウ単位などでのリソースの寿命管理。ウィンドウを閉じると、そのウィンドウに属するWorkerなどを片付ける

## 対応環境

| OS | WebView | 状態 |
|---|---|---|
| Windows | WebView2 | 主に開発している環境 |
| Linux | WebKitGTK | WSL2で確認。ウィンドウは1つまで |
| macOS | WKWebView | 未確認 |

## インストール

ライブラリとして使える段階ではないが、手元で試すことはできる。

```sh
git clone --recurse-submodules https://github.com/iwabuchi404/ocaml-webui
cd ocaml-webui
opam switch create . 5.4.1
opam pin add ocaml-webui .
```

## スタック

| 項目 | 採用技術 |
|---|---|
| 言語 | OCaml 5 |
| WebView | webview（C/C++のライブラリを直接使用） |
| スキーマとコード生成 | ATD（atdml、atdts） |
| 画面側のクライアント | TypeScript |
| ビルド | Dune、opam |
| CI | GitHub Actions（Windows、Ubuntu） |

## 今の状態

PROTOTYPE。このランタイムで、AIツールの使用量を一覧するアプリ（Usage Monitor）を作って使っている。

まだ手をつけていないのは、JSからOCamlへのイベント通知、Workerの複数化、ファイル選択ダイアログなどのOSの機能、配布の仕組み、macOSでの確認など。ゆくゆくは、ほかの人も使えるライブラリとして公開したい。

リポジトリ: [github.com/iwabuchi404/ocaml-webui](https://github.com/iwabuchi404/ocaml-webui)
