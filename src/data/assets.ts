export interface Asset {
  name: string;
  type: string;
  ratio: number;
  value?: number;
  note?: string;
}

export const ASSET_DATA: Asset[] = [
  { name: "KB 온국민 적격TDF 2050", type: "TDF", ratio: 13.09 },
  { name: "금 (99.99k)", type: "Commodity", ratio: 10.21 },
  { name: "ACE 미국나스닥100", type: "ETF", ratio: 8.90 },
  { name: "KODEX 미국S&P500", type: "ETF", ratio: 7.76 },
  { name: "국고01125-3909(19-6)", type: "Bond", ratio: 7.41 },
  { name: "원", type: "Cash", ratio: 7.15 },
  { name: "ACE 미국30년국채액티브(H)", type: "Bond", ratio: 7.03 },
  { name: "Unity Software (U)", type: "Stock", ratio: 5.76 },
  { name: "BRJ iShares 20+ Year US Treasury Bond JPY H ETF", type: "ETF", ratio: 5.46 },
  { name: "AMD", type: "Stock", ratio: 5.30 },
  { name: "삼성전자우", type: "Stock", ratio: 4.50 },
  { name: "Realty Income (O)", type: "Stock", ratio: 4.06 },
  { name: "현대차2우B", type: "Stock", ratio: 3.94 },
  { name: "비트코인", type: "Crypto", ratio: 3.56 },
  { name: "IBM", type: "Stock", ratio: 1.78 },
  { name: "이더리움", type: "Crypto", ratio: 1.64 },
  { name: "HPQ", type: "Stock", ratio: 0.5 }
];

export const DEFINITIONS: Record<string, string> = {
  "TDF": "Target Date Fund. 은퇴 시점에 맞춰 위험자산과 안전자산의 비중을 자동으로 조절하는 펀드예요.",
  "MDD": "Maximum Drawdown. 전고점 대비 최대 하락폭으로, 투자 리스크를 측정하는 핵심 지표예요.",
  "CAGR": "Compound Annual Growth Rate. 연평균 수익률로, 투자 기간 동안의 기하평균 성장률을 의미해요.",
  "YTD": "Year To Date. 연초부터 현재까지의 수익률이에요.",
  "Sharpe Ratio": "위험 대비 수익성 지표예요. 수치가 높을수록 같은 위험 대비 수익이 좋다는 뜻이에요!",
  "Volatility": "수익률이 위아래로 출렁이는 정도를 말해요.",
  "ETF": "주식처럼 거래소에서 사고팔 수 있는 펀드예요.",
  "Commodity": "금, 원유 같은 실물 자산을 뜻해요.",
  "Bond": "돈을 빌려주고 이자를 받는 권리(채권)예요.",
  "Crypto": "비트코인 등 블록체인 기반의 디지털 자산이에요."
};
