---
title: Fubako
date: '2026-02-20'
description: Zolaベースの静的サイトをGUIで管理できるデスクトップCMS。Electron + Vue 3で構築。
template: pages/project.html
slug: fubako
taxonomies:
  tags:
    - developer-tools
extra:
  entry_type: project
  project: true
  status: in-operation
  github_url: https://github.com/iwabuchi404/Fubako
  cover_image: /uploads/2026/06/0122fcdd-377d-4c00-9ab9-210ddf8a6e65.png
  featured: true
---

## これは何か

Fubakoは、Zolaで作った静的サイトをGUIで管理するデスクトップアプリ。このサイトもFubakoで書いている。

記事の作成・編集・画像管理・プレビュー・Git操作・デプロイまでアプリ内で完結する。ターミナルを開く必要がない。

## 作った動機

Webサイトの管理は面倒すぎるか、大げさすぎるかのどちらかだった。
WordPressはサーバーが要る。セキュリティアップデートが要る。プラグインの互換性を気にする必要がある。個人や小規模なサイトにはどう考えても重い。
静的サイトジェネレーター（SSG）はビルドが速くて、無料でホスティングできて、セキュリティリスクも低い。ただし記事を書くたびにMarkdownファイルを手で作って、YAMLでfrontmatterを書いて、ターミナルでビルドして、Gitで管理する。エンジニアなら普通にできるが、エンジニアじゃない人には無理。

もともとWebディレクターをやっていたので、エンジニアではない人がサイトを更新するときの苦労は身に染みている。WordPressの管理画面で消耗するクライアントも見てきたし、SSGが技術的には正解なのに運用面で選べない場面も多かった。
SSGの良さ（速い・安い・安全）を残しつつ、コンテンツ管理の面倒さをGUIで吸収するツールがあればいい。それがFubako。

## なぜデスクトップアプリなのか

Headless CMSという選択肢はある。ContentfulやStrapiやDecap CMS。ただどれも個人で使うには重い。サーバーが要るか、設定が複雑か、あるいはその両方。
やりたいのはローカルのMarkdownファイルを直接操作すること。ファイルを読み書きして、Zolaのローカルサーバーでプレビューして、Gitでコミットする。全部ローカルで完結する操作なので、サーバーを介在させる理由がない。
オフラインでも動く。依存サービスがない。サービスの終了に振り回されない。

## 仕組み

### site-config.yml

コンテンツタイプとフィールドの定義ファイル。これ1つでFubakoの管理画面が決まる。

```yaml
content_types:
  log:
    label: "記録"
    folder: "content/log"
    sort: "date_desc"
    fields:
      - key: "title"
        type: "text"
        required: true
      - key: "date"
        type: "date"
      - key: "extra.entry_type"
        type: "select"
        options: ["article", "project", "essay", "experiment"]
      - key: "_content"
        type: "markdown"
```

フィールドの型はtext、date、select、toggle、image、gallery、list、objectなど。サイトに合わせた管理画面が設定ファイル1つで作れる。

### エディタ

本文はTipTapベースのWYSIWYGエディタ。Markdownに不慣れな人でもリッチテキストとして編集できて、保存時にMarkdownとして出力される。

### プレビュー

Zolaのローカルサーバーを内蔵していて、編集中の記事がリアルタイムでプレビューできる。ビルドエラーもアプリ内に表示される。

### Git統合

保存がそのままGitコミットになる。GitHubへのプッシュもアプリ内で完結。CI/CDの設定ファイル生成まで含めて、ターミナルなしでデプロイまで行ける。

## スタック

| 要素 | 選択 | 理由 |
|---|---|---|
| App Shell | Electron | ローカルファイル操作・子プロセス管理が必要 |
| Frontend | Vue 3 + Vite | フォーム動的生成・状態管理との相性 |
| SSG | Zola | Rustビルドで高速、テンプレート柔軟 |
| Editor | TipTap | 非エンジニアでも使えるWYSIWYG、Markdown保存対応 |
| Git | Dugite | Gitバイナリをアプリに同梱、環境依存なし |
| i18n | vue-i18n | 日本語・英語対応 |

## 今の状態

基本機能、Git統合、デプロイ、タクソノミー対応は動いている。このサイトのタグフィルターやOGP設定もsite-config.ymlのフィールド定義で管理している。今はビルドエラー表示の改善などを進めている。

このサイト（frogworks404）自体がFubakoで管理・公開されていて、使いながら気づいたことをそのまま直せる。

## リンク

- [GitHub](https://github.com/iwabuchi404/Fubako)