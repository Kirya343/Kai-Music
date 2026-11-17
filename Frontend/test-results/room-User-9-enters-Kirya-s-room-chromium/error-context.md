# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: room.spec.ts >> User 9 enters Kirya's room
- Location: tests\e2e\room.spec.ts:26:5

# Error details

```
Error: browserContext.close: Target page, context or browser has been closed
Browser logs:

[pid=31024][err] [1117/132843.302:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132843.302:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132843.302:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132843.366:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132845.562:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] a9a776db-0f22-4201-830c-524662bde93c", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132845.562:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132845.562:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132845.563:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132845.696:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132845.953:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] f65dcdd1-46e3-4d69-92a8-1e3849455d2e", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132845.953:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132845.953:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132845.958:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132845.976:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132846.123:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132846.247:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132846.582:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] ee4928b3-e142-44ac-b5c1-068bd86b6adc", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132846.583:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132846.583:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132846.583:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132846.659:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132847.560:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 1f561155-c092-47b2-8c74-27b6a389e972", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132847.561:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132847.570:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132847.570:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132847.659:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132848.670:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132848.673:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 8c26689f-1e8d-4933-80f6-f4efeae68dc0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132848.673:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132848.674:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132848.674:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132848.681:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132848.701:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132848.733:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132848.735:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132848.755:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132848.758:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132854.655:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] c252579b-3ab3-43b9-ac05-c861a08156e6", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132854.655:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132854.656:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132854.656:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132854.731:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132857.883:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132857.885:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 48d353dc-beab-4df3-bdfe-dbacc38887e7", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132857.885:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132857.886:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132857.887:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132857.889:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132858.144:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132858.152:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132858.155:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132858.404:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] d3be2dd3-238e-4110-a3d3-2e5b9e5b2c25", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132858.404:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132858.469:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132858.469:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132858.568:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132858.586:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132858.933:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132858.935:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132904.872:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132904.872:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132909.111:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132909.161:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132909.165:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132909.230:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132909.232:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132909.279:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132909.279:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132909.279:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132909.287:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132909.293:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132909.295:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132909.296:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132909.565:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132909.565:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132910.511:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132910.540:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132911.262:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132911.346:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132915.309:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132915.998:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132916.512:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132916.941:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132917.399:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132917.860:ERROR:media\audio\audio_manager_base.cc:619] Invalid audio output parameters received; using fake audio path: format: PCM_LINEAR, channel_layout: 0, channels: 0, sample_rate: 0, frames_per_buffer: 0, effects: NONE, mic_positions: , latency_tag: LatencyUnknown
[pid=31024][err] [1117/132920.108:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132920.109:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132920.625:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132920.689:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132920.689:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132920.689:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132921.756:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132922.760:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132923.934:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132923.982:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132923.982:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132924.112:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132925.765:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132925.789:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132932.962:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132932.982:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132933.197:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132933.198:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132933.198:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132933.198:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132933.198:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132933.198:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132933.198:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132934.211:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132936.863:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132938.398:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132939.547:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/132947.213:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133204.079:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 50391fcd-909c-4446-9ca1-24d19ee33bd1", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133204.080:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133204.081:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133204.081:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133204.081:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133207.886:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133207.888:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133207.888:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133207.890:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 97b349c6-c1bc-4220-851c-a89e1f56efa4", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133207.890:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133207.890:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133207.890:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133207.891:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133207.891:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133207.891:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133207.893:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133207.893:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 839d4a18-622e-4f1a-8f39-ba6be6e5008e", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133207.894:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133207.895:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133207.899:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133207.902:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133207.905:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133214.260:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133214.264:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133215.852:INFO:CONSOLE:42] "%c[WebSocket] %c[ERROR] color: #9b59b6; font-weight: bold color: #e74c3c; font-weight: bold ❌ Broker error: No decoder for session id 'b36d5a35-2e60-06c3-4064-0c8fae9c68d9'", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133215.890:INFO:CONSOLE:42] "%c[WebSocket] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Closed", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133217.696:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подключение", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133217.702:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Восстановление подписок:  3", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133217.703:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=31024][err] [1117/133217.703:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=31024][err] [1117/133217.703:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=31024][err] [1117/133217.703:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=31024][err] [1117/133217.704:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=31024][err] [1117/133217.705:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=31024][err] [1117/133217.705:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подписались на /user/queue/playback .mode, .playlist, .state, .data, .event", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133217.706:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold переподключаемся к комнате", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=31024][err] [1117/133217.706:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
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