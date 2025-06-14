'use client';

interface SignOutButtonProps {
    className?: string;
    onSignOut: () => Promise<void>;
}

export default function SignOutButton({ 
    className = "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 font-space-grotesk",
    onSignOut 
}: SignOutButtonProps) {
    return (
        <button
            onClick={onSignOut}
            className={className}
        >
            Sign Out
        </button>
    );
} 