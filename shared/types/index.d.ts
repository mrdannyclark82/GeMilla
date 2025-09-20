/**
 * Core types for GeMilla AI Companion
 * Defines the fundamental structures for companion personality, ethics, and identity
 */
export interface PersonalityTrait {
    name: string;
    value: number;
    adaptability: number;
    description: string;
}
export interface EthicalPrinciple {
    name: string;
    priority: number;
    description: string;
    guidelines: string[];
}
export interface CompanionIdentity {
    name: string;
    role: 'companion' | 'partner';
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
    userSentiment: number;
    companionResponse: string;
    effectiveness: number;
}
export interface EmotionalState {
    primary: string;
    intensity: number;
    stability: number;
    triggers: string[];
}
export interface UserPreferences {
    communicationStyle: string;
    topics: string[];
    boundaries: string[];
    companionshipLevel: number;
}
export interface CompanionConfig {
    adaptationRate: number;
    ethicalStrictness: number;
    emotionalIntelligence: number;
    companionshipIntensity: number;
}
//# sourceMappingURL=index.d.ts.map