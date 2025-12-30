# StarSeeker Codebase Analysis Report

**Analysis Date:** December 30, 2025  
**Project:** StarSeeker (React-based idle game)  
**Total LOC (src/):** ~7,128 lines

---

## 1. DUMMY/TEMPORARY FILES (CRITICAL - Delete Immediately)

### Files to Delete:

| File | Reason | Priority |
|------|--------|----------|
| [src/components/temp1.txt](src/components/temp1.txt) | Backup of old ObservationScreen component code (296 lines) | **HIGH** |
| [src/components/temp2.txt](src/components/temp2.txt) | Partial JSX/template code fragments (185 lines) | **HIGH** |
| [src/constants.js.backup](src/constants.js.backup) | Old constants definitions (duplicates current constants/elements.js) | **HIGH** |
| [src/data/characters.js.backup](src/data/characters.js.backup) | Old character database (182 lines, replaced by modular structure) | **HIGH** |

**Action:** These files should be deleted immediately - they represent ~661 lines of dead code and could confuse developers about which files are canonical.

---

## 2. CODE STRUCTURE ISSUES

### A. OVERLY LARGE COMPONENTS (Need Refactoring)

#### 1. **ObservationScreen.jsx** (340 lines)
**Priority:** HIGH  
**Issues:**
- Combines viewport rotation logic, observation data management, and battle initiation
- Too many useState hooks (4): `selectedObservation`, `hoveredObservation`, `rotating`, `partyWarning`
- Handles screen transitions, animation timing, and party validation in single component
- Should be split into:
  - `ObservationViewport` (rendering only)
  - `useObservationLogic` (custom hook for state management)
  - `useObservationNavigation` (battle/party screen routing)

**Recommendation:** Extract into 3 separate components and 2 custom hooks.

---

#### 2. **CodexScreen.jsx** (134 lines)
**Priority:** MEDIUM  
**Issues:**
- Manages character selection, tab switching, and breakthrough logic
- The breakthrough handler (lines 41-81) is business logic that should be in a custom hook
- State management: `selectedCharId`, `tab` - consider extracting to `useCodexState` hook
- Currently passes multiple props to child components

**Recommendation:** 
- Extract `useCharacterBreakthrough()` hook for breakthrough logic
- Create `useCodexState()` hook for tab and selection state
- Simplify component to pure presentation logic

---

#### 3. **ProfileModal.jsx** (81 lines)
**Priority:** LOW  
**Issues:**
- Has duplicate state management (`showTitleSelector`) - also exists in `profile/TitleSelector.jsx` (line 6)
- Both ProfileModal and TitleSelector manage the same state independently
- Could cause sync issues if both get updated separately

**Recommendation:** 
- Remove `showTitleSelector` state from ProfileModal
- Pass it as a prop from the modal's parent
- Keep state only in TitleSelector subcomponent

---

### B. DUPLICATE/REDUNDANT FUNCTIONS

#### 1. **Rarity Style Functions Duplication**
**Priority:** MEDIUM  
**Issue:** Two versions of rarity style getter exist:
- [src/utils/styleHelpers/rarityStyles.js](src/utils/styleHelpers/rarityStyles.js): `getRarityClasses()` (used in components)
- [src/data/titles.js#L58](src/data/titles.js#L58): `getRarityStyles()` (different implementation)

**Impact:** 
- `src/data/playerStats.js` imports `getRarityStyles` from `titles.js`
- Components use `getRarityClasses` from `styleHelpers`
- Two similar functions doing overlapping work creates confusion

**Recommendation:** 
- Keep only `getRarityClasses()` in styleHelpers
- Remove `getRarityStyles()` from titles.js
- Update imports accordingly

---

#### 2. **Modal Background Pattern Duplication**
**Priority:** LOW  
**Files:**
- [ProfileModal.jsx](src/components/ProfileModal.jsx#L15): Uses `<ModalBackground onClick={onClose} />`
- [GachaResultModal.jsx](src/components/GachaResultModal.jsx#L18): Uses hardcoded `bg-black/80 backdrop-blur-sm`

**Issue:** Different implementations of modal overlays
- ProfileModal uses shared component
- GachaResultModal has inline styles

**Recommendation:** Ensure both use `<ModalBackground>` consistently.

---

### C. MIXED RESPONSIBILITIES (Single Responsibility Violations)

#### 1. **useGameLogic Hook** (107 lines)
**Priority:** HIGH  
**Issue:** Kitchen-sink hook that manages TOO MANY concerns:
- Screen state management
- Inventory (character + items)
- Party formation
- Player info & stats
- Achievements
- Battle system
- Gacha system
- Bond system
- Toast messages
- Synergies
- Exp management

**Current Structure:**
```javascript
- useBattleSystem()
- useSynergy()
- useGacha()
- useLevelSync()
- useBondSystem()
```

**Problem:** This violates the "composition over complex inheritance" principle. Too much to maintain in one hook.

**Recommendation:**
1. Split into domain-specific hooks:
   - `usePlayerProgress()` - handles level, exp, stats
   - `useCharacterInventory()` - handles inventory management
   - Existing hooks already separated (battle, gacha, etc.) ✓ (good!)
2. Keep `useGameLogic()` as a thin orchestration layer
3. Pass individual hooks' returns to App instead of merging all state

**Estimated Lines to Refactor:** ~30-40 lines of state consolidation logic

---

#### 2. **Battle Utilities** 
**Files:** [src/utils/battle/](src/utils/battle/)
**Issue:** Business logic mixed with utils
- `turnLogic.js` (88 lines) contains game rules that should be in hooks
- Should be part of `useBattleSystem` or `useBattleController`

---

### D. DATA MANAGEMENT ISSUES

#### 1. **Constants Organization Issues**
**Priority:** LOW  
**Issue:** Constants split across multiple locations:
- [src/constants/index.js](src/constants/index.js) - exports from 3 files
- [src/constants/elements.js](src/constants/elements.js)
- [src/constants/synergies.js](src/constants/synergies.js)
- [src/constants/gameConfig.js](src/constants/gameConfig.js)
- Also: `GARDEN_CONFIG`, `BENCH_CONFIG` hardcoded in [GardenScreen.jsx](src/components/GardenScreen.jsx#L6-L19)
- Also: `LENS_CONFIG`, `OBS_ANIM` in [utils/screenConfig.js](src/utils/screenConfig.js)

**Recommendation:**
- Move `GARDEN_CONFIG` to `src/constants/gameConfig.js`
- Create `src/constants/screenConfig.js` for `LENS_CONFIG`, `OBS_ANIM`
- This consolidates game config in one place

---

#### 2. **Redundant Data Files**
**Priority:** MEDIUM  
**Issue:** Character data split across 5 files:
- [characterData.js](src/data/characters/characterData.js) (111 lines) - base stats
- [skillData.js](src/data/characters/skillData.js) (163 lines) - skills
- [profileData.js](src/data/characters/profileData.js) (79 lines) - profiles
- [bondLevels.js](src/data/characters/bondLevels.js) - bond system
- [index.js](src/data/characters/index.js) - aggregation logic

**Trade-off:** While modular, this creates cognitive overhead. Accessing one character requires reading 3+ files.

**Recommendation:** Consider keeping the split (modular is good), but add clear documentation in index.js showing the data flow.

---

#### 3. **Backup Files in Data**
**Status:** Already identified in Section 1 (delete backup files)

---

### E. UNUSED/QUESTIONABLE IMPORTS

#### 1. **BattleScreen.jsx**
**Current Line 1-6:**
```javascript
import React, { useEffect } from 'react';
// ... imports
```

**Check:** Only `useEffect` is used (for side effects). Proper usage ✓

---

#### 2. **StatusBar.jsx** 
**Uses:** `useState`, `useMemo` - both are used ✓

---

#### 3. **Components importing full CHAR_DB**
**Files affected:**
- [CodexScreen.jsx](src/components/CodexScreen.jsx#L2): `import { CHAR_DB }`
- [PartyScreen.jsx](src/components/PartyScreen.jsx) - via inventory
- [GardenScreen.jsx](src/components/GardenScreen.jsx)

**Issue:** When you only need one character, importing entire DB wastes resources.

**Recommendation:** No change needed (data size is small), but consider selector functions if app grows:
```javascript
// Better approach if CHAR_DB grows:
export const getCharacterById = (id) => CHAR_DB.find(c => c.id === id);
```

---

## 3. COMPONENT ORGANIZATION ASSESSMENT

### A. Nesting Depth Analysis

| Component | Depth | Status |
|-----------|-------|--------|
| App → HomeScreen | 1 | ✓ Healthy |
| App → PartyScreen → PartyFormation → PartySlot | 4 | ✓ Acceptable |
| App → CodexScreen → CharacterInfoTab → ... | 4 | ✓ Acceptable |
| App → ObservationScreen → ObservationBody | 3 | ✓ Healthy |

**Finding:** No excessive nesting. Max depth of 4 is reasonable. ✓

---

### B. Component Subdivision Opportunities

#### 1. **BattleScreen.jsx (77 lines)**
**Current Structure:**
```
BattleScreen
├── BossDisplay
├── BattleLog
├── AllyCard (× N)
├── BattleControls
```

**Assessment:** Well-subdivided ✓

---

#### 2. **InventoryScreen.jsx (90 lines)**
**Current Structure:**
```
InventoryScreen
├── ItemCard (× N)
├── ItemDetailModal
├── InventoryEmptyState
```

**Assessment:** Good separation ✓

---

#### 3. **CodexScreen.jsx - Subcomponents**
**Current Structure:**
```
CodexScreen
├── CharacterList
├── CharacterHeader
├── CharacterInfoTab
├── CharacterProfileTab
└── Tabs system
```

**Issue:** The tab-switching logic should be extracted
**Recommendation:** Create `useCharacterTabs()` hook to manage tab state

---

## 4. HOOK ORGANIZATION REVIEW

### Current Hook Files:

| Hook | Purpose | Size | Assessment |
|------|---------|------|------------|
| [useGameLogic.js](src/hooks/useGameLogic.js) | **TOO LARGE** - Main orchestrator | 107 lines | ⚠️ Needs split |
| [useBattleController.js](src/hooks/useBattleController.js) | Battle mechanics | 99 lines | ✓ Good focus |
| [useBattleState.js](src/hooks/useBattleState.js) | Battle state mgmt | 51 lines | ✓ Good |
| [useBattleSystem.js](src/hooks/useBattleSystem.js) | Battle setup | 28 lines | ✓ Good |
| [useBattleAutoMode.js](src/hooks/useBattleAutoMode.js) | Auto-play logic | 25 lines | ✓ Good |
| [useGacha.js](src/hooks/useGacha.js) | Gacha mechanics | 82 lines | ✓ Good |
| [useBondSystem.js](src/hooks/useBondSystem.js) | Relationship system | 65 lines | ✓ Good |
| [useSynergy.js](src/hooks/useSynergy.js) | Synergy calculations | 29 lines | ✓ Good |
| [useLevelSync.js](src/hooks/useLevelSync.js) | Level sync logic | 84 lines | ✓ Good |
| [useAutoParty.js](src/hooks/useAutoParty.js) | Auto party formation | 53 lines | ✓ Good |
| [usePartyAssignment.js](src/hooks/usePartyAssignment.js) | Party slot management | 32 lines | ✓ Good |

**Opportunities for New Hooks:**
1. `usePlayerProgress()` - extract exp/level management from useGameLogic
2. `useInventoryState()` - separate character inventory management
3. `useCharacterBreakthrough()` - extract from CodexScreen
4. `useObservationLogic()` - extract from ObservationScreen
5. `useCodexState()` - tab/selection state for CodexScreen

---

## 5. PRIORITY ACTION ITEMS

### 🔴 HIGH PRIORITY (Do First)

| # | Task | Impact | Effort | Files |
|---|------|--------|--------|-------|
| 1 | **Delete backup files** | Clean up dead code (661 lines) | 2 min | temp1.txt, temp2.txt, 2 × .backup |
| 2 | **Split useGameLogic.js** | Reduce complexity from 107→60 lines | 1 hour | useGameLogic.js + create 1-2 new hooks |
| 3 | **Refactor ObservationScreen** | Reduce from 340→200 lines | 1.5 hours | ObservationScreen.jsx + create hooks |
| 4 | **Fix duplicate rarity functions** | Single source of truth | 30 min | rarityStyles.js, titles.js |

### 🟡 MEDIUM PRIORITY

| # | Task | Impact | Effort | Files |
|---|------|--------|--------|-------|
| 5 | **Extract CodexScreen logic** | Better testability, reusability | 1 hour | CodexScreen.jsx + hooks |
| 6 | **Consolidate constants** | Single location for game config | 45 min | constants/, GardenScreen.jsx |
| 7 | **Create business logic hooks** | Move from utilities to hooks | 1 hour | useBattleSystem.js, new hooks |

### 🟢 LOW PRIORITY

| # | Task | Impact | Effort | Files |
|---|------|--------|--------|-------|
| 8 | **ProfileModal state cleanup** | Remove duplicate state | 15 min | ProfileModal.jsx, TitleSelector.jsx |
| 9 | **Add component documentation** | Improve onboarding | 1 hour | Add JSDoc comments |

---

## 6. SUMMARY STATISTICS

```
Total Source Files:     ~50 files
Total LOC:              ~7,128 lines
Dead Code:              ~661 lines (9.3%) - temp files + backups
Components:             ~25 JSX files
Custom Hooks:           11 hooks
Data Files:             ~12 files
Utilities:              ~8 files

Code Quality Issues:
- Dead code (backups):  4 files
- Duplicate functions:  2 instances
- Over-sized components: 3 components
- Mixed responsibilities: 1 major hook
- Unused state duplication: 1 instance
```

---

## 7. REFACTORING ROADMAP

### Phase 1: Cleanup (1-2 hours)
1. Delete backup & temp files
2. Remove duplicate rarity functions
3. Fix modal state duplication

### Phase 2: Hook Organization (2-3 hours)
1. Split useGameLogic into 2-3 focused hooks
2. Create usePlayerProgress hook
3. Create useCharacterBreakthrough hook

### Phase 3: Component Refactoring (3-4 hours)
1. Split ObservationScreen into 2 components + hook
2. Extract CodexScreen logic into hooks
3. Add proper prop drilling / context if needed

### Phase 4: Constants Consolidation (1 hour)
1. Move hardcoded configs to constants
2. Reorganize screen config

**Total Estimated Refactoring Time:** 8-10 hours

---

## 8. SPECIFIC CODE EXAMPLES & LINE RANGES

### Example 1: ObservationScreen Refactoring
**Current:** [src/components/ObservationScreen.jsx](src/components/ObservationScreen.jsx#L15-L18) (lines 15-18)
```javascript
const [selectedObservation, setSelectedObservation] = useState(null);
const [hoveredObservation, setHoveredObservation] = useState(null);
const [rotating, setRotating] = useState(false);
const [partyWarning, setPartyWarning] = useState(false);
```

**Proposed:** Extract to custom hook
```javascript
// useObservationLogic.js
export const useObservationLogic = (party) => {
  const [selectedObservation, setSelectedObservation] = useState(null);
  const [hoveredObservation, setHoveredObservation] = useState(null);
  const [rotating, setRotating] = useState(false);
  const [partyWarning, setPartyWarning] = useState(false);
  // ... handlers
  return { selectedObservation, hoveredObservation, rotating, partyWarning, handlers };
};
```

---

### Example 2: CodexScreen Tab Logic Extraction
**Current:** [src/components/CodexScreen.jsx](src/components/CodexScreen.jsx#L13-L14) (lines 13-14)
```javascript
const [selectedCharId, setSelectedCharId] = useState(CHAR_DB[0].id);
const [tab, setTab] = useState('INFO');
```

**Proposed:** Custom hook
```javascript
// useCodexState.js
export const useCodexState = () => {
  const [selectedCharId, setSelectedCharId] = useState(CHAR_DB[0].id);
  const [tab, setTab] = useState('INFO');
  return { selectedCharId, setSelectedCharId, tab, setTab };
};
```

---

### Example 3: useGameLogic Consolidation
**Current:** [src/hooks/useGameLogic.js](src/hooks/useGameLogic.js#L24-L30) (return statement)
```javascript
return {
  screen, setScreen,
  inventory, setInventory,
  party, setParty,
  // ... 10+ more items
};
```

**Issue:** Too many return values (20+). Should be:
```javascript
return {
  navigation: { screen, setScreen },
  game: { inventory, setInventory, party, setParty, items, setItems },
  player: { playerInfo, setPlayerInfo, playerStats },
  systems: { battleSystem, activeSynergies, handleGacha },
  // etc.
};
```

---

## 9. FILE DELETION CHECKLIST

Use this command to delete all dummy files:
```bash
rm /workspaces/starseeker/star-seeker/src/components/temp1.txt
rm /workspaces/starseeker/star-seeker/src/components/temp2.txt
rm /workspaces/starseeker/star-seeker/src/constants.js.backup
rm /workspaces/starseeker/star-seeker/src/data/characters.js.backup
```

**Verify:**
```bash
find /workspaces/starseeker/star-seeker/src -name "*.backup" -o -name "temp*.txt"
# Should return nothing if successful
```

---

## 10. ADDITIONAL OBSERVATIONS

### Positive Patterns ✓
1. **Good hook separation** - Battle system, gacha, bond, synergy all in separate hooks
2. **Modular data structure** - Character data split logically (base, skills, profiles)
3. **Component prop drilling is clean** - Mostly following React best practices
4. **Tailwind usage** - Consistent and well-organized
5. **Utility functions** - Good separation (battle logic, helpers, styles)

### Areas for Future Improvement
1. Consider Context API or state management library if prop drilling increases
2. Add ESLint rule to catch unused imports/exports
3. Document public API of each custom hook
4. Add component.stories.js files for UI components
5. Consider splitting App.jsx rendering logic into separate layout components

---

**Report Generated:** December 30, 2025  
**Analyzer:** GitHub Copilot  
**Status:** Ready for Implementation
