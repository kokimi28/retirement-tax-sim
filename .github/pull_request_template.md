# PR

## 目的 / Why

<!-- この PR が解く課題・背景。関連 Issue があれば Closes #N -->

Closes #

## 変更点 / What

-

## 検証 / How verified

- [ ] `npm run test`（Vitest）green
- [ ] `npm run build` 成功（型チェック兼用）
- [ ] UI 変更あり → Playwright MCP（ローカル）または `node scripts/verify-ui-remote.mjs`（リモート）で該当ページを実機確認した / UI 変更なし

## 未検証項目 / Not verified

<!-- 実行環境の制約（リモートセッション: secrets 不在・外部疎通遮断・MCP 不在等）で実行できなかった検証を列挙する。全部実行できたら「なし」と書く -->

- なし

## スコープ確認 / Scope

- [ ] MVP スコープ外の機能（計算履歴保存・ログイン・DB・localStorage 等）を足していない
- [ ] 収益導線（ASP 案件 URL の差し込み・CTA の有効化）に触れていない（触れる場合はオーナーの Vercel Pro 移行判断を確認済み）
- [ ] 計算ロジック（`lib/calculations.ts`）の変更あり → 境界値の単体テストを更新した / 変更なし
