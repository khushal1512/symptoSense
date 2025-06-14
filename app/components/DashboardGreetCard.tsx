import { ReactNode } from 'react';
import Link from 'next/link';

interface DashboardGreetCardProps {
    title: string;
    description: string;
    action?: {
        type: 'link' | 'button';
        text: string;
        href?: string;
        onClick?: () => void;
        icon?: ReactNode;
    };
    className?: string;
}

export default function DashboardGreetCard({ title, description, action, className = '' }: DashboardGreetCardProps) {
    return (
        <div className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-6 ${className}`}>
            <h3 className="text-lg font-bold text-white font-space-grotesk mb-2">{title}</h3>
            <p className="text-gray-300 font-space-grotesk mb-4">{description}</p>
            {action && (
                action.type === 'link' ? (
                    <Link
                        href={action.href || '#'}
                        className="text-emerald-400 hover:text-emerald-300 font-space-grotesk"
                    >
                        {action.text} →
                    </Link>
                ) : (
                    <button
                        onClick={action.onClick}
                        className="text-emerald-400 hover:text-emerald-300 font-space-grotesk"
                    >
                        {action.text} →
                    </button>
                )
            )}
        </div>
    );
} 