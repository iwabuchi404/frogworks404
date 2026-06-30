---
title: KamoX
date: '2026-04-05'
description: AIコーディングエージェントがChrome拡張・Electron・VSCode拡張をライブ確認しながら開発できるnpmプラグイン型HTTP APIサーバー。
template: pages/project.html
slug: kamox
taxonomies:
  tags:
    - ai-collaboration
    - developer-tools
extra:
  entry_type: project
  project: true
  status: usable
  github_url: https://github.com/iwabuchi404/kamox
---

## これは何か
KamoXは、AIコーディングエージェントがアプリの見た目を確認しながら開発できるようにするツールです。

AIに「Chrome拡張を作って」とお願いしても、AIはコードを書くだけで、実際にどう見えるかを確認できません。KamoXを入れると、AIがHTTP経由でビルド→起動→スクリーンショット撮影→ログ取得までできるようになります。AIが自分で結果を確認しながら修正を繰り返せるんです。

## 作った動機
AIにChrome拡張を作らせていた時に、AIが書いたコードがちゃんと動いているかを
人間が毎回確認するのが辛かったんです。ビルドして、ロードして、画面を開いて、
エラーが出てないか見て……。これをAI自身にやらせられれば、人間は結果だけ見ればよくなる。

Playwrightは拡張機能でも使えますが、セットアップが通常のWebとは違うし、
AIエージェントに毎回その手順を踏ませるのは重い。
Playwrightを内包しつつ、AIが叩きやすいHTTP APIとしてラップするものを作りました。

## 特徴

### ビルド→確認サイクル
AIがHTTP APIを叩いて、ビルドして、アプリを起動して、スクリーンショットを撮って、ログを取得できます。すべてプログラムから実行できるので、AIが自律的に確認→修正のループを回せます。

### 対応プラットフォーム
- **Chrome拡張** — ServiceWorkerのデバッグ、manifest.jsonの検証、拡張のリロード
- **Electron** — メインプロセスとレンダラープロセスの起動、IPCの監視
- **VSCode拡張** — Extension Hostの起動、コマンド実行、UI確認

### npmで簡単導入
`npm install`するだけで使えます。AIの開発環境に組み込みやすいのがポイントです。
## インストール

npmで公開済み。グローバルインストールですぐ使えます。

```bash
npm install -g kamox
```

## スタック

| 要素 | 選択 |
|---|---|
| HTTPサーバー | Express.js |
| ブラウザ自動化 | Playwright |
| 言語 | Node.js / TypeScript |
| パッケージ構成 | npm workspaces |

## 今の状態

Chrome拡張、Electron、VSCode拡張の3プラットフォームに対応済みで、実際にAIと一緒に開発する時に使っています。CLIの改善とドキュメント整備を進行中。