/**
 * 게임 내 고유 명사 및 용어 정의 (Game Nomenclature)
 * ============================================================
 * 게임 내에서 사용되는 모든 고유 명사, 시스템, 아이템, 개념 등의 정의와 설명을 한 곳에 모아둔 파일입니다.
 * 코드 가독성 향상, 게임 설정 문서화, 그리고 개발자 간 용어 통일을 목적으로 합니다.
 * 
 * 구성:
 * - 아이템 & 재화 (Items & Currency)
 * - 게임 시스템 (Game Systems)
 * - 화면 & 기능 (Screens & Features)
 * - 게임 메커닉 (Game Mechanics)
 */

/**
 * ======= 아이템 & 재화 (Items & Currency) =======
 */

/**
 * 성석 (Starstone)
 * ID: 'gold'
 * - 게임의 기본 통화
 * - 상점에서 각종 아이템, 스킬 업그레이드 등을 구매할 때 사용
 * - 전투 승리, 던전 클리어 등 다양한 활동으로 획득
 * - 게임 경제의 중심축
 */
export const STARSTONE = {
  id: 'gold',
  name: '성석',
  type: 'currency',
};

/**
 * 기억 추출물 (Memory Extract)
 * ID: 'exp_chip'
 * - 응축된 기억의 파편
 * - 캐릭터의 경험치를 올리는 데 사용되는 소비 아이템
 * - 1개당 200 경험치 제공
 * - "기억 추출" 던전을 클리어하면 획득
 * - 캐릭터 성장(레벨업)의 핵심 재료
 */
export const MEMORY_EXTRACT = {
  id: 'exp_chip',
  name: '기억 추출물',
  type: 'consumable',
};

/**
 * 별의 파편 (Star Fragment)
 * ID: 'star_fragment'
 * - 별의 에너지가 응축된 파편
 * - 캐릭터의 스킬 레벨을 올리는 데 필요한 소비 아이템
 * - "성흔 추출" 던전을 클리어하면 획득
 * - 스킬 업그레이드 시스템의 핵심 재료
 */
export const STAR_FRAGMENT = {
  id: 'star_fragment',
  name: '별의 파편',
  type: 'material',
};

/**
 * 별의 결정 (Star Crystal / Gem)
 * ID: 'gems'
 * - 신비로운 결정 형태의 프리미엄 재화
 * - 가챠(뽑기)를 돌릴 때 사용
 * - 1회 뽑기에 100개, 10회 뽑기에 1000개 필요
 * - 현금결제로도 획득 가능한 게임 내 프리미엄 통화
 */
export const GEM = {
  id: 'gems',
  name: '별의 결정',
  type: 'premium_currency',
};

/**
 * ======= 게임 시스템 (Game Systems) =======
 */

/**
 * 성장 시스템 (Leveling System)
 * - 캐릭터의 경험치(Exp)를 사용하여 레벨을 올리는 핵심 시스템
 * - 기억 추출물(경험치 칩)을 사용하여 경험치를 획득
 * - 레벨이 올라가면 공격력, 체력, 방어력 등 스탯이 증가
 * - 각 캐릭터마다 돌파 단계에 따른 최대 레벨 제한이 있음
 */
export const LEVELING_SYSTEM = {
  name: '성장 시스템',
  description: '기억 추출물을 사용하여 캐릭터 레벨을 올리는 시스템',
};

/**
 * 돌파 시스템 (Breakthrough / Ascension System)
 * - 캐릭터의 레벨 한계를 넘기는 강화 시스템
 * - 최대 3단계까지 돌파 가능 (0 → 1 → 2 → 3)
 * - 돌파 시마다 최대 레벨이 상향됨 (Lv.20 → 30 → 40 → 60)
 * - 돌파에 필요한 재료: 별의 조각(Element-specific), 성석(gold)
 * - 돌파할 때마다 공격력, 체력, 방어력 추가 보너스 획득
 */
export const BREAKTHROUGH_SYSTEM = {
  name: '돌파 시스템',
  description: '레벨 한계를 뛰어넘어 캐릭터를 더욱 강화하는 시스템',
};

/**
 * 스킬 업그레이드 시스템 (Skill Enhancement System)
 * - 캐릭터의 스킬 레벨을 올려 성능을 향상시키는 시스템
 * - 필요한 재료: 별의 파편(Star Fragment)
 * - 각 스킬마다 독립적으로 레벨업 가능
 * - 스킬 레벨이 올라가면 데미지, 범위, 효과 등이 개선됨
 */
export const SKILL_UPGRADE_SYSTEM = {
  name: '스킬 업그레이드 시스템',
  description: '별의 파편을 사용하여 스킬 성능을 향상시키는 시스템',
};

/**
 * 인연도 시스템 (Bond System / Affinity System)
 * - 플레이어와 캐릭터 간의 관계 깊이를 나타내는 시스템
 * - 정원(Garden)에서 캐릭터와 상호작용하여 인연도 증가
 * - 전투에서 캐릭터를 사용하면 자동으로 인연도 증가
 * - 높은 인연도는 캐릭터의 성능 향상이나 특수 스토리 해제 등으로 이어짐
 */
export const BOND_SYSTEM = {
  name: '인연도 시스템',
  description: '캐릭터와의 관계를 나타내고 강화하는 시스템',
};

/**
 * 자원 추출 시스템 (Resource Extraction System)
 * - 다양한 던전을 클리어하여 게임 진행에 필요한 자원을 획득하는 시스템
 * - 세 가지 카테고리: 기억 추출, 성석 추출, 성흔 추출
 * - 각 던전의 난이도에 따라 획득량과 요구 전투력이 다름
 */
export const EXTRACTION_SYSTEM = {
  name: '자원 추출 시스템',
  description: '던전을 클리어하여 성장에 필요한 자원을 획득하는 시스템',
};

/**
 * ======= 던전 & 콘텐츠 (Dungeons & Content) =======
 */

/**
 * 기억 추출 (Memory Extraction)
 * - 게임의 자원 추출 시스템 중 하나
 * - 클리어하면 기억 추출물(경험치 칩)을 획득
 * - 난이도: I (Lv5), II (Lv15), III (Lv25)
 * - 캐릭터 성장을 위한 경험치 재료 파밍 던전
 */
export const MEMORY_EXTRACTION_DUNGEON = {
  key: 'MEMORY',
  name: '기억 추출',
  subtitle: '경험치 재료 확보',
};

/**
 * 성석 추출 (Starstone Extraction)
 * - 게임의 자원 추출 시스템 중 하나
 * - 클리어하면 성석(게임 통화)을 획득
 * - 난이도: I (Lv5), II (Lv18), III (Lv30)
 * - 상점 구매 등에 필요한 성석을 파밍하는 던전
 */
export const STARSTONE_EXTRACTION_DUNGEON = {
  key: 'STARSTONE',
  name: '성석 추출',
  subtitle: '성석(골드) 수급',
};

/**
 * 성흔 추출 (Stigma Extraction)
 * - 게임의 자원 추출 시스템 중 하나
 * - 클리어하면 별의 파편(스킬 업그레이드 재료)을 획득
 * - 난이도: I (Lv10), II (Lv22), III (Lv35)
 * - 스킬 업그레이드에 필요한 별의 파편을 파밍하는 던전
 */
export const STIGMA_EXTRACTION_DUNGEON = {
  key: 'STIGMA',
  name: '성흔 추출',
  subtitle: '스킬 재료 파밍',
};

/**
 * ======= 화면 & 기능 (Screens & Features) =======
 */

/**
 * 우주 망원경 (Cosmos Telescope / Observatory)
 * 화면 키: 'OBSERVATION'
 * - 게임의 메인 콘텐츠 진입점
 * - 다양한 관측(전투) 미션이 배열된 마스터 스크린
 * - 각 관측 지점(스테이지)을 선택하여 전투 시작
 * - 좌측 리스트: 관측 가능한 이상 현상들
 * - 우측 렌즈: 선택된 이상 현상의 상세 정보 및 시각적 표현
 */
export const OBSERVATION_SCREEN = {
  key: 'OBSERVATION',
  name: '우주 망원경',
  description: '다양한 이상 현상을 관측하고 대응하는 메인 콘텐츠 화면',
};

/**
 * 자원 추출 (Resource Extraction)
 * 화면 키: 'EXTRACTION'
 * - 자원 추출 시스템의 UI 진입점
 * - 세 가지 추출 던전 카테고리 탭 제공
 * - 던전의 난이도별 스테이지 리스트 표시
 * - "추출 시작" 버튼으로 전투 진입
 */
export const EXTRACTION_SCREEN = {
  key: 'EXTRACTION',
  name: '자원 추출',
  description: '던전을 선택하여 자원을 획득하는 화면',
};

/**
 * 정원 (Garden)
 * 화면 키: 'GARDEN'
 * - 보유 중인 캐릭터들과 상호작용하는 휴식 공간
 * - 캐릭터와의 대화를 통해 인연도 증가
 * - 캐릭터의 개인 스토리나 배경 정보 확인 가능
 */
export const GARDEN_SCREEN = {
  key: 'GARDEN',
  name: '정원',
  description: '캐릭터와 상호작용하여 인연도를 높이는 화면',
};

/**
 * 가챠 / 소집 (Gacha / Summoning)
 * 화면 키: 'GACHA'
 * - 별의 결정(gems)을 사용하여 캐릭터를 뽑는 화면
 * - 1회 뽑기와 10회 뽑기 제공
 * - 다양한 레어리티의 캐릭터 확보 가능
 */
export const GACHA_SCREEN = {
  key: 'GACHA',
  name: '소집',
  description: '별의 결정을 사용하여 캐릭터를 소집하는 화면',
};

/**
 * 관리 / 도감 (Codex / Character Management)
 * 화면 키: 'CODEX'
 * - 보유 캐릭터의 상세 정보 확인 및 관리
 * - 캐릭터 성장(레벨업), 스킬 업그레이드, 돌파 등 강화 기능 제공
 * - 캐릭터의 스탯, 스킬, 필살기 정보 표시
 */
export const CODEX_SCREEN = {
  key: 'CODEX',
  name: '관리',
  description: '캐릭터의 성장과 강화를 관리하는 화면',
};

/**
 * 창고 (Inventory)
 * 화면 키: 'INVENTORY'
 * - 보유한 모든 아이템, 재화의 목록 표시
 * - 아이템 정렬 및 필터링 기능
 * - 각 아이템의 사용처 안내
 */
export const INVENTORY_SCREEN = {
  key: 'INVENTORY',
  name: '창고',
  description: '보유한 아이템과 재화를 관리하는 화면',
};

/**
 * 편성 (Party Management)
 * 화면 키: 'PARTY'
 * - 전투에 출전할 캐릭터 4명 선택 및 배치
 * - 각 캐릭터의 현재 스탯과 스킬 확인
 * - 전투 전 최종 점검 화면
 */
export const PARTY_SCREEN = {
  key: 'PARTY',
  name: '편성',
  description: '전투에 출전할 파티를 구성하는 화면',
};

/**
 * ======= 게임 메커닉 (Game Mechanics) =======
 */

/**
 * 관측 (Observation / Combat Mission)
 * - 게임의 전투 콘텐츠를 "관측"이라는 세계관 내 개념으로 표현
 * - 각 관측은 이상 현상(적)과의 전투를 의미
 * - 성공하면 승리 보상 획득
 */
export const OBSERVATION_MECHANIC = {
  name: '관측',
  description: '이상 현상(적)과의 전투를 게임 내 "관측" 개념으로 표현',
};

/**
 * 인과 연산 (Causal Operation / Mission Type)
 * - 전투의 미션 타입을 결정하는 시스템
 * - 두 가지 종류: 혼돈(CHAOS), 침묵(SILENCE)
 * - 각 미션 타입에 따라 승리 조건과 게임 플레이 방식이 다름
 */
export const CAUSAL_OPERATION = {
  name: '인과 연산',
  description: '전투의 미션 타입을 결정하는 시스템 (혼돈 vs 침묵)',
};

/**
 * 혼돈 (Chaos)
 * - 인과 연산의 첫 번째 미션 타입
 * - 일반적인 전투 방식
 */
export const CHAOS_MISSION = {
  id: 'CHAOS',
  name: '혼돈',
  description: '표준 전투 방식',
};

/**
 * 침묵 (Silence)
 * - 인과 연산의 두 번째 미션 타입
 * - 특별한 게임 규칙이 적용될 수 있는 전투 방식
 */
export const SILENCE_MISSION = {
  id: 'SILENCE',
  name: '침묵',
  description: '특별 규칙이 적용되는 전투 방식',
};

/**
 * 속성 (Element / Attribute)
 * - 캐릭터와 적이 가지는 5가지 속성
 * - 속성 간 상성 관계가 존재하여 전투에 영향을 미침
 * - 속성: 혼돈(CHAOS), 정체(STASIS), 중력(GRAVITY), 공명(RESONANCE), 역설(PARADOX), 공리(AXIOM)
 */
export const ELEMENT_MECHANIC = {
  name: '속성',
  description: '캐릭터와 적이 가진 5가지 속성으로 상성을 결정',
};

/**
 * ======= 참고사항 (Notes) =======
 * 
 * 1. 이 파일은 게임의 용어 사전 역할을 합니다.
 *    새로운 시스템이나 아이템이 추가되면 해당 정의를 여기에 추가하세요.
 * 
 * 2. 각 항목의 이름은 게임 내 공식 표기명을 따릅니다.
 * 
 * 3. 개발자 간 용어 통일을 위해 이 파일을 참고하며 코드를 작성하는 것이 권장됩니다.
 * 
 * 4. 플레이어 교육 및 게임 설정 문서화에도 활용될 수 있습니다.
 */
