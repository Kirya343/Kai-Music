# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: room.spec.ts >> User 30 enters Kirya's room
- Location: tests\e2e\room.spec.ts:26:5

# Error details

```
Error: browserContext.close: Target page, context or browser has been closed
Browser logs:

<launched> pid=15140
[pid=15140][err] [1117/132522.689:INFO:CONSOLE:883] "[vite] connecting...", source: http://localhost:30000/@vite/client (883)
[pid=15140][err] [1117/132522.930:INFO:CONSOLE:996] "[vite] connected.", source: http://localhost:30000/@vite/client (996)
[pid=15140][err] [1117/132536.877:INFO:CONSOLE:15805] "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools font-weight:bold", source: http://localhost:30000/node_modules/.vite/deps/react-dom_client.js?v=3c152b58 (15805)
[pid=15140][err] [1117/132537.420:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold STOMP effect start: _r_0_", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132537.421:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пользователь:  undefined", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132540.158:INFO:CONSOLE:31] "Uncaught (in promise) AxiosError: Request failed with status code 401", source: http://localhost:30000/src/lib/user/services/hooks/useCurrentUser.ts (31)
[pid=15140][err] [1117/132546.839:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold STOMP effect start: _r_0_", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132546.839:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пользователь:  H68ST9YAFNM0W5ID8WEE", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132547.711:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подключение", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132547.711:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Восстановление подписок:  0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132548.964:INFO:CONSOLE:883] "[vite] connecting...", source: http://localhost:30000/@vite/client (883)
[pid=15140][err] [1117/132549.463:INFO:CONSOLE:996] "[vite] connected.", source: http://localhost:30000/@vite/client (996)
[pid=15140][err] [1117/132553.760:INFO:CONSOLE:15805] "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools font-weight:bold", source: http://localhost:30000/node_modules/.vite/deps/react-dom_client.js?v=3c152b58 (15805)
[pid=15140][err] [1117/132553.860:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Handler registered: 1", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132553.861:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Handler registered: 2", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132553.861:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Handler registered: 3", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132553.862:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold STOMP effect start: _r_0_", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132553.863:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пользователь:  H68ST9YAFNM0W5ID8WEE", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132554.708:INFO:CONSOLE:883] "[vite] connecting...", source: http://localhost:30000/@vite/client (883)
[pid=15140][err] [1117/132554.776:INFO:CONSOLE:996] "[vite] connected.", source: http://localhost:30000/@vite/client (996)
[pid=15140][err] [1117/132558.242:INFO:CONSOLE:15805] "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools font-weight:bold", source: http://localhost:30000/node_modules/.vite/deps/react-dom_client.js?v=3c152b58 (15805)
[pid=15140][err] [1117/132558.271:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Handler registered: 1", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132558.272:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Handler registered: 2", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132558.272:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Handler registered: 3", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132558.272:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold STOMP effect start: _r_0_", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132558.273:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пользователь:  H68ST9YAFNM0W5ID8WEE", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132603.010:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подключение", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132603.011:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Восстановление подписок:  3", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132603.017:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подписались на /user/queue/playback .mode, .playlist, .state, .data, .event", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132603.017:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold переподключаемся к комнате", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132605.843:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132605.869:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132605.976:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132606.222:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132606.258:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132606.860:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132607.276:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132608.825:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132608.840:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132608.842:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132610.756:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132612.024:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 62826945-baac-41d7-92d9-4ea4f4da7c11", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132612.024:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132612.025:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132624.876:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132624.876:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132624.907:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.playlist:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132624.907:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.mode:  REPEAT_ALL", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132624.907:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132624.909:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132636.107:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132636.108:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132636.123:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132636.183:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132636.441:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132639.028:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132640.159:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132640.160:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold перезагружаем состояние", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132640.161:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] c5b04ddb-cc78-42eb-9f84-49bc2449bf55", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132640.161:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132640.161:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132640.161:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 53.3065674", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132640.161:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 53.3065674", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132640.163:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 53.3065674", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132640.164:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132640.164:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132641.641:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132641.757:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132645.242:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132645.338:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132648.325:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132650.569:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132651.409:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.playlist:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132651.438:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.mode:  REPEAT_ALL", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132651.751:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132653.306:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132654.040:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132656.135:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132658.336:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132659.622:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132755.231:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132755.232:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132755.232:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132755.232:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132755.232:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132755.232:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132755.234:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132755.240:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132755.240:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132755.241:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132755.246:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132755.246:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132755.246:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132756.986:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132759.605:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132843.230:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] bfd0137b-a2a1-418e-bec4-79aa73f8c8dc", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132843.230:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132843.244:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132843.244:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132843.665:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132843.665:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132843.783:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132845.463:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 9a6e01e7-352d-47a5-b14e-98d700662dae", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132845.464:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132845.464:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132845.464:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132845.623:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132845.791:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] ba612b04-9c85-4a30-9727-2f3a4e6306d3", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132845.791:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132845.793:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132845.793:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132846.180:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132846.228:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132846.230:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] f5a4f386-7a99-4abc-a749-87c6f07522c5", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132846.230:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132846.230:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132846.231:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132846.231:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132846.244:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132846.345:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132846.346:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132848.043:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 96316937-66fd-4e91-ab7c-edfe53fb25fa", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132848.043:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132848.043:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132848.043:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132848.045:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132848.066:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132848.068:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] f5ed4b47-5da7-43e5-8f23-b4b15afc8192", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132848.069:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132848.071:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132848.071:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132848.075:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132848.103:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132857.483:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132857.485:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132857.905:INFO:CONSOLE:42] "%c[WebSocket] %c[ERROR] color: #9b59b6; font-weight: bold color: #e74c3c; font-weight: bold ❌ Broker error: No decoder for session id 'de5538e1-70b8-9d16-9c84-82040d39831d'", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132859.823:INFO:CONSOLE:42] "%c[WebSocket] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Closed", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132905.520:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подключение", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132905.520:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Восстановление подписок:  3", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132905.521:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=15140][err] [1117/132905.521:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=15140][err] [1117/132905.524:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=15140][err] [1117/132905.525:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=15140][err] [1117/132905.531:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=15140][err] [1117/132905.531:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=15140][err] [1117/132905.531:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подписались на /user/queue/playback .mode, .playlist, .state, .data, .event", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132905.536:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold переподключаемся к комнате", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=15140][err] [1117/132905.537:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=15140][err] [1117/132917.783:ERROR:media\audio\audio_manager_base.cc:619] Invalid audio output parameters received; using fake audio path: format: PCM_LINEAR, channel_layout: 0, channels: 0, sample_rate: 0, frames_per_buffer: 0, effects: NONE, mic_positions: , latency_tag: LatencyUnknown
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