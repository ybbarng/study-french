import DelfRunner from "@/features/delf/components/DelfRunner";

export const metadata = { title: "DELF" };

interface PageProps {
  params: Promise<{ setId: string }>;
}

export default async function DelfSetPage({ params }: PageProps) {
  const { setId } = await params;
  return <DelfRunner setId={setId} />;
}
