// Route: /pages/profile/index.tsx or /app/profile/page.tsx

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import BasicInfoForm from '@/components/profile/BasicInfoForm';
import ProfessionalInfoForm from '@/components/profile/ProfessionalInfoForm';
import EducationInfoForm from '@/components/profile/EducationInfoForm';
import ProfileProgress from '@/components/profile/ProfileProgress';
import { ProfileData } from '@/types/profile';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    headline: '',
    bio: '',
    location: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    skills: [],
    workExperience: [],
    education: []
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated') {
      fetchProfile();
    }
  }, [status, router]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        if (data.profile) {
          setProfileData(data.profile);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const updateProfileData = (section: keyof ProfileData, data: any) => {
    setProfileData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSaveStep = async (stepData: Partial<ProfileData>) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stepData),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile data');
      }

      const result = await response.json();
      toast.success('Profile updated successfully!');
      
      // Update local state with saved data
      setProfileData(prev => ({ ...prev, ...result.profile }));
      
      return true;
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = async (stepData: Partial<ProfileData>) => {
    const success = await handleSaveStep(stepData);
    if (success && currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFinalSubmit = async (stepData: Partial<ProfileData>) => {
    const success = await handleSaveStep(stepData);
    if (success) {
      toast.success('Profile completed successfully!');
      router.push('/dashboard');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center">
              Complete Your Profile
            </h1>
            <p className="text-gray-600 text-center mt-2">
              Help us understand your background better
            </p>
          </div>

          <ProfileProgress currentStep={currentStep} totalSteps={3} />

          <div className="mt-8">
            {currentStep === 1 && (
              <BasicInfoForm
                data={{
                  headline: profileData.headline,
                  bio: profileData.bio,
                  location: profileData.location,
                  linkedinUrl: profileData.linkedinUrl,
                  githubUrl: profileData.githubUrl,
                  portfolioUrl: profileData.portfolioUrl,
                  skills: profileData.skills
                }}
                onNext={handleNextStep}
                isLoading={isLoading}
              />
            )}

            {currentStep === 2 && (
              <ProfessionalInfoForm
                data={{ workExperience: profileData.workExperience }}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
                isLoading={isLoading}
              />
            )}

            {currentStep === 3 && (
              <EducationInfoForm
                data={{ education: profileData.education }}
                onSubmit={handleFinalSubmit}
                onPrev={handlePrevStep}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;