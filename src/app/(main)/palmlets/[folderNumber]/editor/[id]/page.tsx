import { getPalmlet } from "@/lib/data/palmlet";
import EditorClientPage from "@/components/palmlet/editor/editor-client-page";
import { notFound } from "next/navigation";

export default async function EditorPage({ params }: { params: { id: string, folderNumber: string } }) {
  const { id, folderNumber } = await params;

  const result = await getPalmlet(id);

  if (!result.success) {
    return notFound();
  }

  const templateData = result.data;

  return (
    <EditorClientPage
      folderNumber={folderNumber}
      id={id}
      templateData={templateData}
    />
  );
}