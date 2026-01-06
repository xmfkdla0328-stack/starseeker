import React from 'react';

/**
 * 캐릭터 태그 섹션
 */
export const CharacterTags = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 p-4 pt-0">
      <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Tags</h4>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag, idx) => (
          <span key={idx} className="text-xs px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
