"use client";

import { useEffect, useState } from "react";

export type JsonState<T> =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; data: T };

/**
 * 주소 하나를 읽어 JSON 으로 돌려준다. 화면 조각마다 따로 불러, 하나가 실패해도 나머지는 보이게 한다.
 * map 으로 응답을 화면이 쓰는 모양으로 바꾼다(형식이 틀리면 던져 error 가 된다)
 */
export function useJson<T>(url: string, map: (json: unknown) => T): JsonState<T> {
  const [state, setState] = useState<JsonState<T>>({ status: "loading" });

  // biome-ignore lint/correctness/useExhaustiveDependencies: map 은 화면마다 고정된 변환이라 주소만 바뀔 때 다시 읽는다
  useEffect(() => {
    let alive = true;
    fetch(url, { cache: "no-cache" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        if (alive) setState({ status: "ready", data: map(json) });
      })
      .catch((e) => {
        console.error(`Failed to load ${url}`, e);
        if (alive) setState({ status: "error" });
      });
    return () => {
      alive = false;
    };
  }, [url]);

  return state;
}
