import { ComingSoon } from "@/app/components/ui/coming-soon";

interface StubPageProps {
  title?: string;
}

export function StubPage({ title }: StubPageProps) {
  return (
    <div className="p-6">
      {title && (
        <h1 className="text-xl font-semibold text-[#2a6fb5] mb-4">{title}</h1>
      )}
      <ComingSoon />
    </div>
  );
}
