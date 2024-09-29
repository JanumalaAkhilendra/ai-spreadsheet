// src/copilotConfig.js
import CopilotKit from '@copilot-kit/react-core';

CopilotKit.init({
  apiKey: '', // Replace with your Copilot Kit API key
  model: 'text-davinci-003', // Choose the model for your use case
  temperature: 0.5, // Adjust based on response randomness needed
});

export default CopilotKit;
