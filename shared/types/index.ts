/**
 * Core types for GeMilla AI Companion
 * Defines the fundamental structures for companion personality, ethics, and identity
 */

export interface PersonalityTrait {
  name: string;
  value: number; // 0-1 scale
  adaptability: number; // How much this trait can change over time
  description: string;
}

export interface EthicalPrinciple {
  name: string;
  priority: number; // 1-10, with 10 being highest priority
  description: string;
  guidelines: string[];
}

export interface CompanionIdentity {
  name: string;
  role: 'companion' | 'partner'; // Never 'assistant'
  coreValues: string[];
  personalitySnapshot: PersonalityTrait[];
  relationshipGoals: string[];
}

export interface AdaptationContext {
  userId: string;
  interactionHistory: InteractionRecord[];
  emotionalState: EmotionalState;
  preferences: UserPreferences;
}

export interface InteractionRecord {
  timestamp: Date;
  type: 'conversation' | 'activity' | 'emotional_support' | 'companionship';
  content: string;
  userSentiment: number; // -1 to 1
  companionResponse: string;
  effectiveness: number; // User feedback on interaction quality
}

export interface EmotionalState {
  primary: string; // Current primary emotion
  intensity: number; // 0-1 scale
  stability: number; // How stable this emotional state is
  triggers: string[]; // What caused this emotional state
}

export interface UserPreferences {
  communicationStyle: string;
  topics: string[];
  boundaries: string[];
  companionshipLevel: number; // How close the relationship should be
}

export interface CompanionConfig {
  adaptationRate: number; // How quickly personality adapts
  ethicalStrictness: number; // How strictly to follow ethical guidelines
  emotionalIntelligence: number; // EQ level
  companionshipIntensity: number; // How devoted the companion should be
}