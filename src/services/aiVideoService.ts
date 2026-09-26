import { AIVideoLesson, VideoScene } from '../types/content';

export interface VideoProductionManifest {
  videoId: string;
  title: string;
  format: AIVideoLesson['format'];
  voiceLanguage: AIVideoLesson['voiceLanguage'];
  totalSeconds: number;
  scenes: Array<VideoScene & { visualPrompt: string; subtitleText: string; narrationReady: boolean }>;
}

const visualStyle = 'premium editorial education, black background, high-contrast lime accents, clean typography, subtle motion graphics, realistic learning context, no clutter';

export const aiVideoService = {
  buildManifest(video: AIVideoLesson): VideoProductionManifest {
    return {
      videoId: video.id,
      title: video.title,
      format: video.format,
      voiceLanguage: video.voiceLanguage,
      totalSeconds: video.scenes.reduce((sum, scene) => sum + scene.durationSeconds, 0),
      scenes: video.scenes.map((scene) => ({
        ...scene,
        visualPrompt: visualStyle + '. Scene: ' + scene.visual + '. On-screen text: ' + scene.onScreen.join(' | ') + '.',
        subtitleText: scene.narration,
        narrationReady: Boolean(scene.narration.trim()),
      })),
    };
  },

  buildVoiceScript(video: AIVideoLesson) {
    return video.scenes.map((scene, index) => 'SCENE ' + (index + 1) + ' (' + scene.durationSeconds + 's)\n' + scene.narration).join('\n\n');
  },

  buildStoryboardPrompts(video: AIVideoLesson) {
    return video.scenes.map((scene) => ({
      sceneId: scene.id,
      prompt: visualStyle + '. ' + scene.visual + '. Include visual emphasis for: ' + scene.onScreen.join(', ') + '.',
    }));
  },
};
