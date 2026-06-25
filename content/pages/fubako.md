---
title: Fubako
date: '2025-02-20'
description: Zolaベースの静的サイトをGUIで管理できるデスクトップCMS。Electron + Vue 3で構築。
template: pages/project.html
slug: fubako
taxonomies:
  tags:
    - software
    - build-log
extra:
  entry_type: product
  project: true
  status: in-operation
  github_url: https://github.com/iwabuchi404/Fubako
---

## これは何か
Fubakoは、静的サイトをGUIで管理できるデスクトップCMSです。このサイトもFubakoで書いています。

静的サイトジェネレータ（SSG）はビルドが速くて無料で公開できるのですが、記事を書くためにMarkdownファイルを手動で作って、Frontmatterと呼ばれる設定をYAMLで書いて、という作業がけっこう面倒です。Fubakoはその辺りをGUIで扱えるようにしたツールです。

## 作った動機
もともとZolaというRust製のSSGでサイトを作っていたのですが、記事の管理がどうしてもファイル操作になってしまって、作業の摩擦が大きかったんです。Headless CMSを使う選択肢もありますが、それはそれでサーバー代がかかったり設定が複雑だったりで、個人でやるには重い。デスクトップアプリで完結するものが欲しいなと思って作りました。

あと、自分が作ったものを自分で使うことで、ユーザー体験の課題を肌で感じながら改善できるのも大きいです。

## 特徴

### 設定ファイルでUIを定義
`site-config.yml`という1つのファイルに「どんなコンテンツタイプがあるか」「各コンテンツにどんなフィールドがあるか」を定義すると、Fubakoが自動的に編集画面を生成します。フィールドの型（テキスト、日付、選択肢、トグルなど）も定義できるので、自分のサイトに合わせた管理画面が作れます。

### Git統合
記事の保存＝Gitコミットになっているので、変更履歴が自然に残ります。GitHubへの認証からプッシュ、CI/CDの設定ファイル生成までアプリ内で完結します。

### ライブプレビュー
Zolaのローカルサーバーを内蔵しているので、編集中の記事がどう見えるかをリアルタイムで確認できます。

### 多言語対応
日本語と英語に対応しています。`site-config.yml`のラベルもi18n対応なので、自分のサイトに合わせて表示言語を切り替えられます。

## スタック

| 要素 | 選択 |
|---|---|
| App Shell | Electron |
| Frontend | Vue 3 + Vite |
| SSG Engine | Zola (Rust) |
| Editor | TipTap |
| Image | Sharp |
| Git | Dugite |
| i18n | vue-i18n |

## 今の状態

Phase 3（品質向上）の途中です。基本機能、Git統合・デプロイ機能は完成していて、今はタクソノミー（タグ）対応やビルドエラーの表示改善などを進めています。このサイト自体もFubakoで管理・公開しているので、使っていて気づいたことをすぐ直せるのが良いです。