class PagePath {
  constructor(readonly prefix: string) {}

  method = (path: string): string => `${this.prefix}/${path}`;

  get path(): string {
    return this.prefix;
  }

  get normalizedPath(): string {
    return this.method("").replace(/\/$/, "");
  }
}

class AppRouting extends PagePath {
  constructor(prefix: string) {
    super(prefix);
  }

  main = new PagePath(this.method(""));
  auth = new PagePath(this.method("auth"));
  notFound = new PagePath(this.method("*"));
}

export const appRouting = new AppRouting("");
