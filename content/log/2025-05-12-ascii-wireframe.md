---
title: AIとの設計作業にASCIIワイヤーフレームが有効な理由
date: '2026-05-12'
description: LLMとUIを共同設計するとき、画像よりもASCIIのワイヤーフレームのほうがトークン効率が高く、修正サイクルも速い。この仮説を実装として形にするためのコンセプトメモ。
taxonomies:
  tags:
    - developer-tools
    - interface
extra:
  entry_type: essay
  project_slug: asciiwire
slug: 2025-05-12-ascii-wireframe
---

## 前提

LLMとUIを共同設計する際、Figmaやスクリーンショットを共有するのが一般的だが、
これはトークン消費が大きく、LLMの修正提案も「文章で説明」になってしまう。

## ASCIIワイヤーフレームの利点

```
+--[header]------------------+
| frogworks404               |
| 記録開始: 2024.01          |
+----------------------------+
| [FILTER] all / build-log / |
+----------------------------+
| 2025.06.10 [build-log]     |
| タイトルがここに入る       |
| 概要テキスト...            |
+----------------------------+
```

1. **トークン効率** — 同じ情報を画像より少ないトークンで伝えられる
2. **修正のしやすさ** — LLMがテキストとして直接編集できる
3. **曖昧さの排除** — レイアウト意図を構造で示せる

## 実装（ASCIIwire）

この考えを実装に落としたのが [ASCIIwire](https://github.com/iwabuchi404/ASCIIwire)。
マークダウンベースのDSLからASCIIアートを生成するCLIツール。