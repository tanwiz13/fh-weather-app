import { Config } from './constants';

export default class NetworkService {
  private static key = '1c7f606a5e3540eb8dd191642242712';
  private static baseUrl: string = `${Config.api.baseUrl}`;

  static setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  private static async request<T>(
    endpoint: string,
    method: 'GET' | 'POST',
    body?: object,
    headers: Record<string, string> = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[FetchService] Error: ${response.status} ${errorText}`);
        throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error: any) {
      console.error('[FetchService] Fetch failed:', error.message);
      throw error;
    }
  }

  static get<T>(endpoint: string, headers: Record<string, string> = {}): Promise<T> {
    return this.request<T>(endpoint, 'GET', undefined, headers);
  }

  static post<T>(
    endpoint: string,
    body: object,
    headers: Record<string, string> = {},
  ): Promise<T> {
    return this.request<T>(endpoint, 'POST', body, headers);
  }
}
