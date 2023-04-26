# きょーざい - 教材シェアアプリ

特別支援学校や特別支援学級に通う児童生徒の特性に沿った教材を共有するプラットフォームです。

## 目次

- [自己紹介](#自己紹介)
- [スキル・技術](#スキル技術)
- [概要](#概要)
- [背景](#背景)
- [アプリURL](#アプリurl)
- [技術スタック](#技術スタック詳細)
- [インフラ構成図](#インフラ構成図)
- [ER図](#er図)
- [機能一覧](#機能一覧)
- [使用画面のイメージ](#使用画面のイメージ)
- [技術スタック詳細](#技術スタック詳細)
- [ビルド方法](#ビルド方法)
- [開発プロセス](#開発プロセス)
- [連絡先](#連絡先)

# suguru fukui の Web 開発ポートフォリオ

特別支援学校教員から Web エンジニアへの転身を目指す、プログラミング学習者です。

## 自己紹介

こんにちは！suguru fukui と申します。お読みいただきありがとうございます。\
これまで教育現場に従事し、主に特別支援学校の教員として働いてきました。\
私がWebエンジニアになりたい理由は、テクノロジーを活用して人々の生活を向上させ、新しい価値を創造することに魅力を感じるからです。\
Webエンジニアとして働き、様々な業界や人々に対して幅広い影響を及ぼし、より多くの人々に対して人生が豊かになるポジティブな変化をもたらしたいと思っています。

このポートフォリオでは、私が学んだ技術や作成したプロジェクトを紹介します。

## スキル・技術

- `HTML, CSS, JavaScript`
- `Ruby, Ruby on Rails`
- `React, TypeScript`
- `Git, GitHub`

## 概要

- `Ruby on Rails (API モード)` と `React (TypeScript)` で開発された SPA
- 教材の投稿・閲覧・いいね機能

## 背景

特別支援学校や学級で個別対応の教材が不可欠ですが、経験の浅い教員が適切な教材を見つけるのは困難です。特別支援が必要な児童生徒の数も増え、教員の課題が深まっています。

私自身も教材作成に悩んだ経験があり、校内教材展で得たアイデアを活用して子どもたちの成長を支援しました。この経験から、教材作成プラットフォームが教員に助けとなると確信し、投稿や閲覧が可能なアプリ「きょーざい」を開発しました。このアプリは、現状のニーズに応えて教員にとって価値あるリソースを提供します。

**アプリ完成後、現場の教員に共有し、実際に使用してもらいました。彼らからのフィードバックをもとに、さらなる改善を行いました。**


## アプリURL

https://tokushi-kyouzai.com

## 技術スタック（詳細後述）

- Back End: `Ruby on Rails (API モード), rubocop, MySQL, Nginx, AWS(S3)`
- Front End: `React (TypeScript)`
- Infra: `Docker / Docker-Compose, AWS (ECS Fargate / ECR / ALB / RDS / S3 / CloudFront / Route53 / VPC / ACM)`

## インフラ構成図

![インフラ構成図](https://user-images.githubusercontent.com/85082566/230008274-5e511bd6-270d-4184-bd26-834d9862a8fb.png)

## ER図

![ER図](https://user-images.githubusercontent.com/85082566/230006714-5b175aef-094c-4e86-865c-5bb37757c39a.png)

## 機能一覧

- アカウント作成/ログイン/ログアウト
  - メールでの本認証機能
  - パスワード変更機能
  - 退会機能
- ゲストログイン機能
  - ユーザー情報を変更できないなどの一部機能制限あり
- プロフィール編集機能
  - プロフィール内容
- 投稿作成機能
  - 名前/説明文/写真
- 投稿編集機能
- 投稿削除機能
- いいね機能
- レスポンシブ対応
- 投稿一覧
  - 全投稿一覧/自分が投稿した教材一覧/自分がいいねした教材一覧

## 使用画面のイメージ

#### ■ トップページ
![トップページ](https://user-images.githubusercontent.com/85082566/230622669-b4c6e32e-2b79-46c7-8fb8-e4fbfb2be635.png)
![全教材一覧/いいね教材一覧/投稿教材一覧/モーダル](https://user-images.githubusercontent.com/85082566/230624440-38231cdc-bec0-4066-a5f1-b612202aee4c.png)
![投稿/編集/詳細/削除モーダル](https://user-images.githubusercontent.com/85082566/234504494-80035069-65b0-479b-b2d9-7c55f620fe2b.png)
![登録/登録メール/ログイン/P申請](https://user-images.githubusercontent.com/85082566/234505315-7b7067b1-b3d1-4671-b17f-f32232db2b96.png)
![Pメール促進/P変更/アカ情報/アカ編集](https://user-images.githubusercontent.com/85082566/234504941-05d9cf62-f8f2-431c-9698-5dee656be818.png)
![退会モーダル/各種メール/404/リンク切れ](https://user-images.githubusercontent.com/85082566/234505630-431bde7a-bd8b-413a-b240-b707fe432c2b.png)

#### ■ iPhoneでの使用感
- アプリアイコン、名前や説明も加えることで、すぐにアプリを探すことができるようにしました。
- ホーム画面に追加することで、アプリのように動かせるようにしています。

https://user-images.githubusercontent.com/85082566/234709647-70262e43-6809-4a66-8c59-7728e5ed182d.mov

## 技術スタック詳細

### Back End

- `Ruby 3.0.2`
- `Ruby on Rails 6.1.7`
- `Nginx`

#### 主要 gem

- `devise / devise_token_auth` : トークン認証
- `carrierwave / fog-aws` : AWS へのファイルアップロード

### Front End

- `React 18.2.0`
- `TypeScript`
- `create-react-app`

#### 主要パッケージ

- `MUI V5` : UI コンポーネントライブラリ
- `React Router V5` : UI と URL を同期
- `Axios`: Promise ベースの HTTP クライアント
- `eslint & prettier`: Typescript に対する静的コード解析

### Infra

- `Docker / Docker Compose`
  - 開発環境をコンテナ化`（Rails,Nginx,MySQL,React）`

#### AWS

- `ECS Fargate`: Rails&Nginx のコンテナを実行
- `ECR`: Rails&Nginx のコンテナイメージを保存
- `ALB`: コンテナの負荷分散
- `RDS`: DB エンジンは MySQL を使用
- `S3`: React のホスティング、画像の保存
- `CloudFront`: .html、.css、.js、イメージファイル等の配信
- `Route53`: 独自ドメインでのアクセス
- `VPC`: 個人のネットワーク領域
- `ACM`: SSL 証明書を発行

## ビルド方法

前提条件:

- `Docker` と `Docker Compose` がインストールされていること
- `Node.js` がインストールされていること
- `Yarn` がインストールされていること
- `Ruby on Rails` がインストールされていること
- `MySQL` がインストールされていること

### 手順

1. **GitHub からプロジェクトをクローンする:**

```
git clone https://github.com/sugurufukui/tokushi-kyouzai.git
cd tokushi-kyouzai
```

2. **必要な依存関係をインストールする:**

Rails 依存関係:

```
bundle install
```

React 依存関係:

```
yarn install
```

3. **データベースをセットアップする:**

```
rails db:create
rails db:migrate
rails db:seed
```

4. **Docker コンテナをビルドし、起動する:**

```
docker-compose build
docker-compose up
```

5. **ブラウザでアプリにアクセス:**

開発環境: http://localhost:3000

## 開発プロセス

### Git ブランチ戦略

- 機能ごとにブランチを `feature/○○` で切り替えて開発
- プルリクエストを作成し、コードレビュー後にマージ (今回はフローを開示するためにブランチを削除せずに残しています)
- マージ時には、まず `develop` ブランチにマージし、その後 `master` にマージする方法を採用

### ツール・リソース

- 開発中の不明点や困難な問題に対処するために、ChatGPT-4 を活用しました

## 連絡先

- Twitter: [@urugusss](https://twitter.com/urugusss)

最後まで読んでいただきありがとうございました。
