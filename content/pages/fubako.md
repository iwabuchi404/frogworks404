---
title: "Fubako"
date: "2025-02-20"
description: "Zolaベースの静的サイトをGUIで管理できるデスクトップCMS。Electron + Vue 3で構築。"
template: pages/project.html
slug: fubako
taxonomies:
  tags:
    - software
    - build-log
extra:
  entry_type: product
  progress: 75
  progress_label: "Phase 3品質向上中"
  project: true
  status: active
---

## 概要

FubakoはZola（Rust製SSG）ベースの静的サイトをGUIで管理できるデスクトップアプリケーション。
`site-config.yml`で管理画面UIを定義し、MarkdownのFrontmatterを編集する仕組み。

## スタック

| コンポーネント | 技術 |
|---|---|
| App Shell | Electron 28.x |
| Frontend | Vue 3 + Vite (Rolldown) |
| SSG Engine | Zola (Rust) 0.18.x |
| Editor | TipTap 2.x |
| Image | Sharp 0.34.x |
| Git | Dugite 3.x |
| i18n | vue-i18n 9.14.x |

## 実装状況

- **Phase 1**: 基本機能（コンテンツ編集・画像管理・ライブプレビュー・サイト設定）完了
- **Phase 2**: 運用・デプロイ機能（Git統合・GitHub認証・CI/CD自動生成）完了
- **Phase 3**: 品質向上中（Taxonomies対応開発中）

## 特徴

- `site-config.yml`による柔軟なコンテンツタイプ定義
- YAML Frontmatter + Markdown Bodyの分離管理
- フラット構造 ↔ 階層構造の自動変換
- Zolaビルドエラーのパース・ローカライズ
- 多言語対応（ja/en）
