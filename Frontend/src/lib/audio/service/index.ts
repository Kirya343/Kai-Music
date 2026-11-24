import { 
    loadAudioInfo,
    loadLibrary,
    uploadAudio,
    updateAudio,
    recognizeAudio
} from './audio.api';
import * as service from './audio.service';
// import * as hooks from './hooks';
/**
 * Service for audio-related API operations.
 */
export const audioService = {
    loadAudioInfo,
    loadLibrary,
    uploadAudio,
    updateAudio,
    recognizeAudio,
    ...service
};