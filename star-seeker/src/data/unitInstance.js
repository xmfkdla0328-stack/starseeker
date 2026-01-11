// Star Seeker 전투 유닛 인스턴스 구조
// 각 전투마다 캐릭터 베이스 데이터를 복사해 생성

export class UnitInstance {
  constructor(baseData, options = {}) {
    // 캐릭터 베이스 데이터 복사
    this.id = baseData.id;
    this.name = baseData.name;
    this.rarity = baseData.rarity;
    this.element = baseData.element;
    this.role = baseData.role;
    this.portrait = baseData.portrait;
    this.baseAtk = baseData.baseAtk;
    this.baseHp = baseData.baseHp;
    this.baseSpd = baseData.baseSpd;
    this.baseDef = baseData.baseDef;
    this.effectHitRate = baseData.effectHitRate;
    this.effectResist = baseData.effectResist;
    this.desc = baseData.desc;
    this.tags = baseData.tags;

    // 전투 중 변동값
    this.currentHp = baseData.baseHp;
    this.currentEp = 0; // 필살기 게이지
    // ...existing code...
    this.position = options.position || 10000; // 타임라인 거리 (기본: 미래)
    this.isAlly = options.isAlly ?? true; // 아군/적군 구분
    this.statusEffects = []; // 상태이상 목록
    this.equipment = options.equipment || []; // 장비(모듈) 목록
    this.skills = options.skills || []; // 스킬 목록
    this.ultimateReady = false; // 필살기 사용 가능 여부
    this.isDead = false;
  }

  // HP/EP 등 실시간 변동 메서드 예시
  takeDamage(amount) {
    this.currentHp = Math.max(0, this.currentHp - amount);
    if (this.currentHp === 0) this.isDead = true;
  }

  heal(amount) {
    if (!this.isDead) {
      this.currentHp = Math.min(this.baseHp, this.currentHp + amount);
    }
  }

  gainEp(amount) {
    this.currentEp = Math.min(100, this.currentEp + amount);
    if (this.currentEp === 100) this.ultimateReady = true;
  }

  useUltimate() {
    if (this.ultimateReady) {
      this.currentEp = 0;
      this.ultimateReady = false;
      // 필살기 효과는 외부에서 처리
    }
  }

  // ...existing code...

  // 기타 상태이상, 장비, 스킬 등은 추후 확장
}

// 사용 예시:
// import { CHARACTER_BASE_DATA } from './characters/characterData';
// const unit = new UnitInstance(CHARACTER_BASE_DATA[0], { isAlly: true, position: 10000 });
