import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import SiteFooter from '@/components/SiteFooter';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: '退職金課税シミュレーター',
    template: '%s | 退職金課税シミュレーター',
  },
  description:
    '退職金額と勤続年数から、退職所得控除・所得税・住民税・手取り額をかんたんに計算。役員退職金・短期勤続・iDeCo併用・2026年改正（DC一時金10年ルール）にも対応した最新版。',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Google Analytics 4 Measurement ID
  // Vercel の環境変数 NEXT_PUBLIC_GA_MEASUREMENT_ID で設定する。
  // 未設定の場合は GA4 タグを出力しない（開発・プレビュー環境で安全）。
  //
  // 注：GA タグは <head> 内に配置する必要がある。
  // Search Console の所有権確認（Google Analytics 方式）が
  // <body> 内の GA タグでは認証できない仕様のため。
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', { anonymize_ip: true });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col">
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
