/**
 * サイト共通フッター
 *
 * 免責・広告・最終更新の表示と、補助ページへの内部リンクを提供する。
 * layout.tsx から各ページ共通で呼び出される。
 */

import Link from 'next/link';
import { SITE_META } from '@/lib/site-meta';

export default function SiteFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-3xl mx-auto px-4 py-8 text-xs text-gray-500 space-y-3">
        <p>
          <strong className="text-gray-700">免責事項：</strong>
          本シミュレーターの計算結果はあくまで参考値です。実際の税額は個別の事情により異なる場合があります。重要な意思決定の前には、税理士・FP等の専門家にご相談ください。本サイトの情報により生じたいかなる損害についても責任を負いません。
        </p>
        <p>
          <strong className="text-gray-700">広告について：</strong>
          本サイトには広告（アフィリエイトリンク）が含まれます。リンク経由でサービスの申込・契約が成立した場合、運営者に報酬が支払われることがあります。
        </p>
        <p>
          <strong className="text-gray-700">最終更新：</strong>{SITE_META.lastUpdated} ／
          <strong className="text-gray-700"> 適用法令：</strong>{SITE_META.appliedLawDate}現在
        </p>
        <div className="pt-3 border-t border-gray-200 flex flex-wrap gap-4">
          <Link href="/" className="hover:text-gray-700">トップ</Link>
          <Link href="/about" className="hover:text-gray-700">サイトについて</Link>
          <Link href="/privacy" className="hover:text-gray-700">プライバシーポリシー</Link>
          <Link href="/disclosure" className="hover:text-gray-700">運営者情報</Link>
        </div>
      </div>
    </footer>
  );
}
