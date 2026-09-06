---
title: PhotonMixer
date: '2026-04-12'
description: float32リニアカラー・WebGPUネイティブ・SAIレベルのペン体験を核とするイラストソフト。アナログ模倣を捨て、デジタルの正確性を表現ツールとして再定義する。
template: pages/project.html
slug: photon-mixer
taxonomies:
  tags:
    - creative-tools
extra:
  entry_type: project
  project: true
  status: active
  version: '0.1'
  github_url: https://github.com/iwabuchi404/photon-mixer
  download_url: https://github.com/iwabuchi404/photon-mixer/releases/download/v0.1.0/PhotonMixer-0.1.0-portable.exe
---

## これは何か
PhotonMixerは、デジタルならではの表現を追求するイラストソフトです。

既存のイラストソフトの多くは「アナログ画材をデジタルで再現する」ことを主眼に置いています。もちろんKritaやPhotoshopなどは16bit浮動小数やHDR対応を進めていますが、まだデフォルトのワークフローとしてはsRGB空間での8bit描画が主流です。PhotonMixerは、最初からリニアカラーとHDRを前提にした描画パイプラインを目指します。

v0.1をリリースしました。ポータブル版をダウンロードしてすぐに試せます。

## 作った動機
イラストソフトの色の扱いって、アナログの制約を引きずっていると思います。sRGBという狭い色空間で、0〜1の範囲で、アナログ絵の具みたいな混色を再現しようとしている。

でもデジタルなら、光そのものを足し合わせることができる。1.0より明るい色も保持できる。HDRディスプレイなら、それをそのまま表示できる。アナログの模倣をやめれば、デジタル独自の表現が見えてくるはずで、それを実現するソフトを作りたくなりました。

## 機能の実装状況

### 現在実装済み
- Oklab空間での混色ブラシ（SAI的水彩モデル）
- 各軸4倍SSAAによるアンチエイリアス
- rgba16floatリニアキャンバスでの内部保持
- レイヤーシステム、基本ブラシ
- エフェクトレイヤー（ぼかし、グロー、シャープ）

### 部分実装
- HDR出力（内部保持は対応、表示経路は未対応）
- 高解像度キャンバス（SSAAのメモリ制約あり）
- ブラシ種類・UI（拡充中）

### 設計済み・今後実装
- SSAAのバウンディングボックス化・タイル分割

## 色の扱い

内部保持はrgba16floatのリニア空間で、シェーダ内の演算はfloat精度で行います。リニア空間で計算すると「光を足す」ことが文字通り正確にでき、1.0を超える明るさの色もデータとして保持できます。HDRディスプレイで見れば、本当に明るい部分が明るく表示されます。

## スタック

| 要素 | 選択 |
|---|---|
| ランタイム | Electron |
| 言語 | TypeScript |
| GPU API | WebGPU |
| シェーダー | WGSL |
| UI | Lit (Web Components) |
| ビルド | Vite |

## 今の状態

v0.1をリリースしました。ペンエンジン、カラーパイプライン、ファイルフォーマット（.pmx）の基礎が動いています。ポータブル版の実行ファイルをGitHub Releasesからダウンロードできます。

まだ初期段階で、ブラシの種類やレイヤー機能などはこれから充実させていく予定です。フィードバックを歓迎します。