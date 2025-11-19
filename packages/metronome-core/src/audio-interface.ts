export interface AudioEngine {
  playClick(isDownbeat: boolean): void | Promise<void>
  prepare(): void | Promise<void>
  dispose(): void | Promise<void>
}
