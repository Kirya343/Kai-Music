# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: room.spec.ts >> User 25 enters Kirya's room
- Location: tests\e2e\room.spec.ts:26:5

# Error details

```
Error: browserContext.close: Target page, context or browser has been closed
Browser logs:

[pid=11360][err] [1117/132546.840:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пользователь:  JL0UX3JC5BJMUWGDUCDP", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132548.024:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подключение", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132548.024:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Восстановление подписок:  0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132548.894:INFO:CONSOLE:883] "[vite] connecting...", source: http://localhost:30000/@vite/client (883)
[pid=11360][err] [1117/132549.242:INFO:CONSOLE:996] "[vite] connected.", source: http://localhost:30000/@vite/client (996)
[pid=11360][err] [1117/132553.258:INFO:CONSOLE:15805] "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools font-weight:bold", source: http://localhost:30000/node_modules/.vite/deps/react-dom_client.js?v=3c152b58 (15805)
[pid=11360][err] [1117/132553.401:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Handler registered: 1", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132553.401:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Handler registered: 2", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132553.401:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Handler registered: 3", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132553.403:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold STOMP effect start: _r_0_", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132553.403:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пользователь:  JL0UX3JC5BJMUWGDUCDP", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132554.079:INFO:CONSOLE:883] "[vite] connecting...", source: http://localhost:30000/@vite/client (883)
[pid=11360][err] [1117/132554.377:INFO:CONSOLE:996] "[vite] connected.", source: http://localhost:30000/@vite/client (996)
[pid=11360][err] [1117/132556.624:INFO:CONSOLE:15805] "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools font-weight:bold", source: http://localhost:30000/node_modules/.vite/deps/react-dom_client.js?v=3c152b58 (15805)
[pid=11360][err] [1117/132556.667:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Handler registered: 1", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132556.668:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Handler registered: 2", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132556.668:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Handler registered: 3", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132556.669:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold STOMP effect start: _r_0_", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132556.669:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пользователь:  JL0UX3JC5BJMUWGDUCDP", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132558.207:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подключение", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132558.208:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Восстановление подписок:  3", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132558.208:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подписались на /user/queue/playback .mode, .playlist, .state, .data, .event", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132558.209:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold переподключаемся к комнате", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132621.109:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold перезагружаем состояние", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132630.610:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132641.941:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132642.024:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132642.058:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132644.025:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132644.574:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132646.526:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132646.849:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132646.987:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132648.198:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132649.498:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132649.937:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132650.587:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132651.269:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132651.358:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132652.008:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 56d175af-5836-4984-90f9-13af09659ab1", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132652.021:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132652.022:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132652.031:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 65.5260567", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132652.054:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 65.5260567", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132652.057:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 65.5260567", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132652.072:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 65.5260567", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132652.074:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132652.522:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.playlist:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132652.524:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.mode:  REPEAT_ALL", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132653.392:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132656.204:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132656.276:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132656.381:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132658.387:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132659.570:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132700.789:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132705.972:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132705.981:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132712.505:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132714.461:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132800.238:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132800.238:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132800.239:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132800.241:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132800.242:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132800.244:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132800.244:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132802.537:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132802.537:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132802.537:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132802.537:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132802.621:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132802.621:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132803.921:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132812.324:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132843.350:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] f911eb51-e275-40b5-abcd-ac7f635d4064", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132843.351:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132843.402:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132843.417:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.892:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.895:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 4ef4d21a-4620-41d2-839a-8b45f854d7ff", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.896:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.896:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.896:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.898:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.900:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 11f3bf88-83e8-4bdf-a58a-ec0bce8a6477", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.901:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.901:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.901:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.903:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.904:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.913:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.913:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 3fe4a491-c17d-436a-95ce-d97f53d2aae2", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.915:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.915:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.915:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.917:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.918:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.921:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.922:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 26c6cea3-6ed6-40ca-a434-dee97c385d71", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.922:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.923:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.923:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.927:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.927:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.931:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 22b276ff-d99c-4a43-9081-b497999ab2c4", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.932:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.932:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.932:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.932:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.934:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.936:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132854.938:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.104:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] f0acf7b8-a200-4854-8692-9200111083ab", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.104:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.109:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.112:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.283:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.318:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.320:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 2c45443e-e8fd-4774-b648-5191dfba7222", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.320:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.320:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.320:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.320:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.516:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.567:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.569:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] a77f0aad-3a55-4f70-932c-69e918dd8a16", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.569:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.569:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.569:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.570:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132858.614:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132903.906:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132903.909:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132904.079:INFO:CONSOLE:42] "%c[WebSocket] %c[ERROR] color: #9b59b6; font-weight: bold color: #e74c3c; font-weight: bold ❌ Broker error: No decoder for session id '1d55175a-9e6a-c012-9731-8528b2c84169'", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132906.079:INFO:CONSOLE:42] "%c[WebSocket] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Closed", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132909.097:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подключение", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132909.099:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Восстановление подписок:  3", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132909.099:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=11360][err] [1117/132909.101:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=11360][err] [1117/132909.101:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=11360][err] [1117/132909.101:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=11360][err] [1117/132909.101:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=11360][err] [1117/132909.101:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=11360][err] [1117/132909.101:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подписались на /user/queue/playback .mode, .playlist, .state, .data, .event", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132909.101:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold переподключаемся к комнате", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=11360][err] [1117/132909.101:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=11360][err] [1117/132917.738:ERROR:media\audio\audio_manager_base.cc:619] Invalid audio output parameters received; using fake audio path: format: PCM_LINEAR, channel_layout: 0, channels: 0, sample_rate: 0, frames_per_buffer: 0, effects: NONE, mic_positions: , latency_tag: LatencyUnknown
[pid=11360][err] [1117/132917.809:ERROR:services\audio\output_device_mixer_manager.cc:284] Adding OutputDeviceMixer failed: invalid output parameters
[pid=11360][err] [1117/132917.809:ERROR:media\audio\audio_manager_base.cc:619] Invalid audio output parameters received; using fake audio path: format: PCM_LINEAR, channel_layout: 0, channels: 0, sample_rate: 0, frames_per_buffer: 0, effects: NONE, mic_positions: , latency_tag: LatencyUnknown
```

# Test source

```ts
  1   | import { test } from "@playwright/test";
  2   | import fs from "node:fs";
  3   | import path from "node:path";
  4   | import { fileURLToPath } from "node:url";
  5   | 
  6   | const __filename = fileURLToPath(import.meta.url);
  7   | const __dirname = path.dirname(__filename);
  8   | 
  9   | const users = JSON.parse(
  10  |     fs.readFileSync(
  11  |         path.resolve(__dirname, "../../../tests/users.json"),
  12  |         "utf-8"
  13  |     )
  14  | );
  15  | 
  16  | test.describe.configure({ mode: "parallel" });
  17  | test.setTimeout(1_800_000);
  18  | 
  19  | const log = (index: number, message: string) => {
  20  |     console.log(
  21  |         `[${new Date().toLocaleTimeString()}] [User ${index + 1}] ${message}`
  22  |     );
  23  | };
  24  | 
  25  | for (const [index, user] of users.slice(0, 50).entries()) {
  26  |     test(`User ${index + 1} enters Kirya's room`, async ({ browser }, testInfo) => {
  27  |         log(index, `START | Worker: ${testInfo.workerIndex}`);
  28  | 
  29  |         const context = await browser.newContext();
  30  |         const page = await context.newPage();
  31  | 
  32  |         page.on("response", async response => {
  33  |             if (response.status() >= 400) {
  34  |                 console.log(
  35  |                     `[User ${index + 1}] HTTP ERROR`,
  36  |                     response.status(),
  37  |                     response.request().method(),
  38  |                     response.url()
  39  |                 );
  40  | 
  41  |                 console.log(
  42  |                     "Body:",
  43  |                     (await response.text()).slice(0, 500)
  44  |                 );
  45  |             }
  46  |         });
  47  | 
  48  |         page.on("console", message => {
  49  |             console.log(`[Browser ${index + 1}] ${message.text()}`);
  50  |         });
  51  | 
  52  |         page.on("pageerror", error => {
  53  |             log(index, `PAGE ERROR: ${error.message}`);
  54  |         });
  55  | 
  56  |         page.on("requestfailed", request => {
  57  |             log(index, `REQUEST FAILED: ${request.url()}`);
  58  |         });
  59  | 
  60  |         try {
  61  |             log(index, "Opening login page");
  62  | 
  63  |             await page.goto("http://localhost:30000/login");
  64  | 
  65  |             log(index, `Entering credentials ${user.email}: ${user.password}`);
  66  | 
  67  |             await page.getByTestId("email").fill(user.email);
  68  |             await page.getByTestId("password").fill(user.password);
  69  |             await page.getByTestId("login-button").click();
  70  | 
  71  |             log(index, "Waiting for authentication");
  72  | 
  73  |             await page.waitForURL("**/login/success**");
  74  |             await page.waitForURL("**/");
  75  | 
  76  |             log(index, "Authenticated");
  77  | 
  78  |             await page.goto("http://localhost:30000/app");
  79  | 
  80  |             await page.reload();
  81  | 
  82  |             await page.waitForURL("**/app");
  83  | 
  84  |             log(index, "Waiting for room");
  85  | 
  86  |             const room = page.getByTestId("Kirya-room");
  87  | 
  88  |             await room.waitFor({ state: "visible" });
  89  |             await room.click();
  90  | 
  91  |             log(index, "ENTERED ROOM");
  92  | 
  93  |             await page.waitForTimeout(600_000);
  94  | 
  95  |             log(index, "Finished waiting");
  96  |         } catch (error) {
  97  |             log(index, `FAILED: ${error}`);
  98  |             throw error;
  99  |         } finally {
  100 |             log(index, "Closing browser context");
> 101 |             await context.close();
      |             ^ Error: browserContext.close: Target page, context or browser has been closed
  102 |         }
  103 |     });
  104 | }
```