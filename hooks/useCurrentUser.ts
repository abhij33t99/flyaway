import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserById } from "@/data/user";
import { SafeUser } from "@/types";

export const useCurrentUser = async () => {
    const session = useSession();
    const [user, setUser] = useState<SafeUser>();
    useEffect(() => {
        getUserById(session.data?.user?.id as string)
            .then((res: any) => {
                setUser({
                    ...res,
                    createdAt: res?.createdAt.toISOString(),
                    updatedAt: res?.updatedAt.toISOString(),
                    emailVerified: res?.emailVerified?.toISOString() || null,
                })
            })
            .catch(err => {
                throw Error(err);
            })
    }, [session]);

    return user;

}