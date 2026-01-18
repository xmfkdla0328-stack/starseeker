import React from "react";
import PropTypes from "prop-types";
import seoJuMokBack from "../../assets/images/characters/seo_ju_mok.png";

/**
 * 활성 유닛이 서주목일 때 뒷모습 이미지를 AllyZone 중앙 하단에 띄우는 컴포넌트
 * @param {string} activeUnitId - 현재 활성 유닛의 id
 */
const ActiveUnitBackView = ({ activeUnitId }) => {
  // 서주목의 id는 실제로 숫자 1임
  if (activeUnitId !== 1) return null;

  return (
    <div
      className="absolute left-1/2 bottom-0 translate-x-[-50%] z-30 pointer-events-none select-none"
      style={{ width: "320px", height: "480px" }}
    >
      <img
        src={seoJuMokBack}
        alt="서주목 뒷모습"
        className="w-full h-full object-contain drop-shadow-2xl"
        draggable={false}
      />
    </div>
  );
};

ActiveUnitBackView.propTypes = {
  activeUnitId: PropTypes.string.isRequired,
};

export default ActiveUnitBackView;
