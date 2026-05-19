import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_META } from '@/lib/site-meta';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description:
    '退職金課税シミュレーターにおける個人情報・Cookie・アクセス解析・第三者サービスの取り扱い方針。',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← トップに戻る
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-3">
            プライバシーポリシー
          </h1>
        </div>
      </header>

      <main className="px-4 py-8">
        <article className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg p-6 space-y-6 text-sm text-gray-800 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. シミュレーター入力情報の取り扱い</h2>
            <p>
              本サイトのシミュレーターに入力された情報（退職金額、勤続年数、役員等区分、退職理由など）は、すべて訪問者の<strong>ブラウザ内で処理</strong>されます。本サイトのサーバー、運営者、または第三者に送信・保存されることはありません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. アクセス解析と Cookie</h2>
            <p>
              本サイトはアクセス状況の把握のため、Google LLC が提供する Google Analytics 4 を使用しています。Google Analytics 4 は Cookie を用いて訪問者の行動データを収集しますが、IPアドレスは匿名化されており、個人を特定する情報は含まれません。
            </p>
            <p className="mt-3">
              オプトアウト方法：
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mx-1"
              >
                Google アナリティクス オプトアウト アドオン
              </a>
              の導入、またはブラウザのプライバシー設定で Cookie を無効にしてください。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. 広告・アフィリエイトリンク</h2>
            <p>
              本サイトには、第三者の広告主（ASP・広告主企業）のリンクが含まれます。これらのリンクをクリックした場合、広告主の Cookie が設定されることがあります。これは広告主が成果を計測するためのもので、本サイト運営者が直接管理するものではありません。
            </p>
            <p className="mt-3">
              各広告主のプライバシーポリシーは、それぞれの広告主のサイトをご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. 利用する第三者サービス</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>ホスティング：Vercel Inc.（米国）</li>
              <li>アクセス解析：Google LLC（Google Analytics 4 / 米国）</li>
              <li>検索インデックス：Google LLC（Google Search Console / 米国）</li>
              <li>アフィリエイトASP：A8.net、もしもアフィリエイト、その他のASP</li>
            </ul>
            <p className="mt-3">
              これらのサービスは、その規約に基づいて訪問者の情報を取り扱う場合があります。詳細は各サービスのプライバシーポリシーをご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">5. 個人情報の取り扱い</h2>
            <p>
              本サイトは、お問い合わせ等で運営者宛に直接送信された情報を除き、訪問者の個人情報を一切保持しません。お問い合わせ等で送信された情報は、回答に必要な範囲でのみ使用し、本人の同意なく第三者に開示することはありません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">6. プライバシーポリシーの改定</h2>
            <p>
              本ページの内容は、法令の変更・サービス内容の変更に伴い改定することがあります。改定後の内容は本ページに掲示した時点から効力を持ちます。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">7. お問い合わせ</h2>
            <p>
              本サイトでの情報の取り扱いについてのお問い合わせは、
              <Link href="/disclosure" className="text-blue-600 hover:underline">運営者情報ページ</Link>
              記載の連絡先までお願いいたします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">8. 制定日・改定日</h2>
            <p>
              制定日：{SITE_META.publishedDate} ／ 最終改定日：{SITE_META.lastUpdated}
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}
