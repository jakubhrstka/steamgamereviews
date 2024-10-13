import { ZodError, z } from "zod";

type ValidatedFields = "userId" | "appId";

export class FavoriteGameEntityValidationError extends Error {
  private errors: Record<ValidatedFields, string | undefined>;

  constructor(errors: Record<ValidatedFields, string | undefined>) {
    super("An error occured validating an item entity");
    this.errors = errors;
  }

  getErrors() {
    return this.errors;
  }
}

export class FavoriteGameEntity {
  private id?: number;
  private name?: string;
  private appId: number;
  private userId: string;

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
    const itemSchema = z.object({
      userId: z.string().min(1),
      appid: z.number().min(0),
    });

    try {
      itemSchema.parse(this);
    } catch (err) {
      const error = err as ZodError;
      const errors = error.flatten().fieldErrors;
      throw new FavoriteGameEntityValidationError({
        userId: errors.userId?.[0],
        appId: errors.appid?.[0],
      });
    }
  }
}
