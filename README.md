# cookierun-crystal — 크리스탈 기댓값 계산기 (fork)

> ### 이 저장소는 fork임
>
> 원본은 [jkvin114/cookierun-crystal](https://github.com/jkvin114/cookierun-crystal)임. 쿠키런
> 크리스탈 수급을 시뮬레이션해 기댓값을 내는 웹 계산기이고, 계산 로직은 원저자의 것임.
>
> 여기서 한 일은 **[쿠키런HUB](https://www.cookierunhub.com) 계정으로 계산 상태를 저장·복원하는
> 연동**이고, 그 변경은
> **[upstream PR #4 「쿠키런HUB 저장 서버 연동」](https://github.com/jkvin114/cookierun-crystal/pull/4)
> 으로 머지되었음**(3파일 / +180 −3, 2026-06-04).
>
> *This is a fork. The calculator itself is the upstream author's work; my contribution was the
> CookieRunHUB account sync (save / restore of calculator state), merged upstream as PR #4.*

---

## 무엇을 기여했나

- **서버 저장·복원** — HUB 로그인 상태에서 계산 설정을 서버에 저장하고 다른 기기에서 그대로
  불러옴. 로그인하지 않은 사람에게는 기존 동작(로컬 저장)이 그대로 남음.
- **실패를 조용히 넘기지 않음** — 저장 형식이 바뀌었거나 응답이 깨졌을 때, 옛 데이터를 임의로
  해석해 이상한 상태를 복원하는 대신 디코드 실패를 실패로 다룸. 계산기는 사람이 설정을 다시
  맞추는 도구라, 틀린 상태로 복원되는 것이 복원되지 않는 것보다 나쁘기 때문임.
- **경계 처리** — HUB 응답을 신뢰하지 않는 데이터로 다루고, 연동이 꺼져 있거나 서버에 닿지 못할
  때도 계산기 자체는 그대로 동작하게 두었음.

## 관련 저장소

- upstream: [jkvin114/cookierun-crystal](https://github.com/jkvin114/cookierun-crystal)
- 연동 상대: [sesepark/cookierunhub-docs](https://github.com/sesepark/cookierunhub-docs) —
  HUB의 구조와 운영 기록
