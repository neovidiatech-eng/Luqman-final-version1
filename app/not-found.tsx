import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center text-center">
      <div>
        <p className="text-6xl font-extrabold text-primary mb-4">404</p>
        <p className="text-xl text-gray-500 mb-6">الصفحة غير موجودة</p>
        <Link href="/" className="btn-primary px-6 py-3 rounded-xl font-bold text-sm">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
