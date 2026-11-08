package org.kirya343.playlist.controller;

import java.util.List;

import org.kirya343.playlist.datasource.model.Playlist;
import org.kirya343.playlist.datasource.repository.PlaylistRepository;
import org.kirya343.playlist.dto.PlaylistCreateDTO;
import org.kirya343.playlist.dto.PlaylistDTO;
import org.kirya343.playlist.dto.queue.QueueItemCreateDTO;
import org.kirya343.playlist.service.PlaylistCommandService;
import org.kirya343.security.core.annotations.controllers.Authenticated;
import org.kirya343.security.core.annotations.parameters.AuthUser;
import org.kirya343.security.core.dto.UserAuthData;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController 
@Slf4j 
@RequiredArgsConstructor 
@RequestMapping("/playlist")
public class PlaylistController {

    private final PlaylistRepository playlistRepository;
    private final PlaylistCommandService playlistCommandService;

    @GetMapping("/{playlistId}")
    @Authenticated
    public PlaylistDTO getPlaylist(
        @PathVariable Long playlistId,
        @AuthUser UserAuthData authData
    ) {
        Playlist playlist = playlistRepository.findById(playlistId).orElse(null);

        return PlaylistDTO.ofPlaylist(playlist);
    }

    @GetMapping("/my")
    @Authenticated
    public List<PlaylistDTO> getMyPlaylist(
        @AuthUser UserAuthData authData
    ) {
        List<Playlist> playlists = playlistRepository.findUserPlaylists(authData.id());

        return PlaylistDTO.ofList(playlists);
    }

    @PostMapping
    @Authenticated
    public PlaylistDTO createPlaylist(
        @RequestBody PlaylistCreateDTO dto,
        @AuthUser UserAuthData authData
    ) {
        return playlistCommandService.createPlaylist(dto, authData);
    }

    @PostMapping("/{targetPlaylistId}/import")
    @Authenticated
    public void importPlaylist(
        @PathVariable Long targetPlaylistId, 
        @RequestParam Long playlistId,
        @AuthUser UserAuthData authData
    ) {
        playlistCommandService.importPlaylist(targetPlaylistId, playlistId, authData);
    }

    @DeleteMapping("/{playlistId}")
    @Authenticated
    public void deletePlaylist(
        @PathVariable Long playlistId,
        @AuthUser UserAuthData authData
    ) {
        playlistRepository.deleteById(playlistId);
    }

    @PostMapping("/{playlistId}/queue")
    @Authenticated
    public void addToQueue(
        @PathVariable Long playlistId,
        @RequestBody List<QueueItemCreateDTO> list,
        @AuthUser UserAuthData authData
    ) {
        playlistCommandService.addQueueList(list, playlistId, authData);
    }

    @PostMapping("/liked")
    @Authenticated
    public void setAudiosLiked(
        @RequestBody List<QueueItemCreateDTO> list,
        @AuthUser UserAuthData authData
    ) {
        playlistCommandService.setAudiosLiked(list, authData);
    }

    @PostMapping("/{playlistId}/queue/rundom")
    @Authenticated
    public void addRundomTracks(
        @PathVariable Long playlistId,
        @RequestParam Integer amount,
        @AuthUser UserAuthData authData
    ) {
        playlistCommandService.addRundomTracks(amount, playlistId, authData);
    }

    @DeleteMapping("/{playlistId}/queue")
    @Authenticated
    public void removeFromQueue(
        @PathVariable Long playlistId,
        @RequestBody List<Long> list,
        @AuthUser UserAuthData authData
    ) {
        playlistCommandService.removeQueueList(list, playlistId, authData);
    }

    @DeleteMapping("/liked")
    @Authenticated
    public void unsetAudiosLiked(
        @RequestBody List<Long> list,
        @AuthUser UserAuthData authData
    ) {
        playlistCommandService.unsetAudiosLiked(list, authData);
    }
}
