import sys, re
# VTT를 "[mm:ss] 문장" 줄로 바꾼다. 자동 자막의 누적 중복 줄을 없앤다.
src = open(sys.argv[1], encoding='utf-8').read()
blocks = re.split(r'\n\n+', src)
out, last = [], set()
seen_recent = []
for b in blocks:
    m = re.search(r'(\d+):(\d\d):(\d\d)\.\d+ -->', b)
    if not m: continue
    t = int(m[1])*3600 + int(m[2])*60 + int(m[3])
    lines = [re.sub(r'<[^>]+>', '', l).strip() for l in b.split('\n')[1:]]
    lines = [l for l in lines if l and '-->' not in l]
    for l in lines:
        if l in seen_recent: continue
        seen_recent.append(l); seen_recent = seen_recent[-6:]
        out.append(f"[{t//60:02d}:{t%60:02d}|{t}] {l}")
print('\n'.join(out))
