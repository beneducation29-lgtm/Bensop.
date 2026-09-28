export interface BrowserSpeechResult {
  transcription: string;
  confidence: number;
}

type RecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

class BrowserSpeechRecognitionService {
  private recognition: RecognitionLike | null = null;

  public isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    const w = window as any;
    return typeof w.SpeechRecognition === 'function' || typeof w.webkitSpeechRecognition === 'function';
  }

  public listen(language: 'en' | 'zh'): Promise<BrowserSpeechResult> {
    if (!this.isSupported()) {
      return Promise.reject(new Error('Trình duyệt hiện tại chưa hỗ trợ nhận diện giọng nói. Bạn có thể dùng ô nhập văn bản.'));
    }

    return new Promise((resolve, reject) => {
      const w = window as any;
      const Recognition = w.SpeechRecognition || w.webkitSpeechRecognition;
      const recognition: RecognitionLike = new Recognition();
      this.recognition = recognition;

      // Force the recognition locale to the learning language. Chinese uses
      // Simplified Mandarin so Chrome does not silently fall back to the UI locale.
      recognition.lang = language === 'zh' ? 'zh-CN' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = language === 'zh' ? 3 : 1;

      let settled = false;
      let finalTranscript = '';
      let finalConfidence = 0;
      let lastInterim = '';

      const finish = (transcription: string, confidence = finalConfidence) => {
        const clean = transcription.replace(/\s+/g, ' ').trim();
        if (settled) return;
        if (!clean) {
          reject(new Error(language === 'zh'
            ? 'Chưa nhận được tiếng Trung. Hãy nói rõ bằng tiếng Trung phổ thông rồi thử lại.'
            : 'Không nhận được nội dung giọng nói. Hãy thử nói lại.'));
          settled = true;
          return;
        }
        settled = true;
        resolve({ transcription: clean, confidence: Number.isFinite(confidence) ? confidence : 0 });
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let confidence = finalConfidence;

        for (let i = 0; i < (event?.results?.length || 0); i += 1) {
          const alternatives = event.results[i];
          const result = alternatives?.[0];
          const transcript = typeof result?.transcript === 'string' ? result.transcript : '';
          if (alternatives?.isFinal) {
            finalTranscript += transcript;
            if (typeof result?.confidence === 'number') confidence = result.confidence;
          } else {
            interim += transcript;
          }
        }

        finalConfidence = confidence;
        lastInterim = interim.trim();

        // The browser may emit a final result before firing onend. Resolve as
        // soon as a final Chinese transcript exists so the AI can respond immediately.
        if (finalTranscript.trim()) finish(finalTranscript, finalConfidence);
      };

      recognition.onerror = (event: any) => {
        if (settled) return;
        settled = true;
        const code = event?.error;
        reject(new Error(
          code === 'not-allowed'
            ? 'Bạn chưa cấp quyền microphone cho Bensop.'
            : code === 'language-not-supported'
              ? (language === 'zh'
                ? 'Trình duyệt không hỗ trợ nhận diện tiếng Trung (zh-CN). Hãy dùng Chrome/Edge phiên bản mới.'
                : 'Trình duyệt không hỗ trợ ngôn ngữ nhận diện này.')
              : code === 'no-speech'
                ? (language === 'zh'
                  ? 'Chưa phát hiện tiếng Trung. Hãy nói rõ một câu tiếng Trung rồi thử lại.'
                  : 'Chưa phát hiện giọng nói. Hãy thử nói lại.')
                : 'Không thể nhận diện giọng nói. Hãy thử lại.'
        ));
      };

      recognition.onend = () => {
        this.recognition = null;
        if (settled) return;
        // Some Chromium versions only provide the transcript at the end event.
        finish(finalTranscript || lastInterim, finalConfidence);
      };

      try {
        recognition.start();
      } catch {
        this.recognition = null;
        reject(new Error('Không thể khởi động microphone.'));
      }
    });
  }

  public stop(): void {
    try { this.recognition?.stop(); } catch {}
    this.recognition = null;
  }
}

export const browserSpeechRecognitionService = new BrowserSpeechRecognitionService();
