"use server";

import { currentUser } from "@/lib/auth";
import db from "@/lib/db";

export const getFavoriteListings = async () => {
    try{
        const user = await currentUser();
        if (!user) {
          return [];
        }
        const favorites = await db.listing.findMany({
          where: { id: { in: [...(user.favouriteIds || [])] } },
        });
      
        const safeFavorites = favorites.map(favorite => ({
          ...favorite,
          createdAt: favorite.createdAt.toISOString()
        }));
      
        return safeFavorites;
    } catch(error : any) {
        throw new Error(error);
    }
  
};
