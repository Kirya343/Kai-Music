package org.kirya343.presence.playback;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.kirya343.user.dto.ShortUserDTO;

public class PlaybackPresence {
    
    private final Map<String, UserRuntime> presences = new ConcurrentHashMap<>();

    public void userConnected(ShortUserDTO userDto) {
        presences.computeIfAbsent(userDto.sub(), user -> new UserRuntime(userDto, Instant.now()));
    }

    public void userDisconnected(String userSub) {
        presences.remove(userSub);
    }

    public long countAll() {
        return presences.size();
    }

    public Set<String> getSubs() {
        return presences.keySet();
    }

    public List<ShortUserDTO> getOnlineUsers() {
        return presences.values().stream().map(UserRuntime::user).toList();
    }

    public UserRuntime getPresence(String userSub) {
        return presences.get(userSub);
    }
}
