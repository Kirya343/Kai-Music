# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: room.spec.ts >> User 22 enters Kirya's room
- Location: tests\e2e\room.spec.ts:26:5

# Error details

```
Error: browserContext.close: Target page, context or browser has been closed
Browser logs:

[pid=36668][err] [1117/132909.546:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132910.741:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132911.259:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132912.740:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132915.699:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132916.005:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132916.383:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132916.932:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132917.144:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132917.594:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132918.181:ERROR:media\audio\audio_manager_base.cc:619] Invalid audio output parameters received; using fake audio path: format: PCM_LINEAR, channel_layout: 0, channels: 0, sample_rate: 0, frames_per_buffer: 0, effects: NONE, mic_positions: , latency_tag: LatencyUnknown
[pid=36668][err] [1117/132919.012:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132919.076:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132919.078:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132920.640:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132921.632:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132921.811:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132925.761:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132925.770:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132925.792:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132925.797:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132925.801:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132925.803:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132925.806:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132925.809:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132925.827:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132926.295:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132926.994:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132927.437:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132928.323:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132929.198:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132930.651:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132932.880:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132936.457:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132937.667:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132939.184:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/132946.653:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133204.054:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 4c372376-f115-4669-b205-d018c11b61b8", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133204.065:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133204.065:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133204.065:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133204.266:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133205.248:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] bcd9e9a8-54e3-4143-aa6f-f0187383a525", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133205.248:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133205.249:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133205.255:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133205.284:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133205.840:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133205.842:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 3ee7e250-4527-477d-816a-a335be3cb888", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133205.842:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133205.851:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133205.852:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133205.860:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133205.862:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133205.877:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133205.879:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.287:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 8e85d559-bfc6-4526-8687-fff8736ba81a", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.289:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.289:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.291:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.297:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.329:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.551:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.553:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.714:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 3dfe4d12-7c3d-48cc-9fa8-7ae67946734e", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.714:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.714:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.714:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.717:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] a5958129-d504-4ddb-8797-a693f40b273c", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.717:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.717:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.718:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.719:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.720:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.951:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 40134e00-85f8-4323-8888-175bf9326747", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.951:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.951:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133211.951:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.016:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.045:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.047:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 638b3379-766c-47d8-a8fb-289e90270852", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.047:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.048:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.048:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.050:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.092:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.146:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] edfb38f6-222c-442a-aa15-0873f889811a", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.147:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.150:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.150:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.181:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.187:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] affed768-9cb2-4168-8ce5-e43d98c96218", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.189:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.193:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.193:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.223:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.230:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.249:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.399:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.437:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.693:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.693:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.732:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.781:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.830:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.844:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.926:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133212.998:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133213.047:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133213.077:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133213.113:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133213.296:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133213.332:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133213.398:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133213.446:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133213.513:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133213.595:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133213.636:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133213.695:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133215.874:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133215.983:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133215.986:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133216.007:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133216.243:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133216.257:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133216.257:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133216.271:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133216.492:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133216.509:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133216.522:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133216.525:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133216.825:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133217.071:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133217.118:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133217.155:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133217.183:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133217.437:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133217.506:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133217.554:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133217.601:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133217.636:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133217.791:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133217.902:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133217.902:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133217.919:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133217.969:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133218.003:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133218.005:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133218.237:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=36668][err] [1117/133218.283:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
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