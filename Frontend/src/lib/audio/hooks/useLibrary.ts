import { IPage } from "@/lib/common/common.types";
import { IAudio, audioService } from "@audio";
import { useCallback, useEffect, useState } from "react";

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

    return { 
        setSearchQuery, searchQuery,
        audiosPage, loading,

        page, setPage
    };
}