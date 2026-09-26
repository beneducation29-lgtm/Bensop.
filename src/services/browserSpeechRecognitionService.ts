export interface BrowserSpeechResult {
  transcription: string;
  confidence: number;
}

type RecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
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
      recognition.lang = language === 'zh' ? 'zh-CN' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const result = event?.results?.[0]?.[0];
        const transcription = typeof result?.transcript === 'string' ? result.transcript.trim() : '';
        const confidence = Number(result?.confidence);
        if (!transcription) {
          reject(new Error('Không nhận được nội dung giọng nói. Hãy thử nói lại.'));
          return;
        }
        resolve({ transcription, confidence: Number.isFinite(confidence) ? confidence : 0 });
      };
      recognition.onerror = (event: any) => {
        reject(new Error(event?.error === 'not-allowed'
          ? 'Bạn chưa cấp quyền microphone cho Bensop.'
          : 'Không thể nhận diện giọng nói. Hãy thử lại.'));
      };
      recognition.onend = () => { this.recognition = null; };
      try { recognition.start(); } catch { this.recognition = null; reject(new Error('Không thể khởi động microphone.')); }
    });
  }

  public stop(): void {
    try { this.recognition?.stop(); } catch {}
    this.recognition = null;
  }
}

export const browserSpeechRecognitionService = new BrowserSpeechRecognitionService();