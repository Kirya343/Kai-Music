import { IAudio, audioService } from "@audio";
import { useData, useSearch } from "@common";
import { useVirtualizer } from "@tanstack/react-virtual";
import { AxiosProgressEvent } from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface IUploadingAudio {
    file: File;
    progress: number;
    id: string;
    success?: boolean
}

/**
 * Controls data for audio library
 * 
 * Creates voids and states
 * 
 * @returns data to view the library tracks and voids to filter the list
 */
export const useLibrary = () => {

    const { audiosData } = useData();
    
    /** List of current uploads */
    const [uploading, setUploading] = useState<IUploadingAudio[]>([]);

    const { filteredList, searchQuery, setSearchQuery } = useSearch(audiosData.data);

    /** Uploads audios on server */
    const uploadAudios = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files) return;

        const fileList = Array.from(files);

        let identifiedList: { id: string, file: File}[] = [];

        for (const file of fileList) {
            const uploadId = `${file.name}-${Date.now()}`;

            setUploading(prev => [
                ...prev,
                {
                    id: uploadId,
                    file,
                    progress: 0
                }
            ]);

            identifiedList.push({id: uploadId, file})
        }

        for (const fileItem of identifiedList) {

            const file = fileItem.file;

            const formData = new FormData();
            formData.append("file", file);

            try {
                await audioService.upload(formData, (progressEvent: AxiosProgressEvent) => {
                    if (!progressEvent.total) return;

                    const percent = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );

                    setUploading(prev =>
                        prev.map(item =>
                            item.id === fileItem.id
                                ? {
                                    ...item,
                                    progress: percent,
                                    success: percent >= 100 ? true : undefined
                                }
                                : item
                        )
                    );
                });
            } catch (error) {
                setUploading(prev =>
                    prev.map(item =>
                        item.id === fileItem.id
                            ? { ...item, success: false }
                            : item
                    )
                );
            }
        }
    };

    return { 
        setSearchQuery, searchQuery, 
        uploadAudios, uploading,
        filteredList
    };
}