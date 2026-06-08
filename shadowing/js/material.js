// 자료 페이지: 단위 선택 + 5단계 학습 + 녹음
(async () => {
  const params = new URLSearchParams(location.search);
  const materialId = params.get('id');
  if (!materialId) return location.replace('index.html');

  // 자료 메타 (materials.json) + 데이터 (해당 JSON)
  const matRes = await fetch('data/materials.json');
  const { materials } = await matRes.json();
  const meta = materials.find(m => m.id === materialId);
  if (!meta) { document.body.innerHTML = '자료를 찾을 수 없습니다.'; return; }

  const dataRes = await fetch(meta.data_file);
  const data = await dataRes.json();

  document.getElementById('title').textContent = meta.title;
  document.getElementById('source-link').href = meta.source_url;
  document.getElementById('source-link').textContent = meta.source_url;

  // === State ===
  let currentUnit = 'sentences';
  let currentIndex = 0;
  let currentStep = 1;
  let repeatOn = false;
  let subtitleOn = false; // 기본: 단계 1 = OFF
  let recordings = {}; // { "unit_idx_step": Blob }

  const audio = document.getElementById('audio');
  const textEl = document.getElementById('text-content');
  const selectorEl = document.getElementById('unit-selector');
  const recordSection = document.getElementById('record-section');

  // === Step config ===
  const STEPS = {
    1: { name: '첫 듣기', subtitle: false, speed: 1.0, repeat: '1회', desc: '자막 숨기고 의미 추측' },
    2: { name: '텍스트+듣기', subtitle: true, speed: 1.0, repeat: '2~3회', desc: '자막 켜고 모르는 단어 확인' },
    3: { name: 'Slow Shadowing', subtitle: true, speed: 0.75, repeat: '5~10회', desc: '텍스트 보며 따라 말하기' },
    4: { name: 'Pure Shadowing', subtitle: false, speed: 1.0, repeat: '3~5회', desc: '자막 숨기고 동시 따라 말하기' },
    5: { name: '셀프 체크', subtitle: false, speed: 1.0, repeat: '1회', desc: '본인 녹음 → 원본과 비교' },
  };

  // === Get items by unit ===
  const getItems = (unit) => {
    if (unit === 'full') {
      return [{
        label: '전체',
        text: data.full_text,
        audio_file: data.meta.audio_full || 'audio/nicolas-1/full.mp3',
        duration: data.meta.duration,
      }];
    }
    const map = { segments: 'segments', paragraphs: 'paragraphs', sentences: 'sentences' };
    const arr = data[map[unit]] || [];
    const labels = { segments: '구간', paragraphs: '문단', sentences: '문장' };
    return arr.map((x, i) => ({
      label: `${labels[unit]} ${i + 1}`,
      text: x.text,
      audio_file: x.audio_file,
      duration: x.end - x.start,
    }));
  };

  // === Render selector ===
  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const renderSelector = () => {
    const items = getItems(currentUnit);
    selectorEl.innerHTML = items.map((it, i) => {
      const preview = it.text.length > 80 ? it.text.slice(0, 80) + '…' : it.text;
      return `
        <div class="unit-item ${i === currentIndex ? 'active' : ''}" data-index="${i}">
          <div class="unit-item-head">
            <strong>${it.label}</strong>
            <span class="duration">${it.duration.toFixed(1)}초</span>
          </div>
          <div class="unit-item-preview">${preview}</div>
        </div>
      `;
    }).join('');
    selectorEl.querySelectorAll('.unit-item').forEach(el => {
      el.onclick = () => selectIndex(parseInt(el.dataset.index));
    });
    if (items.length > 0) selectIndex(0);
  };

  // === Select item ===
  const selectIndex = (idx) => {
    const items = getItems(currentUnit);
    if (idx < 0 || idx >= items.length) return;
    currentIndex = idx;
    const it = items[idx];

    selectorEl.querySelectorAll('.unit-item').forEach((el, i) => {
      el.classList.toggle('active', i === idx);
    });

    audio.src = it.audio_file;
    textEl.textContent = it.text;
    document.getElementById('unit-position').textContent = `${idx + 1} / ${items.length}`;
    applyStepSettings(); // 자막 적용 등
    updateRecordButtonState();
  };

  // === Apply step settings ===
  const applyStepSettings = () => {
    const conf = STEPS[currentStep];
    subtitleOn = conf.subtitle;
    textEl.classList.toggle('hidden', !subtitleOn);
    document.getElementById('subtitle-toggle').classList.toggle('on', subtitleOn);
    document.getElementById('subtitle-toggle').textContent = `📝 자막: ${subtitleOn ? 'ON' : 'OFF'}`;
    audio.playbackRate = conf.speed;
    document.getElementById('speed').value = String(conf.speed);
    document.getElementById('step-desc').textContent = `${conf.desc} · 자막 ${conf.subtitle ? 'ON' : 'OFF'} · ${conf.speed}x · ${conf.repeat}`;
    recordSection.hidden = currentStep !== 5;
  };

  // === Unit tabs ===
  document.querySelectorAll('.unit-tab').forEach(t => {
    t.onclick = () => {
      document.querySelectorAll('.unit-tab').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      currentUnit = t.dataset.unit;
      currentIndex = 0;
      renderSelector();
    };
  });

  // === Step bar ===
  document.querySelectorAll('.step-btn').forEach(b => {
    b.onclick = () => {
      document.querySelectorAll('.step-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      currentStep = parseInt(b.dataset.step);
      applyStepSettings();
      updateRecordButtonState();
    };
  });

  // === Player controls ===
  const playPauseBtn = document.getElementById('play-pause');
  playPauseBtn.onclick = () => { audio.paused ? audio.play() : audio.pause(); };
  audio.onplay = () => playPauseBtn.textContent = '⏸ 일시정지';
  audio.onpause = () => playPauseBtn.textContent = '▶ 재생';

  document.getElementById('restart').onclick = () => { audio.currentTime = 0; audio.play(); };

  const repeatBtn = document.getElementById('repeat-toggle');
  repeatBtn.onclick = () => {
    repeatOn = !repeatOn;
    repeatBtn.classList.toggle('on', repeatOn);
    repeatBtn.textContent = `🔁 반복: ${repeatOn ? 'ON' : 'OFF'}`;
  };

  document.getElementById('speed').onchange = (e) => {
    audio.playbackRate = parseFloat(e.target.value);
  };

  document.getElementById('subtitle-toggle').onclick = () => {
    subtitleOn = !subtitleOn;
    textEl.classList.toggle('hidden', !subtitleOn);
    const btn = document.getElementById('subtitle-toggle');
    btn.classList.toggle('on', subtitleOn);
    btn.textContent = `📝 자막: ${subtitleOn ? 'ON' : 'OFF'}`;
  };

  audio.ontimeupdate = () => {
    document.getElementById('current-time').textContent = fmt(audio.currentTime);
    if (audio.duration) {
      document.getElementById('progress').value = (audio.currentTime / audio.duration) * 100;
    }
  };

  audio.onloadedmetadata = () => {
    document.getElementById('duration').textContent = fmt(audio.duration);
  };

  audio.onended = () => {
    if (repeatOn) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  // === Navigation ===
  document.getElementById('prev-unit').onclick = () => selectIndex(currentIndex - 1);
  document.getElementById('next-unit').onclick = () => selectIndex(currentIndex + 1);

  // === Keyboard ===
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input,select,textarea')) return;
    if (e.code === 'Space') { e.preventDefault(); playPauseBtn.click(); }
    else if (e.code === 'KeyR') document.getElementById('restart').click();
    else if (e.code === 'KeyS') document.getElementById('subtitle-toggle').click();
    else if (e.code === 'KeyL') repeatBtn.click();
    else if (e.code === 'ArrowRight') { e.preventDefault(); selectIndex(currentIndex + 1); }
    else if (e.code === 'ArrowLeft') { e.preventDefault(); selectIndex(currentIndex - 1); }
  });

  // === Recording ===
  let mediaRecorder = null;
  let recordingChunks = [];
  const recordBtn = document.getElementById('record-btn');
  const playRecBtn = document.getElementById('play-recording');
  const abBtn = document.getElementById('ab-compare');
  const downloadLink = document.getElementById('download-recording');
  const recStatus = document.getElementById('record-status');

  const recKey = () => `${currentUnit}_${currentIndex}`;

  const updateRecordButtonState = () => {
    if (currentStep !== 5) return;
    const key = recKey();
    const has = !!recordings[key];
    playRecBtn.disabled = !has;
    abBtn.disabled = !has;
    if (has) {
      downloadLink.hidden = false;
      downloadLink.href = URL.createObjectURL(recordings[key]);
      downloadLink.download = `${meta.id}_${key}.webm`;
      recStatus.textContent = '녹음 완료. 비교 가능.';
    } else {
      downloadLink.hidden = true;
      recStatus.textContent = '녹음 안 됨';
    }
  };

  recordBtn.onclick = async () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      recordingChunks = [];
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) recordingChunks.push(e.data); };
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordingChunks, { type: 'audio/webm' });
        recordings[recKey()] = blob;
        recordBtn.textContent = '🎤 녹음 시작';
        recordBtn.classList.remove('recording');
        stream.getTracks().forEach(t => t.stop());
        updateRecordButtonState();
      };
      mediaRecorder.start();
      recordBtn.textContent = '⏹ 녹음 중지';
      recordBtn.classList.add('recording');
      recStatus.textContent = '🔴 녹음 중...';
    } catch (e) {
      recStatus.textContent = `마이크 권한 거부: ${e.message}`;
    }
  };

  playRecBtn.onclick = () => {
    const blob = recordings[recKey()];
    if (!blob) return;
    const a = new Audio(URL.createObjectURL(blob));
    a.play();
  };

  abBtn.onclick = async () => {
    // 원본 → 잠깐 정지 → 내 녹음
    audio.currentTime = 0;
    await audio.play();
    audio.onended = async () => {
      audio.onended = () => { if (repeatOn) { audio.currentTime = 0; audio.play(); } };
      await new Promise(r => setTimeout(r, 500));
      playRecBtn.click();
    };
  };

  // === Help modal ===
  const modal = document.getElementById('help-modal');
  document.getElementById('help-btn').onclick = () => modal.classList.add('open');
  document.getElementById('modal-close').onclick = () => modal.classList.remove('open');
  modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('open'); };
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.classList.remove('open'); });

  // === Init ===
  renderSelector();
})();
