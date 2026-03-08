# 製造業DX × AI活用 ポートフォリオ

Astro 5、Tailwind CSS、Astro Content Collections を使った、GitHub Pages 向けの静的ポートフォリオ兼開発者ブログです。

副業向けの公開面を想定し、`実名ではなく開発者ネーム`、`サイト内で直接連絡を受けない` 構成にしています。プロフィール導線は `GitHub` と `Coconala` に寄せています。

## ローカル開発手順

推奨 Node.js は `22 LTS` です。

```powershell
npm install
npm run dev
```

型チェック:

```powershell
npm run check
```

本番ビルド:

```powershell
npm run build
```

ローカル環境が `Node 24` 系で Astro ビルドが不安定な場合は、次のように `Node 22` で直接実行できます。

```powershell
npx -y node@22 .\node_modules\astro\astro.js build
```

## 新しいブログ記事の追加方法

ブログ記事は `src/content/blog/` に Markdown または MDX ファイルを追加するだけで公開対象になります。

例:

```md
---
title: "記事タイトル"
description: "記事概要"
date: 2026-03-08
updated: 2026-03-08
tags:
  - Manufacturing DX
  - AI Workflow
cover_image: "/images/example-cover.svg"
draft: false
---

## 見出し

本文を書きます。
```

主な frontmatter:

- `title`
- `description`
- `date`
- `updated`
- `tags`
- `cover_image`
- `draft`

`draft: true` にすると一覧や詳細ページから除外されます。

## 新しいプロジェクトの追加方法

プロジェクトは `src/content/projects/` に Markdown または MDX ファイルを追加します。

例:

```md
---
title: "プロジェクト名"
summary: "概要"
problem: "課題背景"
solution: "解決アプローチ"
tech_stack:
  - Astro
  - TypeScript
status: "公開中"
links:
  - label: "Demo"
    url: "https://example.com"
cover_image: "/images/example-project.svg"
featured: true
draft: false
---

## 背景

本文を書きます。
```

主な frontmatter:

- `title`
- `summary`
- `problem`
- `solution`
- `tech_stack`
- `status`
- `links`
- `cover_image`
- `featured`
- `draft`

`status` は現在、次の値を想定しています。

- `公開中`
- `社内利用`
- `試作`
- `改善継続中`

## GitHub Pages デプロイ方法

このリポジトリには `.github/workflows/deploy.yml` が入っており、`main` ブランチへの push で自動デプロイされます。

手順:

1. GitHub リポジトリを作成する
2. このプロジェクトを push する
3. GitHub の `Settings > Pages` で `GitHub Actions` を選ぶ
4. `main` ブランチへ push する

GitHub Actions 側では `Node 22` を使って `astro build` を実行し、`dist/` を GitHub Pages に配備します。

## 開発者ネームとプロフィールリンクの設定

公開前に `src/data/site.ts` の以下を確認してください。

- `author.name`
  - 開発者ネーム
- `socialLinks`
  - `GitHub` と `Coconala` の URL
- `primaryProfile`
  - ヘッダーやフッターで優先表示する外部プロフィール

このプロジェクトは、サイト内に問い合わせフォームを置かず、外部プロフィールへ誘導する前提です。

## `site` と `base` の考え方

Astro の `astro.config.mjs` では `site` と `base` が重要です。

- `site`
  - OGP、canonical URL、sitemap などで使う絶対 URL の基準です。
- `base`
  - サイトがどのパス配下で公開されるかを表します。

### ユーザーサイトの場合

公開 URL:

```txt
https://username.github.io/
```

考え方:

- `site = "https://username.github.io"`
- `base = "/"`

### プロジェクトサイトの場合

公開 URL:

```txt
https://username.github.io/repository-name/
```

考え方:

- `site = "https://username.github.io"`
- `base = "/repository-name/"`

このプロジェクトでは、GitHub Actions 上の `GITHUB_REPOSITORY_OWNER` と `GITHUB_REPOSITORY` から `base` を自動判定するようにしています。

つまり:

- リポジトリ名が `username.github.io` なら `base` は `/`
- それ以外なら `base` は `/<repository-name>/`

独自ドメインや別 URL を使いたい場合は、環境変数 `SITE_URL` と `BASE_PATH` で上書きできます。

## 主要ディレクトリの役割

- `src/pages/`
  - ルーティングされるページ本体
- `src/components/`
  - 共通 UI コンポーネント
- `src/layouts/`
  - 共通レイアウト
- `src/content/`
  - Blog / Projects の Markdown コンテンツ
- `src/data/`
  - サイト共通の固定文言やメタデータ
- `src/utils/`
  - 日付処理、コンテンツ取得、タグ変換などのユーティリティ
- `public/`
  - 画像、OGP、favicon などの静的アセット
- `.github/workflows/`
  - GitHub Actions のデプロイ設定

## 補足

- Blog 記事は `src/pages/blog/[slug].astro` で詳細表示されます
- Project 詳細は `src/pages/projects/[slug].astro` で生成されます
- Blog タグページは `src/pages/blog/tags/[tag].astro` で静的生成されます
