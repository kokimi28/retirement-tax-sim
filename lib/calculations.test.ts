/**
 * 計算ロジックの単体テスト
 *
 * テストケースは CLAUDE.md「単体テスト必須ケース」に基づく。
 * 想定値は国税庁の計算例または手計算で検算済み。
 */
import { describe, it, expect } from 'vitest';
import {
  calcEffectiveYears,
  calcRetirementDeduction,
  calcTaxableRetirementIncome,
  calcIncomeTax,
  calcResidentTax,
  calcAll,
  compareWithOneMoreYear,
  validateInput,
} from './calculations';

describe('calcEffectiveYears: 勤続年数の切り上げ', () => {
  it('19年5ヶ月は20年に切り上げ', () => {
    expect(calcEffectiveYears(19, 5)).toBe(20);
  });
  it('20年0ヶ月は20年のまま', () => {
    expect(calcEffectiveYears(20, 0)).toBe(20);
  });
  it('20年1ヶ月は21年に切り上げ', () => {
    expect(calcEffectiveYears(20, 1)).toBe(21);
  });
  it('0年0ヶ月は0年', () => {
    expect(calcEffectiveYears(0, 0)).toBe(0);
  });
});

describe('calcRetirementDeduction: 退職所得控除額', () => {
  it('勤続1年は80万円（最低保証）', () => {
    expect(calcRetirementDeduction(1)).toBe(800_000);
  });
  it('勤続2年は80万円（40万×2=80万、最低保証と同額）', () => {
    expect(calcRetirementDeduction(2)).toBe(800_000);
  });
  it('勤続3年は120万円（40万×3）', () => {
    expect(calcRetirementDeduction(3)).toBe(1_200_000);
  });
  it('勤続20年は800万円（境界）', () => {
    expect(calcRetirementDeduction(20)).toBe(8_000_000);
  });
  it('勤続21年は870万円（境界後）', () => {
    expect(calcRetirementDeduction(21)).toBe(8_700_000);
  });
  it('勤続40年は2200万円（800万+70万×20）', () => {
    expect(calcRetirementDeduction(40)).toBe(22_000_000);
  });
});


describe('calcTaxableRetirementIncome: 課税退職所得金額', () => {
  it('勤続1年・退職金50万円は控除以下で課税0', () => {
    const result = calcTaxableRetirementIncome(500_000, 800_000, false, 1);
    expect(result.amount).toBe(0);
  });

  it('勤続40年・退職金3000万円（一般）: 課税400万円', () => {
    // 控除 2200万、afterDeduction 800万、×1/2 = 400万
    const result = calcTaxableRetirementIncome(30_000_000, 22_000_000, false, 40);
    expect(result.amount).toBe(4_000_000);
    expect(result.category).toBe('general');
  });

  it('勤続5年・役員・退職金600万円: 特例（1/2なし）で課税400万', () => {
    // 控除 200万、afterDeduction 400万、1/2なし → 400万
    const result = calcTaxableRetirementIncome(6_000_000, 2_000_000, true, 5);
    expect(result.amount).toBe(4_000_000);
    expect(result.category).toBe('specificExecutive');
  });

  it('勤続5年・一般・退職金1000万円（短期退職、300万超）: 課税650万', () => {
    // 控除 200万、afterDeduction 800万 > 300万
    // 150万 + (1000万 - (300万 + 200万)) = 150万 + 500万 = 650万
    const result = calcTaxableRetirementIncome(10_000_000, 2_000_000, false, 5);
    expect(result.amount).toBe(6_500_000);
    expect(result.category).toBe('shortTermOver300');
  });

  it('勤続5年・一般・退職金400万円（短期退職、300万以下）: 通常の1/2課税', () => {
    // 控除 200万、afterDeduction 200万 ≤ 300万、×1/2 = 100万
    const result = calcTaxableRetirementIncome(4_000_000, 2_000_000, false, 5);
    expect(result.amount).toBe(1_000_000);
    expect(result.category).toBe('shortTermUnder300');
  });

  it('1,000円未満切り捨てが効く: 課税3,001,500円 → 3,001,000円', () => {
    // 控除800万、retire 1400万3千円 → afterDed 6,003,000 ÷ 2 = 3,001,500 → 切り捨て 3,001,000
    const result = calcTaxableRetirementIncome(14_003_000, 8_000_000, false, 20);
    expect(result.amount).toBe(3_001_000);
  });
});

describe('calcIncomeTax: 所得税額（復興特別所得税込み）', () => {
  it('課税0円は税0', () => {
    expect(calcIncomeTax(0)).toBe(0);
  });
  it('課税100万円: 50,000 × 1.021 = 51,050円', () => {
    // 100万 × 5% - 0 = 50,000、×1.021 = 51,050
    expect(calcIncomeTax(1_000_000)).toBe(51_050);
  });
  it('課税400万円: (400万×20% - 42.75万) × 1.021 = 380,329円', () => {
    // 400万 × 20% - 427,500 = 372,500、×1.021 = 380,322.5 → 切り捨て 380,322
    // ※微妙な丸めずれの可能性あり、JS浮動小数点
    const result = calcIncomeTax(4_000_000);
    // 期待: floor(372500 * 1.021) = floor(380322.5) = 380322
    expect(result).toBe(380_322);
  });
});

describe('calcResidentTax: 住民税', () => {
  it('課税0円は税0', () => {
    expect(calcResidentTax(0)).toBe(0);
  });
  it('課税100万円: 10万円', () => {
    expect(calcResidentTax(1_000_000)).toBe(100_000);
  });
  it('課税400万円: 40万円', () => {
    expect(calcResidentTax(4_000_000)).toBe(400_000);
  });
  it('課税3,001,000円: 300,100円（100円未満切り捨て）', () => {
    expect(calcResidentTax(3_001_000)).toBe(300_100);
  });
});


describe('calcAll: 統合計算', () => {
  it('勤続40年・退職金3000万円・一般従業員', () => {
    const result = calcAll({
      retirementAmount: 30_000_000,
      yearsOfService: 40,
      isExecutive: false,
    });
    expect(result.effectiveYears).toBe(40);
    expect(result.retirementDeduction).toBe(22_000_000);
    expect(result.taxableRetirementIncome).toBe(4_000_000);
    expect(result.incomeTax).toBe(380_322);
    expect(result.residentTax).toBe(400_000);
    expect(result.totalTax).toBe(780_322);
    expect(result.netAmount).toBe(30_000_000 - 780_322);
    expect(result.category).toBe('general');
  });

  it('勤続1年・退職金50万円: 完全非課税', () => {
    const result = calcAll({
      retirementAmount: 500_000,
      yearsOfService: 1,
      isExecutive: false,
    });
    expect(result.retirementDeduction).toBe(800_000);
    expect(result.taxableRetirementIncome).toBe(0);
    expect(result.totalTax).toBe(0);
    expect(result.netAmount).toBe(500_000);
  });

  it('勤続19年5ヶ月・退職金800万円: 端数月で20年扱い', () => {
    const result = calcAll({
      retirementAmount: 8_000_000,
      yearsOfService: 19,
      monthsOfService: 5,
      isExecutive: false,
    });
    expect(result.effectiveYears).toBe(20);
    expect(result.retirementDeduction).toBe(8_000_000); // 20年分
    expect(result.taxableRetirementIncome).toBe(0); // 控除と同額
    expect(result.totalTax).toBe(0);
  });
});

describe('compareWithOneMoreYear: 「あと1年勤めると」比較（差別化要素A）', () => {
  it('勤続20年→21年の境界跨ぎ: 控除額差70万円', () => {
    const comp = compareWithOneMoreYear({
      retirementAmount: 30_000_000,
      yearsOfService: 20,
      isExecutive: false,
    });
    // 20年: 控除800万、21年: 控除870万、差70万
    expect(comp.deductionDiff).toBe(700_000);
    // 課税所得が減るため、税額も減る = 節税効果
    expect(comp.totalTaxDiff).toBeGreaterThan(0);
    // 手取りは増える
    expect(comp.netAmountDiff).toBeGreaterThan(0);
  });

  it('勤続19年→20年の境界以下: 控除額差40万円', () => {
    const comp = compareWithOneMoreYear({
      retirementAmount: 15_000_000,
      yearsOfService: 19,
      isExecutive: false,
    });
    // 19年: 760万、20年: 800万、差40万
    expect(comp.deductionDiff).toBe(400_000);
  });
});

describe('validateInput: 入力検証', () => {
  it('正常な入力はエラーなし', () => {
    const errors = validateInput({
      retirementAmount: 10_000_000,
      yearsOfService: 30,
      isExecutive: false,
    });
    expect(errors).toEqual([]);
  });

  it('退職金額未入力はエラー', () => {
    const errors = validateInput({
      yearsOfService: 30,
      isExecutive: false,
    });
    expect(errors.some((e) => e.field === 'retirementAmount')).toBe(true);
  });

  it('負の勤続年数はエラー', () => {
    const errors = validateInput({
      retirementAmount: 10_000_000,
      yearsOfService: -5,
      isExecutive: false,
    });
    expect(errors.some((e) => e.field === 'yearsOfService')).toBe(true);
  });

  it('勤続年数の小数はエラー（端数は月数で）', () => {
    const errors = validateInput({
      retirementAmount: 10_000_000,
      yearsOfService: 30.5,
      isExecutive: false,
    });
    expect(errors.some((e) => e.field === 'yearsOfService')).toBe(true);
  });

  it('勤続月数が12以上はエラー', () => {
    const errors = validateInput({
      retirementAmount: 10_000_000,
      yearsOfService: 30,
      monthsOfService: 12,
      isExecutive: false,
    });
    expect(errors.some((e) => e.field === 'monthsOfService')).toBe(true);
  });
});
