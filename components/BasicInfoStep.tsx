import { VStack, Input, Textarea, Text, SimpleGrid, Box } from "@chakra-ui/react";

interface BasicInfoData {
  headline: string;
  bio: string;
  location: string;
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
}

interface BasicInfoStepProps {
  data: BasicInfoData;
  onUpdate: (data: Partial<BasicInfoData>) => void;
}

export function BasicInfoStep({ data, onUpdate }: BasicInfoStepProps) {
  const handleChange = (field: keyof BasicInfoData, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <VStack gap={6} align="stretch">
      <Box>
        <Text fontWeight="semibold" color="gray.700" fontSize="lg" mb={4}>
          Basic Information
        </Text>
        
        <VStack gap={4} align="stretch">
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
              Professional Headline *
            </Text>
            <Input
              placeholder="e.g., Full Stack Developer | React & Node.js Expert"
              value={data.headline}
              onChange={(e) => handleChange('headline', e.target.value)}
              size="lg"
            />
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
              Professional Bio *
            </Text>
            <Textarea
              placeholder="Tell us about your professional background, expertise, and what makes you unique..."
              value={data.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              rows={4}
              resize="vertical"
            />
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
              Location
            </Text>
            <Input
              placeholder="e.g., San Francisco, CA or Remote"
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
              size="lg"
            />
          </Box>
        </VStack>
      </Box>

      <Box>
        <Text fontWeight="semibold" color="gray.700" fontSize="lg" mb={4}>
          Professional Links
        </Text>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
              LinkedIn Profile
            </Text>
            <Input
              placeholder="https://linkedin.com/in/your-profile"
              value={data.linkedinUrl}
              onChange={(e) => handleChange('linkedinUrl', e.target.value)}
              type="url"
            />
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
              GitHub Profile
            </Text>
            <Input
              placeholder="https://github.com/yourusername"
              value={data.githubUrl}
              onChange={(e) => handleChange('githubUrl', e.target.value)}
              type="url"
            />
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
              Portfolio Website
            </Text>
            <Input
              placeholder="https://yourportfolio.com"
              value={data.portfolioUrl}
              onChange={(e) => handleChange('portfolioUrl', e.target.value)}
              type="url"
            />
          </Box>
        </SimpleGrid>
      </Box>
    </VStack>
  );
}