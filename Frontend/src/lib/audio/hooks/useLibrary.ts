import { IPage } from "@/lib/common/common.types";
import { IAudio, audioService } from "@audio";
import { useSearch } from "@common";
import { AxiosProgressEvent } from "axios";
import { useCallback, useEffect, useState } from "react";

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

    const [audiosPage, setAudiosPage] = useState<IPage<IAudio> | null>(null)
    
    /** List of current uploads */
    const [loading, setLoading] = useState<boolean>(true)
    const [uploading, setUploading] = useState<IUploadingAudio[]>([]);

    const [searchQuery, setSearchQuery] = useState<string>("")
    const [page, setPage] = useState<number>(0)
    
    const loadLibrary = useCallback(async (searchQuery: string, page: number) => {
        try {
            const res = await audioService.loadLibrary(searchQuery, page, 50);

            setAudiosPage(res.data)
        } finally {
            setLoading(false)
        }
    }, [setLoading])

    useEffect(() => {
        loadLibrary(searchQuery, page)
    }, [searchQuery, page])

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
        audiosPage, loading,

        page, setPage
    };
}