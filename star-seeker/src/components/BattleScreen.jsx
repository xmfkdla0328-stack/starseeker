import Timeline from './battle/Timeline';
import { useBattleSystem } from '../hooks/useBattleSystem';
import { initializeBattleAllies, initializeBoss } from '../utils/battle/battleInitializer';

export default function BattleScreen({ partyData = [], enemyData = {}, missionType, extractionRewards, onVictory, handleAttackResult }) {
  // useBattleSystem 훅에서 전투 데이터 및 액션 핸들러를 제공받는다고 가정
  // 상위에서 받은 데이터를 직접 사용
  const enemy = enemyData ? initializeBoss(enemyData) : null;
  const enemies = enemy ? [enemy] : [];
  const allies = initializeBattleAllies(partyData || []);
  const battleState = {};
  const cp = 0;
  const maxCp = 100;
  const onSkillPull = () => {};
  const onSkillPush = () => {};
  const onSkillSwap = () => {};
  const onSkillUlt = () => {};

  const isReady = (allies && allies.length > 0) && (enemies && enemies.length > 0) && enemy;

  if (!isReady) {
    return (
      <div className="flex items-center justify-center w-full h-full text-slate-200 bg-slate-950/70">
        데이터 로딩 중...
      </div>
    );
  }

  const enemyHpPct = Math.max(0, Math.min(100, Math.round((enemy.hp / (enemy.maxHp || 1)) * 100)));

  return (
    <div className="flex flex-col w-screen h-screen bg-[#05040a] text-white">
      {/* 상단: Enemy Zone */}
      <div className="flex flex-col items-center justify-center py-8">
        <div className="relative flex flex-col items-center">
          <div className="w-48 h-48 rounded-xl overflow-hidden ring-2 ring-offset-2"
               style={{ boxShadow: '0 0 30px rgba(124, 58, 237, .18)' }}>
            <img
              src={enemy.image || '/assets/placeholder-boss.png'}
              alt={enemy.name || 'Enemy'}
              className="w-full h-full object-cover opacity-95"
            />
          </div>

          <div className="mt-4 w-96">
            <div className="flex items-center justify-between mb-2 text-sm text-slate-300">
              <span className="font-semibold">{enemy.name || 'Unknown Boss'}</span>
              <span className="font-mono">{enemy.hp}/{enemy.maxHp}</span>
            </div>
            <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden" style={{ boxShadow: 'inset 0 0 10px rgba(0,0,0,0.6)' }}>
              <div
                className="h-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 transition-all"
                style={{ width: `${enemyHpPct}%` }}
              />
            </div>
          </div>

          {/* 다음 행동 예고 */}
          <div className="absolute -right-6 top-6 flex flex-col items-center">
            <div className="w-14 h-14 rounded-lg flex items-center justify-center text-xs font-semibold"
                 style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.16), rgba(139,92,246,0.08))', border: '1px solid rgba(139,92,246,0.28)' }}>
              <div className="text-[10px] text-slate-200 px-1 text-center">
                {battleState.nextAction || enemy.nextAction || 'WAIT'}
              </div>
            </div>
            <div className="mt-2 text-[11px] text-slate-400">Next</div>
          </div>
        </div>
      </div>

      {/* 중앙: Timeline Zone */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div
          className="w-full max-w-5xl rounded-2xl p-6"
          style={{
            background:
              'radial-gradient(ellipse at 10% 10%, rgba(99,102,241,0.06), transparent 15%), radial-gradient(ellipse at 90% 90%, rgba(139,92,246,0.04), transparent 20%), linear-gradient(180deg, rgba(7,10,24,0.6), rgba(6,8,20,0.55))',
            border: '1px solid rgba(99,102,241,0.06)',
          }}
        >
          {/* 얇은 그리드/우주 효과 */}
          <div className="relative w-full h-40 flex items-center justify-center overflow-visible">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                backgroundSize: '40px 40px, 40px 40px',
                mixBlendMode: 'overlay',
              }}
              aria-hidden
            />
            <Timeline allies={allies} enemies={enemies} maxDistance={10000} />
          </div>
        </div>
      </div>

      {/* 하단: Ally Zone & Command */}
      <div className="py-6 px-8 border-t border-slate-800/60 bg-gradient-to-t from-black/40 to-transparent">
        <div className="max-w-6xl mx-auto flex items-start justify-between gap-6">
          {/* 아군 목록 - 전열/후열 구분 없이 한 줄로 */}
          <div className="flex-1">
            <div className="mb-3 text-sm text-slate-300">아군</div>
            <div className="flex gap-3 mb-4">
              {allies.map((a) => (
                <div key={a.id} className="w-40 p-3 bg-slate-900/40 rounded-xl border border-slate-800 backdrop-blur-sm flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md overflow-hidden ring-2"
                       style={{ borderColor: 'rgba(96,165,250,0.9)' }}>
                    <img src={a.image || '/assets/placeholder-char.png'} alt={a.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{a.name}</div>
                    <div className="text-xs text-slate-400">{a.hp}/{a.maxHp}</div>
                    <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${Math.max(0, Math.min(100, (a.hp / (a.maxHp || 1)) * 100))}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 우측: CP 게이지 및 스킬 버튼 */}
          <div className="w-64 flex flex-col items-center gap-4">
            <div className="w-full p-4 rounded-2xl bg-gradient-to-b from-indigo-900/30 to-purple-900/20 border border-purple-700/20 text-center">
              <div className="text-xs text-slate-300 mb-1">인과력 (CP)</div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" style={{ width: `${Math.max(0, Math.min(100, (cp / (maxCp || 1)) * 100))}%` }} />
              </div>
              <div className="mt-2 text-sm font-mono">{cp}/{maxCp}</div>
            </div>

            <div className="w-full grid grid-cols-2 gap-3">
              <button
                onClick={onSkillPull}
                className="py-2 px-3 rounded-lg text-sm font-semibold text-white hover:brightness-105 transition flex items-center justify-center"
                style={{ background: 'linear-gradient(90deg,#6366f1,#8b5cf6)', boxShadow: '0 6px 18px rgba(107,70,193,0.18)' }}
              >
                Pull
              </button>
              <button
                onClick={onSkillPush}
                className="py-2 px-3 rounded-lg text-sm font-semibold text-white hover:brightness-105 transition flex items-center justify-center"
                style={{ background: 'linear-gradient(90deg,#06b6d4,#7c3aed)', boxShadow: '0 6px 18px rgba(16,185,129,0.06)' }}
              >
                Push
              </button>
              <button
                onClick={onSkillSwap}
                className="py-2 px-3 rounded-lg text-sm font-semibold text-white hover:brightness-105 transition flex items-center justify-center"
                style={{ background: 'linear-gradient(90deg,#7c3aed,#e879f9)', boxShadow: '0 6px 18px rgba(124,58,237,0.14)' }}
              >
                Swap
              </button>
              <button
                onClick={onSkillUlt}
                className="py-2 px-3 rounded-lg text-sm font-semibold text-white hover:brightness-105 transition flex items-center justify-center"
                style={{ background: 'linear-gradient(90deg,#ef4444,#f97316)', boxShadow: '0 6px 18px rgba(249,115,22,0.12)' }}
              >
                Ult
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
