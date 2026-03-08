export const siteConfig = {
  title: "製造業DX × AI活用 ポートフォリオ",
  description:
    "製造業の現場課題を理解し、AI活用とツール実装で業務改善を前に進めるためのポートフォリオ兼開発者ブログ。",
  locale: "ja-JP",
  author: {
    name: "Tatsumi",
    role: "製造業DX・AI活用エンジニア"
  },
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/tatsumin1988"
    },
    {
      label: "Coconala",
      href: "https://coconala.com/users/5946587"
    }
  ],
  defaultOgImage: "/og/default.svg",
  domainFocus: ["製造業DX", "AI活用", "業務改善", "現場運用設計"],
  contact: {
    pagePath: "/contact/",
    formAction: "https://formspree.io/f/xqeyaqrq",
    provider: "Formspree",
    submitLabel: "相談内容を送信",
    providerDescription:
      "メールアドレスは公開せず、フォーム経由で相談を受け付ける構成です。",
    setupNote:
      "Formspree 側で通知先を Gmail に設定し、スパム対策や自動返信ルールを必要に応じて調整してください。"
  },
  contactMessage:
    "副業・制作相談、社内向けツール設計、AI活用の運用整理などは、メール非公開の問い合わせフォームから受け付ける構成にしています。",
  notFound: {
    title: "探しているページは見つかりませんでした。",
    description:
      "URL が変わったか、公開を終了した可能性があります。Home から全体を見直すか、Projects / Blog から目的のページを探してください。"
  }
} as const;

export const mainNavigation = [
  { label: "トップ", href: "/" },
  { label: "概要", href: "/about/" },
  { label: "実績", href: "/projects/" },
  { label: "ブログ", href: "/blog/" }
] as const;

export const homeContent = {
  eyebrow: "製造業DX / AI活用 / 業務改善",
  title: "現場に効く設計と実装で、業務改善を前に進める。",
  description:
    "製造現場の情報分断、属人化、手作業の滞留に向き合い、AIとソフトウェア実装を使って改善の再現性を高めるための実践ポートフォリオです。",
  primaryCta: {
    label: "実績を見る",
    href: "/projects/"
  },
  secondaryCta: {
    label: "ブログを読む",
    href: "/blog/"
  }
} as const;

export const aboutSections = [
  {
    title: "向き合っている課題",
    description:
      "現場で本当に困っているのは、情報が無いことではなく、必要なタイミングで使える形に整理されていないことです。入力負荷が高い、運用が属人化する、改善効果が見えない。その構造を設計からほどくことを重視しています。"
  },
  {
    title: "AI活用のスタンス",
    description:
      "AIは魔法ではなく、判断補助と作業圧縮の道具です。曖昧な要求を構造化し、現場運用に落ちるUIとワークフローに接続して初めて価値になります。精度だけでなく、責任範囲と再現性を設計します。"
  },
  {
    title: "得意領域",
    description:
      "業務フロー整理、要件定義、データ整理、ダッシュボード、社内ツール、AIアシスト導入、運用設計、段階導入型の改善プロジェクトを得意としています。"
  }
] as const;
