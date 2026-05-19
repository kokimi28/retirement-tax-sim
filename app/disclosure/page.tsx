import type { Metadata } from 'next';
import Link from 'next/link';
import { OPERATOR_INFO, SITE_META } from '@/lib/site-meta';

export const metadata: Metadata = {
  title: '運営者情報',
  description:
    '退職金課税シミュレーター運営者情報・特定商取引法に基づく表記・連絡先・アフィリエイト関係の明示。',
  alternates: {
    canonical: '/disclosure',
  },
};

export default function DisclosurePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← トップに戻る
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-3">運営者情報</h1>
          <p className="text-sm text-gray-600 mt-1">特定商取引法に基づく表記</p>
        </div>
      </header>

      <main className="px-4 py-8">
        <article className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg p-6 space-y-6 text-sm text-gray-800 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">運営者情報</h2>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <th className="text-left py-3 pr-4 align-top w-32 font-medium text-gray-700">サイト名</th>
                  <td className="py-3">{SITE_META.name}</td>
                </tr>
                <tr>
                  <th className="text-left py-3 pr-4 align-top w-32 font-medium text-gray-700">運営者</th>
                  <td className="py-3">{OPERATOR_INFO.name}</td>
                </tr>
                <tr>
                  <th className="text-left py-3 pr-4 align-top w-32 font-medium text-gray-700">所在地</th>
                  <td className="py-3">{OPERATOR_INFO.address}</td>
                </tr>
                <tr>
                  <th className="text-left py-3 pr-4 align-top w-32 font-medium text-gray-700">電話番号</th>
                  <td className="py-3">{OPERATOR_INFO.phone}</td>
                </tr>
                <tr>
                  <th className="text-left py-3 pr-4 align-top w-32 font-medium text-gray-700">連絡先</th>
                  <td className="py-3 break-all">{OPERATOR_INFO.email}</td>
                </tr>
                <tr>
                  <th className="text-left py-3 pr-4 align-top w-32 font-medium text-gray-700">サイト URL</th>
                  <td className="py-3 break-all">{SITE_META.url}</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">サイトの運営目的</h2>
            <p>
              本サイトは、退職金を受け取る予定の個人を対象に、退職所得控除・所得税・住民税・手取り額の試算を提供することを目的としています。本サイト自体は商品・サービスの販売を行いません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">取扱業務</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>退職金課税の計算ロジックの開発・公開</li>
              <li>退職金・退職所得に関する情報提供記事の公開</li>
              <li>第三者サービスのアフィリエイト紹介</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">広告掲載とアフィリエイト関係</h2>
            <p>
              本サイトには、アフィリエイトプログラム（A8.net、もしもアフィリエイト、その他のASP）による広告リンクが含まれます。これらのリンク経由でサービスの申込・契約が成立した場合、運営者に成果報酬が支払われることがあります。
            </p>
            <p className="mt-3">
              この関係は、2023年10月施行のステルスマーケティング規制（景品表示法）に基づき、本サイトの各広告掲載箇所およびフッターで「広告」「PR」として明示しています。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">提供サービスに関する免責</h2>
            <p>
              本サイトのシミュレーション結果はあくまで参考値であり、実際の納税額を保証するものではありません。本サイトは税理士法に基づく税務代理・税務書類作成・税務相談業務を行うものではなく、税務助言・金融助言・法律助言を提供するものではありません。
            </p>
            <p className="mt-3">
              本サイトの情報を利用したことにより生じたいかなる損害についても、運営者は責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">関連ページ</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><Link href="/about" className="text-blue-600 hover:underline">このシミュレーターについて</Link></li>
              <li><Link href="/privacy" className="text-blue-600 hover:underline">プライバシーポリシー</Link></li>
            </ul>
          </section>

          <section className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              最終更新：{SITE_META.lastUpdated}
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}
