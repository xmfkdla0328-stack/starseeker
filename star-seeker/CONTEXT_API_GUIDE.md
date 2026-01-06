# Context API 구조 설명서

## 개요

React Context API를 사용하여 prop drilling을 제거하고 상태 관리를 모듈화했습니다. 

## 구조

```
src/context/
├── GameContext.jsx       # 3가지 Context 정의 + GameContextProvider
└── useGameContext.js     # 3가지 Context를 소비하는 커스텀 훅
```

## 3가지 Context

### 1. PlayerContext
플레이어 정보, 통계, 업적, 타이틀 관리

```jsx
{
  playerInfo,              // { nickname, level, exp, selectedTitle, ... }
  setPlayerInfo,           // 상태 업데이트 함수
  playerStats,             // { totalBattles, totalWins, ... }
  setPlayerStats,          // 상태 업데이트 함수
  unlockedAchievements,    // 해금된 업적 배열
  setUnlockedAchievements, // 상태 업데이트 함수
  handleSelectTitle,       // (titleId) => void
  addExp,                  // (expAmount) => void
}
```

### 2. InventoryContext
캐릭터 인벤토리, 메인 캐릭터, 재화, 가챠, 파티, 인연도

```jsx
{
  inventory,               // 캐릭터 배열
  setInventory,            // 상태 업데이트 함수
  items,                   // { gems, stardust, star_fragment_*, ... }
  setItems,                // 상태 업데이트 함수
  mainChar,                // 현재 메인 캐릭터
  setMainChar,             // 상태 업데이트 함수
  handleGacha,             // (count) => gachaResults
  party,                   // { members: [null, null, null, null] }
  setParty,                // 상태 업데이트 함수
  increaseBondFromBattle,  // () => void
}
```

### 3. UIContext
화면 전환, 토스트 메시지

```jsx
{
  screen,      // 현재 화면 ('HOME', 'PARTY', 'BATTLE', 'PROFILE', ...)
  setScreen,   // (screenName) => void
  toast,       // 현재 토스트 메시지 문자열 또는 null
  showToast,   // (message) => void - 3초 자동 해제
}
```

## 사용 방법

### 1. App.jsx에서 Provider로 감싸기

```jsx
import { GameContextProvider } from './context/GameContext';

export default function StarSeekerApp() {
  return (
    <GameContextProvider>
      <StarSeekerAppContent />
    </GameContextProvider>
  );
}
```

### 2. 컴포넌트에서 Context 소비하기

#### 전체 데이터가 필요한 경우
```jsx
import { usePlayer, useInventory, useUI } from '../context/useGameContext';

export const MyComponent = () => {
  const { playerInfo, addExp } = usePlayer();
  const { inventory, mainChar } = useInventory();
  const { screen, setScreen, showToast } = useUI();

  // 이제 props로 전달받을 필요가 없다!
  return (
    <div>
      <p>Level: {playerInfo.level}</p>
      <button onClick={() => addExp(100)}>Gain Exp</button>
      <button onClick={() => setScreen('HOME')}>Go Home</button>
    </div>
  );
};
```

#### 특정 데이터만 필요한 경우
```jsx
import { useUI } from '../context/useGameContext';

export const NavButton = () => {
  const { setScreen } = useUI();

  return (
    <button onClick={() => setScreen('PROFILE')}>Profile</button>
  );
};
```

## 마이그레이션 예시

### Before (Props Drilling)
```jsx
// App.jsx
<BattleScreen 
  partyData={party.members.filter(c => c !== null)}
  enemyData={enemyData}
  setScreen={setScreen}
  handleAttackResult={handleAttackResult}
  missionType={missionType}
/>

// BattleScreen.jsx
export const BattleScreen = ({ partyData, enemyData, setScreen, handleAttackResult, missionType }) => {
  // setScreen 사용
  const handleRetreat = () => {
    setScreen('HOME');
  };
};
```

### After (Context API)
```jsx
// App.jsx
<BattleScreen 
  partyData={party.members.filter(c => c !== null)}
  enemyData={enemyData}
  missionType={missionType}
/>

// BattleScreen.jsx
import { useUI, usePlayer } from '../context/useGameContext';

export const BattleScreen = ({ partyData, enemyData, missionType }) => {
  const { setScreen } = useUI();
  const { addExp } = usePlayer();

  const handleRetreat = () => {
    setScreen('HOME');
  };

  const handleBattleWin = () => {
    addExp(100);
  };
};
```

## 호출 흐름

```
GameContextProvider
├── useSceneManager() → UIContext
├── usePlayerSystem() → PlayerContext
├── useInventorySystem() → InventoryContext
│   └── useGacha() (내부)
├── useLevelSync() (의존성: playerInfo, inventory, party)
├── useBondSystem() (의존성: inventory, party, screen)
├── useBattleSystem() (향후 확장)
└── useSynergy() (향후 확장)
```

## 주의사항

1. **반드시 GameContextProvider 내부에서 사용**
   - Provider 외부에서 Context 훅을 호출하면 에러 발생

2. **의존성 관계**
   - useLevelSync는 playerInfo와 inventory 모두 필요하므로, 두 Context를 모두 포함하는 곳에서 관리
   - 이 때문에 GameContextProvider가 전체 훅을 조합함

3. **성능 최적화**
   - 필요한 Context만 import하여 리렌더링 최소화
   - Context 값이 변경되면 해당 Context를 사용하는 모든 컴포넌트가 리렌더링됨

## 향후 확장

- `useBattleSystem`: 전투 시스템 로직 추가 가능
- `useSynergy`: 시너지 시스템 로직 추가 가능
- 필요한 경우 추가 Context 생성 가능 (예: `SoundContext`, `SettingsContext`)

## 파일 목록

- `src/context/GameContext.jsx`: 3가지 Context + Provider
- `src/context/useGameContext.js`: 3가지 커스텀 훅
- `src/hooks/useSceneManager.js`: 화면/토스트 관리
- `src/hooks/usePlayerSystem.js`: 플레이어 데이터 관리
- `src/hooks/useInventorySystem.js`: 인벤토리/가챠 관리
- `src/hooks/useGameLogic.js`: 루트 조합 훅 (더이상 사용 안 함, 필요시 삭제 가능)
