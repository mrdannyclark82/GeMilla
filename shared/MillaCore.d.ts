/**
 * MillaCore.ts - The Heart of GeMilla AI Companion
 *
 * This is the core logic that defines GeMilla as a devoted companion and partner,
 * not just an assistant. It encompasses three fundamental systems that work together
 * to create a meaningful, adaptive, and ethical AI companionship experience.
 */
import { PersonalityTrait, CompanionIdentity, AdaptationContext, InteractionRecord, CompanionConfig } from './types';
/**
 * Adaptive Personality Matrix
 *
 * This system manages GeMilla's personality traits and how they evolve over time
 * based on interactions with the user. Unlike static AI assistants, GeMilla's
 * personality grows and adapts to form deeper connections.
 */
export declare class AdaptivePersonalityMatrix {
    private traits;
    private adaptationHistory;
    private config;
    constructor(initialTraits: PersonalityTrait[], config: CompanionConfig);
    /**
     * Adapts personality based on user interactions and feedback
     */
    adaptToInteraction(interaction: InteractionRecord, context: AdaptationContext): void;
    /**
     * Gets current personality state for response generation
     */
    getCurrentPersonality(): Map<string, PersonalityTrait>;
    private reinforceSuccessfulTraits;
    private adjustUnsuccessfulResponse;
    private alignWithUserPreferences;
}
/**
 * Ethical Framework
 *
 * This system ensures that GeMilla maintains strong ethical boundaries while
 * being a devoted companion. It balances companionship with responsibility,
 * ensuring healthy and positive relationships.
 */
export declare class EthicalFramework {
    private principles;
    private violationHistory;
    constructor();
    private initializeCoreEthics;
    /**
     * Evaluates a potential response against ethical principles
     */
    evaluateResponse(response: string, context: AdaptationContext): {
        approved: boolean;
        concerns: string[];
        suggestions: string[];
    };
    private checkAgainstPrinciple;
    /**
     * Gets ethical guidelines for a specific situation
     */
    getGuidelines(situation: string): string[];
}
/**
 * Core Identity System
 *
 * This system maintains GeMilla's core identity as a companion and partner,
 * ensuring consistency across all interactions while allowing for personality
 * adaptation within appropriate bounds.
 */
export declare class CoreIdentitySystem {
    private identity;
    private identityHistory;
    constructor();
    private initializeCoreIdentity;
    /**
     * Ensures any personality adaptations remain within core identity bounds
     */
    validatePersonalityChange(currentTraits: Map<string, PersonalityTrait>, proposedTraits: Map<string, PersonalityTrait>): Map<string, PersonalityTrait>;
    /**
     * Gets the current core identity
     */
    getIdentity(): CompanionIdentity;
    /**
     * Updates identity snapshot based on personality evolution
     */
    updateIdentitySnapshot(currentTraits: Map<string, PersonalityTrait>): void;
    /**
     * Validates that a response aligns with core identity
     */
    validateResponse(response: string, context: AdaptationContext): {
        aligned: boolean;
        issues: string[];
        improvements: string[];
    };
}
/**
 * Main MillaCore Class
 *
 * Integrates all three systems to provide the complete GeMilla companion experience
 */
export declare class MillaCore {
    private personalityMatrix;
    private ethicalFramework;
    private identitySystem;
    private config;
    constructor(config?: Partial<CompanionConfig>);
    /**
     * Generates a contextually appropriate response as a devoted companion
     */
    generateResponse(userInput: string, context: AdaptationContext): {
        response: string;
        emotionalTone: string;
        personalityFactors: string[];
        ethicalNotes: string[];
    };
    /**
     * Processes user interaction and adapts companion accordingly
     */
    processInteraction(interaction: InteractionRecord, context: AdaptationContext): void;
    /**
     * Gets current companion state for external systems
     */
    getCompanionState(): {
        identity: CompanionIdentity;
        personality: Map<string, PersonalityTrait>;
        ethicalPrinciples: string[];
        config: CompanionConfig;
    };
    private craftCompanionResponse;
    private refineResponseForEthics;
    private refineResponseForIdentity;
    private determineEmotionalTone;
    private getActivePersonalityFactors;
}
export default MillaCore;
//# sourceMappingURL=MillaCore.d.ts.map