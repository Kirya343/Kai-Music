package org.kirya343.audio.controller;

import org.kirya343.security.core.annotations.controllers.Authenticated;
import org.kirya343.security.core.annotations.parameters.AuthUser;
import org.kirya343.security.core.dto.UserAuthData;
import org.kirya343.security.services.UserAuthDataService;
import org.kirya343.audio.dto.AudioDTO;
import org.kirya343.audio.dto.AudioUpdateDTO;
import org.kirya343.audio.services.AudioCommandService;
import org.kirya343.audio.services.AudioQueryService;
import org.kirya343.audio.services.storage.AudioFileManager;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/audio")
@RequiredArgsConstructor
public class AudioController {

    private final AudioFileManager audioFileManager;
    private final UserAuthDataService userAuthDataService;
    private final AudioCommandService audioCommandService;
    private final AudioQueryService audioQueryService;

    @GetMapping("/library")
    @Authenticated
    public List<AudioDTO> getUserLibrary(@AuthUser UserAuthData authData) {
        return audioQueryService.getUserLibrary(authData.id());
    }

    @PostMapping("/recognize/{audioId}")
    @Authenticated
    public void recognize(
        @PathVariable Long audioId, 
        @AuthUser UserAuthData authData
    ) {
        try {
            audioCommandService.recognize(audioId, authData);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/upload")
    @Authenticated
    public void uploadAudio(
        @RequestParam MultipartFile file,
        @RequestParam(required = false) String apiKey,
        @AuthUser UserAuthData authData
    ) {
        if (apiKey != null) {
            authData = userAuthDataService.load(apiKey);
        }

        audioFileManager.uploadAudio(file, authData);
    }

    @PatchMapping("/{audioId}")
    @Authenticated
    public void updateAudio(
        @PathVariable Long audioId,
        @RequestBody AudioUpdateDTO dto,
        @AuthUser UserAuthData authData
    ) {
        audioCommandService.updateAudio(audioId, dto, authData);
    }

    @DeleteMapping("/{audioId}")
    @Authenticated
    public void deleteAudio(
        @PathVariable Long audioId,
        @AuthUser UserAuthData authData
    ) {
        audioCommandService.deleteAudio(audioId);
    }
}