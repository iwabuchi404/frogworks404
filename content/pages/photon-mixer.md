---
title: PhotonMixer
date: '2025-04-12'
description: float32リニアカラー・WebGPUネイティブ・SAIレベルのペン体験を核とするイラストソフト。アナログ模倣を捨て、デジタルの正確性を表現ツールとして再定義する。
template: pages/project.html
slug: photon-mixer
taxonomies:
  tags:
    - software
    - idea
extra:
  entry_type: product
  progress: 15
  progress_label: 設計仕様確定・プロトタイプ未着手
  project: true
  status: idea
  github_url: https://github.com/iwabuchi404/photon-mixer
---

## 概要

PhotonMixerは、デジタルネイティブなイラストソフト。
float32リニアカラー・WebGPUネイティブ・SAIレベルのペン体験を核とし、アナログ模倣を捨ててデジタルの正確性を表現ツールとして再定義する。

## ペンエンジン

```
生入力 → 近似で整形 → 4xバッファで高精度描画 → ペンアップ確定 → float32リニアキャンバスに合成 → OCIO → 画面
```

- **Catmull-Romスプライン**を基本に拡張
- **EMA + 速度連動**の手ブレ補正（低速時：強い補正、高速時：ほぼ素通し）
- **4xサブピクセルバッファ**でブラシ範囲のみGPU内で高精度処理
- スタンプ連打が基本構造、テクスチャはキャンバス座標系で適用

## カラーパイプライン

```
入力（HSV/RGB）→ float32リニア変換 → 内部保持 → 混色演算 → OCIO表示変換 → 出力
```

- 内部は全てfloat32リニア（1.0超えのHDR値も保持）
- 混色: Normal→Oklab空間、Screen/Add→リニア空間
- 表示: OCIO経由でトーンマッピング（PBR Neutral / AgX / Reinhard / None）
- 出力: sRGB 8bit / HDR10 / P3 / OpenEXR

## Photon Experience MVP

- **Light Panel**: 表示露出（±6EV）、トーンマップ切り替え、白飛び確認モード
- **Color EV**: 光量スライダー、SDR域/HDR域を同一スライダー上で視覚的に分離
- **Glow / Bloom**: 非破壊効果レイヤー、HDR部分を抽出して発光
- **加算（光）**: リニア空間で光量を足す作画

## スタック

| 役割 | 選択 |
|---|---|
| ランタイム | Electron |
| 言語 | TypeScript統一 |
| GPU API | WebGPU raw + @webgpu/types |
| シェーダー | WGSL |
| EXR | tinyexr → WASM |
| UI | React + TypeScript |
| ビルド | Vite |

## ファイルフォーマット

ネイティブ形式 `.pmx`（ZIPコンテナ、manifest.json + document.json + layers/*.exr）。インポートはPSD/PNG/JPEG/OpenEXR対応。