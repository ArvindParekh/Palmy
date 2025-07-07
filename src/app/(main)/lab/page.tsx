import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { getPalmletFolders } from "@/actions/palmlet-folder"
import LabClientPage from "@/components/lab/lab-client-page"
import { redirect } from "next/navigation"

export default async function LabPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.user?.id) {
    redirect("/auth/login")
  }

  const foldersResult = await getPalmletFolders(session.user.id)
  const folders = foldersResult.success ? foldersResult.data || [] : []

  return (
    <LabClientPage 
      folders={folders} 
      userId={session.user.id}
    />
  )
}
