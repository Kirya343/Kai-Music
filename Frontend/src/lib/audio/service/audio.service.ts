import * as api from './audio.api';
import { IAudio } from '../audio.types';
import { loggerFactory } from '@common';
// import * as hooks from './hooks';
/**
 * Service for audio-related API operations.
 */
export const audioService = {
    ...api,
};


const logger = loggerFactory.getLogger("Audio.Service");

export const deleteAudio = async (audio: IAudio) => {
    const success = confirm(`Ary you sure deleting audio ${audio.name}`)

    if (success) {
        try {
            await api.deleteAudio(audio.id)
        } catch (e) {
            logger.error(e)
        }
    }
}