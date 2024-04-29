import { getListings } from "@/actions/getListings";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/main/EmptyState";
import PropertiesClient from "@/components/main/properties/PropertiesClient";
import { currentUser } from "@/lib/auth";

const PropertiesPage = async () => {
  const user = await currentUser();
  if (!user) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized!" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const listings = await getListings({
    userId: user.id,
  });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found!"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient currentUser={user} listings={listings} />
    </ClientOnly>
  );
};

export default PropertiesPage;
