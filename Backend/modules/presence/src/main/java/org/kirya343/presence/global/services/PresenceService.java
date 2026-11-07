package org.kirya343.presence.global.services;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.kirya343.presence.global.UserPresence;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class PresenceService {
    
    private final Map<String, UserPresence> presences = new ConcurrentHashMap<>();

    public void userConnected(String userSub) {
        updatePresence(userSub, UserPresence.ONLINE);
    }

    public void userDisconnected(String userSub) {
        updatePresence(userSub, UserPresence.OFFLINE);
    }

    public long countOnline() {
        return presences.values()
            .stream()
            .filter(p -> p == UserPresence.ONLINE)
            .count();
    }

    public void updatePresence(String userSub, UserPresence presence) {

        UserPresence current = presences.get(userSub);

        if (current == UserPresence.ONLINE) {
            return;
        }

        presences.put(userSub, presence);

        log.debug("Пользователь {} теперь {}", userSub, presence.toString());
    }

    public UserPresence getPresence(String userSub) {
        return presences.getOrDefault(userSub, UserPresence.OFFLINE);
    }
}
