# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: room.spec.ts >> User 41 enters Kirya's room
- Location: tests\e2e\room.spec.ts:26:5

# Error details

```
Error: browserContext.close: Target page, context or browser has been closed
Browser logs:

[pid=59112][err] [1117/132856.969:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132856.969:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132856.972:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132856.972:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 15bd7695-d2c5-43dc-9945-854df8ebe785", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132856.976:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132856.978:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132856.978:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132856.979:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132856.984:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132857.474:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132857.495:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132857.722:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 55a83b42-45e1-4b82-bb72-8b5c4e030374", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132857.750:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132857.760:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132857.766:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132857.887:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132857.892:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132857.904:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 493b8226-42c4-4636-961e-26f820463f0b", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132857.904:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132857.907:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132857.907:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132857.914:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132858.162:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132858.284:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132858.286:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 43cf6eda-ecca-45a8-a161-f4fa5f7ba9c5", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132858.286:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132858.286:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132858.286:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132858.302:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132858.486:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132858.900:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132858.920:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132905.517:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132905.943:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132907.314:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132911.297:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132911.298:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132911.298:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132911.298:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132911.302:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132911.308:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132911.310:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132911.310:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132911.310:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132911.311:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132911.311:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132911.376:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132912.047:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132912.088:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132912.423:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132913.271:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132916.190:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132917.756:ERROR:services\audio\output_device_mixer_manager.cc:284] Adding OutputDeviceMixer failed: invalid output parameters
[pid=59112][err] [1117/132917.781:ERROR:media\audio\audio_manager_base.cc:619] Invalid audio output parameters received; using fake audio path: format: PCM_LINEAR, channel_layout: 0, channels: 0, sample_rate: 0, frames_per_buffer: 0, effects: NONE, mic_positions: , latency_tag: LatencyUnknown
[pid=59112][err] [1117/132917.813:ERROR:services\audio\output_device_mixer_manager.cc:284] Adding OutputDeviceMixer failed: invalid output parameters
[pid=59112][err] [1117/132917.813:ERROR:media\audio\audio_manager_base.cc:619] Invalid audio output parameters received; using fake audio path: format: PCM_LINEAR, channel_layout: 0, channels: 0, sample_rate: 0, frames_per_buffer: 0, effects: NONE, mic_positions: , latency_tag: LatencyUnknown
[pid=59112][err] [1117/132919.176:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132920.626:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132920.689:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132920.689:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132920.689:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132920.690:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132921.677:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132921.754:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132921.755:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132923.653:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132923.932:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132924.213:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132925.761:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132925.761:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132925.768:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132925.789:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132925.798:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132925.896:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132926.658:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132928.092:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132928.357:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132928.921:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132929.444:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132929.674:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132929.885:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132930.603:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132932.445:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132935.774:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132936.808:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132938.262:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132939.919:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132942.385:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/132948.847:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.data:  [object Object]", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133204.040:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 97307fb8-859b-4171-bef5-b479bd13217c", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133204.055:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133204.062:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133204.063:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133204.063:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.023:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.025:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.026:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.027:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.028:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 755ac83e-d5a0-497b-85e4-c3bf7a6272bc", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.028:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.028:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.028:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.028:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.282:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.284:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.286:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 9e13c10f-b174-443a-89f5-43adf225e313", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.287:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.292:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.302:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.311:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.311:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.321:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.366:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133205.369:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold начинаем проигрываание", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.531:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] e19932c9-430c-4ec8-8946-998d50ada4ea", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.531:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.531:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.531:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.629:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.648:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] e622c7a6-0117-4752-8b63-d9d47fc36423", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.649:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.649:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.649:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.649:INFO:CONSOLE:53] "Uncaught InvalidStateError: Failed to execute 'addSourceBuffer' on 'MediaSource': The MediaSource's readyState is not 'open'.", source: http://localhost:30000/src/lib/playback/hooks/useMediaSource.ts (53)
[pid=59112][err] [1117/133211.968:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.968:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.970:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] 56393d94-b1f2-4b85-a9d6-34f85ddb6edd", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.970:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.970:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.970:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.970:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.973:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.975:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Пришло обновление playback.state:  [object Object] b48b9297-1e46-4e63-96ee-3975f516a0b7", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.975:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Начинаем новый media resource", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.975:INFO:CONSOLE:42] "%c[Audio.Buffer] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Очищаем буфер", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.975:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133211.975:INFO:CONSOLE:53] "Uncaught InvalidStateError: Failed to execute 'addSourceBuffer' on 'MediaSource': The MediaSource's readyState is not 'open'.", source: http://localhost:30000/src/lib/playback/hooks/useMediaSource.ts (53)
[pid=59112][err] [1117/133212.011:INFO:CONSOLE:42] "%c[Audio.Playback] %c[WARN] color: #9b59b6; font-weight: bold color: #f39c12; font-weight: bold Требуемая позиция не буферизирована 0", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133213.961:INFO:CONSOLE:42] "%c[WebSocket] %c[INFO] color: #9b59b6; font-weight: bold color: #3498db; font-weight: bold Closed", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133216.814:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подключение", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133216.815:INFO:CONSOLE:42] "%c[WebSocket] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Восстановление подписок:  3", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133216.815:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=59112][err] [1117/133216.815:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=59112][err] [1117/133216.815:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=59112][err] [1117/133216.820:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=59112][err] [1117/133216.821:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=59112][err] [1117/133216.822:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
[pid=59112][err] [1117/133216.822:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold Подписались на /user/queue/playback .mode, .playlist, .state, .data, .event", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133216.823:INFO:CONSOLE:42] "%c[Audio.Playback] %c[DEBUG] color: #9b59b6; font-weight: bold color: #999; font-weight: bold переподключаемся к комнате", source: http://localhost:30000/src/lib/common/utils/logging/logger.ts (42)
[pid=59112][err] [1117/133216.823:INFO:CONSOLE:685] "WebSocket is already in CLOSING or CLOSED state.", source: http://localhost:30000/node_modules/.vite/deps/@stomp_stompjs.js?v=3c152b58 (685)
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