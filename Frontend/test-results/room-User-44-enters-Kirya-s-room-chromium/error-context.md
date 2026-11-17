# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: room.spec.ts >> User 44 enters Kirya's room
- Location: tests\e2e\room.spec.ts:26:5

# Error details

```
Error: browserContext.close: Target page, context or browser has been closed
Browser logs:

[pid=42152][err] [1117/132546.422:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пользователь:  0V2AYO8YOOPARZAYNGZ5", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132547.345:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подключение", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132547.345:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Восстановление подписок:  0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132548.157:INFO:CONSOLE:883] "[vite] connecting...", source: http://localhost:30000/@vite/client (883)
[pid=42152][err] [1117/132548.899:INFO:CONSOLE:996] "[vite] connected.", source: http://localhost:30000/@vite/client (996)
[pid=42152][err] [1117/132552.522:INFO:CONSOLE:15805] "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools font-weight:bold", source: http://localhost:30000/node_modules/.vite/deps/react-dom_client.js?v=3c152b58 (15805)
[pid=42152][err] [1117/132552.603:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Handler registered: 1", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132552.604:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Handler registered: 2", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132552.605:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Handler registered: 3", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132552.609:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold STOMP effect start: _r_0_", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132552.609:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пользователь:  0V2AYO8YOOPARZAYNGZ5", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132552.734:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подключение", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132552.734:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Восстановление подписок:  3", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132552.735:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подписались на /user/queue/playback .mode, .playlist, .state, .data, .event", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132552.735:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold переподключаемся к комнате", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132553.261:INFO:CONSOLE:883] "[vite] connecting...", source: http://localhost:30000/@vite/client (883)
[pid=42152][err] [1117/132553.370:INFO:CONSOLE:996] "[vite] connected.", source: http://localhost:30000/@vite/client (996)
[pid=42152][err] [1117/132556.371:INFO:CONSOLE:15805] "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools font-weight:bold", source: http://localhost:30000/node_modules/.vite/deps/react-dom_client.js?v=3c152b58 (15805)
[pid=42152][err] [1117/132556.386:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Handler registered: 1", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132556.387:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Handler registered: 2", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132556.388:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Handler registered: 3", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132556.388:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold STOMP effect start: _r_0_", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132556.389:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пользователь:  0V2AYO8YOOPARZAYNGZ5", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132557.220:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подключение", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132557.221:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Восстановление подписок:  3", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132557.222:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подписались на /user/queue/playback .mode, .playlist, .state, .data, .event", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132557.222:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold переподключаемся к комнате", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132559.059:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132601.069:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132601.076:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132601.077:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132601.077:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132601.142:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132601.153:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132604.440:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132604.457:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132604.625:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132604.874:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132605.976:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] d34cc467-f0c8-4537-8158-6a6214a3d519", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132605.976:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132605.977:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132632.842:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.playlist:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132632.842:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.mode:  REPEAT_ALL", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132632.843:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132632.857:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132632.859:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132632.859:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132632.869:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132632.875:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132636.109:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132636.757:INFO:CONSOLE:31] "Uncaught (in promise) AxiosError: Request failed with status code 500", source: http://localhost:30000/src/pages/app/MainPage/MainPage.tsx (31)
[pid=42152][err] [1117/132639.772:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132641.273:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132642.206:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132642.976:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132643.790:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132644.392:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132644.608:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132644.842:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132645.758:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132646.608:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132649.341:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132651.419:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132651.592:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132652.238:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132654.525:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132655.675:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132656.875:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132659.203:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132700.266:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132704.238:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132705.488:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132739.821:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132739.990:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132740.469:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132741.779:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132742.636:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132748.233:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132748.594:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132749.571:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132756.873:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132757.104:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132757.516:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132757.670:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132757.804:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132800.979:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132806.753:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132843.364:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 2b6459b9-3174-4755-b851-d438f726fbf5", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132843.408:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132843.426:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132845.576:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 88cbf213-0dea-499b-a04b-97879b1ee55a", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132845.577:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132845.577:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132845.913:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 3f16a950-69a6-4738-9f86-f2fa8918c3f9", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132845.913:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132845.914:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132846.444:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 5590f161-637c-4b0b-98ad-30c5c715af9e", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132846.445:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132846.445:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132847.372:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] d72e2e02-9ff3-4d60-9c76-4a79d0fd27f5", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132847.372:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132847.374:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132851.253:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 18f9baae-0c15-45f2-a282-20f76b27058d", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132851.253:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132851.254:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132857.704:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] e66cf32f-c611-4dfe-b50a-533665154b37", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132857.743:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132857.757:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132858.036:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 2dceca39-cdbb-4ab7-9ddf-27bd757d3df6", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132858.038:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132858.038:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132904.977:INFO:CONSOLE:42] "%c[WebSocket] %c[ERROR] color: #9b59b6; font-weight: bold color: #e74c3c; font-weight: bold ❌ Broker error: No decoder for session id '54970faa-4ead-a86c-1220-85c58db11bdc'", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132907.036:INFO:CONSOLE:42] "%c[WebSocket] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Closed", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132916.192:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подключение", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132916.193:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Восстановление подписок:  3", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132916.193:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=42152][err] [1117/132916.193:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=42152][err] [1117/132916.193:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=42152][err] [1117/132916.193:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=42152][err] [1117/132916.193:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=42152][err] [1117/132916.193:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=42152][err] [1117/132916.193:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подписались на /user/queue/playback .mode, .playlist, .state, .data, .event", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132916.194:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold переподключаемся к комнате", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132916.194:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=42152][err] [1117/132917.691:ERROR:media\audio\audio_manager_base.cc:619] Invalid audio output parameters received; using fake audio path: format: PCM_LINEAR, channel_layout: 0, channels: 0, sample_rate: 0, frames_per_buffer: 0, effects: NONE, mic_positions: , latency_tag: LatencyUnknown
[pid=42152][err] [1117/132917.801:ERROR:services\audio\output_device_mixer_manager.cc:284] Adding OutputDeviceMixer failed: invalid output parameters
[pid=42152][err] [1117/132917.801:ERROR:media\audio\audio_manager_base.cc:619] Invalid audio output parameters received; using fake audio path: format: PCM_LINEAR, channel_layout: 0, channels: 0, sample_rate: 0, frames_per_buffer: 0, effects: NONE, mic_positions: , latency_tag: LatencyUnknown
[pid=42152][err] [1117/132917.881:ERROR:services\audio\output_device_mixer_manager.cc:284] Adding OutputDeviceMixer failed: invalid output parameters
[pid=42152][err] [1117/132917.906:ERROR:media\audio\audio_manager_base.cc:619] Invalid audio output parameters received; using fake audio path: format: PCM_LINEAR, channel_layout: 0, channels: 0, sample_rate: 0, frames_per_buffer: 0, effects: NONE, mic_positions: , latency_tag: LatencyUnknown
[pid=42152][err] [1117/132924.214:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132924.872:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132925.206:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132925.613:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132926.094:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132926.762:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132927.045:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132927.913:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132928.973:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132930.232:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 309e1493-f942-451f-9ee5-e4d52e078b56", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132930.233:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132930.233:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132930.306:ERROR:services\audio\output_device_mixer_manager.cc:284] Adding OutputDeviceMixer failed: invalid output parameters
[pid=42152][err] [1117/132930.307:ERROR:media\audio\audio_manager_base.cc:619] Invalid audio output parameters received; using fake audio path: format: PCM_LINEAR, channel_layout: 0, channels: 0, sample_rate: 0, frames_per_buffer: 0, effects: NONE, mic_positions: , latency_tag: LatencyUnknown
[pid=42152][err] [1117/132930.435:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132930.521:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.playlist:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132930.544:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.mode:  REPEAT_ALL", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132932.531:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132939.001:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132939.002:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=42152][err] [1117/132939.118:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
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