import Link from 'next/link';

export default function QuickActionsCard() {
    return (
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white font-space-grotesk mb-2">Quick Actions</h3>
            <p className="text-gray-300 font-space-grotesk mb-4">
                Start a new symptom analysis or view history
            </p>
            <Link
                href="/analysis"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 font-space-grotesk"
            >
                Start Analysis
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="ml-2 -mr-1 w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                </svg>
            </Link>
        </div>
    );
} 