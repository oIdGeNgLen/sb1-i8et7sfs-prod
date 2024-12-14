export interface RenderResult {
  html: string;
  initialState: unknown;
  status: number;
}

export interface PrerenderOptions {
  template: string;
  outDir: string;
}