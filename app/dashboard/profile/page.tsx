'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";
import { FiCopy, FiCheck } from "react-icons/fi";
import Note from '../../components/Note';

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  gender: string;
  api_key: string | null;
  updated_at: string;
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    api_key: ''
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/auth');
          return;
        }

        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          setProfile(profile);
          setFormData({
            full_name: profile.full_name || '',
            age: profile.age?.toString() || '',
            height: profile.height?.toString() || '',
            weight: profile.weight?.toString() || '',
            gender: profile.gender || '',
            api_key: profile.api_key || ''
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error checking auth:', error);
        router.push('/auth');
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session found');

      // Validate required fields
      if (!formData.gender) {
        throw new Error('Gender is required');
      }
      if (!formData.api_key) {
        throw new Error('API Key is required');
      }

      // Validate age if provided
      if (formData.age) {
        const age = parseInt(formData.age);
        if (isNaN(age) || age < 1 || age > 100) {
          throw new Error('Age must be between 1 and 100');
        }
      }

      // Prepare the data for update
      const updateData = {
        id: session.user.id,
        full_name: formData.full_name || null,
        age: formData.age ? parseInt(formData.age) : null,
        height: formData.height ? parseFloat(formData.height) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        gender: formData.gender,
        api_key: formData.api_key,
        updated_at: new Date().toISOString()
      };

      // Update profile in Supabase
      const { error: updateError } = await supabase
        .from('user_profiles')
        .upsert(updateData);

      if (updateError) {
        console.error('Supabase update error:', updateError);
        throw new Error(updateError.message || 'Failed to update profile');
      }

      setSuccess('Profile updated successfully');
      
      // Update local state with string values
      setFormData(prev => ({
        ...prev,
        full_name: updateData.full_name || '',
        age: updateData.age?.toString() || '',
        height: updateData.height?.toString() || '',
        weight: updateData.weight?.toString() || '',
        gender: updateData.gender,
        api_key: updateData.api_key
      }));
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-white font-space-grotesk">Profile</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded font-space-grotesk">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded font-space-grotesk">
                  {success}
                </div>
              )}

              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium text-gray-200 font-space-grotesk">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm h-12 px-4 font-space-grotesk"
                  />
                </div>

                {/* Age */}
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-200 font-space-grotesk">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    min="1"
                    max="100"
                    step="1"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm h-12 px-4 font-space-grotesk [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                {/* Height */}
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-200 font-space-grotesk">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    id="height"
                    min="0"
                    max="300"
                    step="0.1"
                    value={formData.height}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm h-12 px-4 font-space-grotesk"
                  />
                </div>

                {/* Weight */}
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-200 font-space-grotesk">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    min="0"
                    max="500"
                    step="0.1"
                    value={formData.weight}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm h-12 px-4 font-space-grotesk"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-200 font-space-grotesk">
                    Gender
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm h-12 px-4 font-space-grotesk"
                  >
                    <option value="" className="bg-gray-900 text-white">Select gender</option>
                    <option value="male" className="bg-gray-900 text-white">Male</option>
                    <option value="female" className="bg-gray-900 text-white">Female</option>
                    <option value="other" className="bg-gray-900 text-white">Other</option>
                  </select>
                </div>

                {/* API Key */}
                <div>
                  <label htmlFor="api_key" className="block text-sm font-medium text-gray-200 font-space-grotesk">
                    Gemini API Key <span className="text-red-400">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={showApiKey ? "text" : "password"}
                      name="api_key"
                      id="api_key"
                      value={formData.api_key}
                      onChange={handleChange}
                      required
                      placeholder="Enter your Gemini API key"
                      className="block w-full rounded-md bg-white/5 border border-white/10 text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm h-12 px-4 font-space-grotesk pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors duration-200"
                    >
                      {showApiKey ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-400 font-space-grotesk">
                    You can get your API key from the{' '}
                    <a
                      href="https://makersuite.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      Google AI Studio
                    </a>
                  </p>
                  <div className="mt-4">
                    <Note>
                      This application uses the gemini-2.0-flash-001 Model
                    </Note>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 text-sm font-medium text-white bg-emerald-600/80 hover:bg-emerald-600 border border-emerald-500/50 rounded-md shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 h-12 font-space-grotesk"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 