import { Navbar } from "@/components/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentLayout({
  title,
  children,
  className,
}: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <div
        className={`min-h-[calc(100vh_-_56px)] container py-8 px-4 sm:px-8 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
