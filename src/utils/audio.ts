// Web Audio API synthesized wax-seal cracking and golden chime sound

class SoundEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Plays a crisp wax-seal fracture + golden bell sparkle chime
  playWaxSealSound(): void {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. Crackle / snap noise (burst of filtered noise)
      const bufferSize = ctx.sampleRate * 0.12; // 120ms
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.025));
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1400, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.45, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      whiteNoise.start(now);

      // 2. Resonant ceramic / wax snap click
      const oscSnap = ctx.createOscillator();
      const snapGain = ctx.createGain();
      oscSnap.type = 'triangle';
      oscSnap.frequency.setValueAtTime(420, now);
      oscSnap.frequency.exponentialRampToValueAtTime(70, now + 0.09);

      snapGain.gain.setValueAtTime(0.5, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      oscSnap.connect(snapGain);
      snapGain.connect(ctx.destination);
      oscSnap.start(now);
      oscSnap.stop(now + 0.1);

      // 3. Magical golden ethereal chime resonating outward
      const freqs = [1046.5, 1318.5, 1567.98, 2093.0]; // C6, E6, G6, C7
      freqs.forEach((freq, idx) => {
        const chimeOsc = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(freq, now + idx * 0.035);

        const chimeStart = now + idx * 0.035;
        const duration = 0.9 - idx * 0.1;
        chimeGain.gain.setValueAtTime(0.12 / (idx + 1), chimeStart);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, chimeStart + duration);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(ctx.destination);
        chimeOsc.start(chimeStart);
        chimeOsc.stop(chimeStart + duration);
      });
    } catch {
      // Audio playback fails gracefully if restricted
    }
  }
}

export const soundEngine = new SoundEngine();
