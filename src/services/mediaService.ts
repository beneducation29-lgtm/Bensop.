/**
 * BENSOP Media Service
 * Handles audio playback, SpeechSynthesis for English/Chinese, and audio tone utilities.
 */

class MediaService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private isSpeakingFlag: boolean = false;

  public speak(
    text: string,
    language: 'en' | 'zh',
    options?: {
      rate?: number;
      pitch?: number;
      onEnd?: () => void;
      onBoundary?: (charIndex: number) => void;
    }
  ): Promise<void> {
    return new Promise((resolve) => {
      this.stop();

      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported on this environment.');
        options?.onEnd?.();
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'zh' ? 'zh-CN' : 'en-US';
      utterance.rate = options?.rate ?? 1.0;
      utterance.pitch = options?.pitch ?? 1.0;

      // Select high quality voice if available
      const voices = window.speechSynthesis.getVoices();
      if (language === 'zh') {
        const zhVoice = voices.find(
          (v) => v.lang.startsWith('zh') || v.lang.includes('cmn') || v.lang.includes('Chinese')
        );
        if (zhVoice) utterance.voice = zhVoice;
      } else {
        const enVoice = voices.find(
          (v) => (v.lang.startsWith('en-US') || v.lang.startsWith('en')) && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium'))
        );
        if (enVoice) utterance.voice = enVoice;
      }

      utterance.onend = () => {
        this.isSpeakingFlag = false;
        this.currentUtterance = null;
        options?.onEnd?.();
        resolve();
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis utterance error:', e);
        this.isSpeakingFlag = false;
        this.currentUtterance = null;
        options?.onEnd?.();
        resolve();
      };

      if (options?.onBoundary) {
        utterance.onboundary = (e) => {
          options.onBoundary?.(e.charIndex);
        };
      }

      this.currentUtterance = utterance;
      this.isSpeakingFlag = true;
      window.speechSynthesis.speak(utterance);
    });
  }

  public playAudio(
    url: string,
    options?: {
      rate?: number;
      onTimeUpdate?: (currentTime: number, duration: number) => void;
      onEnd?: () => void;
    }
  ): HTMLAudioElement {
    this.stop();
    const audio = new Audio(url);
    this.currentAudio = audio;
    if (options?.rate) audio.playbackRate = options.rate;

    if (options?.onTimeUpdate) {
      audio.ontimeupdate = () => {
        options.onTimeUpdate?.(audio.currentTime, audio.duration || 0);
      };
    }

    if (options?.onEnd) {
      audio.onended = () => {
        options.onEnd?.();
      };
    }

    audio.play().catch((err) => {
      console.warn('Audio play error, falling back or waiting for user interaction:', err);
    });

    return audio;
  }

  public stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    this.isSpeakingFlag = false;
    this.currentUtterance = null;
  }

  public pause(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && this.isSpeakingFlag) {
      window.speechSynthesis.pause();
    }
    if (this.currentAudio) {
      this.currentAudio.pause();
    }
  }

  public resume(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
    if (this.currentAudio) {
      this.currentAudio.play().catch(() => {});
    }
  }

  public isSpeaking(): boolean {
    return this.isSpeakingFlag || (this.currentAudio ? !this.currentAudio.paused : false);
  }
}

export const mediaService = new MediaService();
