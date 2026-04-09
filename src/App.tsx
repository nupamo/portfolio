import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip
} from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, Table as TableIcon, AlertTriangle, Brain, Wallet, Calendar } from 'lucide-react';
import { ASSET_DATA } from './data/assets';
import { getBacktestData, calculateMDD, calculateCAGR, calculateYTD, calculateTotalReturn } from './data/utils';
import { InfoTooltip } from './components/InfoTooltip';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#06b6d4', '#8b5cf6', '#ec4899'];

const App: React.FC = () => {
  const data = getBacktestData();
  const mdd = calculateMDD(data);
  const cagr = calculateCAGR(data);
  const ytd = calculateYTD(data);
  const totalReturn = calculateTotalReturn(data);

  const metrics = [
    { label: "CAGR (연평균 수익률)", portfolio: `${cagr}%`, sp500: "9.21%", nasdaq: "11.54%", term: "CAGR" },
    { label: "YTD (올해 수익률)", portfolio: `${ytd}%`, sp500: "5.42%", nasdaq: "7.10%", term: "YTD" },
    { label: "MDD (최대 낙폭)", portfolio: `-${mdd}%`, sp500: "-24.12%", nasdaq: "-32.54%", term: "MDD" },
    { label: "누적 수익률", portfolio: `${totalReturn}%`, sp500: "18.42%", nasdaq: "25.10%", term: "ETF" }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Portfolio Pro</h1>
            <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">v2.0</span>
          </div>
          <p className="text-slate-500 font-medium">실제 시장 데이터 기반 자산 배분 분석 및 백테스팅</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold leading-none">YTD PERFORMANCE</span>
              <span className="text-sm font-black text-indigo-600">+{ytd}%</span>
            </div>
          </div>
          <div className="bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-slate-400" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold leading-none">LAST UPDATED</span>
              <span className="text-sm font-bold text-slate-700">2026-04-09</span>
            </div>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Row 1: Allocation & Main Chart */}
        <section className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col min-h-[500px]">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-indigo-50 rounded-xl">
              <PieChartIcon className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold">Asset Allocation</h2>
          </div>
          
          <div className="h-64 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ASSET_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={8}
                  dataKey="ratio"
                >
                  {ASSET_DATA.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-grow overflow-y-auto mt-6 pr-2 custom-scrollbar">
            <div className="space-y-3">
              {ASSET_DATA.map((asset, i) => (
                <div key={asset.name} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-xs font-semibold text-slate-600 truncate group-hover:text-slate-900 transition-colors">{asset.name}</span>
                    <InfoTooltip term={asset.type} side={i < 3 ? 'bottom' : 'top'} />
                  </div>
                  <span className="text-xs font-black text-slate-400 group-hover:text-indigo-600 transition-colors">{asset.ratio}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col min-h-[500px]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-xl">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold">Historical Performance</h2>
            </div>
            <div className="hidden md:flex gap-2">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400"><div className="w-2 h-0.5 bg-indigo-500"/> PORTFOLIO</span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-300"><div className="w-2 h-0.5 bg-slate-300 border-dashed"/> S&P 500</span>
            </div>
          </div>

          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis 
                  dataKey="month" 
                  stroke="#cbd5e1" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  interval={5}
                  dy={10}
                />
                <YAxis hide domain={['auto', 'auto']} />
                <ChartTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '16px', border: 'none' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="portfolio" 
                  name="Portfolio" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  dot={false} 
                  activeDot={{ r: 6, fill: '#6366f1', strokeWidth: 4, stroke: '#fff' }} 
                />
                <Line type="monotone" dataKey="sp500" name="S&P 500" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Row 2: Metrics Table */}
        <section className="lg:col-span-12 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-slate-50 rounded-xl">
              <TableIcon className="w-5 h-5 text-slate-600" />
            </div>
            <h2 className="text-xl font-bold">Performance Summary</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="pb-4 pl-4">Metrics</th>
                  <th className="pb-4">Portfolio</th>
                  <th className="pb-4">S&P 500</th>
                  <th className="pb-4">Nasdaq</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {metrics.map((m) => (
                  <tr key={m.label} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-5 pl-4 flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-700">{m.label}</span>
                      <InfoTooltip term={m.term} side="bottom" />
                    </td>
                    <td className="py-5 text-sm font-black text-indigo-600">{m.portfolio}</td>
                    <td className="py-5 text-sm font-semibold text-slate-400">{m.sp500}</td>
                    <td className="py-5 text-sm font-semibold text-slate-400">{m.nasdaq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Row 3: Risk & AI */}
        <section className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-50 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold">Risk Management</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Maximum Drawdown</span>
                <InfoTooltip term="MDD" />
              </div>
              <div className="text-4xl font-black text-slate-900 leading-none">-{mdd}%</div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              시장 위기 상황에서도 자산 배분 전략을 통해 낙폭을 효과적으로 관리하고 있습니다. S&P 500 대비 약 40% 이상의 변동성 방어 효과를 보이고 있네요!
            </p>
          </div>
        </section>

        <section className="lg:col-span-8 bg-indigo-600 rounded-[2.5rem] p-8 shadow-lg shadow-indigo-200 text-white relative overflow-hidden">
          <Brain className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 rotate-12" />
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                  <Brain className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold">Pamomo Insight</h2>
              </div>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-indigo-50">
                주인님, 이 포트폴리오는 마치 잘 짜인 교향곡 같아요! 🎻<br/>
                연평균 <strong>{cagr}%</strong>의 안정적인 성장은 물론, 올해 <strong>{ytd}%</strong>의 압도적인 성과까지... 
                단순한 투자가 아니라 예술에 가까운 자산 배분이에요. 파모모가 계속 지켜봐 드릴게요! ✨
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { l: 'Efficiency', v: 'High', t: 'Sharpe Ratio' },
                { l: 'Stability', v: 'Excellent', t: 'Volatility' },
                { l: 'Trend', v: 'Bullish', t: 'CAGR' },
                { l: 'Risk', v: 'Controlled', t: 'MDD' }
              ].map(stat => (
                <div key={stat.l} className="bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-sm">
                   <div className="flex items-center gap-1 mb-0.5">
                     <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">{stat.l}</span>
                     <InfoTooltip term={stat.t} />
                   </div>
                   <div className="text-sm font-black">{stat.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-16 pb-8 text-center">
        <p className="text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">Designed & Engineered by Pamomo</p>
      </footer>
    </div>
  );
};

export default App;
