"use client";

import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

interface IUseFavourites {
    listingId?: string;
    currentUser?: SafeUser | null;
}

export const useFavourites = ({
    listingId,
    currentUser
}: IUseFavourites) => {

    const router = useRouter();
    const loginModal = useLoginModal();

    const isFavourite = useMemo(() => {
        const list = currentUser?.favouriteIds || [];

        return list.includes(listingId as string);
    }, [listingId, currentUser]);

    const toggleFavourite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;
            if (isFavourite) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }
            await request();
            router.refresh();
            toast.success('Success!');
        } catch (err) {
            toast.error('Something went wrong!');
        }
    }, [currentUser, isFavourite, loginModal, listingId, router]);

    return {
        isFavourite,
        toggleFavourite
    };
}