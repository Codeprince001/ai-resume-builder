import { 
  VStack, 
  Input, 
  Text, 
  SimpleGrid, 
  Box, 
  Button, 
  IconButton,
  Divider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

interface EducationItem {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
}

interface SkillItem {
  name: string;
  proficiency: number;
  years: number;
}

interface EducationSkillsData {
  education: EducationItem[];
  skills: SkillItem[];
}

interface EducationSkillsStepProps {
  data: EducationSkillsData;
  onUpdate: (data: Partial<EducationSkillsData>) => void;
}

const proficiencyLabels: Record<number, string> = {
  1: "Beginner",
  2: "Basic",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert"
};

export function EducationSkillsStep({ data, onUpdate }: EducationSkillsStepProps) {
  // Education handlers
  const handleEducationChange = (index: number, field: keyof EducationItem, value: string) => {
    const updatedEducation = data.education.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    onUpdate({ education: updatedEducation });
  };

  const addEducation = () => {
    const newEducation: EducationItem = {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      grade: "",
    };
    onUpdate({ education: [...data.education, newEducation] });
  };

  const removeEducation = (index: number) => {
    if (data.education.length > 1) {
      const updatedEducation = data.education.filter((_, i) => i !== index);
      onUpdate({ education: updatedEducation });
    }
  };

  // Skills handlers
  const handleSkillChange = (index: number, field: keyof SkillItem, value: string | number) => {
    const updatedSkills = data.skills.map((skill, i) => 
      i === index ? { ...skill, [field]: value } : skill
    );
    onUpdate({ skills: updatedSkills });
  };

  const addSkill = () => {
    const newSkill: SkillItem = {
      name: "",
      proficiency: 1,
      years: 0,
    };
    onUpdate({ skills: [...data.skills, newSkill] });
  };

  const removeSkill = (index: number) => {
    if (data.skills.length > 1) {
      const updatedSkills = data.skills.filter((_, i) => i !== index);
      onUpdate({ skills: updatedSkills });
    }
  };

  return (
    <VStack spacing={8} align="stretch">
      {/* Education Section */}
      <Box>
        <Text fontWeight="semibold" color="gray.700" fontSize="lg" mb={4}>
          Education
        </Text>
        
        {data.education.map((education, index) => (
          <Box key={index} mb={6} p={4} border="1px" borderColor="gray.200" borderRadius="md">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Text fontWeight="medium" color="gray.700">
                Education #{index + 1}
              </Text>
              {data.education.length > 1 && (
                <IconButton
                  aria-label="Remove education"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => removeEducation(index)}
                />
              )}
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                  Institution *
                </Text>
                <Input
                  placeholder="e.g., Stanford University, MIT"
                  value={education.institution}
                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                />
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                  Degree *
                </Text>
                <Input
                  placeholder="e.g., Bachelor's, Master's, PhD"
                  value={education.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                />
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                  Field of Study
                </Text>
                <Input
                  placeholder="e.g., Computer Science, Engineering"
                  value={education.fieldOfStudy}
                  onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
                />
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                  Grade/GPA
                </Text>
                <Input
                  placeholder="e.g., 3.8/4.0, First Class"
                  value={education.grade}
                  onChange={(e) => handleEducationChange(index, 'grade', e.target.value)}
                />
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                  Start Date
                </Text>
                <Input
                  type="date"
                  value={education.startDate}
                  onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                />
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                  End Date
                </Text>
                <Input
                  type="date"
                  value={education.endDate}
                  onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                />
              </Box>
            </SimpleGrid>

            {index < data.education.length - 1 && <Divider mt={4} />}
          </Box>
        ))}

        <Button
          leftIcon={<AddIcon />}
          onClick={addEducation}
          variant="outline"
          colorScheme="blue"
          width="full"
          mb={6}
        >
          Add Another Education
        </Button>
      </Box>

      {/* Skills Section */}
      <Box>
        <Text fontWeight="semibold" color="gray.700" fontSize="lg" mb={4}>
          Skills & Expertise
        </Text>
        
        {data.skills.map((skill, index) => (
          <Box key={index} mb={6} p={4} border="1px" borderColor="gray.200" borderRadius="md">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Text fontWeight="medium" color="gray.700">
                Skill #{index + 1}
              </Text>
              {data.skills.length > 1 && (
                <IconButton
                  aria-label="Remove skill"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => removeSkill(index)}
                />
              )}
            </Box>

            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                  Skill Name *
                </Text>
                <Input
                  placeholder="e.g., React, Python, Project Management"
                  value={skill.name}
                  onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                />
              </Box>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                    Proficiency Level: {proficiencyLabels[skill.proficiency] || "Unknown"}
                  </Text>
                  <Slider
                    aria-label="proficiency-slider"
                    value={skill.proficiency}
                    onChange={(value) => handleSkillChange(index, 'proficiency', value)}
                    min={1}
                    max={5}
                    step={1}
                    colorScheme="blue"
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
                    Years of Experience
                  </Text>
                  <NumberInput
                    value={skill.years}
                    onChange={(valueString, valueNumber) => 
                      handleSkillChange(index, 'years', isNaN(valueNumber) ? 0 : valueNumber)
                    }
                    min={0}
                    max={50}
                    step={0.5}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
              </SimpleGrid>
            </VStack>

            {index < data.skills.length - 1 && <Divider mt={4} />}
          </Box>
        ))}

        <Button
          leftIcon={<AddIcon />}
          onClick={addSkill}
          variant="outline"
          colorScheme="blue"
          width="full"
        >
          Add Another Skill
        </Button>
      </Box>
    </VStack>
  );
}