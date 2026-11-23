"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const VOICE_KEY = "ftf-numbers-voice";

function readVoiceUri(): string | null {
  try {
    return localStorage.getItem(VOICE_KEY);
  } catch {
    return null;
  }
}

function writeVoiceUri(uri: string) {
  try {
    localStorage.setItem(VOICE_KEY, uri);
  } catch {
    // 저장소를 못 쓰는 브라우저에서는 이번 방문에만 기억한다
  }
}

export interface FrenchVoiceOption {
  uri: string;
  label: string;
}

/**
 * 브라우저 음성 합성의 프랑스어 목소리 목록과 고른 목소리.
 * 목록은 기기마다 다르고, 안드로이드 크롬은 늦게 채워져 voiceschanged 를 기다린다.
 */
export function useFrenchVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [supported, setSupported] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [selectedUri, setSelectedUri] = useState<string | null>(null);

  useEffect(() => {
    setSelectedUri(readVoiceUri());
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      setLoaded(true);
      return;
    }
    const pick = () => {
      try {
        const fr = window.speechSynthesis.getVoices().filter((v) => /^fr/i.test(v.lang));
        setVoices(fr);
        if (fr.length) setLoaded(true);
      } catch {
        setVoices([]);
      }
    };
    pick();
    // 목소리가 끝내 안 오는 기기도 있어, 잠시 뒤에는 "없음"으로 본다
    const t = window.setTimeout(() => setLoaded(true), 1500);
    window.speechSynthesis.addEventListener("voiceschanged", pick);
    return () => {
      window.clearTimeout(t);
      window.speechSynthesis.removeEventListener("voiceschanged", pick);
    };
  }, []);

  // 고른 것이 이 기기에 없으면 fr-FR, 그다음 아무 fr 목소리
  const voice = useMemo(
    () =>
      voices.find((v) => v.voiceURI === selectedUri) ??
      voices.find((v) => /^fr[-_]FR/i.test(v.lang)) ??
      voices[0] ??
      null,
    [voices, selectedUri]
  );

  const options: FrenchVoiceOption[] = useMemo(
    () => voices.map((v) => ({ uri: v.voiceURI, label: `${v.name} (${v.lang})` })),
    [voices]
  );

  const select = useCallback((uri: string) => {
    setSelectedUri(uri);
    writeVoiceUri(uri);
  }, []);

  const speak = useCallback(
    (text: string, { slow = false }: { slow?: boolean } = {}) => {
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = voice?.lang ?? "fr-FR";
        if (voice) u.voice = voice;
        u.rate = slow ? 0.6 : 1;
        window.speechSynthesis.speak(u);
      } catch {
        // 음성이 없는 기기에서는 조용히 넘어간다
      }
    },
    [voice]
  );

  return {
    supported,
    loaded,
    available: voice !== null,
    options,
    selectedUri: voice?.voiceURI ?? null,
    select,
    speak,
  };
}
