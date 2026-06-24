---
title: "KamoX"
date: "2025-04-05"
description: "AIコーディングエージェントがChrome拡張・Electron・VSCode拡張をライブ確認しながら開発できるnpmプラグイン型HTTP APIサーバー。"
template: pages/project.html
slug: kamox
taxonomies:
  tags:
    - software
extra:
  entry_type: product
  progress: 45
  progress_label: "Phase 1.5進行中"
  project: true
  status: shipped
---

## 概要

KamoXは、AIコーディングエージェントがChrome拡張・Electron・VSCode拡張をライブ確認しながら開発できる、npmインストール可能なプラグイン型HTTP APIサーバー。

## アーキテクチャ

```
Core (共通基盤: 70%)
  ├─ HTTP API Layer
  ├─ BaseDevServer (抽象クラス)
  └─ 共通ユーティリティ

Plugins (環境固有: 30%)
  ├─ Chrome Extension Adapter
  ├─ Electron Adapter (将来)
  └─ VSCode Extension Adapter (将来)
```

## スタック

| コンポーネント | 技術 |
|---|---|
| HTTPサーバー | Express.js |
| ブラウザオートメーション | Playwright |
| 言語 | Node.js / TypeScript |
| ビルド | npm workspaces |

## API仕様

| メソッド | パス | 機能 |
|---|---|---|
| GET | /status | サーバー・環境状態確認 |
| POST | /rebuild | リビルド・環境リロード |
| POST | /check-ui | UI表示確認（スクリーンショット・DOM・ログ） |
| GET | /logs | 全ログ取得 |

`/check-ui` の `screenshot` フィールドは絶対パスを返す。AIは直接ファイルアクセス可能。

## 実装フェーズ

- **Phase 1**: Chrome拡張サポート + ServiceWorkerデバッグ — ✅ 完了
- **Phase 1.5**: npm化対応・CLI改善・設定ファイル — 🔄 進行中
- **Phase 2**: Electronサポート — ⏳ 設計済み
- **Phase 3**: VSCode拡張サポート — ⏳ 将来

## 差別化

agent-browser（Vercel Labs）が**完成済み**アプリの自動化を対象とするのに対し、KamoXは**開発中**のアプリへのビルド→起動→検証サイクルを対象とする。IPC監視・モック、マルチウィンドウ管理、ダイアログモックが強み。
