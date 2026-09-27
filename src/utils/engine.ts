import { Profile, SkillLevel } from '../data/profile';
import { Opportunity, RequiredSkill } from '../data/opportunities';

const skillLevelValue = {
  'Beginner': 1,
  'Intermediate': 2,
  'Advanced': 3
};

export interface MatchResult {
  opportunityId: string;
  matchScore: number;
  readinessScore: number;
  potentialScore: number;
  matchedSkills: string[];
  missingSkills: RequiredSkill[];
  eligibilityMet: boolean;
  status: 'READY' | 'ALMOST READY' | 'NEEDS PREPARATION';
  priorityScore: number;
}

export function calculateMatchAndReadiness(profile: Profile, opportunity: Opportunity): MatchResult {
  // 1. Skill Match (40%)
  let skillMatchScore = 0;
  const matchedSkills: string[] = [];
  const missingSkills: RequiredSkill[] = [];
  
  if (opportunity.requiredSkills.length === 0) {
    skillMatchScore = 100;
  } else {
    let totalSkillPoints = 0;
    let earnedSkillPoints = 0;
    
    opportunity.requiredSkills.forEach(reqSkill => {
      const profileSkill = profile.skills.find(s => s.name.toLowerCase() === reqSkill.name.toLowerCase());
      
      const reqValue = skillLevelValue[reqSkill.minLevel];
      totalSkillPoints += reqValue;
      
      if (profileSkill) {
        matchedSkills.push(profileSkill.name);
        const profValue = skillLevelValue[profileSkill.level];
        // Can earn up to reqValue
        earnedSkillPoints += Math.min(profValue, reqValue);
        
        if (profValue < reqValue) {
          missingSkills.push(reqSkill);
        }
      } else {
        missingSkills.push(reqSkill);
      }
    });
    
    skillMatchScore = (earnedSkillPoints / totalSkillPoints) * 100;
  }
  
  // 2. Interest/Category Match (20%)
  let interestScore = 0;
  const isCategoryMatch = profile.preferredCategory === 'Any' || profile.preferredCategory === opportunity.category;
  const hasMatchingTag = opportunity.tags.some(tag => 
    profile.interests.some(interest => interest.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(interest.toLowerCase()))
  );
  if (isCategoryMatch) interestScore += 50;
  if (hasMatchingTag) interestScore += 50;
  
  // 3. Eligibility (15%) - Very naive check for demo
  // In a real app, this would be a structured rules engine
  let eligibilityScore = 100;
  const eligibilityMet = true; // Assume met for demo unless text explicitly says "Final year" and they are 3rd year
  if (opportunity.eligibility.toLowerCase().includes('final year') && profile.year.toLowerCase().includes('3rd')) {
    eligibilityScore = 0;
  }
  
  // 4. Career Goal Match (15%)
  let careerScore = 0;
  if (profile.careerGoal) {
    const goalTokens = profile.careerGoal.toLowerCase().split(/[ /]+/);
    const oppTokens = `${opportunity.title} ${opportunity.description}`.toLowerCase().split(/[ /]+/);
    
    const tokenMatch = goalTokens.some(token => token.length > 3 && oppTokens.includes(token));
    if (tokenMatch) {
      careerScore = 100;
    } else {
      careerScore = 40; // Default partial match
    }
  } else {
    careerScore = 100;
  }
  
  // 5. Location/Mode (10%)
  let preferenceScore = 0;
  if (profile.preferredMode === 'Any' || profile.preferredMode === opportunity.mode) {
    preferenceScore += 50;
  }
  if (profile.preferredLocation === 'Any' || opportunity.location.toLowerCase().includes(profile.preferredLocation.toLowerCase()) || opportunity.location === 'Online' || opportunity.location === 'Global') {
    preferenceScore += 50;
  }
  
  // Overall Match Score
  const matchScore = Math.round(
    (skillMatchScore * 0.40) +
    (interestScore * 0.20) +
    (eligibilityScore * 0.15) +
    (careerScore * 0.15) +
    (preferenceScore * 0.10)
  );
  
  // Readiness Score
  // Heavily weighted on having the skills at the right level, and eligibility
  let readinessScore = Math.round((skillMatchScore * 0.7) + (eligibilityScore * 0.3));
  
  // Potential Score is what they could achieve if they learn the missing skills
  let potentialScore = Math.round(((100 * 0.7) + (eligibilityScore * 0.3)));
  
  let status: 'READY' | 'ALMOST READY' | 'NEEDS PREPARATION' = 'NEEDS PREPARATION';
  if (readinessScore >= 80) status = 'READY';
  else if (readinessScore >= 50) status = 'ALMOST READY';
  
  // Deadline urgency (days left)
  const daysLeft = Math.max(0, Math.floor((new Date(opportunity.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  let urgencyScore = 0;
  if (daysLeft <= 3) urgencyScore = 100;
  else if (daysLeft <= 7) urgencyScore = 80;
  else if (daysLeft <= 14) urgencyScore = 50;
  else urgencyScore = 20;
  
  // Priority score
  const priorityScore = (matchScore * 0.5) + (readinessScore * 0.3) + (urgencyScore * 0.2);
  
  return {
    opportunityId: opportunity.id,
    matchScore,
    readinessScore,
    potentialScore,
    matchedSkills,
    missingSkills,
    eligibilityMet,
    status,
    priorityScore
  };
}
