import { MARKET_HISTORY } from './market';

export interface PerformanceData {
  month: string;
  portfolio: number;
  sp500: number;
  nasdaq: number;
}

export const getBacktestData = (): PerformanceData[] => {
  const base = MARKET_HISTORY[0];
  
  return MARKET_HISTORY.map((d) => {
    const spyPerf = (d.spy / base.spy) * 100;
    const qqqPerf = (d.qqq / base.qqq) * 100;
    const gldPerf = (d.gld / base.gld) * 100;
    const btcPerf = (d.btc / base.btc) * 100;
    
    // Weighted Portfolio Mock Logic
    // 20% QQQ, 20% SPY, 15% GLD, 5% BTC, 40% Stable/Bond (100)
    const portfolioPerf = (qqqPerf * 0.20) + (spyPerf * 0.20) + (gldPerf * 0.15) + (btcPerf * 0.05) + (100 * 0.40);

    return {
      month: d.month,
      portfolio: Number(portfolioPerf.toFixed(2)),
      sp500: Number(spyPerf.toFixed(2)),
      nasdaq: Number(qqqPerf.toFixed(2))
    };
  });
};

export const calculateMDD = (data: PerformanceData[]) => {
  let max = 0;
  let mdd = 0;
  data.forEach(d => {
    if (d.portfolio > max) max = d.portfolio;
    const drawdown = (max - d.portfolio) / max;
    if (drawdown > mdd) mdd = drawdown;
  });
  return (mdd * 100).toFixed(2);
};

export const calculateCAGR = (data: PerformanceData[]) => {
  const startValue = data[0].portfolio;
  const endValue = data[data.length - 1].portfolio;
  const years = (data.length - 1) / 12;
  const cagr = (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
  return cagr.toFixed(2);
};

export const calculateYTD = (data: PerformanceData[]) => {
  const currentYear = "2026";
  const yearStart = data.find(d => d.month === `${Number(currentYear) - 1}-12`) || data.find(d => d.month.startsWith(currentYear));
  if (!yearStart) return "0.00";
  const current = data[data.length - 1].portfolio;
  return (((current - yearStart.portfolio) / yearStart.portfolio) * 100).toFixed(2);
};

export const calculateTotalReturn = (data: PerformanceData[]) => {
  const start = data[0].portfolio;
  const end = data[data.length - 1].portfolio;
  return (((end - start) / start) * 100).toFixed(2);
};
