---
title: "ASCIIwire"
date: "2025-04-20"
description: "AI・人間の両方が扱いやすいテキストベースのワイヤーフレームDSL。マークダウン記法からASCIIアートのワイヤーフレームを生成するCLIツール。"
template: pages/project.html
slug: asciiwire
taxonomies:
  tags:
    - software
extra:
  entry_type: product
  progress: 50
  progress_label: "NPM公開済み・VSCode拡張開発中"
  project: true
  status: active
---

## 概要

ASCIIwireは、AI・人間の両方が扱いやすいテキストベースのワイヤーフレームDSL。
マークダウン記法で入力し、ASCIIアートのワイヤーフレームを出力する。

## 設計方針

- **マークダウン構文採用** — LLMの出力安定性が最高
- **厳格なインデント不要** — AI出力の不安定さを防止
- **人間が手で編集しやすい記法**

## コンポーネント構成

```
@asciiwire/cli        ← 公開済み
vscode-extension      ← 開発中
mcp-server            ← 計画中
```

## スタック

| コンポーネント | 技術 |
|---|---|
| CLI | TypeScript + NPM |
| VSCode拡張 | TypeScript |
| MCPサーバー（予定） | TypeScript |

## VSCode拡張 仕様（予定）

- デュアルペイン: DSLテキストエディタ + ASCIIプレビュー
- コピーモード複数対応（用途別）
- マウスベース編集（将来版）

## きっかけ

LLMとUIを共同設計する際、Figmaやスクリーンショットを共有するのはトークン消費が大きく、修正提案も「文章で説明」になってしまう。ASCIIワイヤーフレームなら同じ情報を少ないトークンで伝えられ、LLMがテキストとして直接編集できる。
