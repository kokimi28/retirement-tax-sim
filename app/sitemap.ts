/**
 * Next.js 標準形式の sitemap.xml ジェネレーター
 *
 * 参照：https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 *
 * 公開ルートを Search Console 向けに登録する。
 * 新規ページを追加した際はこのファイルにも追記すること。
 */

import type { MetadataRoute } from 'next';
import { SITE_META } from '@/lib/site-meta';
import { ARTICLES } from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITE_META.lastUpdated);

  const articleEntries: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${SITE_META.url}/articles/${a.slug}`,
    lastModified: new Date(a.updated),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [
    {
      url: SITE_META.url,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${SITE_META.url}/articles`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...articleEntries,
    {
      url: `${SITE_META.url}/about`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${SITE_META.url}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_META.url}/disclosure`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
