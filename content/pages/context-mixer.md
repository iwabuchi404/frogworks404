---
title: ContextMixer
date: '2025-06-20'
description: AIと人間が共同管理するナレッジベース
template: pages/project.html
slug: context-mixer
taxonomies:
  tags:
    - software
    - wip
extra:
  entry_type: product
  status: active
  project: true
  progress: '80'
  progress_label: Phase 1.5完了 — Phase A設計中
  version: '0.9'
  license: Private
  github_url: https://github.com/iwabuchi404/context-mixer
  demo_url: https://context-mixer.flog404.work/
---

## これは何か
AIと人間が同じ場所でドキュメントを読み書きするためのナレッジベースです。NotionやObsidianとの違いは、Notionは人間が使いやすいことを優先していると思います、Obsidianも基本は人間向けだったり、ローカルベースのツールです。ContextMixerはAI使いやすさも考慮した設計になっていて、人間とAIの協業のためのナレッジベースを目指しています。

## 作った動機
もともとは個人プロジェクトのドキュメント管理にNotionを使っていました、ローカルでの管理であればObsidianなどの選択肢もあったと思いますが、チャットアプリからもアクセスしたかったので選択肢からは外れました。NotionにMCPでアクセスするのは思ったよりもトークンを食うようで、さらに読み書きもちょっとした追記でもAIからは時間がかかり、1から自分で作ってみることにしました。この問題はおそらくNotionの問題というよりは、AIツールとの連携の問題でAI前提の設計になっていないという話でNotionはAI登場以前からあったので当然の話です。

## 特徴
ContextMixerは既存のナレッジベースと違い、AIと人間それぞれからアクセスして活用されることを想定した設計になっています。
既存サービス、アプリは人間向けかAI向けどちらかに最適化を目指したものが多いと思いますが、ContextMixerは人間とAIの協業をコンセプトとしています。

### 粒度を選べるドキュメント取得
ドキュメントを「どこまで読むか」を指定できるAPI設計になっています。

- **meta** — タイトルと概要だけ。数十トークンで済む
- **outline** — 見出し構造
- **full** — 全文
- **section** — 特定セクションだけ

AIは普通 meta を見て、必要ならsectionを取る。全文を毎回食わせないのでトークン消費がかなり変わると思います。

### MCP対応

Claude DesktopやClaude.aiからMCP経由で直接ドキュメントを検索・取得・書き込みできる。OAuth 2.1認証、ツールは9個。これを入れてからコンテキストの手動組み立てがほぼなくなった。

### 無料で動く

個人的な興味もありCloudflareのプラットフォームをかなり活用する構成にしてみました。
Cloudflare Workers + D1 + R2。個人利用の範囲で課金されることはまずないかと思います。

| サービス | 無料枠 |
|---|---|
| Workers | 10万req/日 |
| D1 | 5GB・500万read/月 |
| R2 | 10GB・転送無料 |

> ※2026/06現在

ナレッジベースを数年維持するのにランニングコストがかかるのは避けたかったので、ここは設計時にかなり調査して決定しました。

## スタック

| 要素 | 選択 |
|---|---|
| Runtime | Hono on Cloudflare Workers |
| DB | D1（SQLite互換） |
| Storage | R2 |
| Frontend | HTMX + 静的アセット |
| 認証 | Clerk + APIキー + OAuth 2.1 |
| 検索 | FTS5 trigram |

フロントエンドは当初Vueで設計していましたが、もっとシンプルでいいのでは？と思いHTMXに変えました。詳しくは開発記録の方に書きました。

## 今の状態

自分の個人プロジェクトのナレッジベースとして毎日活用しています。主な利用形態はClaude DesktopとClaude CodeからのMCPアクセス。Web UIは人間が確認用に使うイメージ。

人間向けのUIがまだ弱く、コレクションエクスポートなども未対応なので基礎的な機能のアップデートをもう少し続ける予定です。
少し先の予定はまだ細かく決めてませんが、他のサービスのデータのインポート機能とか、Googleが発表したOKF対応ができるといいなと思ってます。