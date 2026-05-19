/**
 * Next.js 標準形式の robots.txt ジェネレーター
 *
 * 参照：https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 *
 * 全クローラに対して全ルートを許可し、sitemap の場所を明示する。
 */

import type { MetadataRoute } from 'next';
import { SITE_META } from '@/lib/site-meta';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_META.url}/sitemap.xml`,
    host: SITE_META.url,
  };
}
