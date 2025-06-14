import { ReactNode } from 'react';

interface DashboardCardProps {
    title: string;
    description: string;
    actionText: string;
    onClick: () => void;
}

export default function DashboardCard({ title, description, actionText, onClick }: DashboardCardProps) {
    return (
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white font-space-grotesk mb-2">{title}</h3>
            <p className="text-gray-300 font-space-grotesk mb-4">
                {description}
            </p>
            <button
                onClick={onClick}
                className="text-emerald-400 hover:text-emerald-300 font-space-grotesk"
            >
                {actionText} →
            </button>
        </div>
    );
} 