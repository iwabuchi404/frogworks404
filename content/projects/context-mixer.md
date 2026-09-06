---
title: ContextMixer
date: '2026-06-20'
description: AIと人間が共同管理するナレッジベース
template: pages/project.html
slug: context-mixer
taxonomies:
  tags:
    - ai-collaboration
    - knowledge
extra:
  entry_type: project
  project: true
  status: in-operation
  version: '0.9'
  license: Private
  github_url: https://github.com/iwabuchi404/context-mixer
  demo_url: https://context-mixer.frog404.work
  cover_image: /uploads/2026/06/7d808d5e-159e-481a-bf11-f4c672373d2c.png
  featured: true
---

## これは何か

AIと人間が同じ場所でドキュメントを読み書きするためのナレッジベースです。

NotionやObsidianは人間が使いやすいことを優先して作られています。ContextMixerは、AIがアクセスしやすさも同じくらい重視して設計しました。人間とAIが協業するためのナレッジベースを目指しています。

## 作った動機

もともと個人プロジェクトのドキュメント管理にNotionを使っていました。NotionにMCPでアクセスすると、少しの追記にもトークンと時間がかかります。これはNotionの問題というより、AI前提の設計になっていないからで、NotionはAI登場以前からあるので当然です。

Notionのリッチなブロック構造は人間には便利ですが、AIが1段落のためにページ全体を取得しなければならないのは無駄が多い。ローカル管理のObsidianも候補でしたが、チャットアプリからアクセスしたかったので選択肢から外れました。

ならAI向きに作り直せばいい、というのが始まりです。

## 三本柱

ContextMixerの設計は3つの柱で成り立っています。

### 1. 粒度を選べるドキュメント取得（Progressive Retrieval）

ドキュメントを「どこまで読むか」を指定できるAPI設計になっています。

| 取得モード | 内容 | 想定トークン |
|---|---|---|
| `meta` | タイトルと概要だけ | 数十 |
| `outline` | 見出し構造 | 数百 |
| `section` | 特定セクションだけ | 数百〜数千 |
| `full` | 全文 | 全量 |

AIはまず `meta` を見て、関係ありそうなら `section` で必要な部分だけ取る。全文を毎回読まないので、トークン消費が劇的に減ります。

### 2. MCP対応

Claude DesktopやClaude.aiからMCP経由で直接ドキュメントを検索・取得・書き込みできます。OAuth 2.1認証、ツールは9個。

NotionでもMCP経由でアクセスできていましたが、ContextMixerでは粒度を選べる取得APIのおかげで、AIが効率よく必要な情報だけを持ってこられるようになりました。「このプロジェクトの設計方針を確認して」と言えば、AIがContextMixerを検索して該当セクションだけを取ってきます。

### 3. セッションをまたぐ引き継ぎ（AI Cortex）

各プロジェクトに4つのドキュメントを置き、AIがセッションをまたいで文脈を引き継ぐ仕組みを運用しています。

- **context** — 現在のフェーズ、直近の作業、次のエージェントへの引き継ぎ
- **spec** — ゴール、要件、技術構成
- **decisions** — 設計判断の理由と経緯
- **notes** — ライブラリのクセ、バグ、実装Tips

エージェントが作業を始める時に `context` を読み、終了時に更新する。これで「前回どこまでやったか」を人間が説明しなくて済むようになります。

## コスト構成

Cloudflareのプラットフォームを活用し、個人利用の範囲で課金されない構成にしました。

| サービス | 無料枠 |
|---|---|
| Workers | 10万req/日 |
| D1 | 5GB（アカウント合計）・500万行read/日・10万行write/日 |
| R2 | 10GB・転送無料 |

> ※2026/09現在（[D1料金](https://developers.cloudflare.com/d1/platform/pricing/)）

ナレッジベースは一度作ったら何年も使うものなので、ランニングコストがかからない設計にこだわりました。

## スタック

| 要素 | 選択 |
|---|---|
| Runtime | Hono on Cloudflare Workers |
| DB | D1（SQLite互換） |
| Storage | R2 |
| Frontend | HTMX + 静的アセット |
| 認証 | Clerk + APIキー + OAuth 2.1 |
| 検索 | FTS5 trigram |

フロントエンドは当初Vueで設計していましたが、やることを考えればもっとシンプルでいいことに気づきHTMXに変えました。詳しくは開発記録に書いています。

## 今の状態

自分の個人プロジェクトのナレッジベースとして毎日活用しています。主な利用形態はClaude DesktopとClaude CodeからのMCPアクセス。30以上のプロジェクトコレクションが動いていて、Web UIは人間が確認用に使うイメージです。

人間向けのUIがまだ弱く、コレクションエクスポートなども未対応なので基礎的な機能のアップデートをもう少し続ける予定です。少し先の予定はまだ細かく決めてませんが、他のサービスのデータのインポート機能や、Googleが発表したOKF（Open Knowledge Format）対応ができるといいなと思ってます。