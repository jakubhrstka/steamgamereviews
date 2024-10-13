import { ZodError, z } from "zod";

type ValidatedFields = "userId" | "appId" | "name" | "id";

export class FavoriteGameEntityValidationError extends Error {
  private errors: Record<ValidatedFields, string | undefined>;

  constructor(errors: Record<ValidatedFields, string | undefined>) {
    super("An error occured validating an favorite game entity");
    this.errors = errors;
  }

  getErrors() {
    return this.errors;
  }
}

export class FavoriteGameEntity {
  private id?: number;
  private name?: string;
  private userId: string;
  private appId: number;

  constructor({
    id,
    name,
    appId,
    userId,
  }: {
    id?: number;
    name?: string;
    userId: string;
    appId: number;
  }) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.appId = appId;

    this.validate();
  }

  getName() {
    return this.name;
  }

  getUserId() {
    return this.userId;
  }

  getId() {
    return this.id;
  }

  getAppId() {
    return this.appId;
  }

  private validate() {
    const favoriteGameSchema = z.object({
      userId: z.string().min(1),
      appId: z.number().min(0),
      name: z.string().optional(),
      id: z.number().optional(),
    });

    try {
      favoriteGameSchema.parse(this);
    } catch (err) {
      const error = err as ZodError;
      const errors = error.flatten().fieldErrors;
      throw new FavoriteGameEntityValidationError({
        userId: errors.userId?.[0],
        appId: errors.appid?.[0],
        name: errors.name?.[0],
        id: errors.id?.[0],
      });
    }
  }
}
