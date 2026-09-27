import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { profile, opportunity, matchResult } = body;

    // Fallback deterministic logic
    const generateFallback = () => {
      const missingSkillNames = matchResult.missingSkills.map((s: any) => s.name);
      const gap = missingSkillNames.length > 0 ? missingSkillNames[0] : 'Advanced Experience';
      
      const nextSteps = [];
      const actionPlan = [];
      
      if (missingSkillNames.length > 0) {
        nextSteps.push(`Focus on mastering ${gap}`);
        nextSteps.push(`Review the basics of ${gap} from online tutorials.`);
        
        actionPlan.push({ day: 'Day 1', task: `Understand core concepts of ${gap}`, effort: '2 hours' });
        actionPlan.push({ day: 'Day 2', task: `Build a small practice project using ${gap}`, effort: '3 hours' });
        actionPlan.push({ day: 'Day 3', task: 'Update your resume with your new learning', effort: '1 hour' });
      } else {
        nextSteps.push('Review company background before applying.');
        nextSteps.push('Prepare your portfolio for submission.');
        
        actionPlan.push({ day: 'Day 1', task: 'Tailor resume for this specific role', effort: '1 hour' });
        actionPlan.push({ day: 'Day 2', task: 'Write a strong cover letter', effort: '1 hour' });
        actionPlan.push({ day: 'Day 3', task: 'Submit application', effort: '30 mins' });
      }

      return {
        why_match: `Your background in ${matchResult.matchedSkills.join(', ')} aligns well with this opportunity.`,
        main_gap: missingSkillNames.length > 0 ? `${gap} is required at a higher proficiency.` : 'You meet the core requirements.',
        recommended_skills: missingSkillNames,
        next_steps: nextSteps,
        action_plan: actionPlan,
        is_fallback: true
      };
    };

    const apiKey = process.env.GEMINI_API_KEY;
    
    // If no API key, use fallback immediately
    if (!apiKey) {
      return NextResponse.json(generateFallback());
    }

    // Call Gemini
    const prompt = `
      You are an AI Opportunity Copilot. Analyze the student and opportunity and provide insights.
      Return ONLY valid JSON (no markdown block).
      
      Profile: ${JSON.stringify(profile)}
      Opportunity: ${JSON.stringify(opportunity)}
      Match Result: ${JSON.stringify(matchResult)}
      
      Output JSON Format:
      {
        "why_match": "Brief 1-2 sentence explanation of why they match",
        "main_gap": "Brief 1-2 sentence explanation of their biggest skill gap",
        "recommended_skills": ["Skill 1", "Skill 2"],
        "next_steps": ["Action 1", "Action 2"],
        "action_plan": [
          {"day": "Day 1", "task": "Task description", "effort": "Estimated time"}
        ]
      }
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { response_mime_type: "application/json" }
        })
      });

      if (!response.ok) {
        throw new Error('Gemini API Error');
      }

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
      
    } catch (e) {
      console.error('Gemini call failed, using fallback', e);
      return NextResponse.json(generateFallback());
    }

  } catch (error) {
    console.error('API Route Error', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
