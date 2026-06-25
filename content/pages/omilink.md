---
title: omiLink
date: '2025-05-01'
description: URL・メモをAndroidホーム画面風グリッドで管理するブックマークPWA。ドラッグ&リサイズ可能なウィジェット感覚の操作。
template: pages/project.html
slug: omilink
taxonomies:
  tags:
    - software
extra:
  entry_type: product
  progress: 80
  progress_label: 運用中
  project: true
  status: shipped
  github_url: https://github.com/iwabuchi404/omilink
  demo_url: https://omilink.flog404.work/
---

## 概要

omiLinkは、URL・メモをAndroidホーム画面風グリッドで管理するブックマークPWA。
ウィジェット感覚でドラッグ&リサイズ可能な操作感を実現する。

## スタック

| レイヤー | 技術 |
|---|---|
| フロントエンド | Vue 3 (Composition API) + TypeScript |
| バンドラ | Vite + vite-plugin-pwa |
| ドラッグ&リサイズ | interact.js |
| バックエンド | PocketBase（SQLiteベース） |
| スタイル | Vanilla CSS（FLOCSS風） |
| インフラ | GCE e2-micro（無料枠）+ Cloudflare Tunnel |
| CI/CD | GitHub Actions → GCE 自動デプロイ |

## データモデル

- **items**: ブックマーク・メモ共通（type, title, url, description, og_image_url, favicon_url）
- **views**: グリッドビュー設定（cols, rows, cell_size, sort_order）
- **placements**: items × views 中間テーブル（col, row, width, height）

## グリッド仕様

セルサイズ100px・ギャップ10px。サイズに応じて表示が変化:
- 1×1: アイコンのみ
- 縦長(w=1,h≥2): アイコン+タイトル
- 横長(w≥2,h=1): タイトル+コンテンツ
- 大(w×h≥4): OGP画像+タイトル