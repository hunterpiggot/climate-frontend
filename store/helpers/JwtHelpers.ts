import jwt_decode from "jwt-decode";

export interface IJwtServerPayload {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number; // number of seconds after token issue before refresh token expires ('expires_in' name comes from server)
}

export interface IJwtTokenWithExpiry {
  value: string;
  expiresAt: Date;
}

export interface IJwtIdentity {
  userId: string;
  roleId: string;
}

class JwtTokenWithExpiry implements IJwtTokenWithExpiry {
  public readonly value: string;
  public readonly expiresAt: Date;

  constructor(value: string, expiresAt: Date) {
    this.value = value;
    this.expiresAt = expiresAt;
  }

  toString(): string {
    return this.value;
  }
}

class JwtState {
  private static readonly v: number = 2;

  // serializable state
  private readonly id_token: string;
  private readonly access_token: string;
  private readonly refresh_token: string;
  private readonly refresh_token_expires_at: Date;

  // computed state (no need to serialize)
  public readonly realm: string;
  public readonly identity: IJwtIdentity;
  public readonly accessToken: JwtTokenWithExpiry;
  public readonly refreshToken: JwtTokenWithExpiry;

  private constructor(
    id_token: string,
    access_token: string,
    refresh_token: string,
    refresh_token_expires_at: number
  ) {
    const {
      exp,
      realm,
      userId: userId,
      roles: roleId,
    } = jwt_decode<any>(id_token);

    if (typeof userId !== "string") {
      throw new Error(
        'JWT id_token property "biUserId" is missing or not a string'
      );
    }

    if (typeof roleId !== "string") {
      throw new Error(
        'JWT id_token property "biRoles" is missing or not a string'
      );
    }

    if (typeof realm !== "string") {
      throw new Error(
        'JWT id_token property "realm" is missing or not a string'
      );
    }

    // serializable state
    this.id_token = id_token;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
    this.refresh_token_expires_at = new Date(refresh_token_expires_at);

    // computed state
    this.realm = realm;
    this.identity = { userId, roleId };
    this.accessToken = new JwtTokenWithExpiry(
      access_token,
      new Date(exp * 1000)
    );
    this.refreshToken = new JwtTokenWithExpiry(
      refresh_token,
      this.refresh_token_expires_at
    );
  }

  serialize(): string {
    return JSON.stringify({
      v: JwtState.v,
      id_token: this.id_token,
      access_token: this.access_token,
      refresh_token: this.refresh_token,
      refresh_token_expires_at: this.refresh_token_expires_at.valueOf(),
    });
  }

  static deserialize(serialized: string): JwtState | undefined {
    if (!serialized) {
      return undefined;
    }

    let parsed;

    try {
      parsed = JSON.parse(serialized);
    } catch (e) {
      return undefined;
    }

    if (parsed.v !== JwtState.v) {
      return undefined;
    }

    const { id_token, access_token, refresh_token, refresh_token_expires_at } =
      parsed;

    if (!JwtState.checkTokenValue(id_token)) {
      return undefined;
    }

    if (!JwtState.checkTokenValue(access_token)) {
      return undefined;
    }

    if (!JwtState.checkTokenValue(refresh_token)) {
      return undefined;
    }

    if (!JwtState.checkTimestampValue(refresh_token_expires_at)) {
      return undefined;
    }

    return new JwtState(
      id_token,
      access_token,
      refresh_token,
      refresh_token_expires_at
    );
  }

  static parseServerPayload(payload: IJwtServerPayload): JwtState | undefined {
    const { id_token, access_token, refresh_token, expires_in } = payload;

    if (!JwtState.checkTokenValue(id_token)) {
      return undefined;
    }

    if (!JwtState.checkTokenValue(access_token)) {
      return undefined;
    }

    if (!JwtState.checkTokenValue(refresh_token)) {
      return undefined;
    }

    if (!JwtState.checkTimestampValue(expires_in)) {
      return undefined;
    }

    // 'exp' is a well-known JWT property indicating the timestamp when the JWT will expire (in seconds)
    // 'iat' is a well-known JWT property indicating the timestamp when the JWT was issued (in seconds)
    const { exp, iat } = jwt_decode<any>(id_token);

    if (!JwtState.checkTimestampValue(exp)) {
      return undefined;
    }

    if (!JwtState.checkTimestampValue(iat)) {
      return undefined;
    }

    const refresh_token_expires_at = (iat + expires_in) * 1000;

    return new JwtState(
      id_token,
      access_token,
      refresh_token,
      refresh_token_expires_at
    );
  }

  private static checkTokenValue(value: unknown): value is string {
    return typeof value === "string" && !!value;
  }

  private static checkTimestampValue(value: unknown): value is number {
    return typeof value === "number" && !isNaN(value) && value >= 0;
  }
}

class JwtHelpers {
  private state?: JwtState;

  constructor() {
    this.state = JwtHelpers.loadState();
  }

  hasJwt(): boolean {
    return !!this.state;
  }

  getRealm() {
    return this.state?.realm;
  }

  getIdentity() {
    return this.state?.identity;
  }

  getAccessToken() {
    return this.state?.accessToken;
  }

  getRefreshToken() {
    return this.state?.refreshToken;
  }

  updateFromServer(payload: IJwtServerPayload) {
    const state = JwtState.parseServerPayload(payload);

    this.state = state;

    JwtHelpers.saveState(state);

    return !!state;
  }

  private static saveState(state?: JwtState) {}

  private static loadState(): JwtState | undefined {
    const serialized = null;

    return !!serialized ? JwtState.deserialize(serialized) : undefined;
  }
}

const helpers = new JwtHelpers();

export { helpers as JwtHelpers };
