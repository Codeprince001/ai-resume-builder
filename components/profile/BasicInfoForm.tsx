// Route: /components/profile/BasicInfoForm.tsx

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { BasicInfoFormData, Skill } from '@/types/profile';
import FormField from '@/components/ui/FormField';
import Button from '@/components/ui/Button';
import SkillInput from '@/components/profile/SkillInput';

const basicInfoSchema = z.object({
  headline: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
  skills: z.array(z.object({
    name: z.string().min(1, 'Skill name is required'),
    proficiency: z.number().min(1).max(5).optional(),
    years: z.number().min(0).optional(),
  })).optional().default([]),
});

interface BasicInfoFormProps {
  data: BasicInfoFormData;
  onNext: (data: BasicInfoFormData) => Promise<boolean>;
  isLoading: boolean;
}

const BasicInfoForm = ({ data, onNext, isLoading }: BasicInfoFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: data,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const onSubmit = async (formData: BasicInfoFormData) => {
    await onNext(formData);
  };

  const addSkill = () => {
    append({ name: '', proficiency: 3, years: 1 });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <FormField
            label="Professional Headline"
            placeholder="e.g., Full-Stack Developer | React & Node.js Expert"
            {...register('headline')}
            error={errors.headline?.message}
          />
        </div>

        <div className="md:col-span-2">
          <FormField
            label="Bio"
            placeholder="Tell us about yourself, your experience, and what you're passionate about..."
            multiline
            rows={4}
            {...register('bio')}
            error={errors.bio?.message}
          />
        </div>

        <FormField
          label="Location"
          placeholder="e.g., San Francisco, CA"
          {...register('location')}
          error={errors.location?.message}
        />

        <FormField
          label="LinkedIn URL"
          placeholder="https://linkedin.com/in/yourprofile"
          {...register('linkedinUrl')}
          error={errors.linkedinUrl?.message}
        />

        <FormField
          label="GitHub URL"
          placeholder="https://github.com/yourusername"
          {...register('githubUrl')}
          error={errors.githubUrl?.message}
        />

        <FormField
          label="Portfolio URL"
          placeholder="https://yourportfolio.com"
          {...register('portfolioUrl')}
          error={errors.portfolioUrl?.message}
        />
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Skills</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSkill}
            className="flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Add Skill
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-4">
              <div className="flex-1">
                <SkillInput
                  register={register}
                  index={index}
                  errors={errors}
                />
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="mt-2 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {fields.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No skills added yet. Click "Add Skill" to get started.</p>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-6 border-t">
        <Button
          type="submit"
          isLoading={isLoading}
          className="px-8"
        >
          Next Step
        </Button>
      </div>
    </form>
  );
};

export default BasicInfoForm;