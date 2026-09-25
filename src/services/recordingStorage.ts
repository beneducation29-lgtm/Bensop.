import { UserRecording } from '../types/speaking';

const RECORDINGS_KEY = 'bensop_user_recordings';

class RecordingStorage {
  private inMemoryBlobs: Map<string, Blob> = new Map();

  public async save(recording: Omit<UserRecording, 'id' | 'createdAt'> & { blob?: Blob }): Promise<UserRecording> {
    const id = `rec_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const createdAt = new Date().toISOString();

    if (recording.blob) {
      this.inMemoryBlobs.set(id, recording.blob);
    }

    const savedItem: UserRecording = {
      id,
      userId: recording.userId,
      activityId: recording.activityId,
      audioUrl: recording.audioUrl,
      duration: recording.duration,
      createdAt,
      evaluation: recording.evaluation
    };

    try {
      const existing = this.getAll();
      const updated = [savedItem, ...existing.slice(0, 49)]; // keep recent 50
      localStorage.setItem(RECORDINGS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to persist recording to localStorage:', e);
    }

    return savedItem;
  }

  public get(id: string): UserRecording | null {
    const list = this.getAll();
    return list.find((r) => r.id === id) || null;
  }

  public getBlob(id: string): Blob | null {
    return this.inMemoryBlobs.get(id) || null;
  }

  public getAll(): UserRecording[] {
    try {
      const data = localStorage.getItem(RECORDINGS_KEY);
      if (!data) return [];
      return JSON.parse(data) as UserRecording[];
    } catch {
      return [];
    }
  }

  public getByActivity(activityId: string): UserRecording[] {
    return this.getAll().filter((r) => r.activityId === activityId);
  }

  public delete(id: string): boolean {
    this.inMemoryBlobs.delete(id);
    try {
      const list = this.getAll().filter((r) => r.id !== id);
      localStorage.setItem(RECORDINGS_KEY, JSON.stringify(list));
      return true;
    } catch {
      return false;
    }
  }

  public clear(): void {
    this.inMemoryBlobs.clear();
    try {
      localStorage.removeItem(RECORDINGS_KEY);
    } catch {
      // ignore
    }
  }
}

export const recordingStorage = new RecordingStorage();
