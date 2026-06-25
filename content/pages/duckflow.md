---
title: 'duckflow '
date: '2025-03-25'
description: 開発者のローカル環境で動作する対話型AIコーディングエージェント。弱いLLMでもユーザーとの協業を通じて実用的な成果を出す「相棒」を目指す。
template: pages/project.html
slug: duckflow
taxonomies:
  tags:
    - software
    - wip
extra:
  entry_type: product
  progress: 40
  progress_label: Phase 1.6 — 協業ループ中核化
  project: true
  status: active
  github_url: https://github.com/iwabuchi404/duckflow
---

## 概要

duckflowは、開発者のローカル環境で動作する対話型AIコーディングエージェント。
単なるツールではなく、開発を共にする「相棒（Companion）」を目指す。

**中核コンセプト: 協業ループ（Cooperation Loop）** — 弱いLLMでも、ユーザーとの協業を通じて実用的な成果をコスト良く出しつつ、ユーザー自身も成長させる、継続的に賢くなる相棒。

## アーキテクチャ

Think-Decide-Execute ループを中心に、3モード制（planning / investigation / task）で動作。

- **Think & Decide**: PromptBuilderがプロンプトを構築し、LLMがSym-Opsテキストを返す
- **Execute**: アクションを順次実行。ユーザー承認を挟むガードレール付き
- **Pacemaker**: タスク量とバイタルから最大ループ数を動的計算（3〜35）

## 多層防御（ガードレール）

- 未知ツールのフィルタ＋近似候補の提示
- 1ターンあたりアクション数上限（6件）
- ファイル編集・コマンド実行は人間の承認必須
- 連続2回エラーでfail-fast
- エラー情報を次ターンのCorrection Guideとして注入

## スタック

| カテゴリ | 技術 |
|---|---|
| 言語 | Python 3.10+（UV + `-X utf8`） |
| TUI | Rich |
| 状態管理 | Pydantic |
| LLM連携 | OpenAI SDK互換（openai / anthropic / google / groq / openrouter） |
| 設定 | `duckflow.yaml` + `.env` |

## 差別化

強いLLMとの品質競争ではなく、**コスト効率・ユーザー学習効果・継続向上**の独自軸で価値を出す。「LLMは間違える」前提で、ガードレール（受動的保護）と協業ループ（能動的補正）の両層で担保する。