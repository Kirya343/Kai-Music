import { AudioChunk } from "@audio";
import { loggerFactory } from "@common";

const logger = loggerFactory.getLogger("Playback.AudioBufferManager")

export default class AudioBufferManager {

    private sourceBuffer: SourceBuffer | null = null;
    private queue: AudioChunk[] = [];

    constructor(
        public readonly onBufferUpdate?: () => void
    ) {}

    public setSourceBuffer(sourceBuffer: SourceBuffer) {
        this.sourceBuffer = sourceBuffer;
    }

    public addChunk(chunk: AudioChunk) {
        this.queue.push(chunk);
    }

    public processQueue(streamId: string) {
        logger.debug('Собираем очередь: ', streamId);
    
        const sourceBuffer = this.sourceBuffer;

        if (!sourceBuffer || sourceBuffer.updating) {
            return;
        }

        const audioBuffer = this.getChunksToProcess(streamId);

        if (!audioBuffer) {
            return;
        }

        this.appendChunks(audioBuffer)

        logger.debug(
            'Добавлен buffer:',
            audioBuffer.map(chunk =>
                chunk.initialization
                    ? 'init'
                    : chunk.sequence
            )
        );
    }

    private getChunksToProcess(streamId: string): AudioChunk[] | null {

        const chunks = this.getStreamChunks(streamId)

        const initialization = this.initializeAudio(chunks);
        const mediaChunks = this.processMediaChunks(chunks);

        if (!initialization || mediaChunks.length === 0) {
            return null;
        }

        return [...initialization, ...mediaChunks];
    }

    private getStreamChunks(streamId: string): AudioChunk[] {
        return this.queue.filter(
            chunk => chunk.streamId === streamId
        );
    }

    private initializeAudio(chunks: AudioChunk[]): AudioChunk[] | null {
        const initializationChunk = chunks.find(
            chunk => chunk.initialization
        );

        return initializationChunk ? [initializationChunk] : null;
    }

    private processMediaChunks(chunks: AudioChunk[]): (AudioChunk[]) {
        return chunks
            .filter(chunk => !chunk.initialization)
            .sort((a, b) => a.sequence - b.sequence);
    }

    private appendChunks(chunks: AudioChunk[]) {
        const sourceBuffer = this.sourceBuffer;

        if (!sourceBuffer || sourceBuffer.updating) {
            return;
        }

        const buffer = this.createBufferByteArray(chunks);

        let offset = 0;

        for (const chunk of chunks) {
            buffer.set(chunk.bytes, offset);
            offset += chunk.bytes.byteLength;
        }

        sourceBuffer.appendBuffer(buffer);
        this.onBufferUpdate?.();
    }

    private createBufferByteArray(chunks: AudioChunk[]) {
        const totalSize = chunks.reduce(
            (size, chunk) => size + chunk.bytes.byteLength,
            0
        );

        return new Uint8Array(totalSize);
    }

    public reset() {
        this.sourceBuffer = null;
        this.queue = [];
    }
}