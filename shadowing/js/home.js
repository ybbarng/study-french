// 홈 페이지: 학습 자료 목록
(async () => {
  const res = await fetch('data/materials.json');
  const { materials } = await res.json();

  const listEl = document.getElementById('material-list');
  if (!materials.length) {
    listEl.innerHTML = '<p>등록된 자료가 없습니다.</p>';
    return;
  }

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}분 ${sec}초`;
  };

  listEl.innerHTML = `
    <h2>학습 자료</h2>
    <ul class="materials">
      ${materials.map(m => `
        <li>
          <a href="material.html?id=${m.id}">
            <div class="material-title">${m.title}</div>
            <div class="material-subtitle">${m.subtitle || ''}</div>
            <div class="material-meta">
              ${m.author ? `<span>📖 ${m.author}</span>` : ''}
              <span>⏱ ${fmt(m.duration_sec)}</span>
              <span>📝 ${m.sentence_count} 문장</span>
            </div>
          </a>
        </li>
      `).join('')}
    </ul>
  `;

  // 가이드 모달
  setupHelpModal();
})();

function setupHelpModal() {
  const modal = document.getElementById('help-modal');
  document.getElementById('help-btn').onclick = () => modal.classList.add('open');
  document.getElementById('modal-close').onclick = () => modal.classList.remove('open');
  modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('open'); };
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('open');
  });
}
