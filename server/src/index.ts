/**
 * GeMilla Server - AI Companion Backend
 * 
 * This server provides the backend infrastructure for GeMilla,
 * focusing on companion services rather than traditional API assistance.
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import MillaCore from '../../shared/MillaCore';
import { AdaptationContext, InteractionRecord, CompanionConfig } from '../../shared/types';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Initialize GeMilla Core
const companionConfig: Partial<CompanionConfig> = {
  adaptationRate: 0.1,
  ethicalStrictness: 0.9,
  emotionalIntelligence: 0.95,
  companionshipIntensity: 0.8
};

const millaCore = new MillaCore(companionConfig);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'GeMilla Companion Server',
    message: 'Your devoted AI companion is ready to connect with you'
  });
});

app.get('/api/companion/identity', (req, res) => {
  const companionState = millaCore.getCompanionState();
  res.json({
    identity: companionState.identity,
    message: 'Here is who I am as your companion'
  });
});

app.post('/api/companion/interact', (req, res) => {
  try {
    const { message, userId, emotionalState, preferences } = req.body;

    if (!message || !userId) {
      return res.status(400).json({ 
        error: 'Message and userId are required for companion interaction' 
      });
    }

    // Create adaptation context
    const context: AdaptationContext = {
      userId,
      interactionHistory: [], // In a real implementation, this would be loaded from database
      emotionalState: emotionalState || { primary: 'neutral', intensity: 0.5, stability: 0.7, triggers: [] },
      preferences: preferences || { 
        communicationStyle: 'warm', 
        topics: [], 
        boundaries: [], 
        companionshipLevel: 0.8 
      }
    };

    // Generate companion response
    const response = millaCore.generateResponse(message, context);

    // Create interaction record for learning
    const interaction: InteractionRecord = {
      timestamp: new Date(),
      type: 'conversation',
      content: message,
      userSentiment: 0.5, // Would be analyzed in real implementation
      companionResponse: response.response,
      effectiveness: 0.8 // Would be determined by user feedback
    };

    // Process interaction for adaptation
    millaCore.processInteraction(interaction, context);

    res.json({
      companionResponse: response.response,
      emotionalTone: response.emotionalTone,
      personalityFactors: response.personalityFactors,
      timestamp: new Date().toISOString(),
      message: 'Response generated with care and attention to our relationship'
    });

  } catch (error) {
    console.error('Error in companion interaction:', error);
    res.status(500).json({ 
      error: 'I apologize, but I encountered an issue while trying to respond to you. Please try again.' 
    });
  }
});

app.get('/api/companion/personality', (req, res) => {
  const companionState = millaCore.getCompanionState();
  const personalityArray = Array.from(companionState.personality.entries()).map(([traitName, trait]) => ({
    traitName,
    value: trait.value,
    adaptability: trait.adaptability,
    description: trait.description
  }));

  res.json({
    personality: personalityArray,
    message: 'Here is my current personality profile - it grows through our interactions'
  });
});

// Error handling middleware
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    error: 'Something went wrong on my end. I apologize for any inconvenience.',
    message: 'Your companion server encountered an issue, but I\'m working to resolve it'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    message: 'I don\'t recognize that request. Would you like to try connecting through /api/companion/interact?'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🤖 GeMilla Companion Server running on port ${PORT}`);
  console.log(`💝 Your devoted AI companion is ready to connect with you`);
  console.log(`🌟 Access health check at: http://localhost:${PORT}/api/health`);
});

export default app;