interface WelcomeCardProps {
    userName: string;
}

export default function WelcomeCard({ userName }: WelcomeCardProps) {
    return (
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white font-space-grotesk mb-4">
                Hi {userName}, Welcome to SymptoSense
            </h2>
            <p className="text-gray-300 font-space-grotesk">
                Your AI-powered health companion for accurate symptom analysis and personalized insights.
            </p>
        </div>
    );
} 