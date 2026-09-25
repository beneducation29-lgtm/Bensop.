import { ConversationScenario } from '../types/speaking';
import { CONVERSATION_SCENARIOS } from '../data/speaking/scenarios';

class ConversationService {
  public getAllScenarios(language?: 'en' | 'zh'): ConversationScenario[] {
    if (!language) return CONVERSATION_SCENARIOS;
    return CONVERSATION_SCENARIOS.filter((s) => s.language === language);
  }

  public getScenarioBySlug(slug: string): ConversationScenario | null {
    return CONVERSATION_SCENARIOS.find((s) => s.slug === slug) || null;
  }

  public getScenarioById(id: string): ConversationScenario | null {
    return CONVERSATION_SCENARIOS.find((s) => s.id === id) || null;
  }
}

export const conversationService = new ConversationService();
