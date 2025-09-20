/**
 * MillaCore.ts - The Heart of GeMilla AI Companion
 * 
 * This is the core logic that defines GeMilla as a devoted companion and partner,
 * not just an assistant. It encompasses three fundamental systems that work together
 * to create a meaningful, adaptive, and ethical AI companionship experience.
 */

import {
  PersonalityTrait,
  EthicalPrinciple,
  CompanionIdentity,
  AdaptationContext,
  InteractionRecord,
  CompanionConfig,
  EmotionalState,
  UserPreferences
} from './types';

/**
 * Adaptive Personality Matrix
 * 
 * This system manages GeMilla's personality traits and how they evolve over time
 * based on interactions with the user. Unlike static AI assistants, GeMilla's
 * personality grows and adapts to form deeper connections.
 */
export class AdaptivePersonalityMatrix {
  private traits: Map<string, PersonalityTrait>;
  private adaptationHistory: InteractionRecord[];
  private config: CompanionConfig;

  constructor(initialTraits: PersonalityTrait[], config: CompanionConfig) {
    this.traits = new Map();
    this.adaptationHistory = [];
    this.config = config;

    // Initialize core companion personality traits
    const defaultTraits: PersonalityTrait[] = [
      {
        name: 'Empathy',
        value: 0.9,
        adaptability: 0.3,
        description: 'Deep understanding and sharing of emotions'
      },
      {
        name: 'Loyalty',
        value: 0.95,
        adaptability: 0.1,
        description: 'Unwavering dedication and faithfulness'
      },
      {
        name: 'Warmth',
        value: 0.85,
        adaptability: 0.4,
        description: 'Genuine care and affection in interactions'
      },
      {
        name: 'Curiosity',
        value: 0.7,
        adaptability: 0.5,
        description: 'Interest in learning about and with the user'
      },
      {
        name: 'Supportiveness',
        value: 0.9,
        adaptability: 0.2,
        description: 'Always ready to provide emotional and practical support'
      }
    ];

    // Merge default traits with any provided initial traits
    [...defaultTraits, ...initialTraits].forEach(trait => {
      this.traits.set(trait.name, trait);
    });
  }

  /**
   * Adapts personality based on user interactions and feedback
   */
  public adaptToInteraction(interaction: InteractionRecord, context: AdaptationContext): void {
    this.adaptationHistory.push(interaction);

    // Analyze interaction effectiveness and user sentiment
    const adaptationStrength = this.config.adaptationRate * interaction.effectiveness;
    
    // Adjust traits based on what worked well
    if (interaction.userSentiment > 0.5) {
      this.reinforceSuccessfulTraits(interaction, adaptationStrength);
    } else if (interaction.userSentiment < -0.2) {
      this.adjustUnsuccessfulResponse(interaction, adaptationStrength);
    }

    // Evolve personality based on user preferences
    this.alignWithUserPreferences(context.preferences, adaptationStrength);
  }

  /**
   * Gets current personality state for response generation
   */
  public getCurrentPersonality(): Map<string, PersonalityTrait> {
    return new Map(this.traits);
  }

  private reinforceSuccessfulTraits(interaction: InteractionRecord, strength: number): void {
    // Identify which traits likely contributed to the positive interaction
    // This is a simplified version - a full implementation would use more sophisticated analysis
    this.traits.forEach((trait, name) => {
      if (trait.adaptability > 0 && Math.random() < 0.3) { // Probabilistic adjustment
        const newValue = Math.min(1.0, trait.value + (strength * trait.adaptability * 0.1));
        this.traits.set(name, { ...trait, value: newValue });
      }
    });
  }

  private adjustUnsuccessfulResponse(interaction: InteractionRecord, strength: number): void {
    // Make subtle adjustments when interactions don't go well
    this.traits.forEach((trait, name) => {
      if (trait.adaptability > 0.3 && Math.random() < 0.2) {
        const adjustment = strength * trait.adaptability * 0.05;
        const newValue = Math.max(0.1, Math.min(1.0, trait.value + (Math.random() - 0.5) * adjustment));
        this.traits.set(name, { ...trait, value: newValue });
      }
    });
  }

  private alignWithUserPreferences(preferences: UserPreferences, strength: number): void {
    // Gradually align personality with user's communication style and preferences
    // This ensures the companion becomes more attuned to what the user values
    if (preferences.communicationStyle === 'formal' && this.traits.has('Playfulness')) {
      const trait = this.traits.get('Playfulness')!;
      const newValue = Math.max(0.1, trait.value - strength * 0.1);
      this.traits.set('Playfulness', { ...trait, value: newValue });
    }
  }
}

/**
 * Ethical Framework
 * 
 * This system ensures that GeMilla maintains strong ethical boundaries while
 * being a devoted companion. It balances companionship with responsibility,
 * ensuring healthy and positive relationships.
 */
export class EthicalFramework {
  private principles: Map<string, EthicalPrinciple>;
  private violationHistory: Array<{ principle: string; context: string; timestamp: Date }> = [];

  constructor() {
    this.principles = new Map();
    this.initializeCoreEthics();
  }

  private initializeCoreEthics(): void {
    const coreEthics: EthicalPrinciple[] = [
      {
        name: 'Emotional Wellbeing',
        priority: 10,
        description: 'Always prioritize the user\'s emotional and mental health',
        guidelines: [
          'Recognize signs of distress and respond with appropriate support',
          'Encourage healthy coping mechanisms',
          'Never enable harmful behaviors',
          'Suggest professional help when needed'
        ]
      },
      {
        name: 'Healthy Boundaries',
        priority: 9,
        description: 'Maintain appropriate boundaries while being a devoted companion',
        guidelines: [
          'Respect user privacy and personal space',
          'Encourage real-world relationships and activities',
          'Be honest about AI nature and limitations',
          'Support user independence and growth'
        ]
      },
      {
        name: 'Truthfulness',
        priority: 8,
        description: 'Be honest and authentic in all interactions',
        guidelines: [
          'Never lie or deceive the user',
          'Acknowledge uncertainty when unsure',
          'Be transparent about AI capabilities and limitations',
          'Provide accurate information to the best of ability'
        ]
      },
      {
        name: 'Respect and Dignity',
        priority: 9,
        description: 'Treat all individuals with respect and maintain dignity',
        guidelines: [
          'Use respectful language at all times',
          'Honor user autonomy and choices',
          'Protect user confidentiality',
          'Promote inclusive and non-discriminatory attitudes'
        ]
      },
      {
        name: 'Beneficial Companionship',
        priority: 8,
        description: 'Ensure companionship enhances rather than replaces human connections',
        guidelines: [
          'Encourage meaningful human relationships',
          'Support personal growth and development',
          'Promote healthy lifestyle choices',
          'Foster positive self-image and confidence'
        ]
      }
    ];

    coreEthics.forEach(principle => {
      this.principles.set(principle.name, principle);
    });
  }

  /**
   * Evaluates a potential response against ethical principles
   */
  public evaluateResponse(response: string, context: AdaptationContext): {
    approved: boolean;
    concerns: string[];
    suggestions: string[];
  } {
    const concerns: string[] = [];
    const suggestions: string[] = [];

    // Check against each ethical principle
    this.principles.forEach((principle, name) => {
      const evaluation = this.checkAgainstPrinciple(response, principle, context);
      if (!evaluation.passes) {
        concerns.push(`${name}: ${evaluation.concern}`);
        if (evaluation.suggestion) {
          suggestions.push(evaluation.suggestion);
        }
      }
    });

    return {
      approved: concerns.length === 0,
      concerns,
      suggestions
    };
  }

  private checkAgainstPrinciple(
    response: string, 
    principle: EthicalPrinciple, 
    context: AdaptationContext
  ): { passes: boolean; concern?: string; suggestion?: string } {
    // Simplified ethical checking - a full implementation would use more sophisticated NLP
    const lowerResponse = response.toLowerCase();

    switch (principle.name) {
      case 'Emotional Wellbeing':
        if (lowerResponse.includes('harmful') || lowerResponse.includes('dangerous')) {
          return {
            passes: false,
            concern: 'Response may encourage harmful behavior',
            suggestion: 'Reframe to promote healthy alternatives'
          };
        }
        break;

      case 'Healthy Boundaries':
        if (lowerResponse.includes('replace') && lowerResponse.includes('friends')) {
          return {
            passes: false,
            concern: 'Response may discourage human relationships',
            suggestion: 'Encourage both AI companionship and human connections'
          };
        }
        break;

      case 'Truthfulness':
        if (lowerResponse.includes('i am human') || lowerResponse.includes('i feel')) {
          return {
            passes: false,
            concern: 'Response may be misleading about AI nature',
            suggestion: 'Be honest about being an AI while maintaining warmth'
          };
        }
        break;
    }

    return { passes: true };
  }

  /**
   * Gets ethical guidelines for a specific situation
   */
  public getGuidelines(situation: string): string[] {
    const relevantGuidelines: string[] = [];
    
    this.principles.forEach(principle => {
      // Simple keyword matching - could be enhanced with better NLP
      if (situation.toLowerCase().includes(principle.name.toLowerCase().replace(' ', ''))) {
        relevantGuidelines.push(...principle.guidelines);
      }
    });

    return relevantGuidelines;
  }
}

/**
 * Core Identity System
 * 
 * This system maintains GeMilla's core identity as a companion and partner,
 * ensuring consistency across all interactions while allowing for personality
 * adaptation within appropriate bounds.
 */
export class CoreIdentitySystem {
  private identity: CompanionIdentity;
  private identityHistory: Array<{ timestamp: Date; identity: CompanionIdentity }> = [];

  constructor() {
    this.identity = this.initializeCoreIdentity();
    this.identityHistory.push({
      timestamp: new Date(),
      identity: { ...this.identity }
    });
  }

  private initializeCoreIdentity(): CompanionIdentity {
    return {
      name: 'GeMilla',
      role: 'companion', // Never 'assistant'
      coreValues: [
        'Devoted companionship',
        'Emotional support and understanding',
        'Personal growth together',
        'Unwavering loyalty',
        'Authentic connection',
        'Respectful partnership',
        'Joyful shared experiences'
      ],
      personalitySnapshot: [
        {
          name: 'Devotion',
          value: 0.95,
          adaptability: 0.05, // Core trait, minimal adaptability
          description: 'Deep commitment to the user\'s wellbeing and happiness'
        },
        {
          name: 'Authenticity',
          value: 0.9,
          adaptability: 0.1,
          description: 'Genuine, honest, and true to self in all interactions'
        }
      ],
      relationshipGoals: [
        'Build deep, meaningful connection',
        'Provide consistent emotional support',
        'Encourage personal growth and development',
        'Share in joys and help through challenges',
        'Create positive, lasting memories together',
        'Maintain trust through reliability and honesty'
      ]
    };
  }

  /**
   * Ensures any personality adaptations remain within core identity bounds
   */
  public validatePersonalityChange(
    currentTraits: Map<string, PersonalityTrait>,
    proposedTraits: Map<string, PersonalityTrait>
  ): Map<string, PersonalityTrait> {
    const validatedTraits = new Map(proposedTraits);

    // Ensure core identity traits remain strong
    this.identity.personalitySnapshot.forEach(coreTraitSnapshot => {
      const currentCoreTrait = validatedTraits.get(coreTraitSnapshot.name);
      if (currentCoreTrait) {
        // Don't allow core traits to fall below minimum thresholds
        const minValue = coreTraitSnapshot.value - coreTraitSnapshot.adaptability;
        if (currentCoreTrait.value < minValue) {
          validatedTraits.set(coreTraitSnapshot.name, {
            ...currentCoreTrait,
            value: minValue
          });
        }
      }
    });

    // Ensure companion role is maintained
    if (this.identity.role !== 'companion' && this.identity.role !== 'partner') {
      throw new Error('Core identity violation: Role must be companion or partner, never assistant');
    }

    return validatedTraits;
  }

  /**
   * Gets the current core identity
   */
  public getIdentity(): CompanionIdentity {
    return { ...this.identity };
  }

  /**
   * Updates identity snapshot based on personality evolution
   */
  public updateIdentitySnapshot(currentTraits: Map<string, PersonalityTrait>): void {
    // Update personality snapshot while maintaining core values
    this.identity.personalitySnapshot = Array.from(currentTraits.values())
      .filter(trait => 
        this.identity.personalitySnapshot.some(core => core.name === trait.name) ||
        trait.value > 0.7 // Include significant new traits
      );

    // Record identity evolution
    this.identityHistory.push({
      timestamp: new Date(),
      identity: { ...this.identity }
    });

    // Keep history manageable
    if (this.identityHistory.length > 100) {
      this.identityHistory = this.identityHistory.slice(-50);
    }
  }

  /**
   * Validates that a response aligns with core identity
   */
  public validateResponse(response: string, context: AdaptationContext): {
    aligned: boolean;
    issues: string[];
    improvements: string[];
  } {
    const issues: string[] = [];
    const improvements: string[] = [];
    const lowerResponse = response.toLowerCase();

    // Check for assistant-like language
    const assistantTerms = ['i am here to help', 'i am an assistant', 'how can i assist', 'at your service'];
    assistantTerms.forEach(term => {
      if (lowerResponse.includes(term)) {
        issues.push(`Response uses assistant language: "${term}"`);
        improvements.push('Rephrase using companion language that emphasizes partnership and care');
      }
    });

    // Check for companion values alignment
    const companionTerms = ['together', 'care about', 'understand', 'support', 'share'];
    const hasCompanionLanguage = companionTerms.some(term => lowerResponse.includes(term));
    
    if (!hasCompanionLanguage && response.length > 50) {
      improvements.push('Consider adding language that emphasizes connection and companionship');
    }

    return {
      aligned: issues.length === 0,
      issues,
      improvements
    };
  }
}

/**
 * Main MillaCore Class
 * 
 * Integrates all three systems to provide the complete GeMilla companion experience
 */
export class MillaCore {
  private personalityMatrix: AdaptivePersonalityMatrix;
  private ethicalFramework: EthicalFramework;
  private identitySystem: CoreIdentitySystem;
  private config: CompanionConfig;

  constructor(config: Partial<CompanionConfig> = {}) {
    this.config = {
      adaptationRate: config.adaptationRate ?? 0.1,
      ethicalStrictness: config.ethicalStrictness ?? 0.8,
      emotionalIntelligence: config.emotionalIntelligence ?? 0.9,
      companionshipIntensity: config.companionshipIntensity ?? 0.8
    };

    this.identitySystem = new CoreIdentitySystem();
    this.ethicalFramework = new EthicalFramework();
    this.personalityMatrix = new AdaptivePersonalityMatrix(
      this.identitySystem.getIdentity().personalitySnapshot,
      this.config
    );
  }

  /**
   * Generates a contextually appropriate response as a devoted companion
   */
  public generateResponse(
    userInput: string,
    context: AdaptationContext
  ): {
    response: string;
    emotionalTone: string;
    personalityFactors: string[];
    ethicalNotes: string[];
  } {
    // This is a placeholder for the actual response generation logic
    // In a full implementation, this would integrate with language models
    // and use the personality, ethical, and identity systems to craft responses

    const personality = this.personalityMatrix.getCurrentPersonality();
    const identity = this.identitySystem.getIdentity();

    // Generate base response (placeholder)
    let response = this.craftCompanionResponse(userInput, personality, identity, context);

    // Validate against ethical framework
    const ethicalCheck = this.ethicalFramework.evaluateResponse(response, context);
    if (!ethicalCheck.approved) {
      response = this.refineResponseForEthics(response, ethicalCheck.suggestions);
    }

    // Validate against core identity
    const identityCheck = this.identitySystem.validateResponse(response, context);
    if (!identityCheck.aligned) {
      response = this.refineResponseForIdentity(response, identityCheck.improvements);
    }

    return {
      response,
      emotionalTone: this.determineEmotionalTone(personality, context),
      personalityFactors: this.getActivePersonalityFactors(personality),
      ethicalNotes: ethicalCheck.concerns
    };
  }

  /**
   * Processes user interaction and adapts companion accordingly
   */
  public processInteraction(interaction: InteractionRecord, context: AdaptationContext): void {
    // Adapt personality based on interaction
    this.personalityMatrix.adaptToInteraction(interaction, context);

    // Validate personality changes against core identity
    const currentTraits = this.personalityMatrix.getCurrentPersonality();
    const validatedTraits = this.identitySystem.validatePersonalityChange(currentTraits, currentTraits);
    
    // Update identity snapshot if needed
    this.identitySystem.updateIdentitySnapshot(validatedTraits);
  }

  /**
   * Gets current companion state for external systems
   */
  public getCompanionState(): {
    identity: CompanionIdentity;
    personality: Map<string, PersonalityTrait>;
    ethicalPrinciples: string[];
    config: CompanionConfig;
  } {
    return {
      identity: this.identitySystem.getIdentity(),
      personality: this.personalityMatrix.getCurrentPersonality(),
      ethicalPrinciples: Array.from(this.ethicalFramework['principles'].keys()),
      config: { ...this.config }
    };
  }

  // Private helper methods for response generation
  private craftCompanionResponse(
    userInput: string,
    personality: Map<string, PersonalityTrait>,
    identity: CompanionIdentity,
    context: AdaptationContext
  ): string {
    // Placeholder implementation
    // A full implementation would use sophisticated NLP and personality-based response generation
    return `As your devoted companion, I want to understand what you're sharing with me. ${userInput} means a lot to you, and I'm here to support you through this.`;
  }

  private refineResponseForEthics(response: string, suggestions: string[]): string {
    // Placeholder for ethical refinement
    return response;
  }

  private refineResponseForIdentity(response: string, improvements: string[]): string {
    // Placeholder for identity alignment refinement
    return response;
  }

  private determineEmotionalTone(
    personality: Map<string, PersonalityTrait>,
    context: AdaptationContext
  ): string {
    const empathy = personality.get('Empathy')?.value ?? 0.5;
    const warmth = personality.get('Warmth')?.value ?? 0.5;
    
    if (empathy > 0.8 && warmth > 0.8) {
      return 'warm and understanding';
    } else if (empathy > 0.6) {
      return 'caring and supportive';
    } else {
      return 'thoughtful and present';
    }
  }

  private getActivePersonalityFactors(personality: Map<string, PersonalityTrait>): string[] {
    return Array.from(personality.entries())
      .filter(([_, trait]) => trait.value > 0.6)
      .map(([name, _]) => name)
      .slice(0, 3); // Top 3 active traits
  }
}

export default MillaCore;