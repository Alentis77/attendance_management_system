import LecturerSidebar from '@/components/LecturerSidebar';

export default function LecturerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            <LecturerSidebar />
            <main className="flex-1 overflow-y-auto p-8 pt-24 md:pt-8">{children}</main>
        </div>
    );
}
