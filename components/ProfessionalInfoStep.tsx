import React from 'react';
import { Trash2, Plus } from 'lucide-react';

interface WorkExperienceItem {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  currentlyWorking: boolean;
}

interface ProfessionalInfoData {
  workExperience: WorkExperienceItem[];
}

interface ProfessionalInfoStepProps {
  data: ProfessionalInfoData;
  onUpdate: (data: Partial<ProfessionalInfoData>) => void;
}

export default function ProfessionalInfoStep({ data, onUpdate }: ProfessionalInfoStepProps) {
  const handleWorkExperienceChange = (index: number, field: keyof WorkExperienceItem, value: string | boolean) => {
    const updatedExperience = data.workExperience.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    onUpdate({ workExperience: updatedExperience });
  };

  const addWorkExperience = () => {
    const newExperience = {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      currentlyWorking: false,
    };
    onUpdate({ 
      workExperience: [...data.workExperience, newExperience] 
    });
  };

  const removeWorkExperience = (index: number) => {
    if (data.workExperience.length > 1) {
      const updatedExperience = data.workExperience.filter((_, i) => i !== index);
      onUpdate({ workExperience: updatedExperience });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Work Experience
        </h3>
        
        {data.workExperience.map((experience, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-700">
                Experience #{index + 1}
              </h4>
              {data.workExperience.length > 1 && (
                <button
                  type="button"
                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                  onClick={() => removeWorkExperience(index)}
                  aria-label="Remove experience"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Senior Frontend Developer"
                  value={experience.title}
                  onChange={(e) => handleWorkExperienceChange(index, 'title', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Google, Microsoft, Startup Inc."
                  value={experience.company}
                  onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={experience.startDate}
                  onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                  value={experience.endDate}
                  onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                  disabled={experience.currentlyWorking}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={experience.currentlyWorking}
                  onChange={(e) => handleWorkExperienceChange(index, 'currentlyWorking', e.target.checked)}
                />
                <span className="text-sm text-gray-700">I currently work here</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Job Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                placeholder="Describe your responsibilities, achievements, and key projects..."
                value={experience.description}
                onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                rows={3}
              />
            </div>

            {index < data.workExperience.length - 1 && (
              <hr className="mt-4 border-gray-200" />
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addWorkExperience}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-blue-300 text-blue-600 bg-white hover:bg-blue-50 rounded-md transition-colors duration-200"
        >
          <Plus size={16} />
          <span>Add Another Work Experience</span>
        </button>
      </div>
    </div>
  );
}