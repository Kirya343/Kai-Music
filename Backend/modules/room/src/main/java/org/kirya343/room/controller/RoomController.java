package org.kirya343.room.controller;

import java.util.List;

import org.kirya343.presence.services.PresenceService;
import org.kirya343.room.services.RoomCommandService;
import org.kirya343.room.services.RoomQueryService;
import org.kirya343.room.datasource.ListeningRoom;
import org.kirya343.room.datasource.ListeningRoomRepository;
import org.kirya343.user.datasource.UserRepository;
import org.kirya343.security.core.annotations.controllers.Authenticated;
import org.kirya343.security.core.annotations.controllers.PublicEndpoint;
import org.kirya343.security.core.annotations.parameters.AuthUser;
import org.kirya343.security.core.dto.UserAuthData;
import org.kirya343.room.dto.MainPageRequest;
import org.kirya343.room.dto.RoomDTO;
import org.kirya343.room.dto.RoomUpdateDTO;
import org.kirya343.room.dto.ShortRoomDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController 
@Slf4j 
@RequiredArgsConstructor 
@RequestMapping("/room")
public class RoomController {

    private final ListeningRoomRepository listeningRoomRepository;
    private final RoomQueryService roomQueryService;
    private final PresenceService presenceService;
    private final UserRepository userRepository;
    private final RoomCommandService roomCommandService;

    @GetMapping
    @Authenticated
    public RoomDTO getCurrentRoom(@AuthUser UserAuthData authData) {
        return roomQueryService.getCurrentRoom(authData);
    }

    @PostMapping
    @Authenticated
    public void createRoom(@AuthUser UserAuthData authData) {
        roomCommandService.createRoom(authData);
    }

    @PostMapping("/join")
    @Authenticated
    public void setUserRoom(
        @RequestParam String code,
        @AuthUser UserAuthData authData
    ) {

        ListeningRoom prevRoom = listeningRoomRepository.findRoomByUserId(authData.id()).orElse(null);

        // TODO Разорвать цикл room <-> playback, сделать на ивентах

        // if (prevRoom != null) {
        //     RoomPlaybackContext context = roomPlaybackContextStore.get(prevRoom.getId());
        //     if (context != null) {
        //         context.getListeners().remove(authData.openId());
        //     }
        // }

        // ListeningRoom newRoom = listeningRoomRepository.findByCode(code).orElseThrow();

        // roomCommandService.connectUserToRoom(newRoom, authData);
    }

    @PostMapping("/leave")
    @Authenticated
    public void leaveRoom(
        @AuthUser UserAuthData authData
    ) {

        ListeningRoom room = listeningRoomRepository.findRoomByUserId(authData.id()).orElse(null);

        // TODO Разорвать цикл room <-> playback, сделать на ивентах

        // if (room != null) {
        //     RoomPlaybackContext context = roomPlaybackContextStore.get(room.getId());
        //     if (context != null) {
        //         context.getListeners().remove(authData.openId());
        //     }
        //     userAudioStreamWorkerManager.removeWorker(authData.openId());
        // }

        // log.debug("Пользователь {} покинул комнату {}", authData.name(), room.getId());
        // userRepository.updateListeningRoom(authData.id(), null);
    }

    @GetMapping("/list/page")
    @PublicEndpoint
    public MainPageRequest getMainPage() {

        List<ShortRoomDTO> rooms = listeningRoomRepository.findAllShortDTOs();
        long roomsCount = listeningRoomRepository.count();

        return new MainPageRequest(
            rooms,
            presenceService.countAll(),
            roomsCount
        );
    }

    @PatchMapping("/{roomId}")
    @Authenticated
    public void updateRoom(
        @PathVariable Long roomId,
        @RequestBody RoomUpdateDTO roomDto,
        @AuthUser UserAuthData authData
    ) {
        
        ListeningRoom room = listeningRoomRepository.findById(roomId).orElseThrow(
            () -> new EntityNotFoundException("Комнаты не существует"));

        if (roomDto.title() != null) room.setTitle(roomDto.title());

        listeningRoomRepository.save(room);
    }
}
