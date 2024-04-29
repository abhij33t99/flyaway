import { getFavoriteListings } from "@/actions/getFavoriteListings";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/main/EmptyState";
import FavoritesClient from "@/components/main/favorites/FavoritesClient";
import { currentUser } from "@/lib/auth";

const FavoritesPage = async () => {
  const user = await currentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorised!" subtitle="Please login" />
      </ClientOnly>
    );
  }
  const favorites = await getFavoriteListings();
  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return <ClientOnly>
    <FavoritesClient
        listings={favorites}
        currentUser={user}
    />
  </ClientOnly>;
};

export default FavoritesPage;
