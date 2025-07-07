import SettingsClientPage from "@/components/settings/settings-client-page";
import { auth } from "@/lib/auth";
import { getUserInfo } from "@/lib/data/user";
import { headers } from "next/headers";

export default async function SettingsPage() {
   const session = await auth.api.getSession({
      headers: await headers(),
   });

   const user = await getUserInfo(session?.user.id as string);

   if (!user.data) {
      return <div>User not found</div>;
   }

   return <SettingsClientPage user={{ ...user.data, id: session?.user.id as string }} />;
}
