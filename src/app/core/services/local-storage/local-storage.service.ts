export abstract class LocalStorageService<T> {
  protected constructor(protected readonly key: string) {}

  public getItem(defaultValue: T): T {
    const storedData: string | null = localStorage.getItem(this.key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  }

  public setItem(item: T): void {
    localStorage.setItem(this.key, JSON.stringify(item));
  }

  public clearReleveFilter(): void {
    localStorage.removeItem(this.key);
  }
}
