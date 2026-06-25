---
title: "HalfGrip"
date: "2025-03-10"
description: "Androidネイティブカメラアプリ + 自作USB-C HIDグリップデバイス。半押しAFロックを含むミラーレス的な操作感をスマホで実現する。"
template: pages/project.html
slug: halfgrip
taxonomies:
  tags:
    - build-log
    - wip
extra:
  entry_type: product
  project: true
  status: prototype
---

## 概要

HalfGripは、Androidネイティブカメラアプリと自作USB-C HIDグリップデバイスの組み合わせ。
半押しAFロックを含むミラーレス的な操作感をスマホで実現する。

## デバイス

- **マイコン**: RP2040 Zero
- **接続**: USB-C有線（HIDゲームパッドとして認識）
- **筐体**: Nothing Phone 3専用グリップ型（Bambu Lab A1 Miniで出力）
- **ボタン構成**: メインシャッター2段階、サブボタン×1、ロータリーエンコーダ、追加タクトスイッチ2〜3個
- **ファームウェア**: CircuitPython + `usb_hid`

## アプリ

- **言語**: Kotlin
- **カメラAPI**: Camera2 API
- **最小Android**: 12以上
- **UI**: Jetpack Compose
- **アーキテクチャ**: MVVM（ViewModel + StateFlow）

## 開発ステップ

- **Step 1 — MVPコア**: Camera2プレビュー、静止画撮影・JPEG保存、KeyEventでシャッター
- **Step 2 — 入力拡張**: AFロック制御、MotionEvent対応、MFフォーカス・ズーム制御
- **Step 3 — 画質系**: RAW(DNG)保存、露出・ISO・SS手動制御、HDR、フォーカスピーキング
- **Step 4 — UX仕上げ**: キーマッピングプロファイル保存、グリッド・水平儀

## UI設計

撮影画面はL字XMB（クロスメディアバー）を採用。横軸に選択中カテゴリの値リスト、縦軸にカテゴリ一覧を配置。全操作がタッチで可能で、グリップ無しでも使える設計。
