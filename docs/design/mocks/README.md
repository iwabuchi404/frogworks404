# 参照モック

デザイン検討で作ったモックです。**見た目と寸法の正解**として参照してください。

## そのまま写さないこと

- デザイン用ツールの独自形式（`.dc.html`）で、単体のブラウザでは表示できません。
- スタイルは要素に直接書いてあります（インラインスタイル）。実装では SCSS のクラスと `_tokens.scss` に置き換えてください。
- 次の記法はツールのテンプレート構文です。Zola のテンプレート（Tera）に置き換えて読んでください。
  - `{{ 名前 }}`：値の埋め込み
  - `<sc-for list=… as=…>`：繰り返し
  - `<sc-if value=…>`：条件分岐
  - `<dc-import name=…>`：別のモックの読み込み
  - 末尾の `class Component`：表示用のデータと動き
- 画像の `/_blob/…` は、ツールに置いた仮の画像です（実際のサイトのスクリーンショットを切り抜いたもの）。
- 記事の本文、抜粋、件数、コード内の数値はダミーです。

## ファイル

ファイル名を変えたため、モック同士のリンクや `dc-import` の名前は元の名前のままになっています。

| ファイル | 内容 | 元の名前 |
|---|---|---|
| top-pc.dc.html | トップ（PC、1920幅） | Main |
| top-mobile.dc.html | トップ（モバイル、390幅） | Mobile |
| list-pc.dc.html | 記事一覧（PC） | List |
| list-mobile.dc.html | 記事一覧（モバイル） | ListMobile |
| article-pc.dc.html | 記事詳細（PC） | Article |
| article-mobile.dc.html | 記事詳細（モバイル） | ArticleMobile |
| menu-mobile.dc.html | モバイルのヘッダーとメニュー（開閉と動き付き） | Menu |
| menu-mobile-open.dc.html | メニューを開いた状態 | MenuOpen |
| motion-study.dc.html | モーションの試作（表題欄の作図、図版の焼き付け、操作への反応） | Motion |
