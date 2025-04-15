
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Blog
 * 
 */
export type Blog = $Result.DefaultSelection<Prisma.$BlogPayload>
/**
 * Model Photo
 * 
 */
export type Photo = $Result.DefaultSelection<Prisma.$PhotoPayload>
/**
 * Model Poem
 * 
 */
export type Poem = $Result.DefaultSelection<Prisma.$PoemPayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model BlogTag
 * 
 */
export type BlogTag = $Result.DefaultSelection<Prisma.$BlogTagPayload>
/**
 * Model PhotoTag
 * 
 */
export type PhotoTag = $Result.DefaultSelection<Prisma.$PhotoTagPayload>
/**
 * Model Vlog
 * 
 */
export type Vlog = $Result.DefaultSelection<Prisma.$VlogPayload>
/**
 * Model VlogTag
 * 
 */
export type VlogTag = $Result.DefaultSelection<Prisma.$VlogTagPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Blogs
 * const blogs = await prisma.blog.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Blogs
   * const blogs = await prisma.blog.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.blog`: Exposes CRUD operations for the **Blog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Blogs
    * const blogs = await prisma.blog.findMany()
    * ```
    */
  get blog(): Prisma.BlogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.photo`: Exposes CRUD operations for the **Photo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Photos
    * const photos = await prisma.photo.findMany()
    * ```
    */
  get photo(): Prisma.PhotoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.poem`: Exposes CRUD operations for the **Poem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Poems
    * const poems = await prisma.poem.findMany()
    * ```
    */
  get poem(): Prisma.PoemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.blogTag`: Exposes CRUD operations for the **BlogTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlogTags
    * const blogTags = await prisma.blogTag.findMany()
    * ```
    */
  get blogTag(): Prisma.BlogTagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.photoTag`: Exposes CRUD operations for the **PhotoTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PhotoTags
    * const photoTags = await prisma.photoTag.findMany()
    * ```
    */
  get photoTag(): Prisma.PhotoTagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vlog`: Exposes CRUD operations for the **Vlog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vlogs
    * const vlogs = await prisma.vlog.findMany()
    * ```
    */
  get vlog(): Prisma.VlogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vlogTag`: Exposes CRUD operations for the **VlogTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VlogTags
    * const vlogTags = await prisma.vlogTag.findMany()
    * ```
    */
  get vlogTag(): Prisma.VlogTagDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Blog: 'Blog',
    Photo: 'Photo',
    Poem: 'Poem',
    Tag: 'Tag',
    BlogTag: 'BlogTag',
    PhotoTag: 'PhotoTag',
    Vlog: 'Vlog',
    VlogTag: 'VlogTag'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "blog" | "photo" | "poem" | "tag" | "blogTag" | "photoTag" | "vlog" | "vlogTag"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Blog: {
        payload: Prisma.$BlogPayload<ExtArgs>
        fields: Prisma.BlogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>
          }
          findFirst: {
            args: Prisma.BlogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>
          }
          findMany: {
            args: Prisma.BlogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>[]
          }
          create: {
            args: Prisma.BlogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>
          }
          createMany: {
            args: Prisma.BlogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>[]
          }
          delete: {
            args: Prisma.BlogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>
          }
          update: {
            args: Prisma.BlogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>
          }
          deleteMany: {
            args: Prisma.BlogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BlogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>[]
          }
          upsert: {
            args: Prisma.BlogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>
          }
          aggregate: {
            args: Prisma.BlogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlog>
          }
          groupBy: {
            args: Prisma.BlogGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlogGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlogCountArgs<ExtArgs>
            result: $Utils.Optional<BlogCountAggregateOutputType> | number
          }
        }
      }
      Photo: {
        payload: Prisma.$PhotoPayload<ExtArgs>
        fields: Prisma.PhotoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PhotoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PhotoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>
          }
          findFirst: {
            args: Prisma.PhotoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PhotoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>
          }
          findMany: {
            args: Prisma.PhotoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>[]
          }
          create: {
            args: Prisma.PhotoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>
          }
          createMany: {
            args: Prisma.PhotoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PhotoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>[]
          }
          delete: {
            args: Prisma.PhotoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>
          }
          update: {
            args: Prisma.PhotoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>
          }
          deleteMany: {
            args: Prisma.PhotoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PhotoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PhotoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>[]
          }
          upsert: {
            args: Prisma.PhotoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>
          }
          aggregate: {
            args: Prisma.PhotoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePhoto>
          }
          groupBy: {
            args: Prisma.PhotoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PhotoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PhotoCountArgs<ExtArgs>
            result: $Utils.Optional<PhotoCountAggregateOutputType> | number
          }
        }
      }
      Poem: {
        payload: Prisma.$PoemPayload<ExtArgs>
        fields: Prisma.PoemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PoemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PoemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload>
          }
          findFirst: {
            args: Prisma.PoemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PoemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload>
          }
          findMany: {
            args: Prisma.PoemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload>[]
          }
          create: {
            args: Prisma.PoemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload>
          }
          createMany: {
            args: Prisma.PoemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PoemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload>[]
          }
          delete: {
            args: Prisma.PoemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload>
          }
          update: {
            args: Prisma.PoemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload>
          }
          deleteMany: {
            args: Prisma.PoemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PoemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PoemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload>[]
          }
          upsert: {
            args: Prisma.PoemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoemPayload>
          }
          aggregate: {
            args: Prisma.PoemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePoem>
          }
          groupBy: {
            args: Prisma.PoemGroupByArgs<ExtArgs>
            result: $Utils.Optional<PoemGroupByOutputType>[]
          }
          count: {
            args: Prisma.PoemCountArgs<ExtArgs>
            result: $Utils.Optional<PoemCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      BlogTag: {
        payload: Prisma.$BlogTagPayload<ExtArgs>
        fields: Prisma.BlogTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlogTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlogTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload>
          }
          findFirst: {
            args: Prisma.BlogTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlogTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload>
          }
          findMany: {
            args: Prisma.BlogTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload>[]
          }
          create: {
            args: Prisma.BlogTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload>
          }
          createMany: {
            args: Prisma.BlogTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlogTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload>[]
          }
          delete: {
            args: Prisma.BlogTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload>
          }
          update: {
            args: Prisma.BlogTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload>
          }
          deleteMany: {
            args: Prisma.BlogTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlogTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BlogTagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload>[]
          }
          upsert: {
            args: Prisma.BlogTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload>
          }
          aggregate: {
            args: Prisma.BlogTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlogTag>
          }
          groupBy: {
            args: Prisma.BlogTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlogTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlogTagCountArgs<ExtArgs>
            result: $Utils.Optional<BlogTagCountAggregateOutputType> | number
          }
        }
      }
      PhotoTag: {
        payload: Prisma.$PhotoTagPayload<ExtArgs>
        fields: Prisma.PhotoTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PhotoTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PhotoTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoTagPayload>
          }
          findFirst: {
            args: Prisma.PhotoTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PhotoTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoTagPayload>
          }
          findMany: {
            args: Prisma.PhotoTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoTagPayload>[]
          }
          create: {
            args: Prisma.PhotoTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoTagPayload>
          }
          createMany: {
            args: Prisma.PhotoTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PhotoTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoTagPayload>[]
          }
          delete: {
            args: Prisma.PhotoTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoTagPayload>
          }
          update: {
            args: Prisma.PhotoTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoTagPayload>
          }
          deleteMany: {
            args: Prisma.PhotoTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PhotoTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PhotoTagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoTagPayload>[]
          }
          upsert: {
            args: Prisma.PhotoTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoTagPayload>
          }
          aggregate: {
            args: Prisma.PhotoTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePhotoTag>
          }
          groupBy: {
            args: Prisma.PhotoTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<PhotoTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.PhotoTagCountArgs<ExtArgs>
            result: $Utils.Optional<PhotoTagCountAggregateOutputType> | number
          }
        }
      }
      Vlog: {
        payload: Prisma.$VlogPayload<ExtArgs>
        fields: Prisma.VlogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VlogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VlogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogPayload>
          }
          findFirst: {
            args: Prisma.VlogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VlogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogPayload>
          }
          findMany: {
            args: Prisma.VlogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogPayload>[]
          }
          create: {
            args: Prisma.VlogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogPayload>
          }
          createMany: {
            args: Prisma.VlogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VlogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogPayload>[]
          }
          delete: {
            args: Prisma.VlogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogPayload>
          }
          update: {
            args: Prisma.VlogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogPayload>
          }
          deleteMany: {
            args: Prisma.VlogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VlogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VlogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogPayload>[]
          }
          upsert: {
            args: Prisma.VlogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogPayload>
          }
          aggregate: {
            args: Prisma.VlogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVlog>
          }
          groupBy: {
            args: Prisma.VlogGroupByArgs<ExtArgs>
            result: $Utils.Optional<VlogGroupByOutputType>[]
          }
          count: {
            args: Prisma.VlogCountArgs<ExtArgs>
            result: $Utils.Optional<VlogCountAggregateOutputType> | number
          }
        }
      }
      VlogTag: {
        payload: Prisma.$VlogTagPayload<ExtArgs>
        fields: Prisma.VlogTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VlogTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VlogTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogTagPayload>
          }
          findFirst: {
            args: Prisma.VlogTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VlogTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogTagPayload>
          }
          findMany: {
            args: Prisma.VlogTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogTagPayload>[]
          }
          create: {
            args: Prisma.VlogTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogTagPayload>
          }
          createMany: {
            args: Prisma.VlogTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VlogTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogTagPayload>[]
          }
          delete: {
            args: Prisma.VlogTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogTagPayload>
          }
          update: {
            args: Prisma.VlogTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogTagPayload>
          }
          deleteMany: {
            args: Prisma.VlogTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VlogTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VlogTagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogTagPayload>[]
          }
          upsert: {
            args: Prisma.VlogTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VlogTagPayload>
          }
          aggregate: {
            args: Prisma.VlogTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVlogTag>
          }
          groupBy: {
            args: Prisma.VlogTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<VlogTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.VlogTagCountArgs<ExtArgs>
            result: $Utils.Optional<VlogTagCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    blog?: BlogOmit
    photo?: PhotoOmit
    poem?: PoemOmit
    tag?: TagOmit
    blogTag?: BlogTagOmit
    photoTag?: PhotoTagOmit
    vlog?: VlogOmit
    vlogTag?: VlogTagOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type BlogCountOutputType
   */

  export type BlogCountOutputType = {
    tags: number
  }

  export type BlogCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | BlogCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * BlogCountOutputType without action
   */
  export type BlogCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogCountOutputType
     */
    select?: BlogCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BlogCountOutputType without action
   */
  export type BlogCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogTagWhereInput
  }


  /**
   * Count Type PhotoCountOutputType
   */

  export type PhotoCountOutputType = {
    tags: number
  }

  export type PhotoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | PhotoCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * PhotoCountOutputType without action
   */
  export type PhotoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoCountOutputType
     */
    select?: PhotoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PhotoCountOutputType without action
   */
  export type PhotoCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhotoTagWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    blogs: number
    photos: number
    vlogs: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blogs?: boolean | TagCountOutputTypeCountBlogsArgs
    photos?: boolean | TagCountOutputTypeCountPhotosArgs
    vlogs?: boolean | TagCountOutputTypeCountVlogsArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountBlogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogTagWhereInput
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountPhotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhotoTagWhereInput
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountVlogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VlogTagWhereInput
  }


  /**
   * Count Type VlogCountOutputType
   */

  export type VlogCountOutputType = {
    tags: number
  }

  export type VlogCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | VlogCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * VlogCountOutputType without action
   */
  export type VlogCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VlogCountOutputType
     */
    select?: VlogCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VlogCountOutputType without action
   */
  export type VlogCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VlogTagWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Blog
   */

  export type AggregateBlog = {
    _count: BlogCountAggregateOutputType | null
    _avg: BlogAvgAggregateOutputType | null
    _sum: BlogSumAggregateOutputType | null
    _min: BlogMinAggregateOutputType | null
    _max: BlogMaxAggregateOutputType | null
  }

  export type BlogAvgAggregateOutputType = {
    id: number | null
    priority: number | null
  }

  export type BlogSumAggregateOutputType = {
    id: number | null
    priority: number | null
  }

  export type BlogMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    slug: string | null
    content: string | null
    author: string | null
    priority: number | null
    category: string | null
    published_at: Date | null
    created_at: Date | null
    updated_at: Date | null
    is_published: boolean | null
    featured_image_url: string | null
    meta_description: string | null
    meta_keywords: string | null
  }

  export type BlogMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    slug: string | null
    content: string | null
    author: string | null
    priority: number | null
    category: string | null
    published_at: Date | null
    created_at: Date | null
    updated_at: Date | null
    is_published: boolean | null
    featured_image_url: string | null
    meta_description: string | null
    meta_keywords: string | null
  }

  export type BlogCountAggregateOutputType = {
    id: number
    title: number
    description: number
    slug: number
    content: number
    author: number
    priority: number
    category: number
    published_at: number
    created_at: number
    updated_at: number
    is_published: number
    featured_image_url: number
    meta_description: number
    meta_keywords: number
    _all: number
  }


  export type BlogAvgAggregateInputType = {
    id?: true
    priority?: true
  }

  export type BlogSumAggregateInputType = {
    id?: true
    priority?: true
  }

  export type BlogMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    slug?: true
    content?: true
    author?: true
    priority?: true
    category?: true
    published_at?: true
    created_at?: true
    updated_at?: true
    is_published?: true
    featured_image_url?: true
    meta_description?: true
    meta_keywords?: true
  }

  export type BlogMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    slug?: true
    content?: true
    author?: true
    priority?: true
    category?: true
    published_at?: true
    created_at?: true
    updated_at?: true
    is_published?: true
    featured_image_url?: true
    meta_description?: true
    meta_keywords?: true
  }

  export type BlogCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    slug?: true
    content?: true
    author?: true
    priority?: true
    category?: true
    published_at?: true
    created_at?: true
    updated_at?: true
    is_published?: true
    featured_image_url?: true
    meta_description?: true
    meta_keywords?: true
    _all?: true
  }

  export type BlogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Blog to aggregate.
     */
    where?: BlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     */
    orderBy?: BlogOrderByWithRelationInput | BlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Blogs
    **/
    _count?: true | BlogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlogMaxAggregateInputType
  }

  export type GetBlogAggregateType<T extends BlogAggregateArgs> = {
        [P in keyof T & keyof AggregateBlog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlog[P]>
      : GetScalarType<T[P], AggregateBlog[P]>
  }




  export type BlogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogWhereInput
    orderBy?: BlogOrderByWithAggregationInput | BlogOrderByWithAggregationInput[]
    by: BlogScalarFieldEnum[] | BlogScalarFieldEnum
    having?: BlogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlogCountAggregateInputType | true
    _avg?: BlogAvgAggregateInputType
    _sum?: BlogSumAggregateInputType
    _min?: BlogMinAggregateInputType
    _max?: BlogMaxAggregateInputType
  }

  export type BlogGroupByOutputType = {
    id: number
    title: string
    description: string
    slug: string
    content: string
    author: string
    priority: number
    category: string
    published_at: Date
    created_at: Date
    updated_at: Date
    is_published: boolean
    featured_image_url: string | null
    meta_description: string | null
    meta_keywords: string | null
    _count: BlogCountAggregateOutputType | null
    _avg: BlogAvgAggregateOutputType | null
    _sum: BlogSumAggregateOutputType | null
    _min: BlogMinAggregateOutputType | null
    _max: BlogMaxAggregateOutputType | null
  }

  type GetBlogGroupByPayload<T extends BlogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlogGroupByOutputType[P]>
            : GetScalarType<T[P], BlogGroupByOutputType[P]>
        }
      >
    >


  export type BlogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    slug?: boolean
    content?: boolean
    author?: boolean
    priority?: boolean
    category?: boolean
    published_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_published?: boolean
    featured_image_url?: boolean
    meta_description?: boolean
    meta_keywords?: boolean
    tags?: boolean | Blog$tagsArgs<ExtArgs>
    _count?: boolean | BlogCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blog"]>

  export type BlogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    slug?: boolean
    content?: boolean
    author?: boolean
    priority?: boolean
    category?: boolean
    published_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_published?: boolean
    featured_image_url?: boolean
    meta_description?: boolean
    meta_keywords?: boolean
  }, ExtArgs["result"]["blog"]>

  export type BlogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    slug?: boolean
    content?: boolean
    author?: boolean
    priority?: boolean
    category?: boolean
    published_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_published?: boolean
    featured_image_url?: boolean
    meta_description?: boolean
    meta_keywords?: boolean
  }, ExtArgs["result"]["blog"]>

  export type BlogSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    slug?: boolean
    content?: boolean
    author?: boolean
    priority?: boolean
    category?: boolean
    published_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_published?: boolean
    featured_image_url?: boolean
    meta_description?: boolean
    meta_keywords?: boolean
  }

  export type BlogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "slug" | "content" | "author" | "priority" | "category" | "published_at" | "created_at" | "updated_at" | "is_published" | "featured_image_url" | "meta_description" | "meta_keywords", ExtArgs["result"]["blog"]>
  export type BlogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | Blog$tagsArgs<ExtArgs>
    _count?: boolean | BlogCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BlogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BlogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BlogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Blog"
    objects: {
      tags: Prisma.$BlogTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string
      slug: string
      content: string
      author: string
      priority: number
      category: string
      published_at: Date
      created_at: Date
      updated_at: Date
      is_published: boolean
      featured_image_url: string | null
      meta_description: string | null
      meta_keywords: string | null
    }, ExtArgs["result"]["blog"]>
    composites: {}
  }

  type BlogGetPayload<S extends boolean | null | undefined | BlogDefaultArgs> = $Result.GetResult<Prisma.$BlogPayload, S>

  type BlogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlogCountAggregateInputType | true
    }

  export interface BlogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Blog'], meta: { name: 'Blog' } }
    /**
     * Find zero or one Blog that matches the filter.
     * @param {BlogFindUniqueArgs} args - Arguments to find a Blog
     * @example
     * // Get one Blog
     * const blog = await prisma.blog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlogFindUniqueArgs>(args: SelectSubset<T, BlogFindUniqueArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Blog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlogFindUniqueOrThrowArgs} args - Arguments to find a Blog
     * @example
     * // Get one Blog
     * const blog = await prisma.blog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlogFindUniqueOrThrowArgs>(args: SelectSubset<T, BlogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Blog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogFindFirstArgs} args - Arguments to find a Blog
     * @example
     * // Get one Blog
     * const blog = await prisma.blog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlogFindFirstArgs>(args?: SelectSubset<T, BlogFindFirstArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Blog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogFindFirstOrThrowArgs} args - Arguments to find a Blog
     * @example
     * // Get one Blog
     * const blog = await prisma.blog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlogFindFirstOrThrowArgs>(args?: SelectSubset<T, BlogFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Blogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Blogs
     * const blogs = await prisma.blog.findMany()
     * 
     * // Get first 10 Blogs
     * const blogs = await prisma.blog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blogWithIdOnly = await prisma.blog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlogFindManyArgs>(args?: SelectSubset<T, BlogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Blog.
     * @param {BlogCreateArgs} args - Arguments to create a Blog.
     * @example
     * // Create one Blog
     * const Blog = await prisma.blog.create({
     *   data: {
     *     // ... data to create a Blog
     *   }
     * })
     * 
     */
    create<T extends BlogCreateArgs>(args: SelectSubset<T, BlogCreateArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Blogs.
     * @param {BlogCreateManyArgs} args - Arguments to create many Blogs.
     * @example
     * // Create many Blogs
     * const blog = await prisma.blog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlogCreateManyArgs>(args?: SelectSubset<T, BlogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Blogs and returns the data saved in the database.
     * @param {BlogCreateManyAndReturnArgs} args - Arguments to create many Blogs.
     * @example
     * // Create many Blogs
     * const blog = await prisma.blog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Blogs and only return the `id`
     * const blogWithIdOnly = await prisma.blog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlogCreateManyAndReturnArgs>(args?: SelectSubset<T, BlogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Blog.
     * @param {BlogDeleteArgs} args - Arguments to delete one Blog.
     * @example
     * // Delete one Blog
     * const Blog = await prisma.blog.delete({
     *   where: {
     *     // ... filter to delete one Blog
     *   }
     * })
     * 
     */
    delete<T extends BlogDeleteArgs>(args: SelectSubset<T, BlogDeleteArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Blog.
     * @param {BlogUpdateArgs} args - Arguments to update one Blog.
     * @example
     * // Update one Blog
     * const blog = await prisma.blog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlogUpdateArgs>(args: SelectSubset<T, BlogUpdateArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Blogs.
     * @param {BlogDeleteManyArgs} args - Arguments to filter Blogs to delete.
     * @example
     * // Delete a few Blogs
     * const { count } = await prisma.blog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlogDeleteManyArgs>(args?: SelectSubset<T, BlogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Blogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Blogs
     * const blog = await prisma.blog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlogUpdateManyArgs>(args: SelectSubset<T, BlogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Blogs and returns the data updated in the database.
     * @param {BlogUpdateManyAndReturnArgs} args - Arguments to update many Blogs.
     * @example
     * // Update many Blogs
     * const blog = await prisma.blog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Blogs and only return the `id`
     * const blogWithIdOnly = await prisma.blog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BlogUpdateManyAndReturnArgs>(args: SelectSubset<T, BlogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Blog.
     * @param {BlogUpsertArgs} args - Arguments to update or create a Blog.
     * @example
     * // Update or create a Blog
     * const blog = await prisma.blog.upsert({
     *   create: {
     *     // ... data to create a Blog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Blog we want to update
     *   }
     * })
     */
    upsert<T extends BlogUpsertArgs>(args: SelectSubset<T, BlogUpsertArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Blogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogCountArgs} args - Arguments to filter Blogs to count.
     * @example
     * // Count the number of Blogs
     * const count = await prisma.blog.count({
     *   where: {
     *     // ... the filter for the Blogs we want to count
     *   }
     * })
    **/
    count<T extends BlogCountArgs>(
      args?: Subset<T, BlogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Blog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BlogAggregateArgs>(args: Subset<T, BlogAggregateArgs>): Prisma.PrismaPromise<GetBlogAggregateType<T>>

    /**
     * Group by Blog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BlogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlogGroupByArgs['orderBy'] }
        : { orderBy?: BlogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BlogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Blog model
   */
  readonly fields: BlogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Blog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tags<T extends Blog$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Blog$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Blog model
   */
  interface BlogFieldRefs {
    readonly id: FieldRef<"Blog", 'Int'>
    readonly title: FieldRef<"Blog", 'String'>
    readonly description: FieldRef<"Blog", 'String'>
    readonly slug: FieldRef<"Blog", 'String'>
    readonly content: FieldRef<"Blog", 'String'>
    readonly author: FieldRef<"Blog", 'String'>
    readonly priority: FieldRef<"Blog", 'Int'>
    readonly category: FieldRef<"Blog", 'String'>
    readonly published_at: FieldRef<"Blog", 'DateTime'>
    readonly created_at: FieldRef<"Blog", 'DateTime'>
    readonly updated_at: FieldRef<"Blog", 'DateTime'>
    readonly is_published: FieldRef<"Blog", 'Boolean'>
    readonly featured_image_url: FieldRef<"Blog", 'String'>
    readonly meta_description: FieldRef<"Blog", 'String'>
    readonly meta_keywords: FieldRef<"Blog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Blog findUnique
   */
  export type BlogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
    /**
     * Filter, which Blog to fetch.
     */
    where: BlogWhereUniqueInput
  }

  /**
   * Blog findUniqueOrThrow
   */
  export type BlogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
    /**
     * Filter, which Blog to fetch.
     */
    where: BlogWhereUniqueInput
  }

  /**
   * Blog findFirst
   */
  export type BlogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
    /**
     * Filter, which Blog to fetch.
     */
    where?: BlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     */
    orderBy?: BlogOrderByWithRelationInput | BlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blogs.
     */
    cursor?: BlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blogs.
     */
    distinct?: BlogScalarFieldEnum | BlogScalarFieldEnum[]
  }

  /**
   * Blog findFirstOrThrow
   */
  export type BlogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
    /**
     * Filter, which Blog to fetch.
     */
    where?: BlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     */
    orderBy?: BlogOrderByWithRelationInput | BlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blogs.
     */
    cursor?: BlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blogs.
     */
    distinct?: BlogScalarFieldEnum | BlogScalarFieldEnum[]
  }

  /**
   * Blog findMany
   */
  export type BlogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
    /**
     * Filter, which Blogs to fetch.
     */
    where?: BlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     */
    orderBy?: BlogOrderByWithRelationInput | BlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Blogs.
     */
    cursor?: BlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     */
    skip?: number
    distinct?: BlogScalarFieldEnum | BlogScalarFieldEnum[]
  }

  /**
   * Blog create
   */
  export type BlogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
    /**
     * The data needed to create a Blog.
     */
    data: XOR<BlogCreateInput, BlogUncheckedCreateInput>
  }

  /**
   * Blog createMany
   */
  export type BlogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Blogs.
     */
    data: BlogCreateManyInput | BlogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Blog createManyAndReturn
   */
  export type BlogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * The data used to create many Blogs.
     */
    data: BlogCreateManyInput | BlogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Blog update
   */
  export type BlogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
    /**
     * The data needed to update a Blog.
     */
    data: XOR<BlogUpdateInput, BlogUncheckedUpdateInput>
    /**
     * Choose, which Blog to update.
     */
    where: BlogWhereUniqueInput
  }

  /**
   * Blog updateMany
   */
  export type BlogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Blogs.
     */
    data: XOR<BlogUpdateManyMutationInput, BlogUncheckedUpdateManyInput>
    /**
     * Filter which Blogs to update
     */
    where?: BlogWhereInput
    /**
     * Limit how many Blogs to update.
     */
    limit?: number
  }

  /**
   * Blog updateManyAndReturn
   */
  export type BlogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * The data used to update Blogs.
     */
    data: XOR<BlogUpdateManyMutationInput, BlogUncheckedUpdateManyInput>
    /**
     * Filter which Blogs to update
     */
    where?: BlogWhereInput
    /**
     * Limit how many Blogs to update.
     */
    limit?: number
  }

  /**
   * Blog upsert
   */
  export type BlogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
    /**
     * The filter to search for the Blog to update in case it exists.
     */
    where: BlogWhereUniqueInput
    /**
     * In case the Blog found by the `where` argument doesn't exist, create a new Blog with this data.
     */
    create: XOR<BlogCreateInput, BlogUncheckedCreateInput>
    /**
     * In case the Blog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlogUpdateInput, BlogUncheckedUpdateInput>
  }

  /**
   * Blog delete
   */
  export type BlogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
    /**
     * Filter which Blog to delete.
     */
    where: BlogWhereUniqueInput
  }

  /**
   * Blog deleteMany
   */
  export type BlogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Blogs to delete
     */
    where?: BlogWhereInput
    /**
     * Limit how many Blogs to delete.
     */
    limit?: number
  }

  /**
   * Blog.tags
   */
  export type Blog$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    where?: BlogTagWhereInput
    orderBy?: BlogTagOrderByWithRelationInput | BlogTagOrderByWithRelationInput[]
    cursor?: BlogTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlogTagScalarFieldEnum | BlogTagScalarFieldEnum[]
  }

  /**
   * Blog without action
   */
  export type BlogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
  }


  /**
   * Model Photo
   */

  export type AggregatePhoto = {
    _count: PhotoCountAggregateOutputType | null
    _avg: PhotoAvgAggregateOutputType | null
    _sum: PhotoSumAggregateOutputType | null
    _min: PhotoMinAggregateOutputType | null
    _max: PhotoMaxAggregateOutputType | null
  }

  export type PhotoAvgAggregateOutputType = {
    id: number | null
  }

  export type PhotoSumAggregateOutputType = {
    id: number | null
  }

  export type PhotoMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    file_url: string | null
    taken_at: Date | null
    uploaded_at: Date | null
    created_at: Date | null
    updated_at: Date | null
    location: string | null
  }

  export type PhotoMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    file_url: string | null
    taken_at: Date | null
    uploaded_at: Date | null
    created_at: Date | null
    updated_at: Date | null
    location: string | null
  }

  export type PhotoCountAggregateOutputType = {
    id: number
    title: number
    description: number
    file_url: number
    taken_at: number
    uploaded_at: number
    created_at: number
    updated_at: number
    location: number
    _all: number
  }


  export type PhotoAvgAggregateInputType = {
    id?: true
  }

  export type PhotoSumAggregateInputType = {
    id?: true
  }

  export type PhotoMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    file_url?: true
    taken_at?: true
    uploaded_at?: true
    created_at?: true
    updated_at?: true
    location?: true
  }

  export type PhotoMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    file_url?: true
    taken_at?: true
    uploaded_at?: true
    created_at?: true
    updated_at?: true
    location?: true
  }

  export type PhotoCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    file_url?: true
    taken_at?: true
    uploaded_at?: true
    created_at?: true
    updated_at?: true
    location?: true
    _all?: true
  }

  export type PhotoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Photo to aggregate.
     */
    where?: PhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Photos to fetch.
     */
    orderBy?: PhotoOrderByWithRelationInput | PhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Photos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Photos
    **/
    _count?: true | PhotoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PhotoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PhotoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PhotoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PhotoMaxAggregateInputType
  }

  export type GetPhotoAggregateType<T extends PhotoAggregateArgs> = {
        [P in keyof T & keyof AggregatePhoto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePhoto[P]>
      : GetScalarType<T[P], AggregatePhoto[P]>
  }




  export type PhotoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhotoWhereInput
    orderBy?: PhotoOrderByWithAggregationInput | PhotoOrderByWithAggregationInput[]
    by: PhotoScalarFieldEnum[] | PhotoScalarFieldEnum
    having?: PhotoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PhotoCountAggregateInputType | true
    _avg?: PhotoAvgAggregateInputType
    _sum?: PhotoSumAggregateInputType
    _min?: PhotoMinAggregateInputType
    _max?: PhotoMaxAggregateInputType
  }

  export type PhotoGroupByOutputType = {
    id: number
    title: string | null
    description: string | null
    file_url: string
    taken_at: Date | null
    uploaded_at: Date
    created_at: Date
    updated_at: Date
    location: string | null
    _count: PhotoCountAggregateOutputType | null
    _avg: PhotoAvgAggregateOutputType | null
    _sum: PhotoSumAggregateOutputType | null
    _min: PhotoMinAggregateOutputType | null
    _max: PhotoMaxAggregateOutputType | null
  }

  type GetPhotoGroupByPayload<T extends PhotoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PhotoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PhotoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PhotoGroupByOutputType[P]>
            : GetScalarType<T[P], PhotoGroupByOutputType[P]>
        }
      >
    >


  export type PhotoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    file_url?: boolean
    taken_at?: boolean
    uploaded_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    location?: boolean
    tags?: boolean | Photo$tagsArgs<ExtArgs>
    _count?: boolean | PhotoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["photo"]>

  export type PhotoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    file_url?: boolean
    taken_at?: boolean
    uploaded_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    location?: boolean
  }, ExtArgs["result"]["photo"]>

  export type PhotoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    file_url?: boolean
    taken_at?: boolean
    uploaded_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    location?: boolean
  }, ExtArgs["result"]["photo"]>

  export type PhotoSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    file_url?: boolean
    taken_at?: boolean
    uploaded_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    location?: boolean
  }

  export type PhotoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "file_url" | "taken_at" | "uploaded_at" | "created_at" | "updated_at" | "location", ExtArgs["result"]["photo"]>
  export type PhotoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | Photo$tagsArgs<ExtArgs>
    _count?: boolean | PhotoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PhotoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PhotoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PhotoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Photo"
    objects: {
      tags: Prisma.$PhotoTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string | null
      description: string | null
      file_url: string
      taken_at: Date | null
      uploaded_at: Date
      created_at: Date
      updated_at: Date
      location: string | null
    }, ExtArgs["result"]["photo"]>
    composites: {}
  }

  type PhotoGetPayload<S extends boolean | null | undefined | PhotoDefaultArgs> = $Result.GetResult<Prisma.$PhotoPayload, S>

  type PhotoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PhotoCountAggregateInputType | true
    }

  export interface PhotoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Photo'], meta: { name: 'Photo' } }
    /**
     * Find zero or one Photo that matches the filter.
     * @param {PhotoFindUniqueArgs} args - Arguments to find a Photo
     * @example
     * // Get one Photo
     * const photo = await prisma.photo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PhotoFindUniqueArgs>(args: SelectSubset<T, PhotoFindUniqueArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Photo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PhotoFindUniqueOrThrowArgs} args - Arguments to find a Photo
     * @example
     * // Get one Photo
     * const photo = await prisma.photo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PhotoFindUniqueOrThrowArgs>(args: SelectSubset<T, PhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Photo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoFindFirstArgs} args - Arguments to find a Photo
     * @example
     * // Get one Photo
     * const photo = await prisma.photo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PhotoFindFirstArgs>(args?: SelectSubset<T, PhotoFindFirstArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Photo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoFindFirstOrThrowArgs} args - Arguments to find a Photo
     * @example
     * // Get one Photo
     * const photo = await prisma.photo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PhotoFindFirstOrThrowArgs>(args?: SelectSubset<T, PhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Photos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Photos
     * const photos = await prisma.photo.findMany()
     * 
     * // Get first 10 Photos
     * const photos = await prisma.photo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const photoWithIdOnly = await prisma.photo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PhotoFindManyArgs>(args?: SelectSubset<T, PhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Photo.
     * @param {PhotoCreateArgs} args - Arguments to create a Photo.
     * @example
     * // Create one Photo
     * const Photo = await prisma.photo.create({
     *   data: {
     *     // ... data to create a Photo
     *   }
     * })
     * 
     */
    create<T extends PhotoCreateArgs>(args: SelectSubset<T, PhotoCreateArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Photos.
     * @param {PhotoCreateManyArgs} args - Arguments to create many Photos.
     * @example
     * // Create many Photos
     * const photo = await prisma.photo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PhotoCreateManyArgs>(args?: SelectSubset<T, PhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Photos and returns the data saved in the database.
     * @param {PhotoCreateManyAndReturnArgs} args - Arguments to create many Photos.
     * @example
     * // Create many Photos
     * const photo = await prisma.photo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Photos and only return the `id`
     * const photoWithIdOnly = await prisma.photo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PhotoCreateManyAndReturnArgs>(args?: SelectSubset<T, PhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Photo.
     * @param {PhotoDeleteArgs} args - Arguments to delete one Photo.
     * @example
     * // Delete one Photo
     * const Photo = await prisma.photo.delete({
     *   where: {
     *     // ... filter to delete one Photo
     *   }
     * })
     * 
     */
    delete<T extends PhotoDeleteArgs>(args: SelectSubset<T, PhotoDeleteArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Photo.
     * @param {PhotoUpdateArgs} args - Arguments to update one Photo.
     * @example
     * // Update one Photo
     * const photo = await prisma.photo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PhotoUpdateArgs>(args: SelectSubset<T, PhotoUpdateArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Photos.
     * @param {PhotoDeleteManyArgs} args - Arguments to filter Photos to delete.
     * @example
     * // Delete a few Photos
     * const { count } = await prisma.photo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PhotoDeleteManyArgs>(args?: SelectSubset<T, PhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Photos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Photos
     * const photo = await prisma.photo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PhotoUpdateManyArgs>(args: SelectSubset<T, PhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Photos and returns the data updated in the database.
     * @param {PhotoUpdateManyAndReturnArgs} args - Arguments to update many Photos.
     * @example
     * // Update many Photos
     * const photo = await prisma.photo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Photos and only return the `id`
     * const photoWithIdOnly = await prisma.photo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PhotoUpdateManyAndReturnArgs>(args: SelectSubset<T, PhotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Photo.
     * @param {PhotoUpsertArgs} args - Arguments to update or create a Photo.
     * @example
     * // Update or create a Photo
     * const photo = await prisma.photo.upsert({
     *   create: {
     *     // ... data to create a Photo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Photo we want to update
     *   }
     * })
     */
    upsert<T extends PhotoUpsertArgs>(args: SelectSubset<T, PhotoUpsertArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Photos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoCountArgs} args - Arguments to filter Photos to count.
     * @example
     * // Count the number of Photos
     * const count = await prisma.photo.count({
     *   where: {
     *     // ... the filter for the Photos we want to count
     *   }
     * })
    **/
    count<T extends PhotoCountArgs>(
      args?: Subset<T, PhotoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PhotoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Photo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PhotoAggregateArgs>(args: Subset<T, PhotoAggregateArgs>): Prisma.PrismaPromise<GetPhotoAggregateType<T>>

    /**
     * Group by Photo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PhotoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PhotoGroupByArgs['orderBy'] }
        : { orderBy?: PhotoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Photo model
   */
  readonly fields: PhotoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Photo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PhotoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tags<T extends Photo$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Photo$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Photo model
   */
  interface PhotoFieldRefs {
    readonly id: FieldRef<"Photo", 'Int'>
    readonly title: FieldRef<"Photo", 'String'>
    readonly description: FieldRef<"Photo", 'String'>
    readonly file_url: FieldRef<"Photo", 'String'>
    readonly taken_at: FieldRef<"Photo", 'DateTime'>
    readonly uploaded_at: FieldRef<"Photo", 'DateTime'>
    readonly created_at: FieldRef<"Photo", 'DateTime'>
    readonly updated_at: FieldRef<"Photo", 'DateTime'>
    readonly location: FieldRef<"Photo", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Photo findUnique
   */
  export type PhotoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * Filter, which Photo to fetch.
     */
    where: PhotoWhereUniqueInput
  }

  /**
   * Photo findUniqueOrThrow
   */
  export type PhotoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * Filter, which Photo to fetch.
     */
    where: PhotoWhereUniqueInput
  }

  /**
   * Photo findFirst
   */
  export type PhotoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * Filter, which Photo to fetch.
     */
    where?: PhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Photos to fetch.
     */
    orderBy?: PhotoOrderByWithRelationInput | PhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Photos.
     */
    cursor?: PhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Photos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Photos.
     */
    distinct?: PhotoScalarFieldEnum | PhotoScalarFieldEnum[]
  }

  /**
   * Photo findFirstOrThrow
   */
  export type PhotoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * Filter, which Photo to fetch.
     */
    where?: PhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Photos to fetch.
     */
    orderBy?: PhotoOrderByWithRelationInput | PhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Photos.
     */
    cursor?: PhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Photos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Photos.
     */
    distinct?: PhotoScalarFieldEnum | PhotoScalarFieldEnum[]
  }

  /**
   * Photo findMany
   */
  export type PhotoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * Filter, which Photos to fetch.
     */
    where?: PhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Photos to fetch.
     */
    orderBy?: PhotoOrderByWithRelationInput | PhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Photos.
     */
    cursor?: PhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Photos.
     */
    skip?: number
    distinct?: PhotoScalarFieldEnum | PhotoScalarFieldEnum[]
  }

  /**
   * Photo create
   */
  export type PhotoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * The data needed to create a Photo.
     */
    data: XOR<PhotoCreateInput, PhotoUncheckedCreateInput>
  }

  /**
   * Photo createMany
   */
  export type PhotoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Photos.
     */
    data: PhotoCreateManyInput | PhotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Photo createManyAndReturn
   */
  export type PhotoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * The data used to create many Photos.
     */
    data: PhotoCreateManyInput | PhotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Photo update
   */
  export type PhotoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * The data needed to update a Photo.
     */
    data: XOR<PhotoUpdateInput, PhotoUncheckedUpdateInput>
    /**
     * Choose, which Photo to update.
     */
    where: PhotoWhereUniqueInput
  }

  /**
   * Photo updateMany
   */
  export type PhotoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Photos.
     */
    data: XOR<PhotoUpdateManyMutationInput, PhotoUncheckedUpdateManyInput>
    /**
     * Filter which Photos to update
     */
    where?: PhotoWhereInput
    /**
     * Limit how many Photos to update.
     */
    limit?: number
  }

  /**
   * Photo updateManyAndReturn
   */
  export type PhotoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * The data used to update Photos.
     */
    data: XOR<PhotoUpdateManyMutationInput, PhotoUncheckedUpdateManyInput>
    /**
     * Filter which Photos to update
     */
    where?: PhotoWhereInput
    /**
     * Limit how many Photos to update.
     */
    limit?: number
  }

  /**
   * Photo upsert
   */
  export type PhotoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * The filter to search for the Photo to update in case it exists.
     */
    where: PhotoWhereUniqueInput
    /**
     * In case the Photo found by the `where` argument doesn't exist, create a new Photo with this data.
     */
    create: XOR<PhotoCreateInput, PhotoUncheckedCreateInput>
    /**
     * In case the Photo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PhotoUpdateInput, PhotoUncheckedUpdateInput>
  }

  /**
   * Photo delete
   */
  export type PhotoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * Filter which Photo to delete.
     */
    where: PhotoWhereUniqueInput
  }

  /**
   * Photo deleteMany
   */
  export type PhotoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Photos to delete
     */
    where?: PhotoWhereInput
    /**
     * Limit how many Photos to delete.
     */
    limit?: number
  }

  /**
   * Photo.tags
   */
  export type Photo$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoTag
     */
    select?: PhotoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoTag
     */
    omit?: PhotoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoTagInclude<ExtArgs> | null
    where?: PhotoTagWhereInput
    orderBy?: PhotoTagOrderByWithRelationInput | PhotoTagOrderByWithRelationInput[]
    cursor?: PhotoTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PhotoTagScalarFieldEnum | PhotoTagScalarFieldEnum[]
  }

  /**
   * Photo without action
   */
  export type PhotoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
  }


  /**
   * Model Poem
   */

  export type AggregatePoem = {
    _count: PoemCountAggregateOutputType | null
    _avg: PoemAvgAggregateOutputType | null
    _sum: PoemSumAggregateOutputType | null
    _min: PoemMinAggregateOutputType | null
    _max: PoemMaxAggregateOutputType | null
  }

  export type PoemAvgAggregateOutputType = {
    id: number | null
  }

  export type PoemSumAggregateOutputType = {
    id: number | null
  }

  export type PoemMinAggregateOutputType = {
    id: number | null
    title: string | null
    author: string | null
    content: string | null
    written_at: Date | null
    created_at: Date | null
    updated_at: Date | null
    is_published: boolean | null
  }

  export type PoemMaxAggregateOutputType = {
    id: number | null
    title: string | null
    author: string | null
    content: string | null
    written_at: Date | null
    created_at: Date | null
    updated_at: Date | null
    is_published: boolean | null
  }

  export type PoemCountAggregateOutputType = {
    id: number
    title: number
    author: number
    content: number
    written_at: number
    created_at: number
    updated_at: number
    is_published: number
    _all: number
  }


  export type PoemAvgAggregateInputType = {
    id?: true
  }

  export type PoemSumAggregateInputType = {
    id?: true
  }

  export type PoemMinAggregateInputType = {
    id?: true
    title?: true
    author?: true
    content?: true
    written_at?: true
    created_at?: true
    updated_at?: true
    is_published?: true
  }

  export type PoemMaxAggregateInputType = {
    id?: true
    title?: true
    author?: true
    content?: true
    written_at?: true
    created_at?: true
    updated_at?: true
    is_published?: true
  }

  export type PoemCountAggregateInputType = {
    id?: true
    title?: true
    author?: true
    content?: true
    written_at?: true
    created_at?: true
    updated_at?: true
    is_published?: true
    _all?: true
  }

  export type PoemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Poem to aggregate.
     */
    where?: PoemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Poems to fetch.
     */
    orderBy?: PoemOrderByWithRelationInput | PoemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PoemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Poems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Poems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Poems
    **/
    _count?: true | PoemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PoemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PoemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PoemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PoemMaxAggregateInputType
  }

  export type GetPoemAggregateType<T extends PoemAggregateArgs> = {
        [P in keyof T & keyof AggregatePoem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePoem[P]>
      : GetScalarType<T[P], AggregatePoem[P]>
  }




  export type PoemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoemWhereInput
    orderBy?: PoemOrderByWithAggregationInput | PoemOrderByWithAggregationInput[]
    by: PoemScalarFieldEnum[] | PoemScalarFieldEnum
    having?: PoemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PoemCountAggregateInputType | true
    _avg?: PoemAvgAggregateInputType
    _sum?: PoemSumAggregateInputType
    _min?: PoemMinAggregateInputType
    _max?: PoemMaxAggregateInputType
  }

  export type PoemGroupByOutputType = {
    id: number
    title: string
    author: string
    content: string
    written_at: Date | null
    created_at: Date
    updated_at: Date
    is_published: boolean
    _count: PoemCountAggregateOutputType | null
    _avg: PoemAvgAggregateOutputType | null
    _sum: PoemSumAggregateOutputType | null
    _min: PoemMinAggregateOutputType | null
    _max: PoemMaxAggregateOutputType | null
  }

  type GetPoemGroupByPayload<T extends PoemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PoemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PoemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PoemGroupByOutputType[P]>
            : GetScalarType<T[P], PoemGroupByOutputType[P]>
        }
      >
    >


  export type PoemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    content?: boolean
    written_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_published?: boolean
  }, ExtArgs["result"]["poem"]>

  export type PoemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    content?: boolean
    written_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_published?: boolean
  }, ExtArgs["result"]["poem"]>

  export type PoemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    content?: boolean
    written_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_published?: boolean
  }, ExtArgs["result"]["poem"]>

  export type PoemSelectScalar = {
    id?: boolean
    title?: boolean
    author?: boolean
    content?: boolean
    written_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_published?: boolean
  }

  export type PoemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "author" | "content" | "written_at" | "created_at" | "updated_at" | "is_published", ExtArgs["result"]["poem"]>

  export type $PoemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Poem"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      author: string
      content: string
      written_at: Date | null
      created_at: Date
      updated_at: Date
      is_published: boolean
    }, ExtArgs["result"]["poem"]>
    composites: {}
  }

  type PoemGetPayload<S extends boolean | null | undefined | PoemDefaultArgs> = $Result.GetResult<Prisma.$PoemPayload, S>

  type PoemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PoemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PoemCountAggregateInputType | true
    }

  export interface PoemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Poem'], meta: { name: 'Poem' } }
    /**
     * Find zero or one Poem that matches the filter.
     * @param {PoemFindUniqueArgs} args - Arguments to find a Poem
     * @example
     * // Get one Poem
     * const poem = await prisma.poem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PoemFindUniqueArgs>(args: SelectSubset<T, PoemFindUniqueArgs<ExtArgs>>): Prisma__PoemClient<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Poem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PoemFindUniqueOrThrowArgs} args - Arguments to find a Poem
     * @example
     * // Get one Poem
     * const poem = await prisma.poem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PoemFindUniqueOrThrowArgs>(args: SelectSubset<T, PoemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PoemClient<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Poem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoemFindFirstArgs} args - Arguments to find a Poem
     * @example
     * // Get one Poem
     * const poem = await prisma.poem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PoemFindFirstArgs>(args?: SelectSubset<T, PoemFindFirstArgs<ExtArgs>>): Prisma__PoemClient<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Poem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoemFindFirstOrThrowArgs} args - Arguments to find a Poem
     * @example
     * // Get one Poem
     * const poem = await prisma.poem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PoemFindFirstOrThrowArgs>(args?: SelectSubset<T, PoemFindFirstOrThrowArgs<ExtArgs>>): Prisma__PoemClient<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Poems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Poems
     * const poems = await prisma.poem.findMany()
     * 
     * // Get first 10 Poems
     * const poems = await prisma.poem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const poemWithIdOnly = await prisma.poem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PoemFindManyArgs>(args?: SelectSubset<T, PoemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Poem.
     * @param {PoemCreateArgs} args - Arguments to create a Poem.
     * @example
     * // Create one Poem
     * const Poem = await prisma.poem.create({
     *   data: {
     *     // ... data to create a Poem
     *   }
     * })
     * 
     */
    create<T extends PoemCreateArgs>(args: SelectSubset<T, PoemCreateArgs<ExtArgs>>): Prisma__PoemClient<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Poems.
     * @param {PoemCreateManyArgs} args - Arguments to create many Poems.
     * @example
     * // Create many Poems
     * const poem = await prisma.poem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PoemCreateManyArgs>(args?: SelectSubset<T, PoemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Poems and returns the data saved in the database.
     * @param {PoemCreateManyAndReturnArgs} args - Arguments to create many Poems.
     * @example
     * // Create many Poems
     * const poem = await prisma.poem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Poems and only return the `id`
     * const poemWithIdOnly = await prisma.poem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PoemCreateManyAndReturnArgs>(args?: SelectSubset<T, PoemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Poem.
     * @param {PoemDeleteArgs} args - Arguments to delete one Poem.
     * @example
     * // Delete one Poem
     * const Poem = await prisma.poem.delete({
     *   where: {
     *     // ... filter to delete one Poem
     *   }
     * })
     * 
     */
    delete<T extends PoemDeleteArgs>(args: SelectSubset<T, PoemDeleteArgs<ExtArgs>>): Prisma__PoemClient<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Poem.
     * @param {PoemUpdateArgs} args - Arguments to update one Poem.
     * @example
     * // Update one Poem
     * const poem = await prisma.poem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PoemUpdateArgs>(args: SelectSubset<T, PoemUpdateArgs<ExtArgs>>): Prisma__PoemClient<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Poems.
     * @param {PoemDeleteManyArgs} args - Arguments to filter Poems to delete.
     * @example
     * // Delete a few Poems
     * const { count } = await prisma.poem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PoemDeleteManyArgs>(args?: SelectSubset<T, PoemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Poems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Poems
     * const poem = await prisma.poem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PoemUpdateManyArgs>(args: SelectSubset<T, PoemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Poems and returns the data updated in the database.
     * @param {PoemUpdateManyAndReturnArgs} args - Arguments to update many Poems.
     * @example
     * // Update many Poems
     * const poem = await prisma.poem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Poems and only return the `id`
     * const poemWithIdOnly = await prisma.poem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PoemUpdateManyAndReturnArgs>(args: SelectSubset<T, PoemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Poem.
     * @param {PoemUpsertArgs} args - Arguments to update or create a Poem.
     * @example
     * // Update or create a Poem
     * const poem = await prisma.poem.upsert({
     *   create: {
     *     // ... data to create a Poem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Poem we want to update
     *   }
     * })
     */
    upsert<T extends PoemUpsertArgs>(args: SelectSubset<T, PoemUpsertArgs<ExtArgs>>): Prisma__PoemClient<$Result.GetResult<Prisma.$PoemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Poems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoemCountArgs} args - Arguments to filter Poems to count.
     * @example
     * // Count the number of Poems
     * const count = await prisma.poem.count({
     *   where: {
     *     // ... the filter for the Poems we want to count
     *   }
     * })
    **/
    count<T extends PoemCountArgs>(
      args?: Subset<T, PoemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PoemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Poem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PoemAggregateArgs>(args: Subset<T, PoemAggregateArgs>): Prisma.PrismaPromise<GetPoemAggregateType<T>>

    /**
     * Group by Poem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PoemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PoemGroupByArgs['orderBy'] }
        : { orderBy?: PoemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PoemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPoemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Poem model
   */
  readonly fields: PoemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Poem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PoemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Poem model
   */
  interface PoemFieldRefs {
    readonly id: FieldRef<"Poem", 'Int'>
    readonly title: FieldRef<"Poem", 'String'>
    readonly author: FieldRef<"Poem", 'String'>
    readonly content: FieldRef<"Poem", 'String'>
    readonly written_at: FieldRef<"Poem", 'DateTime'>
    readonly created_at: FieldRef<"Poem", 'DateTime'>
    readonly updated_at: FieldRef<"Poem", 'DateTime'>
    readonly is_published: FieldRef<"Poem", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Poem findUnique
   */
  export type PoemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * Filter, which Poem to fetch.
     */
    where: PoemWhereUniqueInput
  }

  /**
   * Poem findUniqueOrThrow
   */
  export type PoemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * Filter, which Poem to fetch.
     */
    where: PoemWhereUniqueInput
  }

  /**
   * Poem findFirst
   */
  export type PoemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * Filter, which Poem to fetch.
     */
    where?: PoemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Poems to fetch.
     */
    orderBy?: PoemOrderByWithRelationInput | PoemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Poems.
     */
    cursor?: PoemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Poems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Poems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Poems.
     */
    distinct?: PoemScalarFieldEnum | PoemScalarFieldEnum[]
  }

  /**
   * Poem findFirstOrThrow
   */
  export type PoemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * Filter, which Poem to fetch.
     */
    where?: PoemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Poems to fetch.
     */
    orderBy?: PoemOrderByWithRelationInput | PoemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Poems.
     */
    cursor?: PoemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Poems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Poems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Poems.
     */
    distinct?: PoemScalarFieldEnum | PoemScalarFieldEnum[]
  }

  /**
   * Poem findMany
   */
  export type PoemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * Filter, which Poems to fetch.
     */
    where?: PoemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Poems to fetch.
     */
    orderBy?: PoemOrderByWithRelationInput | PoemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Poems.
     */
    cursor?: PoemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Poems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Poems.
     */
    skip?: number
    distinct?: PoemScalarFieldEnum | PoemScalarFieldEnum[]
  }

  /**
   * Poem create
   */
  export type PoemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * The data needed to create a Poem.
     */
    data: XOR<PoemCreateInput, PoemUncheckedCreateInput>
  }

  /**
   * Poem createMany
   */
  export type PoemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Poems.
     */
    data: PoemCreateManyInput | PoemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Poem createManyAndReturn
   */
  export type PoemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * The data used to create many Poems.
     */
    data: PoemCreateManyInput | PoemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Poem update
   */
  export type PoemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * The data needed to update a Poem.
     */
    data: XOR<PoemUpdateInput, PoemUncheckedUpdateInput>
    /**
     * Choose, which Poem to update.
     */
    where: PoemWhereUniqueInput
  }

  /**
   * Poem updateMany
   */
  export type PoemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Poems.
     */
    data: XOR<PoemUpdateManyMutationInput, PoemUncheckedUpdateManyInput>
    /**
     * Filter which Poems to update
     */
    where?: PoemWhereInput
    /**
     * Limit how many Poems to update.
     */
    limit?: number
  }

  /**
   * Poem updateManyAndReturn
   */
  export type PoemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * The data used to update Poems.
     */
    data: XOR<PoemUpdateManyMutationInput, PoemUncheckedUpdateManyInput>
    /**
     * Filter which Poems to update
     */
    where?: PoemWhereInput
    /**
     * Limit how many Poems to update.
     */
    limit?: number
  }

  /**
   * Poem upsert
   */
  export type PoemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * The filter to search for the Poem to update in case it exists.
     */
    where: PoemWhereUniqueInput
    /**
     * In case the Poem found by the `where` argument doesn't exist, create a new Poem with this data.
     */
    create: XOR<PoemCreateInput, PoemUncheckedCreateInput>
    /**
     * In case the Poem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PoemUpdateInput, PoemUncheckedUpdateInput>
  }

  /**
   * Poem delete
   */
  export type PoemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
    /**
     * Filter which Poem to delete.
     */
    where: PoemWhereUniqueInput
  }

  /**
   * Poem deleteMany
   */
  export type PoemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Poems to delete
     */
    where?: PoemWhereInput
    /**
     * Limit how many Poems to delete.
     */
    limit?: number
  }

  /**
   * Poem without action
   */
  export type PoemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poem
     */
    select?: PoemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poem
     */
    omit?: PoemOmit<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagAvgAggregateOutputType = {
    id: number | null
  }

  export type TagSumAggregateOutputType = {
    id: number | null
  }

  export type TagMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
  }

  export type TagMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    _all: number
  }


  export type TagAvgAggregateInputType = {
    id?: true
  }

  export type TagSumAggregateInputType = {
    id?: true
  }

  export type TagMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _avg?: TagAvgAggregateInputType
    _sum?: TagSumAggregateInputType
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: number
    name: string
    slug: string
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    blogs?: boolean | Tag$blogsArgs<ExtArgs>
    photos?: boolean | Tag$photosArgs<ExtArgs>
    vlogs?: boolean | Tag$vlogsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blogs?: boolean | Tag$blogsArgs<ExtArgs>
    photos?: boolean | Tag$photosArgs<ExtArgs>
    vlogs?: boolean | Tag$vlogsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      blogs: Prisma.$BlogTagPayload<ExtArgs>[]
      photos: Prisma.$PhotoTagPayload<ExtArgs>[]
      vlogs: Prisma.$VlogTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      slug: string
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {TagCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags and returns the data updated in the database.
     * @param {TagUpdateManyAndReturnArgs} args - Arguments to update many Tags.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TagUpdateManyAndReturnArgs>(args: SelectSubset<T, TagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    blogs<T extends Tag$blogsArgs<ExtArgs> = {}>(args?: Subset<T, Tag$blogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    photos<T extends Tag$photosArgs<ExtArgs> = {}>(args?: Subset<T, Tag$photosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    vlogs<T extends Tag$vlogsArgs<ExtArgs> = {}>(args?: Subset<T, Tag$vlogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VlogTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'Int'>
    readonly name: FieldRef<"Tag", 'String'>
    readonly slug: FieldRef<"Tag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag createManyAndReturn
   */
  export type TagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag updateManyAndReturn
   */
  export type TagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.blogs
   */
  export type Tag$blogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    where?: BlogTagWhereInput
    orderBy?: BlogTagOrderByWithRelationInput | BlogTagOrderByWithRelationInput[]
    cursor?: BlogTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlogTagScalarFieldEnum | BlogTagScalarFieldEnum[]
  }

  /**
   * Tag.photos
   */
  export type Tag$photosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoTag
     */
    select?: PhotoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoTag
     */
    omit?: PhotoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoTagInclude<ExtArgs> | null
    where?: PhotoTagWhereInput
    orderBy?: PhotoTagOrderByWithRelationInput | PhotoTagOrderByWithRelationInput[]
    cursor?: PhotoTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PhotoTagScalarFieldEnum | PhotoTagScalarFieldEnum[]
  }

  /**
   * Tag.vlogs
   */
  export type Tag$vlogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VlogTag
     */
    select?: VlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VlogTag
     */
    omit?: VlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogTagInclude<ExtArgs> | null
    where?: VlogTagWhereInput
    orderBy?: VlogTagOrderByWithRelationInput | VlogTagOrderByWithRelationInput[]
    cursor?: VlogTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VlogTagScalarFieldEnum | VlogTagScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model BlogTag
   */

  export type AggregateBlogTag = {
    _count: BlogTagCountAggregateOutputType | null
    _avg: BlogTagAvgAggregateOutputType | null
    _sum: BlogTagSumAggregateOutputType | null
    _min: BlogTagMinAggregateOutputType | null
    _max: BlogTagMaxAggregateOutputType | null
  }

  export type BlogTagAvgAggregateOutputType = {
    blog_id: number | null
    tag_id: number | null
  }

  export type BlogTagSumAggregateOutputType = {
    blog_id: number | null
    tag_id: number | null
  }

  export type BlogTagMinAggregateOutputType = {
    blog_id: number | null
    tag_id: number | null
  }

  export type BlogTagMaxAggregateOutputType = {
    blog_id: number | null
    tag_id: number | null
  }

  export type BlogTagCountAggregateOutputType = {
    blog_id: number
    tag_id: number
    _all: number
  }


  export type BlogTagAvgAggregateInputType = {
    blog_id?: true
    tag_id?: true
  }

  export type BlogTagSumAggregateInputType = {
    blog_id?: true
    tag_id?: true
  }

  export type BlogTagMinAggregateInputType = {
    blog_id?: true
    tag_id?: true
  }

  export type BlogTagMaxAggregateInputType = {
    blog_id?: true
    tag_id?: true
  }

  export type BlogTagCountAggregateInputType = {
    blog_id?: true
    tag_id?: true
    _all?: true
  }

  export type BlogTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogTag to aggregate.
     */
    where?: BlogTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogTags to fetch.
     */
    orderBy?: BlogTagOrderByWithRelationInput | BlogTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlogTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlogTags
    **/
    _count?: true | BlogTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlogTagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlogTagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlogTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlogTagMaxAggregateInputType
  }

  export type GetBlogTagAggregateType<T extends BlogTagAggregateArgs> = {
        [P in keyof T & keyof AggregateBlogTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlogTag[P]>
      : GetScalarType<T[P], AggregateBlogTag[P]>
  }




  export type BlogTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogTagWhereInput
    orderBy?: BlogTagOrderByWithAggregationInput | BlogTagOrderByWithAggregationInput[]
    by: BlogTagScalarFieldEnum[] | BlogTagScalarFieldEnum
    having?: BlogTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlogTagCountAggregateInputType | true
    _avg?: BlogTagAvgAggregateInputType
    _sum?: BlogTagSumAggregateInputType
    _min?: BlogTagMinAggregateInputType
    _max?: BlogTagMaxAggregateInputType
  }

  export type BlogTagGroupByOutputType = {
    blog_id: number
    tag_id: number
    _count: BlogTagCountAggregateOutputType | null
    _avg: BlogTagAvgAggregateOutputType | null
    _sum: BlogTagSumAggregateOutputType | null
    _min: BlogTagMinAggregateOutputType | null
    _max: BlogTagMaxAggregateOutputType | null
  }

  type GetBlogTagGroupByPayload<T extends BlogTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlogTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlogTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlogTagGroupByOutputType[P]>
            : GetScalarType<T[P], BlogTagGroupByOutputType[P]>
        }
      >
    >


  export type BlogTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    blog_id?: boolean
    tag_id?: boolean
    blog?: boolean | BlogDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blogTag"]>

  export type BlogTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    blog_id?: boolean
    tag_id?: boolean
    blog?: boolean | BlogDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blogTag"]>

  export type BlogTagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    blog_id?: boolean
    tag_id?: boolean
    blog?: boolean | BlogDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blogTag"]>

  export type BlogTagSelectScalar = {
    blog_id?: boolean
    tag_id?: boolean
  }

  export type BlogTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"blog_id" | "tag_id", ExtArgs["result"]["blogTag"]>
  export type BlogTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blog?: boolean | BlogDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type BlogTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blog?: boolean | BlogDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type BlogTagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blog?: boolean | BlogDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $BlogTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BlogTag"
    objects: {
      blog: Prisma.$BlogPayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      blog_id: number
      tag_id: number
    }, ExtArgs["result"]["blogTag"]>
    composites: {}
  }

  type BlogTagGetPayload<S extends boolean | null | undefined | BlogTagDefaultArgs> = $Result.GetResult<Prisma.$BlogTagPayload, S>

  type BlogTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlogTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlogTagCountAggregateInputType | true
    }

  export interface BlogTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BlogTag'], meta: { name: 'BlogTag' } }
    /**
     * Find zero or one BlogTag that matches the filter.
     * @param {BlogTagFindUniqueArgs} args - Arguments to find a BlogTag
     * @example
     * // Get one BlogTag
     * const blogTag = await prisma.blogTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlogTagFindUniqueArgs>(args: SelectSubset<T, BlogTagFindUniqueArgs<ExtArgs>>): Prisma__BlogTagClient<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BlogTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlogTagFindUniqueOrThrowArgs} args - Arguments to find a BlogTag
     * @example
     * // Get one BlogTag
     * const blogTag = await prisma.blogTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlogTagFindUniqueOrThrowArgs>(args: SelectSubset<T, BlogTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlogTagClient<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogTagFindFirstArgs} args - Arguments to find a BlogTag
     * @example
     * // Get one BlogTag
     * const blogTag = await prisma.blogTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlogTagFindFirstArgs>(args?: SelectSubset<T, BlogTagFindFirstArgs<ExtArgs>>): Prisma__BlogTagClient<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogTagFindFirstOrThrowArgs} args - Arguments to find a BlogTag
     * @example
     * // Get one BlogTag
     * const blogTag = await prisma.blogTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlogTagFindFirstOrThrowArgs>(args?: SelectSubset<T, BlogTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlogTagClient<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BlogTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlogTags
     * const blogTags = await prisma.blogTag.findMany()
     * 
     * // Get first 10 BlogTags
     * const blogTags = await prisma.blogTag.findMany({ take: 10 })
     * 
     * // Only select the `blog_id`
     * const blogTagWithBlog_idOnly = await prisma.blogTag.findMany({ select: { blog_id: true } })
     * 
     */
    findMany<T extends BlogTagFindManyArgs>(args?: SelectSubset<T, BlogTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BlogTag.
     * @param {BlogTagCreateArgs} args - Arguments to create a BlogTag.
     * @example
     * // Create one BlogTag
     * const BlogTag = await prisma.blogTag.create({
     *   data: {
     *     // ... data to create a BlogTag
     *   }
     * })
     * 
     */
    create<T extends BlogTagCreateArgs>(args: SelectSubset<T, BlogTagCreateArgs<ExtArgs>>): Prisma__BlogTagClient<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BlogTags.
     * @param {BlogTagCreateManyArgs} args - Arguments to create many BlogTags.
     * @example
     * // Create many BlogTags
     * const blogTag = await prisma.blogTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlogTagCreateManyArgs>(args?: SelectSubset<T, BlogTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BlogTags and returns the data saved in the database.
     * @param {BlogTagCreateManyAndReturnArgs} args - Arguments to create many BlogTags.
     * @example
     * // Create many BlogTags
     * const blogTag = await prisma.blogTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BlogTags and only return the `blog_id`
     * const blogTagWithBlog_idOnly = await prisma.blogTag.createManyAndReturn({
     *   select: { blog_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlogTagCreateManyAndReturnArgs>(args?: SelectSubset<T, BlogTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BlogTag.
     * @param {BlogTagDeleteArgs} args - Arguments to delete one BlogTag.
     * @example
     * // Delete one BlogTag
     * const BlogTag = await prisma.blogTag.delete({
     *   where: {
     *     // ... filter to delete one BlogTag
     *   }
     * })
     * 
     */
    delete<T extends BlogTagDeleteArgs>(args: SelectSubset<T, BlogTagDeleteArgs<ExtArgs>>): Prisma__BlogTagClient<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BlogTag.
     * @param {BlogTagUpdateArgs} args - Arguments to update one BlogTag.
     * @example
     * // Update one BlogTag
     * const blogTag = await prisma.blogTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlogTagUpdateArgs>(args: SelectSubset<T, BlogTagUpdateArgs<ExtArgs>>): Prisma__BlogTagClient<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BlogTags.
     * @param {BlogTagDeleteManyArgs} args - Arguments to filter BlogTags to delete.
     * @example
     * // Delete a few BlogTags
     * const { count } = await prisma.blogTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlogTagDeleteManyArgs>(args?: SelectSubset<T, BlogTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlogTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlogTags
     * const blogTag = await prisma.blogTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlogTagUpdateManyArgs>(args: SelectSubset<T, BlogTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlogTags and returns the data updated in the database.
     * @param {BlogTagUpdateManyAndReturnArgs} args - Arguments to update many BlogTags.
     * @example
     * // Update many BlogTags
     * const blogTag = await prisma.blogTag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BlogTags and only return the `blog_id`
     * const blogTagWithBlog_idOnly = await prisma.blogTag.updateManyAndReturn({
     *   select: { blog_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BlogTagUpdateManyAndReturnArgs>(args: SelectSubset<T, BlogTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BlogTag.
     * @param {BlogTagUpsertArgs} args - Arguments to update or create a BlogTag.
     * @example
     * // Update or create a BlogTag
     * const blogTag = await prisma.blogTag.upsert({
     *   create: {
     *     // ... data to create a BlogTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlogTag we want to update
     *   }
     * })
     */
    upsert<T extends BlogTagUpsertArgs>(args: SelectSubset<T, BlogTagUpsertArgs<ExtArgs>>): Prisma__BlogTagClient<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BlogTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogTagCountArgs} args - Arguments to filter BlogTags to count.
     * @example
     * // Count the number of BlogTags
     * const count = await prisma.blogTag.count({
     *   where: {
     *     // ... the filter for the BlogTags we want to count
     *   }
     * })
    **/
    count<T extends BlogTagCountArgs>(
      args?: Subset<T, BlogTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlogTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlogTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BlogTagAggregateArgs>(args: Subset<T, BlogTagAggregateArgs>): Prisma.PrismaPromise<GetBlogTagAggregateType<T>>

    /**
     * Group by BlogTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BlogTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlogTagGroupByArgs['orderBy'] }
        : { orderBy?: BlogTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BlogTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BlogTag model
   */
  readonly fields: BlogTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BlogTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlogTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    blog<T extends BlogDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BlogDefaultArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BlogTag model
   */
  interface BlogTagFieldRefs {
    readonly blog_id: FieldRef<"BlogTag", 'Int'>
    readonly tag_id: FieldRef<"BlogTag", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * BlogTag findUnique
   */
  export type BlogTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    /**
     * Filter, which BlogTag to fetch.
     */
    where: BlogTagWhereUniqueInput
  }

  /**
   * BlogTag findUniqueOrThrow
   */
  export type BlogTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    /**
     * Filter, which BlogTag to fetch.
     */
    where: BlogTagWhereUniqueInput
  }

  /**
   * BlogTag findFirst
   */
  export type BlogTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    /**
     * Filter, which BlogTag to fetch.
     */
    where?: BlogTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogTags to fetch.
     */
    orderBy?: BlogTagOrderByWithRelationInput | BlogTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogTags.
     */
    cursor?: BlogTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogTags.
     */
    distinct?: BlogTagScalarFieldEnum | BlogTagScalarFieldEnum[]
  }

  /**
   * BlogTag findFirstOrThrow
   */
  export type BlogTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    /**
     * Filter, which BlogTag to fetch.
     */
    where?: BlogTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogTags to fetch.
     */
    orderBy?: BlogTagOrderByWithRelationInput | BlogTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogTags.
     */
    cursor?: BlogTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogTags.
     */
    distinct?: BlogTagScalarFieldEnum | BlogTagScalarFieldEnum[]
  }

  /**
   * BlogTag findMany
   */
  export type BlogTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    /**
     * Filter, which BlogTags to fetch.
     */
    where?: BlogTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogTags to fetch.
     */
    orderBy?: BlogTagOrderByWithRelationInput | BlogTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlogTags.
     */
    cursor?: BlogTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogTags.
     */
    skip?: number
    distinct?: BlogTagScalarFieldEnum | BlogTagScalarFieldEnum[]
  }

  /**
   * BlogTag create
   */
  export type BlogTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    /**
     * The data needed to create a BlogTag.
     */
    data: XOR<BlogTagCreateInput, BlogTagUncheckedCreateInput>
  }

  /**
   * BlogTag createMany
   */
  export type BlogTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BlogTags.
     */
    data: BlogTagCreateManyInput | BlogTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlogTag createManyAndReturn
   */
  export type BlogTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * The data used to create many BlogTags.
     */
    data: BlogTagCreateManyInput | BlogTagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BlogTag update
   */
  export type BlogTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    /**
     * The data needed to update a BlogTag.
     */
    data: XOR<BlogTagUpdateInput, BlogTagUncheckedUpdateInput>
    /**
     * Choose, which BlogTag to update.
     */
    where: BlogTagWhereUniqueInput
  }

  /**
   * BlogTag updateMany
   */
  export type BlogTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BlogTags.
     */
    data: XOR<BlogTagUpdateManyMutationInput, BlogTagUncheckedUpdateManyInput>
    /**
     * Filter which BlogTags to update
     */
    where?: BlogTagWhereInput
    /**
     * Limit how many BlogTags to update.
     */
    limit?: number
  }

  /**
   * BlogTag updateManyAndReturn
   */
  export type BlogTagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * The data used to update BlogTags.
     */
    data: XOR<BlogTagUpdateManyMutationInput, BlogTagUncheckedUpdateManyInput>
    /**
     * Filter which BlogTags to update
     */
    where?: BlogTagWhereInput
    /**
     * Limit how many BlogTags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BlogTag upsert
   */
  export type BlogTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    /**
     * The filter to search for the BlogTag to update in case it exists.
     */
    where: BlogTagWhereUniqueInput
    /**
     * In case the BlogTag found by the `where` argument doesn't exist, create a new BlogTag with this data.
     */
    create: XOR<BlogTagCreateInput, BlogTagUncheckedCreateInput>
    /**
     * In case the BlogTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlogTagUpdateInput, BlogTagUncheckedUpdateInput>
  }

  /**
   * BlogTag delete
   */
  export type BlogTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    /**
     * Filter which BlogTag to delete.
     */
    where: BlogTagWhereUniqueInput
  }

  /**
   * BlogTag deleteMany
   */
  export type BlogTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogTags to delete
     */
    where?: BlogTagWhereInput
    /**
     * Limit how many BlogTags to delete.
     */
    limit?: number
  }

  /**
   * BlogTag without action
   */
  export type BlogTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
  }


  /**
   * Model PhotoTag
   */

  export type AggregatePhotoTag = {
    _count: PhotoTagCountAggregateOutputType | null
    _avg: PhotoTagAvgAggregateOutputType | null
    _sum: PhotoTagSumAggregateOutputType | null
    _min: PhotoTagMinAggregateOutputType | null
    _max: PhotoTagMaxAggregateOutputType | null
  }

  export type PhotoTagAvgAggregateOutputType = {
    photo_id: number | null
    tag_id: number | null
  }

  export type PhotoTagSumAggregateOutputType = {
    photo_id: number | null
    tag_id: number | null
  }

  export type PhotoTagMinAggregateOutputType = {
    photo_id: number | null
    tag_id: number | null
  }

  export type PhotoTagMaxAggregateOutputType = {
    photo_id: number | null
    tag_id: number | null
  }

  export type PhotoTagCountAggregateOutputType = {
    photo_id: number
    tag_id: number
    _all: number
  }


  export type PhotoTagAvgAggregateInputType = {
    photo_id?: true
    tag_id?: true
  }

  export type PhotoTagSumAggregateInputType = {
    photo_id?: true
    tag_id?: true
  }

  export type PhotoTagMinAggregateInputType = {
    photo_id?: true
    tag_id?: true
  }

  export type PhotoTagMaxAggregateInputType = {
    photo_id?: true
    tag_id?: true
  }

  export type PhotoTagCountAggregateInputType = {
    photo_id?: true
    tag_id?: true
    _all?: true
  }

  export type PhotoTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PhotoTag to aggregate.
     */
    where?: PhotoTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhotoTags to fetch.
     */
    orderBy?: PhotoTagOrderByWithRelationInput | PhotoTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PhotoTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhotoTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhotoTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PhotoTags
    **/
    _count?: true | PhotoTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PhotoTagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PhotoTagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PhotoTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PhotoTagMaxAggregateInputType
  }

  export type GetPhotoTagAggregateType<T extends PhotoTagAggregateArgs> = {
        [P in keyof T & keyof AggregatePhotoTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePhotoTag[P]>
      : GetScalarType<T[P], AggregatePhotoTag[P]>
  }




  export type PhotoTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhotoTagWhereInput
    orderBy?: PhotoTagOrderByWithAggregationInput | PhotoTagOrderByWithAggregationInput[]
    by: PhotoTagScalarFieldEnum[] | PhotoTagScalarFieldEnum
    having?: PhotoTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PhotoTagCountAggregateInputType | true
    _avg?: PhotoTagAvgAggregateInputType
    _sum?: PhotoTagSumAggregateInputType
    _min?: PhotoTagMinAggregateInputType
    _max?: PhotoTagMaxAggregateInputType
  }

  export type PhotoTagGroupByOutputType = {
    photo_id: number
    tag_id: number
    _count: PhotoTagCountAggregateOutputType | null
    _avg: PhotoTagAvgAggregateOutputType | null
    _sum: PhotoTagSumAggregateOutputType | null
    _min: PhotoTagMinAggregateOutputType | null
    _max: PhotoTagMaxAggregateOutputType | null
  }

  type GetPhotoTagGroupByPayload<T extends PhotoTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PhotoTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PhotoTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PhotoTagGroupByOutputType[P]>
            : GetScalarType<T[P], PhotoTagGroupByOutputType[P]>
        }
      >
    >


  export type PhotoTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    photo_id?: boolean
    tag_id?: boolean
    photo?: boolean | PhotoDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["photoTag"]>

  export type PhotoTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    photo_id?: boolean
    tag_id?: boolean
    photo?: boolean | PhotoDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["photoTag"]>

  export type PhotoTagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    photo_id?: boolean
    tag_id?: boolean
    photo?: boolean | PhotoDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["photoTag"]>

  export type PhotoTagSelectScalar = {
    photo_id?: boolean
    tag_id?: boolean
  }

  export type PhotoTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"photo_id" | "tag_id", ExtArgs["result"]["photoTag"]>
  export type PhotoTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    photo?: boolean | PhotoDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type PhotoTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    photo?: boolean | PhotoDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type PhotoTagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    photo?: boolean | PhotoDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $PhotoTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PhotoTag"
    objects: {
      photo: Prisma.$PhotoPayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      photo_id: number
      tag_id: number
    }, ExtArgs["result"]["photoTag"]>
    composites: {}
  }

  type PhotoTagGetPayload<S extends boolean | null | undefined | PhotoTagDefaultArgs> = $Result.GetResult<Prisma.$PhotoTagPayload, S>

  type PhotoTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PhotoTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PhotoTagCountAggregateInputType | true
    }

  export interface PhotoTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PhotoTag'], meta: { name: 'PhotoTag' } }
    /**
     * Find zero or one PhotoTag that matches the filter.
     * @param {PhotoTagFindUniqueArgs} args - Arguments to find a PhotoTag
     * @example
     * // Get one PhotoTag
     * const photoTag = await prisma.photoTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PhotoTagFindUniqueArgs>(args: SelectSubset<T, PhotoTagFindUniqueArgs<ExtArgs>>): Prisma__PhotoTagClient<$Result.GetResult<Prisma.$PhotoTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PhotoTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PhotoTagFindUniqueOrThrowArgs} args - Arguments to find a PhotoTag
     * @example
     * // Get one PhotoTag
     * const photoTag = await prisma.photoTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PhotoTagFindUniqueOrThrowArgs>(args: SelectSubset<T, PhotoTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PhotoTagClient<$Result.GetResult<Prisma.$PhotoTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PhotoTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoTagFindFirstArgs} args - Arguments to find a PhotoTag
     * @example
     * // Get one PhotoTag
     * const photoTag = await prisma.photoTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PhotoTagFindFirstArgs>(args?: SelectSubset<T, PhotoTagFindFirstArgs<ExtArgs>>): Prisma__PhotoTagClient<$Result.GetResult<Prisma.$PhotoTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PhotoTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoTagFindFirstOrThrowArgs} args - Arguments to find a PhotoTag
     * @example
     * // Get one PhotoTag
     * const photoTag = await prisma.photoTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PhotoTagFindFirstOrThrowArgs>(args?: SelectSubset<T, PhotoTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__PhotoTagClient<$Result.GetResult<Prisma.$PhotoTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PhotoTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PhotoTags
     * const photoTags = await prisma.photoTag.findMany()
     * 
     * // Get first 10 PhotoTags
     * const photoTags = await prisma.photoTag.findMany({ take: 10 })
     * 
     * // Only select the `photo_id`
     * const photoTagWithPhoto_idOnly = await prisma.photoTag.findMany({ select: { photo_id: true } })
     * 
     */
    findMany<T extends PhotoTagFindManyArgs>(args?: SelectSubset<T, PhotoTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PhotoTag.
     * @param {PhotoTagCreateArgs} args - Arguments to create a PhotoTag.
     * @example
     * // Create one PhotoTag
     * const PhotoTag = await prisma.photoTag.create({
     *   data: {
     *     // ... data to create a PhotoTag
     *   }
     * })
     * 
     */
    create<T extends PhotoTagCreateArgs>(args: SelectSubset<T, PhotoTagCreateArgs<ExtArgs>>): Prisma__PhotoTagClient<$Result.GetResult<Prisma.$PhotoTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PhotoTags.
     * @param {PhotoTagCreateManyArgs} args - Arguments to create many PhotoTags.
     * @example
     * // Create many PhotoTags
     * const photoTag = await prisma.photoTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PhotoTagCreateManyArgs>(args?: SelectSubset<T, PhotoTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PhotoTags and returns the data saved in the database.
     * @param {PhotoTagCreateManyAndReturnArgs} args - Arguments to create many PhotoTags.
     * @example
     * // Create many PhotoTags
     * const photoTag = await prisma.photoTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PhotoTags and only return the `photo_id`
     * const photoTagWithPhoto_idOnly = await prisma.photoTag.createManyAndReturn({
     *   select: { photo_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PhotoTagCreateManyAndReturnArgs>(args?: SelectSubset<T, PhotoTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PhotoTag.
     * @param {PhotoTagDeleteArgs} args - Arguments to delete one PhotoTag.
     * @example
     * // Delete one PhotoTag
     * const PhotoTag = await prisma.photoTag.delete({
     *   where: {
     *     // ... filter to delete one PhotoTag
     *   }
     * })
     * 
     */
    delete<T extends PhotoTagDeleteArgs>(args: SelectSubset<T, PhotoTagDeleteArgs<ExtArgs>>): Prisma__PhotoTagClient<$Result.GetResult<Prisma.$PhotoTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PhotoTag.
     * @param {PhotoTagUpdateArgs} args - Arguments to update one PhotoTag.
     * @example
     * // Update one PhotoTag
     * const photoTag = await prisma.photoTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PhotoTagUpdateArgs>(args: SelectSubset<T, PhotoTagUpdateArgs<ExtArgs>>): Prisma__PhotoTagClient<$Result.GetResult<Prisma.$PhotoTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PhotoTags.
     * @param {PhotoTagDeleteManyArgs} args - Arguments to filter PhotoTags to delete.
     * @example
     * // Delete a few PhotoTags
     * const { count } = await prisma.photoTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PhotoTagDeleteManyArgs>(args?: SelectSubset<T, PhotoTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PhotoTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PhotoTags
     * const photoTag = await prisma.photoTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PhotoTagUpdateManyArgs>(args: SelectSubset<T, PhotoTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PhotoTags and returns the data updated in the database.
     * @param {PhotoTagUpdateManyAndReturnArgs} args - Arguments to update many PhotoTags.
     * @example
     * // Update many PhotoTags
     * const photoTag = await prisma.photoTag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PhotoTags and only return the `photo_id`
     * const photoTagWithPhoto_idOnly = await prisma.photoTag.updateManyAndReturn({
     *   select: { photo_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PhotoTagUpdateManyAndReturnArgs>(args: SelectSubset<T, PhotoTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PhotoTag.
     * @param {PhotoTagUpsertArgs} args - Arguments to update or create a PhotoTag.
     * @example
     * // Update or create a PhotoTag
     * const photoTag = await prisma.photoTag.upsert({
     *   create: {
     *     // ... data to create a PhotoTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PhotoTag we want to update
     *   }
     * })
     */
    upsert<T extends PhotoTagUpsertArgs>(args: SelectSubset<T, PhotoTagUpsertArgs<ExtArgs>>): Prisma__PhotoTagClient<$Result.GetResult<Prisma.$PhotoTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PhotoTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoTagCountArgs} args - Arguments to filter PhotoTags to count.
     * @example
     * // Count the number of PhotoTags
     * const count = await prisma.photoTag.count({
     *   where: {
     *     // ... the filter for the PhotoTags we want to count
     *   }
     * })
    **/
    count<T extends PhotoTagCountArgs>(
      args?: Subset<T, PhotoTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PhotoTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PhotoTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PhotoTagAggregateArgs>(args: Subset<T, PhotoTagAggregateArgs>): Prisma.PrismaPromise<GetPhotoTagAggregateType<T>>

    /**
     * Group by PhotoTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PhotoTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PhotoTagGroupByArgs['orderBy'] }
        : { orderBy?: PhotoTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PhotoTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhotoTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PhotoTag model
   */
  readonly fields: PhotoTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PhotoTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PhotoTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    photo<T extends PhotoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PhotoDefaultArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PhotoTag model
   */
  interface PhotoTagFieldRefs {
    readonly photo_id: FieldRef<"PhotoTag", 'Int'>
    readonly tag_id: FieldRef<"PhotoTag", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PhotoTag findUnique
   */
  export type PhotoTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoTag
     */
    select?: PhotoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoTag
     */
    omit?: PhotoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoTagInclude<ExtArgs> | null
    /**
     * Filter, which PhotoTag to fetch.
     */
    where: PhotoTagWhereUniqueInput
  }

  /**
   * PhotoTag findUniqueOrThrow
   */
  export type PhotoTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoTag
     */
    select?: PhotoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoTag
     */
    omit?: PhotoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoTagInclude<ExtArgs> | null
    /**
     * Filter, which PhotoTag to fetch.
     */
    where: PhotoTagWhereUniqueInput
  }

  /**
   * PhotoTag findFirst
   */
  export type PhotoTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoTag
     */
    select?: PhotoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoTag
     */
    omit?: PhotoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoTagInclude<ExtArgs> | null
    /**
     * Filter, which PhotoTag to fetch.
     */
    where?: PhotoTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhotoTags to fetch.
     */
    orderBy?: PhotoTagOrderByWithRelationInput | PhotoTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PhotoTags.
     */
    cursor?: PhotoTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhotoTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhotoTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PhotoTags.
     */
    distinct?: PhotoTagScalarFieldEnum | PhotoTagScalarFieldEnum[]
  }

  /**
   * PhotoTag findFirstOrThrow
   */
  export type PhotoTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoTag
     */
    select?: PhotoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoTag
     */
    omit?: PhotoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoTagInclude<ExtArgs> | null
    /**
     * Filter, which PhotoTag to fetch.
     */
    where?: PhotoTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhotoTags to fetch.
     */
    orderBy?: PhotoTagOrderByWithRelationInput | PhotoTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PhotoTags.
     */
    cursor?: PhotoTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhotoTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhotoTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PhotoTags.
     */
    distinct?: PhotoTagScalarFieldEnum | PhotoTagScalarFieldEnum[]
  }

  /**
   * PhotoTag findMany
   */
  export type PhotoTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoTag
     */
    select?: PhotoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoTag
     */
    omit?: PhotoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoTagInclude<ExtArgs> | null
    /**
     * Filter, which PhotoTags to fetch.
     */
    where?: PhotoTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhotoTags to fetch.
     */
    orderBy?: PhotoTagOrderByWithRelationInput | PhotoTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PhotoTags.
     */
    cursor?: PhotoTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhotoTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhotoTags.
     */
    skip?: number
    distinct?: PhotoTagScalarFieldEnum | PhotoTagScalarFieldEnum[]
  }

  /**
   * PhotoTag create
   */
  export type PhotoTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoTag
     */
    select?: PhotoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoTag
     */
    omit?: PhotoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoTagInclude<ExtArgs> | null
    /**
     * The data needed to create a PhotoTag.
     */
    data: XOR<PhotoTagCreateInput, PhotoTagUncheckedCreateInput>
  }

  /**
   * PhotoTag createMany
   */
  export type PhotoTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PhotoTags.
     */
    data: PhotoTagCreateManyInput | PhotoTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PhotoTag createManyAndReturn
   */
  export type PhotoTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoTag
     */
    select?: PhotoTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoTag
     */
    omit?: PhotoTagOmit<ExtArgs> | null
    /**
     * The data used to create many PhotoTags.
     */
    data: PhotoTagCreateManyInput | PhotoTagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PhotoTag update
   */
  export type PhotoTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoTag
     */
    select?: PhotoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoTag
     */
    omit?: PhotoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoTagInclude<ExtArgs> | null
    /**
     * The data needed to update a PhotoTag.
     */
    data: XOR<PhotoTagUpdateInput, PhotoTagUncheckedUpdateInput>
    /**
     * Choose, which PhotoTag to update.
     */
    where: PhotoTagWhereUniqueInput
  }

  /**
   * PhotoTag updateMany
   */
  export type PhotoTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PhotoTags.
     */
    data: XOR<PhotoTagUpdateManyMutationInput, PhotoTagUncheckedUpdateManyInput>
    /**
     * Filter which PhotoTags to update
     */
    where?: PhotoTagWhereInput
    /**
     * Limit how many PhotoTags to update.
     */
    limit?: number
  }

  /**
   * PhotoTag updateManyAndReturn
   */
  export type PhotoTagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoTag
     */
    select?: PhotoTagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoTag
     */
    omit?: PhotoTagOmit<ExtArgs> | null
    /**
     * The data used to update PhotoTags.
     */
    data: XOR<PhotoTagUpdateManyMutationInput, PhotoTagUncheckedUpdateManyInput>
    /**
     * Filter which PhotoTags to update
     */
    where?: PhotoTagWhereInput
    /**
     * Limit how many PhotoTags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoTagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PhotoTag upsert
   */
  export type PhotoTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoTag
     */
    select?: PhotoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoTag
     */
    omit?: PhotoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoTagInclude<ExtArgs> | null
    /**
     * The filter to search for the PhotoTag to update in case it exists.
     */
    where: PhotoTagWhereUniqueInput
    /**
     * In case the PhotoTag found by the `where` argument doesn't exist, create a new PhotoTag with this data.
     */
    create: XOR<PhotoTagCreateInput, PhotoTagUncheckedCreateInput>
    /**
     * In case the PhotoTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PhotoTagUpdateInput, PhotoTagUncheckedUpdateInput>
  }

  /**
   * PhotoTag delete
   */
  export type PhotoTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoTag
     */
    select?: PhotoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoTag
     */
    omit?: PhotoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoTagInclude<ExtArgs> | null
    /**
     * Filter which PhotoTag to delete.
     */
    where: PhotoTagWhereUniqueInput
  }

  /**
   * PhotoTag deleteMany
   */
  export type PhotoTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PhotoTags to delete
     */
    where?: PhotoTagWhereInput
    /**
     * Limit how many PhotoTags to delete.
     */
    limit?: number
  }

  /**
   * PhotoTag without action
   */
  export type PhotoTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoTag
     */
    select?: PhotoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoTag
     */
    omit?: PhotoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoTagInclude<ExtArgs> | null
  }


  /**
   * Model Vlog
   */

  export type AggregateVlog = {
    _count: VlogCountAggregateOutputType | null
    _avg: VlogAvgAggregateOutputType | null
    _sum: VlogSumAggregateOutputType | null
    _min: VlogMinAggregateOutputType | null
    _max: VlogMaxAggregateOutputType | null
  }

  export type VlogAvgAggregateOutputType = {
    id: number | null
  }

  export type VlogSumAggregateOutputType = {
    id: number | null
  }

  export type VlogMinAggregateOutputType = {
    id: number | null
    title: string | null
    slug: string | null
    description: string | null
    video_url: string | null
    published_at: Date | null
    created_at: Date | null
    updated_at: Date | null
    is_published: boolean | null
    thumbnail_url: string | null
    duration: string | null
    meta_description: string | null
    meta_keywords: string | null
  }

  export type VlogMaxAggregateOutputType = {
    id: number | null
    title: string | null
    slug: string | null
    description: string | null
    video_url: string | null
    published_at: Date | null
    created_at: Date | null
    updated_at: Date | null
    is_published: boolean | null
    thumbnail_url: string | null
    duration: string | null
    meta_description: string | null
    meta_keywords: string | null
  }

  export type VlogCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    description: number
    video_url: number
    published_at: number
    created_at: number
    updated_at: number
    is_published: number
    thumbnail_url: number
    duration: number
    meta_description: number
    meta_keywords: number
    _all: number
  }


  export type VlogAvgAggregateInputType = {
    id?: true
  }

  export type VlogSumAggregateInputType = {
    id?: true
  }

  export type VlogMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    video_url?: true
    published_at?: true
    created_at?: true
    updated_at?: true
    is_published?: true
    thumbnail_url?: true
    duration?: true
    meta_description?: true
    meta_keywords?: true
  }

  export type VlogMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    video_url?: true
    published_at?: true
    created_at?: true
    updated_at?: true
    is_published?: true
    thumbnail_url?: true
    duration?: true
    meta_description?: true
    meta_keywords?: true
  }

  export type VlogCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    video_url?: true
    published_at?: true
    created_at?: true
    updated_at?: true
    is_published?: true
    thumbnail_url?: true
    duration?: true
    meta_description?: true
    meta_keywords?: true
    _all?: true
  }

  export type VlogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vlog to aggregate.
     */
    where?: VlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vlogs to fetch.
     */
    orderBy?: VlogOrderByWithRelationInput | VlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vlogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vlogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vlogs
    **/
    _count?: true | VlogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VlogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VlogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VlogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VlogMaxAggregateInputType
  }

  export type GetVlogAggregateType<T extends VlogAggregateArgs> = {
        [P in keyof T & keyof AggregateVlog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVlog[P]>
      : GetScalarType<T[P], AggregateVlog[P]>
  }




  export type VlogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VlogWhereInput
    orderBy?: VlogOrderByWithAggregationInput | VlogOrderByWithAggregationInput[]
    by: VlogScalarFieldEnum[] | VlogScalarFieldEnum
    having?: VlogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VlogCountAggregateInputType | true
    _avg?: VlogAvgAggregateInputType
    _sum?: VlogSumAggregateInputType
    _min?: VlogMinAggregateInputType
    _max?: VlogMaxAggregateInputType
  }

  export type VlogGroupByOutputType = {
    id: number
    title: string
    slug: string
    description: string | null
    video_url: string
    published_at: Date
    created_at: Date
    updated_at: Date
    is_published: boolean
    thumbnail_url: string | null
    duration: string | null
    meta_description: string | null
    meta_keywords: string | null
    _count: VlogCountAggregateOutputType | null
    _avg: VlogAvgAggregateOutputType | null
    _sum: VlogSumAggregateOutputType | null
    _min: VlogMinAggregateOutputType | null
    _max: VlogMaxAggregateOutputType | null
  }

  type GetVlogGroupByPayload<T extends VlogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VlogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VlogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VlogGroupByOutputType[P]>
            : GetScalarType<T[P], VlogGroupByOutputType[P]>
        }
      >
    >


  export type VlogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    video_url?: boolean
    published_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_published?: boolean
    thumbnail_url?: boolean
    duration?: boolean
    meta_description?: boolean
    meta_keywords?: boolean
    tags?: boolean | Vlog$tagsArgs<ExtArgs>
    _count?: boolean | VlogCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vlog"]>

  export type VlogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    video_url?: boolean
    published_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_published?: boolean
    thumbnail_url?: boolean
    duration?: boolean
    meta_description?: boolean
    meta_keywords?: boolean
  }, ExtArgs["result"]["vlog"]>

  export type VlogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    video_url?: boolean
    published_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_published?: boolean
    thumbnail_url?: boolean
    duration?: boolean
    meta_description?: boolean
    meta_keywords?: boolean
  }, ExtArgs["result"]["vlog"]>

  export type VlogSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    video_url?: boolean
    published_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_published?: boolean
    thumbnail_url?: boolean
    duration?: boolean
    meta_description?: boolean
    meta_keywords?: boolean
  }

  export type VlogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "slug" | "description" | "video_url" | "published_at" | "created_at" | "updated_at" | "is_published" | "thumbnail_url" | "duration" | "meta_description" | "meta_keywords", ExtArgs["result"]["vlog"]>
  export type VlogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | Vlog$tagsArgs<ExtArgs>
    _count?: boolean | VlogCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VlogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VlogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VlogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vlog"
    objects: {
      tags: Prisma.$VlogTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      slug: string
      description: string | null
      video_url: string
      published_at: Date
      created_at: Date
      updated_at: Date
      is_published: boolean
      thumbnail_url: string | null
      duration: string | null
      meta_description: string | null
      meta_keywords: string | null
    }, ExtArgs["result"]["vlog"]>
    composites: {}
  }

  type VlogGetPayload<S extends boolean | null | undefined | VlogDefaultArgs> = $Result.GetResult<Prisma.$VlogPayload, S>

  type VlogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VlogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VlogCountAggregateInputType | true
    }

  export interface VlogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vlog'], meta: { name: 'Vlog' } }
    /**
     * Find zero or one Vlog that matches the filter.
     * @param {VlogFindUniqueArgs} args - Arguments to find a Vlog
     * @example
     * // Get one Vlog
     * const vlog = await prisma.vlog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VlogFindUniqueArgs>(args: SelectSubset<T, VlogFindUniqueArgs<ExtArgs>>): Prisma__VlogClient<$Result.GetResult<Prisma.$VlogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vlog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VlogFindUniqueOrThrowArgs} args - Arguments to find a Vlog
     * @example
     * // Get one Vlog
     * const vlog = await prisma.vlog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VlogFindUniqueOrThrowArgs>(args: SelectSubset<T, VlogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VlogClient<$Result.GetResult<Prisma.$VlogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vlog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VlogFindFirstArgs} args - Arguments to find a Vlog
     * @example
     * // Get one Vlog
     * const vlog = await prisma.vlog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VlogFindFirstArgs>(args?: SelectSubset<T, VlogFindFirstArgs<ExtArgs>>): Prisma__VlogClient<$Result.GetResult<Prisma.$VlogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vlog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VlogFindFirstOrThrowArgs} args - Arguments to find a Vlog
     * @example
     * // Get one Vlog
     * const vlog = await prisma.vlog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VlogFindFirstOrThrowArgs>(args?: SelectSubset<T, VlogFindFirstOrThrowArgs<ExtArgs>>): Prisma__VlogClient<$Result.GetResult<Prisma.$VlogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vlogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VlogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vlogs
     * const vlogs = await prisma.vlog.findMany()
     * 
     * // Get first 10 Vlogs
     * const vlogs = await prisma.vlog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vlogWithIdOnly = await prisma.vlog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VlogFindManyArgs>(args?: SelectSubset<T, VlogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VlogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vlog.
     * @param {VlogCreateArgs} args - Arguments to create a Vlog.
     * @example
     * // Create one Vlog
     * const Vlog = await prisma.vlog.create({
     *   data: {
     *     // ... data to create a Vlog
     *   }
     * })
     * 
     */
    create<T extends VlogCreateArgs>(args: SelectSubset<T, VlogCreateArgs<ExtArgs>>): Prisma__VlogClient<$Result.GetResult<Prisma.$VlogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vlogs.
     * @param {VlogCreateManyArgs} args - Arguments to create many Vlogs.
     * @example
     * // Create many Vlogs
     * const vlog = await prisma.vlog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VlogCreateManyArgs>(args?: SelectSubset<T, VlogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vlogs and returns the data saved in the database.
     * @param {VlogCreateManyAndReturnArgs} args - Arguments to create many Vlogs.
     * @example
     * // Create many Vlogs
     * const vlog = await prisma.vlog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vlogs and only return the `id`
     * const vlogWithIdOnly = await prisma.vlog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VlogCreateManyAndReturnArgs>(args?: SelectSubset<T, VlogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VlogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vlog.
     * @param {VlogDeleteArgs} args - Arguments to delete one Vlog.
     * @example
     * // Delete one Vlog
     * const Vlog = await prisma.vlog.delete({
     *   where: {
     *     // ... filter to delete one Vlog
     *   }
     * })
     * 
     */
    delete<T extends VlogDeleteArgs>(args: SelectSubset<T, VlogDeleteArgs<ExtArgs>>): Prisma__VlogClient<$Result.GetResult<Prisma.$VlogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vlog.
     * @param {VlogUpdateArgs} args - Arguments to update one Vlog.
     * @example
     * // Update one Vlog
     * const vlog = await prisma.vlog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VlogUpdateArgs>(args: SelectSubset<T, VlogUpdateArgs<ExtArgs>>): Prisma__VlogClient<$Result.GetResult<Prisma.$VlogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vlogs.
     * @param {VlogDeleteManyArgs} args - Arguments to filter Vlogs to delete.
     * @example
     * // Delete a few Vlogs
     * const { count } = await prisma.vlog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VlogDeleteManyArgs>(args?: SelectSubset<T, VlogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vlogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VlogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vlogs
     * const vlog = await prisma.vlog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VlogUpdateManyArgs>(args: SelectSubset<T, VlogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vlogs and returns the data updated in the database.
     * @param {VlogUpdateManyAndReturnArgs} args - Arguments to update many Vlogs.
     * @example
     * // Update many Vlogs
     * const vlog = await prisma.vlog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vlogs and only return the `id`
     * const vlogWithIdOnly = await prisma.vlog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VlogUpdateManyAndReturnArgs>(args: SelectSubset<T, VlogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VlogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vlog.
     * @param {VlogUpsertArgs} args - Arguments to update or create a Vlog.
     * @example
     * // Update or create a Vlog
     * const vlog = await prisma.vlog.upsert({
     *   create: {
     *     // ... data to create a Vlog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vlog we want to update
     *   }
     * })
     */
    upsert<T extends VlogUpsertArgs>(args: SelectSubset<T, VlogUpsertArgs<ExtArgs>>): Prisma__VlogClient<$Result.GetResult<Prisma.$VlogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vlogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VlogCountArgs} args - Arguments to filter Vlogs to count.
     * @example
     * // Count the number of Vlogs
     * const count = await prisma.vlog.count({
     *   where: {
     *     // ... the filter for the Vlogs we want to count
     *   }
     * })
    **/
    count<T extends VlogCountArgs>(
      args?: Subset<T, VlogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VlogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vlog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VlogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VlogAggregateArgs>(args: Subset<T, VlogAggregateArgs>): Prisma.PrismaPromise<GetVlogAggregateType<T>>

    /**
     * Group by Vlog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VlogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VlogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VlogGroupByArgs['orderBy'] }
        : { orderBy?: VlogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VlogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVlogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vlog model
   */
  readonly fields: VlogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vlog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VlogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tags<T extends Vlog$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Vlog$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VlogTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vlog model
   */
  interface VlogFieldRefs {
    readonly id: FieldRef<"Vlog", 'Int'>
    readonly title: FieldRef<"Vlog", 'String'>
    readonly slug: FieldRef<"Vlog", 'String'>
    readonly description: FieldRef<"Vlog", 'String'>
    readonly video_url: FieldRef<"Vlog", 'String'>
    readonly published_at: FieldRef<"Vlog", 'DateTime'>
    readonly created_at: FieldRef<"Vlog", 'DateTime'>
    readonly updated_at: FieldRef<"Vlog", 'DateTime'>
    readonly is_published: FieldRef<"Vlog", 'Boolean'>
    readonly thumbnail_url: FieldRef<"Vlog", 'String'>
    readonly duration: FieldRef<"Vlog", 'String'>
    readonly meta_description: FieldRef<"Vlog", 'String'>
    readonly meta_keywords: FieldRef<"Vlog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Vlog findUnique
   */
  export type VlogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vlog
     */
    select?: VlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vlog
     */
    omit?: VlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogInclude<ExtArgs> | null
    /**
     * Filter, which Vlog to fetch.
     */
    where: VlogWhereUniqueInput
  }

  /**
   * Vlog findUniqueOrThrow
   */
  export type VlogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vlog
     */
    select?: VlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vlog
     */
    omit?: VlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogInclude<ExtArgs> | null
    /**
     * Filter, which Vlog to fetch.
     */
    where: VlogWhereUniqueInput
  }

  /**
   * Vlog findFirst
   */
  export type VlogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vlog
     */
    select?: VlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vlog
     */
    omit?: VlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogInclude<ExtArgs> | null
    /**
     * Filter, which Vlog to fetch.
     */
    where?: VlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vlogs to fetch.
     */
    orderBy?: VlogOrderByWithRelationInput | VlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vlogs.
     */
    cursor?: VlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vlogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vlogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vlogs.
     */
    distinct?: VlogScalarFieldEnum | VlogScalarFieldEnum[]
  }

  /**
   * Vlog findFirstOrThrow
   */
  export type VlogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vlog
     */
    select?: VlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vlog
     */
    omit?: VlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogInclude<ExtArgs> | null
    /**
     * Filter, which Vlog to fetch.
     */
    where?: VlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vlogs to fetch.
     */
    orderBy?: VlogOrderByWithRelationInput | VlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vlogs.
     */
    cursor?: VlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vlogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vlogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vlogs.
     */
    distinct?: VlogScalarFieldEnum | VlogScalarFieldEnum[]
  }

  /**
   * Vlog findMany
   */
  export type VlogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vlog
     */
    select?: VlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vlog
     */
    omit?: VlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogInclude<ExtArgs> | null
    /**
     * Filter, which Vlogs to fetch.
     */
    where?: VlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vlogs to fetch.
     */
    orderBy?: VlogOrderByWithRelationInput | VlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vlogs.
     */
    cursor?: VlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vlogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vlogs.
     */
    skip?: number
    distinct?: VlogScalarFieldEnum | VlogScalarFieldEnum[]
  }

  /**
   * Vlog create
   */
  export type VlogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vlog
     */
    select?: VlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vlog
     */
    omit?: VlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogInclude<ExtArgs> | null
    /**
     * The data needed to create a Vlog.
     */
    data: XOR<VlogCreateInput, VlogUncheckedCreateInput>
  }

  /**
   * Vlog createMany
   */
  export type VlogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vlogs.
     */
    data: VlogCreateManyInput | VlogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vlog createManyAndReturn
   */
  export type VlogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vlog
     */
    select?: VlogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vlog
     */
    omit?: VlogOmit<ExtArgs> | null
    /**
     * The data used to create many Vlogs.
     */
    data: VlogCreateManyInput | VlogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vlog update
   */
  export type VlogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vlog
     */
    select?: VlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vlog
     */
    omit?: VlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogInclude<ExtArgs> | null
    /**
     * The data needed to update a Vlog.
     */
    data: XOR<VlogUpdateInput, VlogUncheckedUpdateInput>
    /**
     * Choose, which Vlog to update.
     */
    where: VlogWhereUniqueInput
  }

  /**
   * Vlog updateMany
   */
  export type VlogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vlogs.
     */
    data: XOR<VlogUpdateManyMutationInput, VlogUncheckedUpdateManyInput>
    /**
     * Filter which Vlogs to update
     */
    where?: VlogWhereInput
    /**
     * Limit how many Vlogs to update.
     */
    limit?: number
  }

  /**
   * Vlog updateManyAndReturn
   */
  export type VlogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vlog
     */
    select?: VlogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vlog
     */
    omit?: VlogOmit<ExtArgs> | null
    /**
     * The data used to update Vlogs.
     */
    data: XOR<VlogUpdateManyMutationInput, VlogUncheckedUpdateManyInput>
    /**
     * Filter which Vlogs to update
     */
    where?: VlogWhereInput
    /**
     * Limit how many Vlogs to update.
     */
    limit?: number
  }

  /**
   * Vlog upsert
   */
  export type VlogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vlog
     */
    select?: VlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vlog
     */
    omit?: VlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogInclude<ExtArgs> | null
    /**
     * The filter to search for the Vlog to update in case it exists.
     */
    where: VlogWhereUniqueInput
    /**
     * In case the Vlog found by the `where` argument doesn't exist, create a new Vlog with this data.
     */
    create: XOR<VlogCreateInput, VlogUncheckedCreateInput>
    /**
     * In case the Vlog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VlogUpdateInput, VlogUncheckedUpdateInput>
  }

  /**
   * Vlog delete
   */
  export type VlogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vlog
     */
    select?: VlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vlog
     */
    omit?: VlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogInclude<ExtArgs> | null
    /**
     * Filter which Vlog to delete.
     */
    where: VlogWhereUniqueInput
  }

  /**
   * Vlog deleteMany
   */
  export type VlogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vlogs to delete
     */
    where?: VlogWhereInput
    /**
     * Limit how many Vlogs to delete.
     */
    limit?: number
  }

  /**
   * Vlog.tags
   */
  export type Vlog$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VlogTag
     */
    select?: VlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VlogTag
     */
    omit?: VlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogTagInclude<ExtArgs> | null
    where?: VlogTagWhereInput
    orderBy?: VlogTagOrderByWithRelationInput | VlogTagOrderByWithRelationInput[]
    cursor?: VlogTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VlogTagScalarFieldEnum | VlogTagScalarFieldEnum[]
  }

  /**
   * Vlog without action
   */
  export type VlogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vlog
     */
    select?: VlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vlog
     */
    omit?: VlogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogInclude<ExtArgs> | null
  }


  /**
   * Model VlogTag
   */

  export type AggregateVlogTag = {
    _count: VlogTagCountAggregateOutputType | null
    _avg: VlogTagAvgAggregateOutputType | null
    _sum: VlogTagSumAggregateOutputType | null
    _min: VlogTagMinAggregateOutputType | null
    _max: VlogTagMaxAggregateOutputType | null
  }

  export type VlogTagAvgAggregateOutputType = {
    vlog_id: number | null
    tag_id: number | null
  }

  export type VlogTagSumAggregateOutputType = {
    vlog_id: number | null
    tag_id: number | null
  }

  export type VlogTagMinAggregateOutputType = {
    vlog_id: number | null
    tag_id: number | null
  }

  export type VlogTagMaxAggregateOutputType = {
    vlog_id: number | null
    tag_id: number | null
  }

  export type VlogTagCountAggregateOutputType = {
    vlog_id: number
    tag_id: number
    _all: number
  }


  export type VlogTagAvgAggregateInputType = {
    vlog_id?: true
    tag_id?: true
  }

  export type VlogTagSumAggregateInputType = {
    vlog_id?: true
    tag_id?: true
  }

  export type VlogTagMinAggregateInputType = {
    vlog_id?: true
    tag_id?: true
  }

  export type VlogTagMaxAggregateInputType = {
    vlog_id?: true
    tag_id?: true
  }

  export type VlogTagCountAggregateInputType = {
    vlog_id?: true
    tag_id?: true
    _all?: true
  }

  export type VlogTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VlogTag to aggregate.
     */
    where?: VlogTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VlogTags to fetch.
     */
    orderBy?: VlogTagOrderByWithRelationInput | VlogTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VlogTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VlogTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VlogTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VlogTags
    **/
    _count?: true | VlogTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VlogTagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VlogTagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VlogTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VlogTagMaxAggregateInputType
  }

  export type GetVlogTagAggregateType<T extends VlogTagAggregateArgs> = {
        [P in keyof T & keyof AggregateVlogTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVlogTag[P]>
      : GetScalarType<T[P], AggregateVlogTag[P]>
  }




  export type VlogTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VlogTagWhereInput
    orderBy?: VlogTagOrderByWithAggregationInput | VlogTagOrderByWithAggregationInput[]
    by: VlogTagScalarFieldEnum[] | VlogTagScalarFieldEnum
    having?: VlogTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VlogTagCountAggregateInputType | true
    _avg?: VlogTagAvgAggregateInputType
    _sum?: VlogTagSumAggregateInputType
    _min?: VlogTagMinAggregateInputType
    _max?: VlogTagMaxAggregateInputType
  }

  export type VlogTagGroupByOutputType = {
    vlog_id: number
    tag_id: number
    _count: VlogTagCountAggregateOutputType | null
    _avg: VlogTagAvgAggregateOutputType | null
    _sum: VlogTagSumAggregateOutputType | null
    _min: VlogTagMinAggregateOutputType | null
    _max: VlogTagMaxAggregateOutputType | null
  }

  type GetVlogTagGroupByPayload<T extends VlogTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VlogTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VlogTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VlogTagGroupByOutputType[P]>
            : GetScalarType<T[P], VlogTagGroupByOutputType[P]>
        }
      >
    >


  export type VlogTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    vlog_id?: boolean
    tag_id?: boolean
    vlog?: boolean | VlogDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vlogTag"]>

  export type VlogTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    vlog_id?: boolean
    tag_id?: boolean
    vlog?: boolean | VlogDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vlogTag"]>

  export type VlogTagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    vlog_id?: boolean
    tag_id?: boolean
    vlog?: boolean | VlogDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vlogTag"]>

  export type VlogTagSelectScalar = {
    vlog_id?: boolean
    tag_id?: boolean
  }

  export type VlogTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"vlog_id" | "tag_id", ExtArgs["result"]["vlogTag"]>
  export type VlogTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vlog?: boolean | VlogDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type VlogTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vlog?: boolean | VlogDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type VlogTagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vlog?: boolean | VlogDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $VlogTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VlogTag"
    objects: {
      vlog: Prisma.$VlogPayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      vlog_id: number
      tag_id: number
    }, ExtArgs["result"]["vlogTag"]>
    composites: {}
  }

  type VlogTagGetPayload<S extends boolean | null | undefined | VlogTagDefaultArgs> = $Result.GetResult<Prisma.$VlogTagPayload, S>

  type VlogTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VlogTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VlogTagCountAggregateInputType | true
    }

  export interface VlogTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VlogTag'], meta: { name: 'VlogTag' } }
    /**
     * Find zero or one VlogTag that matches the filter.
     * @param {VlogTagFindUniqueArgs} args - Arguments to find a VlogTag
     * @example
     * // Get one VlogTag
     * const vlogTag = await prisma.vlogTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VlogTagFindUniqueArgs>(args: SelectSubset<T, VlogTagFindUniqueArgs<ExtArgs>>): Prisma__VlogTagClient<$Result.GetResult<Prisma.$VlogTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VlogTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VlogTagFindUniqueOrThrowArgs} args - Arguments to find a VlogTag
     * @example
     * // Get one VlogTag
     * const vlogTag = await prisma.vlogTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VlogTagFindUniqueOrThrowArgs>(args: SelectSubset<T, VlogTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VlogTagClient<$Result.GetResult<Prisma.$VlogTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VlogTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VlogTagFindFirstArgs} args - Arguments to find a VlogTag
     * @example
     * // Get one VlogTag
     * const vlogTag = await prisma.vlogTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VlogTagFindFirstArgs>(args?: SelectSubset<T, VlogTagFindFirstArgs<ExtArgs>>): Prisma__VlogTagClient<$Result.GetResult<Prisma.$VlogTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VlogTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VlogTagFindFirstOrThrowArgs} args - Arguments to find a VlogTag
     * @example
     * // Get one VlogTag
     * const vlogTag = await prisma.vlogTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VlogTagFindFirstOrThrowArgs>(args?: SelectSubset<T, VlogTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__VlogTagClient<$Result.GetResult<Prisma.$VlogTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VlogTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VlogTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VlogTags
     * const vlogTags = await prisma.vlogTag.findMany()
     * 
     * // Get first 10 VlogTags
     * const vlogTags = await prisma.vlogTag.findMany({ take: 10 })
     * 
     * // Only select the `vlog_id`
     * const vlogTagWithVlog_idOnly = await prisma.vlogTag.findMany({ select: { vlog_id: true } })
     * 
     */
    findMany<T extends VlogTagFindManyArgs>(args?: SelectSubset<T, VlogTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VlogTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VlogTag.
     * @param {VlogTagCreateArgs} args - Arguments to create a VlogTag.
     * @example
     * // Create one VlogTag
     * const VlogTag = await prisma.vlogTag.create({
     *   data: {
     *     // ... data to create a VlogTag
     *   }
     * })
     * 
     */
    create<T extends VlogTagCreateArgs>(args: SelectSubset<T, VlogTagCreateArgs<ExtArgs>>): Prisma__VlogTagClient<$Result.GetResult<Prisma.$VlogTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VlogTags.
     * @param {VlogTagCreateManyArgs} args - Arguments to create many VlogTags.
     * @example
     * // Create many VlogTags
     * const vlogTag = await prisma.vlogTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VlogTagCreateManyArgs>(args?: SelectSubset<T, VlogTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VlogTags and returns the data saved in the database.
     * @param {VlogTagCreateManyAndReturnArgs} args - Arguments to create many VlogTags.
     * @example
     * // Create many VlogTags
     * const vlogTag = await prisma.vlogTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VlogTags and only return the `vlog_id`
     * const vlogTagWithVlog_idOnly = await prisma.vlogTag.createManyAndReturn({
     *   select: { vlog_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VlogTagCreateManyAndReturnArgs>(args?: SelectSubset<T, VlogTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VlogTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VlogTag.
     * @param {VlogTagDeleteArgs} args - Arguments to delete one VlogTag.
     * @example
     * // Delete one VlogTag
     * const VlogTag = await prisma.vlogTag.delete({
     *   where: {
     *     // ... filter to delete one VlogTag
     *   }
     * })
     * 
     */
    delete<T extends VlogTagDeleteArgs>(args: SelectSubset<T, VlogTagDeleteArgs<ExtArgs>>): Prisma__VlogTagClient<$Result.GetResult<Prisma.$VlogTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VlogTag.
     * @param {VlogTagUpdateArgs} args - Arguments to update one VlogTag.
     * @example
     * // Update one VlogTag
     * const vlogTag = await prisma.vlogTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VlogTagUpdateArgs>(args: SelectSubset<T, VlogTagUpdateArgs<ExtArgs>>): Prisma__VlogTagClient<$Result.GetResult<Prisma.$VlogTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VlogTags.
     * @param {VlogTagDeleteManyArgs} args - Arguments to filter VlogTags to delete.
     * @example
     * // Delete a few VlogTags
     * const { count } = await prisma.vlogTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VlogTagDeleteManyArgs>(args?: SelectSubset<T, VlogTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VlogTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VlogTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VlogTags
     * const vlogTag = await prisma.vlogTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VlogTagUpdateManyArgs>(args: SelectSubset<T, VlogTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VlogTags and returns the data updated in the database.
     * @param {VlogTagUpdateManyAndReturnArgs} args - Arguments to update many VlogTags.
     * @example
     * // Update many VlogTags
     * const vlogTag = await prisma.vlogTag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VlogTags and only return the `vlog_id`
     * const vlogTagWithVlog_idOnly = await prisma.vlogTag.updateManyAndReturn({
     *   select: { vlog_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VlogTagUpdateManyAndReturnArgs>(args: SelectSubset<T, VlogTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VlogTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VlogTag.
     * @param {VlogTagUpsertArgs} args - Arguments to update or create a VlogTag.
     * @example
     * // Update or create a VlogTag
     * const vlogTag = await prisma.vlogTag.upsert({
     *   create: {
     *     // ... data to create a VlogTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VlogTag we want to update
     *   }
     * })
     */
    upsert<T extends VlogTagUpsertArgs>(args: SelectSubset<T, VlogTagUpsertArgs<ExtArgs>>): Prisma__VlogTagClient<$Result.GetResult<Prisma.$VlogTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VlogTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VlogTagCountArgs} args - Arguments to filter VlogTags to count.
     * @example
     * // Count the number of VlogTags
     * const count = await prisma.vlogTag.count({
     *   where: {
     *     // ... the filter for the VlogTags we want to count
     *   }
     * })
    **/
    count<T extends VlogTagCountArgs>(
      args?: Subset<T, VlogTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VlogTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VlogTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VlogTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VlogTagAggregateArgs>(args: Subset<T, VlogTagAggregateArgs>): Prisma.PrismaPromise<GetVlogTagAggregateType<T>>

    /**
     * Group by VlogTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VlogTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VlogTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VlogTagGroupByArgs['orderBy'] }
        : { orderBy?: VlogTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VlogTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVlogTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VlogTag model
   */
  readonly fields: VlogTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VlogTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VlogTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vlog<T extends VlogDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VlogDefaultArgs<ExtArgs>>): Prisma__VlogClient<$Result.GetResult<Prisma.$VlogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VlogTag model
   */
  interface VlogTagFieldRefs {
    readonly vlog_id: FieldRef<"VlogTag", 'Int'>
    readonly tag_id: FieldRef<"VlogTag", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * VlogTag findUnique
   */
  export type VlogTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VlogTag
     */
    select?: VlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VlogTag
     */
    omit?: VlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogTagInclude<ExtArgs> | null
    /**
     * Filter, which VlogTag to fetch.
     */
    where: VlogTagWhereUniqueInput
  }

  /**
   * VlogTag findUniqueOrThrow
   */
  export type VlogTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VlogTag
     */
    select?: VlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VlogTag
     */
    omit?: VlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogTagInclude<ExtArgs> | null
    /**
     * Filter, which VlogTag to fetch.
     */
    where: VlogTagWhereUniqueInput
  }

  /**
   * VlogTag findFirst
   */
  export type VlogTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VlogTag
     */
    select?: VlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VlogTag
     */
    omit?: VlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogTagInclude<ExtArgs> | null
    /**
     * Filter, which VlogTag to fetch.
     */
    where?: VlogTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VlogTags to fetch.
     */
    orderBy?: VlogTagOrderByWithRelationInput | VlogTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VlogTags.
     */
    cursor?: VlogTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VlogTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VlogTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VlogTags.
     */
    distinct?: VlogTagScalarFieldEnum | VlogTagScalarFieldEnum[]
  }

  /**
   * VlogTag findFirstOrThrow
   */
  export type VlogTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VlogTag
     */
    select?: VlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VlogTag
     */
    omit?: VlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogTagInclude<ExtArgs> | null
    /**
     * Filter, which VlogTag to fetch.
     */
    where?: VlogTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VlogTags to fetch.
     */
    orderBy?: VlogTagOrderByWithRelationInput | VlogTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VlogTags.
     */
    cursor?: VlogTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VlogTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VlogTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VlogTags.
     */
    distinct?: VlogTagScalarFieldEnum | VlogTagScalarFieldEnum[]
  }

  /**
   * VlogTag findMany
   */
  export type VlogTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VlogTag
     */
    select?: VlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VlogTag
     */
    omit?: VlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogTagInclude<ExtArgs> | null
    /**
     * Filter, which VlogTags to fetch.
     */
    where?: VlogTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VlogTags to fetch.
     */
    orderBy?: VlogTagOrderByWithRelationInput | VlogTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VlogTags.
     */
    cursor?: VlogTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VlogTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VlogTags.
     */
    skip?: number
    distinct?: VlogTagScalarFieldEnum | VlogTagScalarFieldEnum[]
  }

  /**
   * VlogTag create
   */
  export type VlogTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VlogTag
     */
    select?: VlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VlogTag
     */
    omit?: VlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogTagInclude<ExtArgs> | null
    /**
     * The data needed to create a VlogTag.
     */
    data: XOR<VlogTagCreateInput, VlogTagUncheckedCreateInput>
  }

  /**
   * VlogTag createMany
   */
  export type VlogTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VlogTags.
     */
    data: VlogTagCreateManyInput | VlogTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VlogTag createManyAndReturn
   */
  export type VlogTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VlogTag
     */
    select?: VlogTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VlogTag
     */
    omit?: VlogTagOmit<ExtArgs> | null
    /**
     * The data used to create many VlogTags.
     */
    data: VlogTagCreateManyInput | VlogTagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VlogTag update
   */
  export type VlogTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VlogTag
     */
    select?: VlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VlogTag
     */
    omit?: VlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogTagInclude<ExtArgs> | null
    /**
     * The data needed to update a VlogTag.
     */
    data: XOR<VlogTagUpdateInput, VlogTagUncheckedUpdateInput>
    /**
     * Choose, which VlogTag to update.
     */
    where: VlogTagWhereUniqueInput
  }

  /**
   * VlogTag updateMany
   */
  export type VlogTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VlogTags.
     */
    data: XOR<VlogTagUpdateManyMutationInput, VlogTagUncheckedUpdateManyInput>
    /**
     * Filter which VlogTags to update
     */
    where?: VlogTagWhereInput
    /**
     * Limit how many VlogTags to update.
     */
    limit?: number
  }

  /**
   * VlogTag updateManyAndReturn
   */
  export type VlogTagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VlogTag
     */
    select?: VlogTagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VlogTag
     */
    omit?: VlogTagOmit<ExtArgs> | null
    /**
     * The data used to update VlogTags.
     */
    data: XOR<VlogTagUpdateManyMutationInput, VlogTagUncheckedUpdateManyInput>
    /**
     * Filter which VlogTags to update
     */
    where?: VlogTagWhereInput
    /**
     * Limit how many VlogTags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogTagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VlogTag upsert
   */
  export type VlogTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VlogTag
     */
    select?: VlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VlogTag
     */
    omit?: VlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogTagInclude<ExtArgs> | null
    /**
     * The filter to search for the VlogTag to update in case it exists.
     */
    where: VlogTagWhereUniqueInput
    /**
     * In case the VlogTag found by the `where` argument doesn't exist, create a new VlogTag with this data.
     */
    create: XOR<VlogTagCreateInput, VlogTagUncheckedCreateInput>
    /**
     * In case the VlogTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VlogTagUpdateInput, VlogTagUncheckedUpdateInput>
  }

  /**
   * VlogTag delete
   */
  export type VlogTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VlogTag
     */
    select?: VlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VlogTag
     */
    omit?: VlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogTagInclude<ExtArgs> | null
    /**
     * Filter which VlogTag to delete.
     */
    where: VlogTagWhereUniqueInput
  }

  /**
   * VlogTag deleteMany
   */
  export type VlogTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VlogTags to delete
     */
    where?: VlogTagWhereInput
    /**
     * Limit how many VlogTags to delete.
     */
    limit?: number
  }

  /**
   * VlogTag without action
   */
  export type VlogTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VlogTag
     */
    select?: VlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VlogTag
     */
    omit?: VlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VlogTagInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BlogScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    slug: 'slug',
    content: 'content',
    author: 'author',
    priority: 'priority',
    category: 'category',
    published_at: 'published_at',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_published: 'is_published',
    featured_image_url: 'featured_image_url',
    meta_description: 'meta_description',
    meta_keywords: 'meta_keywords'
  };

  export type BlogScalarFieldEnum = (typeof BlogScalarFieldEnum)[keyof typeof BlogScalarFieldEnum]


  export const PhotoScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    file_url: 'file_url',
    taken_at: 'taken_at',
    uploaded_at: 'uploaded_at',
    created_at: 'created_at',
    updated_at: 'updated_at',
    location: 'location'
  };

  export type PhotoScalarFieldEnum = (typeof PhotoScalarFieldEnum)[keyof typeof PhotoScalarFieldEnum]


  export const PoemScalarFieldEnum: {
    id: 'id',
    title: 'title',
    author: 'author',
    content: 'content',
    written_at: 'written_at',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_published: 'is_published'
  };

  export type PoemScalarFieldEnum = (typeof PoemScalarFieldEnum)[keyof typeof PoemScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const BlogTagScalarFieldEnum: {
    blog_id: 'blog_id',
    tag_id: 'tag_id'
  };

  export type BlogTagScalarFieldEnum = (typeof BlogTagScalarFieldEnum)[keyof typeof BlogTagScalarFieldEnum]


  export const PhotoTagScalarFieldEnum: {
    photo_id: 'photo_id',
    tag_id: 'tag_id'
  };

  export type PhotoTagScalarFieldEnum = (typeof PhotoTagScalarFieldEnum)[keyof typeof PhotoTagScalarFieldEnum]


  export const VlogScalarFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug',
    description: 'description',
    video_url: 'video_url',
    published_at: 'published_at',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_published: 'is_published',
    thumbnail_url: 'thumbnail_url',
    duration: 'duration',
    meta_description: 'meta_description',
    meta_keywords: 'meta_keywords'
  };

  export type VlogScalarFieldEnum = (typeof VlogScalarFieldEnum)[keyof typeof VlogScalarFieldEnum]


  export const VlogTagScalarFieldEnum: {
    vlog_id: 'vlog_id',
    tag_id: 'tag_id'
  };

  export type VlogTagScalarFieldEnum = (typeof VlogTagScalarFieldEnum)[keyof typeof VlogTagScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type BlogWhereInput = {
    AND?: BlogWhereInput | BlogWhereInput[]
    OR?: BlogWhereInput[]
    NOT?: BlogWhereInput | BlogWhereInput[]
    id?: IntFilter<"Blog"> | number
    title?: StringFilter<"Blog"> | string
    description?: StringFilter<"Blog"> | string
    slug?: StringFilter<"Blog"> | string
    content?: StringFilter<"Blog"> | string
    author?: StringFilter<"Blog"> | string
    priority?: IntFilter<"Blog"> | number
    category?: StringFilter<"Blog"> | string
    published_at?: DateTimeFilter<"Blog"> | Date | string
    created_at?: DateTimeFilter<"Blog"> | Date | string
    updated_at?: DateTimeFilter<"Blog"> | Date | string
    is_published?: BoolFilter<"Blog"> | boolean
    featured_image_url?: StringNullableFilter<"Blog"> | string | null
    meta_description?: StringNullableFilter<"Blog"> | string | null
    meta_keywords?: StringNullableFilter<"Blog"> | string | null
    tags?: BlogTagListRelationFilter
  }

  export type BlogOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    author?: SortOrder
    priority?: SortOrder
    category?: SortOrder
    published_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_published?: SortOrder
    featured_image_url?: SortOrderInput | SortOrder
    meta_description?: SortOrderInput | SortOrder
    meta_keywords?: SortOrderInput | SortOrder
    tags?: BlogTagOrderByRelationAggregateInput
  }

  export type BlogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: BlogWhereInput | BlogWhereInput[]
    OR?: BlogWhereInput[]
    NOT?: BlogWhereInput | BlogWhereInput[]
    title?: StringFilter<"Blog"> | string
    description?: StringFilter<"Blog"> | string
    content?: StringFilter<"Blog"> | string
    author?: StringFilter<"Blog"> | string
    priority?: IntFilter<"Blog"> | number
    category?: StringFilter<"Blog"> | string
    published_at?: DateTimeFilter<"Blog"> | Date | string
    created_at?: DateTimeFilter<"Blog"> | Date | string
    updated_at?: DateTimeFilter<"Blog"> | Date | string
    is_published?: BoolFilter<"Blog"> | boolean
    featured_image_url?: StringNullableFilter<"Blog"> | string | null
    meta_description?: StringNullableFilter<"Blog"> | string | null
    meta_keywords?: StringNullableFilter<"Blog"> | string | null
    tags?: BlogTagListRelationFilter
  }, "id" | "slug">

  export type BlogOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    author?: SortOrder
    priority?: SortOrder
    category?: SortOrder
    published_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_published?: SortOrder
    featured_image_url?: SortOrderInput | SortOrder
    meta_description?: SortOrderInput | SortOrder
    meta_keywords?: SortOrderInput | SortOrder
    _count?: BlogCountOrderByAggregateInput
    _avg?: BlogAvgOrderByAggregateInput
    _max?: BlogMaxOrderByAggregateInput
    _min?: BlogMinOrderByAggregateInput
    _sum?: BlogSumOrderByAggregateInput
  }

  export type BlogScalarWhereWithAggregatesInput = {
    AND?: BlogScalarWhereWithAggregatesInput | BlogScalarWhereWithAggregatesInput[]
    OR?: BlogScalarWhereWithAggregatesInput[]
    NOT?: BlogScalarWhereWithAggregatesInput | BlogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Blog"> | number
    title?: StringWithAggregatesFilter<"Blog"> | string
    description?: StringWithAggregatesFilter<"Blog"> | string
    slug?: StringWithAggregatesFilter<"Blog"> | string
    content?: StringWithAggregatesFilter<"Blog"> | string
    author?: StringWithAggregatesFilter<"Blog"> | string
    priority?: IntWithAggregatesFilter<"Blog"> | number
    category?: StringWithAggregatesFilter<"Blog"> | string
    published_at?: DateTimeWithAggregatesFilter<"Blog"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"Blog"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Blog"> | Date | string
    is_published?: BoolWithAggregatesFilter<"Blog"> | boolean
    featured_image_url?: StringNullableWithAggregatesFilter<"Blog"> | string | null
    meta_description?: StringNullableWithAggregatesFilter<"Blog"> | string | null
    meta_keywords?: StringNullableWithAggregatesFilter<"Blog"> | string | null
  }

  export type PhotoWhereInput = {
    AND?: PhotoWhereInput | PhotoWhereInput[]
    OR?: PhotoWhereInput[]
    NOT?: PhotoWhereInput | PhotoWhereInput[]
    id?: IntFilter<"Photo"> | number
    title?: StringNullableFilter<"Photo"> | string | null
    description?: StringNullableFilter<"Photo"> | string | null
    file_url?: StringFilter<"Photo"> | string
    taken_at?: DateTimeNullableFilter<"Photo"> | Date | string | null
    uploaded_at?: DateTimeFilter<"Photo"> | Date | string
    created_at?: DateTimeFilter<"Photo"> | Date | string
    updated_at?: DateTimeFilter<"Photo"> | Date | string
    location?: StringNullableFilter<"Photo"> | string | null
    tags?: PhotoTagListRelationFilter
  }

  export type PhotoOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    file_url?: SortOrder
    taken_at?: SortOrderInput | SortOrder
    uploaded_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    location?: SortOrderInput | SortOrder
    tags?: PhotoTagOrderByRelationAggregateInput
  }

  export type PhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    file_url?: string
    AND?: PhotoWhereInput | PhotoWhereInput[]
    OR?: PhotoWhereInput[]
    NOT?: PhotoWhereInput | PhotoWhereInput[]
    title?: StringNullableFilter<"Photo"> | string | null
    description?: StringNullableFilter<"Photo"> | string | null
    taken_at?: DateTimeNullableFilter<"Photo"> | Date | string | null
    uploaded_at?: DateTimeFilter<"Photo"> | Date | string
    created_at?: DateTimeFilter<"Photo"> | Date | string
    updated_at?: DateTimeFilter<"Photo"> | Date | string
    location?: StringNullableFilter<"Photo"> | string | null
    tags?: PhotoTagListRelationFilter
  }, "id" | "file_url">

  export type PhotoOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    file_url?: SortOrder
    taken_at?: SortOrderInput | SortOrder
    uploaded_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    location?: SortOrderInput | SortOrder
    _count?: PhotoCountOrderByAggregateInput
    _avg?: PhotoAvgOrderByAggregateInput
    _max?: PhotoMaxOrderByAggregateInput
    _min?: PhotoMinOrderByAggregateInput
    _sum?: PhotoSumOrderByAggregateInput
  }

  export type PhotoScalarWhereWithAggregatesInput = {
    AND?: PhotoScalarWhereWithAggregatesInput | PhotoScalarWhereWithAggregatesInput[]
    OR?: PhotoScalarWhereWithAggregatesInput[]
    NOT?: PhotoScalarWhereWithAggregatesInput | PhotoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Photo"> | number
    title?: StringNullableWithAggregatesFilter<"Photo"> | string | null
    description?: StringNullableWithAggregatesFilter<"Photo"> | string | null
    file_url?: StringWithAggregatesFilter<"Photo"> | string
    taken_at?: DateTimeNullableWithAggregatesFilter<"Photo"> | Date | string | null
    uploaded_at?: DateTimeWithAggregatesFilter<"Photo"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"Photo"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Photo"> | Date | string
    location?: StringNullableWithAggregatesFilter<"Photo"> | string | null
  }

  export type PoemWhereInput = {
    AND?: PoemWhereInput | PoemWhereInput[]
    OR?: PoemWhereInput[]
    NOT?: PoemWhereInput | PoemWhereInput[]
    id?: IntFilter<"Poem"> | number
    title?: StringFilter<"Poem"> | string
    author?: StringFilter<"Poem"> | string
    content?: StringFilter<"Poem"> | string
    written_at?: DateTimeNullableFilter<"Poem"> | Date | string | null
    created_at?: DateTimeFilter<"Poem"> | Date | string
    updated_at?: DateTimeFilter<"Poem"> | Date | string
    is_published?: BoolFilter<"Poem"> | boolean
  }

  export type PoemOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    content?: SortOrder
    written_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_published?: SortOrder
  }

  export type PoemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PoemWhereInput | PoemWhereInput[]
    OR?: PoemWhereInput[]
    NOT?: PoemWhereInput | PoemWhereInput[]
    title?: StringFilter<"Poem"> | string
    author?: StringFilter<"Poem"> | string
    content?: StringFilter<"Poem"> | string
    written_at?: DateTimeNullableFilter<"Poem"> | Date | string | null
    created_at?: DateTimeFilter<"Poem"> | Date | string
    updated_at?: DateTimeFilter<"Poem"> | Date | string
    is_published?: BoolFilter<"Poem"> | boolean
  }, "id">

  export type PoemOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    content?: SortOrder
    written_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_published?: SortOrder
    _count?: PoemCountOrderByAggregateInput
    _avg?: PoemAvgOrderByAggregateInput
    _max?: PoemMaxOrderByAggregateInput
    _min?: PoemMinOrderByAggregateInput
    _sum?: PoemSumOrderByAggregateInput
  }

  export type PoemScalarWhereWithAggregatesInput = {
    AND?: PoemScalarWhereWithAggregatesInput | PoemScalarWhereWithAggregatesInput[]
    OR?: PoemScalarWhereWithAggregatesInput[]
    NOT?: PoemScalarWhereWithAggregatesInput | PoemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Poem"> | number
    title?: StringWithAggregatesFilter<"Poem"> | string
    author?: StringWithAggregatesFilter<"Poem"> | string
    content?: StringWithAggregatesFilter<"Poem"> | string
    written_at?: DateTimeNullableWithAggregatesFilter<"Poem"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"Poem"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Poem"> | Date | string
    is_published?: BoolWithAggregatesFilter<"Poem"> | boolean
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: IntFilter<"Tag"> | number
    name?: StringFilter<"Tag"> | string
    slug?: StringFilter<"Tag"> | string
    blogs?: BlogTagListRelationFilter
    photos?: PhotoTagListRelationFilter
    vlogs?: VlogTagListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    blogs?: BlogTagOrderByRelationAggregateInput
    photos?: PhotoTagOrderByRelationAggregateInput
    vlogs?: VlogTagOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    slug?: string
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    blogs?: BlogTagListRelationFilter
    photos?: PhotoTagListRelationFilter
    vlogs?: VlogTagListRelationFilter
  }, "id" | "name" | "slug">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _avg?: TagAvgOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
    _sum?: TagSumOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Tag"> | number
    name?: StringWithAggregatesFilter<"Tag"> | string
    slug?: StringWithAggregatesFilter<"Tag"> | string
  }

  export type BlogTagWhereInput = {
    AND?: BlogTagWhereInput | BlogTagWhereInput[]
    OR?: BlogTagWhereInput[]
    NOT?: BlogTagWhereInput | BlogTagWhereInput[]
    blog_id?: IntFilter<"BlogTag"> | number
    tag_id?: IntFilter<"BlogTag"> | number
    blog?: XOR<BlogScalarRelationFilter, BlogWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }

  export type BlogTagOrderByWithRelationInput = {
    blog_id?: SortOrder
    tag_id?: SortOrder
    blog?: BlogOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
  }

  export type BlogTagWhereUniqueInput = Prisma.AtLeast<{
    blog_id_tag_id?: BlogTagBlog_idTag_idCompoundUniqueInput
    AND?: BlogTagWhereInput | BlogTagWhereInput[]
    OR?: BlogTagWhereInput[]
    NOT?: BlogTagWhereInput | BlogTagWhereInput[]
    blog_id?: IntFilter<"BlogTag"> | number
    tag_id?: IntFilter<"BlogTag"> | number
    blog?: XOR<BlogScalarRelationFilter, BlogWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }, "blog_id_tag_id">

  export type BlogTagOrderByWithAggregationInput = {
    blog_id?: SortOrder
    tag_id?: SortOrder
    _count?: BlogTagCountOrderByAggregateInput
    _avg?: BlogTagAvgOrderByAggregateInput
    _max?: BlogTagMaxOrderByAggregateInput
    _min?: BlogTagMinOrderByAggregateInput
    _sum?: BlogTagSumOrderByAggregateInput
  }

  export type BlogTagScalarWhereWithAggregatesInput = {
    AND?: BlogTagScalarWhereWithAggregatesInput | BlogTagScalarWhereWithAggregatesInput[]
    OR?: BlogTagScalarWhereWithAggregatesInput[]
    NOT?: BlogTagScalarWhereWithAggregatesInput | BlogTagScalarWhereWithAggregatesInput[]
    blog_id?: IntWithAggregatesFilter<"BlogTag"> | number
    tag_id?: IntWithAggregatesFilter<"BlogTag"> | number
  }

  export type PhotoTagWhereInput = {
    AND?: PhotoTagWhereInput | PhotoTagWhereInput[]
    OR?: PhotoTagWhereInput[]
    NOT?: PhotoTagWhereInput | PhotoTagWhereInput[]
    photo_id?: IntFilter<"PhotoTag"> | number
    tag_id?: IntFilter<"PhotoTag"> | number
    photo?: XOR<PhotoScalarRelationFilter, PhotoWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }

  export type PhotoTagOrderByWithRelationInput = {
    photo_id?: SortOrder
    tag_id?: SortOrder
    photo?: PhotoOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
  }

  export type PhotoTagWhereUniqueInput = Prisma.AtLeast<{
    photo_id_tag_id?: PhotoTagPhoto_idTag_idCompoundUniqueInput
    AND?: PhotoTagWhereInput | PhotoTagWhereInput[]
    OR?: PhotoTagWhereInput[]
    NOT?: PhotoTagWhereInput | PhotoTagWhereInput[]
    photo_id?: IntFilter<"PhotoTag"> | number
    tag_id?: IntFilter<"PhotoTag"> | number
    photo?: XOR<PhotoScalarRelationFilter, PhotoWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }, "photo_id_tag_id">

  export type PhotoTagOrderByWithAggregationInput = {
    photo_id?: SortOrder
    tag_id?: SortOrder
    _count?: PhotoTagCountOrderByAggregateInput
    _avg?: PhotoTagAvgOrderByAggregateInput
    _max?: PhotoTagMaxOrderByAggregateInput
    _min?: PhotoTagMinOrderByAggregateInput
    _sum?: PhotoTagSumOrderByAggregateInput
  }

  export type PhotoTagScalarWhereWithAggregatesInput = {
    AND?: PhotoTagScalarWhereWithAggregatesInput | PhotoTagScalarWhereWithAggregatesInput[]
    OR?: PhotoTagScalarWhereWithAggregatesInput[]
    NOT?: PhotoTagScalarWhereWithAggregatesInput | PhotoTagScalarWhereWithAggregatesInput[]
    photo_id?: IntWithAggregatesFilter<"PhotoTag"> | number
    tag_id?: IntWithAggregatesFilter<"PhotoTag"> | number
  }

  export type VlogWhereInput = {
    AND?: VlogWhereInput | VlogWhereInput[]
    OR?: VlogWhereInput[]
    NOT?: VlogWhereInput | VlogWhereInput[]
    id?: IntFilter<"Vlog"> | number
    title?: StringFilter<"Vlog"> | string
    slug?: StringFilter<"Vlog"> | string
    description?: StringNullableFilter<"Vlog"> | string | null
    video_url?: StringFilter<"Vlog"> | string
    published_at?: DateTimeFilter<"Vlog"> | Date | string
    created_at?: DateTimeFilter<"Vlog"> | Date | string
    updated_at?: DateTimeFilter<"Vlog"> | Date | string
    is_published?: BoolFilter<"Vlog"> | boolean
    thumbnail_url?: StringNullableFilter<"Vlog"> | string | null
    duration?: StringNullableFilter<"Vlog"> | string | null
    meta_description?: StringNullableFilter<"Vlog"> | string | null
    meta_keywords?: StringNullableFilter<"Vlog"> | string | null
    tags?: VlogTagListRelationFilter
  }

  export type VlogOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    video_url?: SortOrder
    published_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_published?: SortOrder
    thumbnail_url?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    meta_description?: SortOrderInput | SortOrder
    meta_keywords?: SortOrderInput | SortOrder
    tags?: VlogTagOrderByRelationAggregateInput
  }

  export type VlogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    video_url?: string
    AND?: VlogWhereInput | VlogWhereInput[]
    OR?: VlogWhereInput[]
    NOT?: VlogWhereInput | VlogWhereInput[]
    title?: StringFilter<"Vlog"> | string
    description?: StringNullableFilter<"Vlog"> | string | null
    published_at?: DateTimeFilter<"Vlog"> | Date | string
    created_at?: DateTimeFilter<"Vlog"> | Date | string
    updated_at?: DateTimeFilter<"Vlog"> | Date | string
    is_published?: BoolFilter<"Vlog"> | boolean
    thumbnail_url?: StringNullableFilter<"Vlog"> | string | null
    duration?: StringNullableFilter<"Vlog"> | string | null
    meta_description?: StringNullableFilter<"Vlog"> | string | null
    meta_keywords?: StringNullableFilter<"Vlog"> | string | null
    tags?: VlogTagListRelationFilter
  }, "id" | "slug" | "video_url">

  export type VlogOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    video_url?: SortOrder
    published_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_published?: SortOrder
    thumbnail_url?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    meta_description?: SortOrderInput | SortOrder
    meta_keywords?: SortOrderInput | SortOrder
    _count?: VlogCountOrderByAggregateInput
    _avg?: VlogAvgOrderByAggregateInput
    _max?: VlogMaxOrderByAggregateInput
    _min?: VlogMinOrderByAggregateInput
    _sum?: VlogSumOrderByAggregateInput
  }

  export type VlogScalarWhereWithAggregatesInput = {
    AND?: VlogScalarWhereWithAggregatesInput | VlogScalarWhereWithAggregatesInput[]
    OR?: VlogScalarWhereWithAggregatesInput[]
    NOT?: VlogScalarWhereWithAggregatesInput | VlogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Vlog"> | number
    title?: StringWithAggregatesFilter<"Vlog"> | string
    slug?: StringWithAggregatesFilter<"Vlog"> | string
    description?: StringNullableWithAggregatesFilter<"Vlog"> | string | null
    video_url?: StringWithAggregatesFilter<"Vlog"> | string
    published_at?: DateTimeWithAggregatesFilter<"Vlog"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"Vlog"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Vlog"> | Date | string
    is_published?: BoolWithAggregatesFilter<"Vlog"> | boolean
    thumbnail_url?: StringNullableWithAggregatesFilter<"Vlog"> | string | null
    duration?: StringNullableWithAggregatesFilter<"Vlog"> | string | null
    meta_description?: StringNullableWithAggregatesFilter<"Vlog"> | string | null
    meta_keywords?: StringNullableWithAggregatesFilter<"Vlog"> | string | null
  }

  export type VlogTagWhereInput = {
    AND?: VlogTagWhereInput | VlogTagWhereInput[]
    OR?: VlogTagWhereInput[]
    NOT?: VlogTagWhereInput | VlogTagWhereInput[]
    vlog_id?: IntFilter<"VlogTag"> | number
    tag_id?: IntFilter<"VlogTag"> | number
    vlog?: XOR<VlogScalarRelationFilter, VlogWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }

  export type VlogTagOrderByWithRelationInput = {
    vlog_id?: SortOrder
    tag_id?: SortOrder
    vlog?: VlogOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
  }

  export type VlogTagWhereUniqueInput = Prisma.AtLeast<{
    vlog_id_tag_id?: VlogTagVlog_idTag_idCompoundUniqueInput
    AND?: VlogTagWhereInput | VlogTagWhereInput[]
    OR?: VlogTagWhereInput[]
    NOT?: VlogTagWhereInput | VlogTagWhereInput[]
    vlog_id?: IntFilter<"VlogTag"> | number
    tag_id?: IntFilter<"VlogTag"> | number
    vlog?: XOR<VlogScalarRelationFilter, VlogWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }, "vlog_id_tag_id">

  export type VlogTagOrderByWithAggregationInput = {
    vlog_id?: SortOrder
    tag_id?: SortOrder
    _count?: VlogTagCountOrderByAggregateInput
    _avg?: VlogTagAvgOrderByAggregateInput
    _max?: VlogTagMaxOrderByAggregateInput
    _min?: VlogTagMinOrderByAggregateInput
    _sum?: VlogTagSumOrderByAggregateInput
  }

  export type VlogTagScalarWhereWithAggregatesInput = {
    AND?: VlogTagScalarWhereWithAggregatesInput | VlogTagScalarWhereWithAggregatesInput[]
    OR?: VlogTagScalarWhereWithAggregatesInput[]
    NOT?: VlogTagScalarWhereWithAggregatesInput | VlogTagScalarWhereWithAggregatesInput[]
    vlog_id?: IntWithAggregatesFilter<"VlogTag"> | number
    tag_id?: IntWithAggregatesFilter<"VlogTag"> | number
  }

  export type BlogCreateInput = {
    title: string
    description: string
    slug: string
    content: string
    author: string
    priority?: number
    category: string
    published_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    is_published?: boolean
    featured_image_url?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
    tags?: BlogTagCreateNestedManyWithoutBlogInput
  }

  export type BlogUncheckedCreateInput = {
    id?: number
    title: string
    description: string
    slug: string
    content: string
    author: string
    priority?: number
    category: string
    published_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    is_published?: boolean
    featured_image_url?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
    tags?: BlogTagUncheckedCreateNestedManyWithoutBlogInput
  }

  export type BlogUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_published?: BoolFieldUpdateOperationsInput | boolean
    featured_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: BlogTagUpdateManyWithoutBlogNestedInput
  }

  export type BlogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_published?: BoolFieldUpdateOperationsInput | boolean
    featured_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: BlogTagUncheckedUpdateManyWithoutBlogNestedInput
  }

  export type BlogCreateManyInput = {
    id?: number
    title: string
    description: string
    slug: string
    content: string
    author: string
    priority?: number
    category: string
    published_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    is_published?: boolean
    featured_image_url?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
  }

  export type BlogUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_published?: BoolFieldUpdateOperationsInput | boolean
    featured_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BlogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_published?: BoolFieldUpdateOperationsInput | boolean
    featured_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PhotoCreateInput = {
    title?: string | null
    description?: string | null
    file_url: string
    taken_at?: Date | string | null
    uploaded_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    location?: string | null
    tags?: PhotoTagCreateNestedManyWithoutPhotoInput
  }

  export type PhotoUncheckedCreateInput = {
    id?: number
    title?: string | null
    description?: string | null
    file_url: string
    taken_at?: Date | string | null
    uploaded_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    location?: string | null
    tags?: PhotoTagUncheckedCreateNestedManyWithoutPhotoInput
  }

  export type PhotoUpdateInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    taken_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: PhotoTagUpdateManyWithoutPhotoNestedInput
  }

  export type PhotoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    taken_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: PhotoTagUncheckedUpdateManyWithoutPhotoNestedInput
  }

  export type PhotoCreateManyInput = {
    id?: number
    title?: string | null
    description?: string | null
    file_url: string
    taken_at?: Date | string | null
    uploaded_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    location?: string | null
  }

  export type PhotoUpdateManyMutationInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    taken_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PhotoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    taken_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PoemCreateInput = {
    title: string
    author: string
    content: string
    written_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    is_published?: boolean
  }

  export type PoemUncheckedCreateInput = {
    id?: number
    title: string
    author: string
    content: string
    written_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    is_published?: boolean
  }

  export type PoemUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    written_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_published?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PoemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    written_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_published?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PoemCreateManyInput = {
    id?: number
    title: string
    author: string
    content: string
    written_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    is_published?: boolean
  }

  export type PoemUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    written_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_published?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PoemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    written_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_published?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TagCreateInput = {
    name: string
    slug: string
    blogs?: BlogTagCreateNestedManyWithoutTagInput
    photos?: PhotoTagCreateNestedManyWithoutTagInput
    vlogs?: VlogTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateInput = {
    id?: number
    name: string
    slug: string
    blogs?: BlogTagUncheckedCreateNestedManyWithoutTagInput
    photos?: PhotoTagUncheckedCreateNestedManyWithoutTagInput
    vlogs?: VlogTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    blogs?: BlogTagUpdateManyWithoutTagNestedInput
    photos?: PhotoTagUpdateManyWithoutTagNestedInput
    vlogs?: VlogTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    blogs?: BlogTagUncheckedUpdateManyWithoutTagNestedInput
    photos?: PhotoTagUncheckedUpdateManyWithoutTagNestedInput
    vlogs?: VlogTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type TagCreateManyInput = {
    id?: number
    name: string
    slug: string
  }

  export type TagUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type BlogTagCreateInput = {
    blog: BlogCreateNestedOneWithoutTagsInput
    tag: TagCreateNestedOneWithoutBlogsInput
  }

  export type BlogTagUncheckedCreateInput = {
    blog_id: number
    tag_id: number
  }

  export type BlogTagUpdateInput = {
    blog?: BlogUpdateOneRequiredWithoutTagsNestedInput
    tag?: TagUpdateOneRequiredWithoutBlogsNestedInput
  }

  export type BlogTagUncheckedUpdateInput = {
    blog_id?: IntFieldUpdateOperationsInput | number
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type BlogTagCreateManyInput = {
    blog_id: number
    tag_id: number
  }

  export type BlogTagUpdateManyMutationInput = {

  }

  export type BlogTagUncheckedUpdateManyInput = {
    blog_id?: IntFieldUpdateOperationsInput | number
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type PhotoTagCreateInput = {
    photo: PhotoCreateNestedOneWithoutTagsInput
    tag: TagCreateNestedOneWithoutPhotosInput
  }

  export type PhotoTagUncheckedCreateInput = {
    photo_id: number
    tag_id: number
  }

  export type PhotoTagUpdateInput = {
    photo?: PhotoUpdateOneRequiredWithoutTagsNestedInput
    tag?: TagUpdateOneRequiredWithoutPhotosNestedInput
  }

  export type PhotoTagUncheckedUpdateInput = {
    photo_id?: IntFieldUpdateOperationsInput | number
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type PhotoTagCreateManyInput = {
    photo_id: number
    tag_id: number
  }

  export type PhotoTagUpdateManyMutationInput = {

  }

  export type PhotoTagUncheckedUpdateManyInput = {
    photo_id?: IntFieldUpdateOperationsInput | number
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type VlogCreateInput = {
    title: string
    slug: string
    description?: string | null
    video_url: string
    published_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    is_published?: boolean
    thumbnail_url?: string | null
    duration?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
    tags?: VlogTagCreateNestedManyWithoutVlogInput
  }

  export type VlogUncheckedCreateInput = {
    id?: number
    title: string
    slug: string
    description?: string | null
    video_url: string
    published_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    is_published?: boolean
    thumbnail_url?: string | null
    duration?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
    tags?: VlogTagUncheckedCreateNestedManyWithoutVlogInput
  }

  export type VlogUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_published?: BoolFieldUpdateOperationsInput | boolean
    thumbnail_url?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: VlogTagUpdateManyWithoutVlogNestedInput
  }

  export type VlogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_published?: BoolFieldUpdateOperationsInput | boolean
    thumbnail_url?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: VlogTagUncheckedUpdateManyWithoutVlogNestedInput
  }

  export type VlogCreateManyInput = {
    id?: number
    title: string
    slug: string
    description?: string | null
    video_url: string
    published_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    is_published?: boolean
    thumbnail_url?: string | null
    duration?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
  }

  export type VlogUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_published?: BoolFieldUpdateOperationsInput | boolean
    thumbnail_url?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VlogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_published?: BoolFieldUpdateOperationsInput | boolean
    thumbnail_url?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VlogTagCreateInput = {
    vlog: VlogCreateNestedOneWithoutTagsInput
    tag: TagCreateNestedOneWithoutVlogsInput
  }

  export type VlogTagUncheckedCreateInput = {
    vlog_id: number
    tag_id: number
  }

  export type VlogTagUpdateInput = {
    vlog?: VlogUpdateOneRequiredWithoutTagsNestedInput
    tag?: TagUpdateOneRequiredWithoutVlogsNestedInput
  }

  export type VlogTagUncheckedUpdateInput = {
    vlog_id?: IntFieldUpdateOperationsInput | number
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type VlogTagCreateManyInput = {
    vlog_id: number
    tag_id: number
  }

  export type VlogTagUpdateManyMutationInput = {

  }

  export type VlogTagUncheckedUpdateManyInput = {
    vlog_id?: IntFieldUpdateOperationsInput | number
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BlogTagListRelationFilter = {
    every?: BlogTagWhereInput
    some?: BlogTagWhereInput
    none?: BlogTagWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BlogTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BlogCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    author?: SortOrder
    priority?: SortOrder
    category?: SortOrder
    published_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_published?: SortOrder
    featured_image_url?: SortOrder
    meta_description?: SortOrder
    meta_keywords?: SortOrder
  }

  export type BlogAvgOrderByAggregateInput = {
    id?: SortOrder
    priority?: SortOrder
  }

  export type BlogMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    author?: SortOrder
    priority?: SortOrder
    category?: SortOrder
    published_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_published?: SortOrder
    featured_image_url?: SortOrder
    meta_description?: SortOrder
    meta_keywords?: SortOrder
  }

  export type BlogMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    author?: SortOrder
    priority?: SortOrder
    category?: SortOrder
    published_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_published?: SortOrder
    featured_image_url?: SortOrder
    meta_description?: SortOrder
    meta_keywords?: SortOrder
  }

  export type BlogSumOrderByAggregateInput = {
    id?: SortOrder
    priority?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PhotoTagListRelationFilter = {
    every?: PhotoTagWhereInput
    some?: PhotoTagWhereInput
    none?: PhotoTagWhereInput
  }

  export type PhotoTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PhotoCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    file_url?: SortOrder
    taken_at?: SortOrder
    uploaded_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    location?: SortOrder
  }

  export type PhotoAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PhotoMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    file_url?: SortOrder
    taken_at?: SortOrder
    uploaded_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    location?: SortOrder
  }

  export type PhotoMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    file_url?: SortOrder
    taken_at?: SortOrder
    uploaded_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    location?: SortOrder
  }

  export type PhotoSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type PoemCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    content?: SortOrder
    written_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_published?: SortOrder
  }

  export type PoemAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PoemMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    content?: SortOrder
    written_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_published?: SortOrder
  }

  export type PoemMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    content?: SortOrder
    written_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_published?: SortOrder
  }

  export type PoemSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type VlogTagListRelationFilter = {
    every?: VlogTagWhereInput
    some?: VlogTagWhereInput
    none?: VlogTagWhereInput
  }

  export type VlogTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type TagAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type TagSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BlogScalarRelationFilter = {
    is?: BlogWhereInput
    isNot?: BlogWhereInput
  }

  export type TagScalarRelationFilter = {
    is?: TagWhereInput
    isNot?: TagWhereInput
  }

  export type BlogTagBlog_idTag_idCompoundUniqueInput = {
    blog_id: number
    tag_id: number
  }

  export type BlogTagCountOrderByAggregateInput = {
    blog_id?: SortOrder
    tag_id?: SortOrder
  }

  export type BlogTagAvgOrderByAggregateInput = {
    blog_id?: SortOrder
    tag_id?: SortOrder
  }

  export type BlogTagMaxOrderByAggregateInput = {
    blog_id?: SortOrder
    tag_id?: SortOrder
  }

  export type BlogTagMinOrderByAggregateInput = {
    blog_id?: SortOrder
    tag_id?: SortOrder
  }

  export type BlogTagSumOrderByAggregateInput = {
    blog_id?: SortOrder
    tag_id?: SortOrder
  }

  export type PhotoScalarRelationFilter = {
    is?: PhotoWhereInput
    isNot?: PhotoWhereInput
  }

  export type PhotoTagPhoto_idTag_idCompoundUniqueInput = {
    photo_id: number
    tag_id: number
  }

  export type PhotoTagCountOrderByAggregateInput = {
    photo_id?: SortOrder
    tag_id?: SortOrder
  }

  export type PhotoTagAvgOrderByAggregateInput = {
    photo_id?: SortOrder
    tag_id?: SortOrder
  }

  export type PhotoTagMaxOrderByAggregateInput = {
    photo_id?: SortOrder
    tag_id?: SortOrder
  }

  export type PhotoTagMinOrderByAggregateInput = {
    photo_id?: SortOrder
    tag_id?: SortOrder
  }

  export type PhotoTagSumOrderByAggregateInput = {
    photo_id?: SortOrder
    tag_id?: SortOrder
  }

  export type VlogCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    video_url?: SortOrder
    published_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_published?: SortOrder
    thumbnail_url?: SortOrder
    duration?: SortOrder
    meta_description?: SortOrder
    meta_keywords?: SortOrder
  }

  export type VlogAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type VlogMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    video_url?: SortOrder
    published_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_published?: SortOrder
    thumbnail_url?: SortOrder
    duration?: SortOrder
    meta_description?: SortOrder
    meta_keywords?: SortOrder
  }

  export type VlogMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    video_url?: SortOrder
    published_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_published?: SortOrder
    thumbnail_url?: SortOrder
    duration?: SortOrder
    meta_description?: SortOrder
    meta_keywords?: SortOrder
  }

  export type VlogSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type VlogScalarRelationFilter = {
    is?: VlogWhereInput
    isNot?: VlogWhereInput
  }

  export type VlogTagVlog_idTag_idCompoundUniqueInput = {
    vlog_id: number
    tag_id: number
  }

  export type VlogTagCountOrderByAggregateInput = {
    vlog_id?: SortOrder
    tag_id?: SortOrder
  }

  export type VlogTagAvgOrderByAggregateInput = {
    vlog_id?: SortOrder
    tag_id?: SortOrder
  }

  export type VlogTagMaxOrderByAggregateInput = {
    vlog_id?: SortOrder
    tag_id?: SortOrder
  }

  export type VlogTagMinOrderByAggregateInput = {
    vlog_id?: SortOrder
    tag_id?: SortOrder
  }

  export type VlogTagSumOrderByAggregateInput = {
    vlog_id?: SortOrder
    tag_id?: SortOrder
  }

  export type BlogTagCreateNestedManyWithoutBlogInput = {
    create?: XOR<BlogTagCreateWithoutBlogInput, BlogTagUncheckedCreateWithoutBlogInput> | BlogTagCreateWithoutBlogInput[] | BlogTagUncheckedCreateWithoutBlogInput[]
    connectOrCreate?: BlogTagCreateOrConnectWithoutBlogInput | BlogTagCreateOrConnectWithoutBlogInput[]
    createMany?: BlogTagCreateManyBlogInputEnvelope
    connect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
  }

  export type BlogTagUncheckedCreateNestedManyWithoutBlogInput = {
    create?: XOR<BlogTagCreateWithoutBlogInput, BlogTagUncheckedCreateWithoutBlogInput> | BlogTagCreateWithoutBlogInput[] | BlogTagUncheckedCreateWithoutBlogInput[]
    connectOrCreate?: BlogTagCreateOrConnectWithoutBlogInput | BlogTagCreateOrConnectWithoutBlogInput[]
    createMany?: BlogTagCreateManyBlogInputEnvelope
    connect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BlogTagUpdateManyWithoutBlogNestedInput = {
    create?: XOR<BlogTagCreateWithoutBlogInput, BlogTagUncheckedCreateWithoutBlogInput> | BlogTagCreateWithoutBlogInput[] | BlogTagUncheckedCreateWithoutBlogInput[]
    connectOrCreate?: BlogTagCreateOrConnectWithoutBlogInput | BlogTagCreateOrConnectWithoutBlogInput[]
    upsert?: BlogTagUpsertWithWhereUniqueWithoutBlogInput | BlogTagUpsertWithWhereUniqueWithoutBlogInput[]
    createMany?: BlogTagCreateManyBlogInputEnvelope
    set?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    disconnect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    delete?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    connect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    update?: BlogTagUpdateWithWhereUniqueWithoutBlogInput | BlogTagUpdateWithWhereUniqueWithoutBlogInput[]
    updateMany?: BlogTagUpdateManyWithWhereWithoutBlogInput | BlogTagUpdateManyWithWhereWithoutBlogInput[]
    deleteMany?: BlogTagScalarWhereInput | BlogTagScalarWhereInput[]
  }

  export type BlogTagUncheckedUpdateManyWithoutBlogNestedInput = {
    create?: XOR<BlogTagCreateWithoutBlogInput, BlogTagUncheckedCreateWithoutBlogInput> | BlogTagCreateWithoutBlogInput[] | BlogTagUncheckedCreateWithoutBlogInput[]
    connectOrCreate?: BlogTagCreateOrConnectWithoutBlogInput | BlogTagCreateOrConnectWithoutBlogInput[]
    upsert?: BlogTagUpsertWithWhereUniqueWithoutBlogInput | BlogTagUpsertWithWhereUniqueWithoutBlogInput[]
    createMany?: BlogTagCreateManyBlogInputEnvelope
    set?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    disconnect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    delete?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    connect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    update?: BlogTagUpdateWithWhereUniqueWithoutBlogInput | BlogTagUpdateWithWhereUniqueWithoutBlogInput[]
    updateMany?: BlogTagUpdateManyWithWhereWithoutBlogInput | BlogTagUpdateManyWithWhereWithoutBlogInput[]
    deleteMany?: BlogTagScalarWhereInput | BlogTagScalarWhereInput[]
  }

  export type PhotoTagCreateNestedManyWithoutPhotoInput = {
    create?: XOR<PhotoTagCreateWithoutPhotoInput, PhotoTagUncheckedCreateWithoutPhotoInput> | PhotoTagCreateWithoutPhotoInput[] | PhotoTagUncheckedCreateWithoutPhotoInput[]
    connectOrCreate?: PhotoTagCreateOrConnectWithoutPhotoInput | PhotoTagCreateOrConnectWithoutPhotoInput[]
    createMany?: PhotoTagCreateManyPhotoInputEnvelope
    connect?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
  }

  export type PhotoTagUncheckedCreateNestedManyWithoutPhotoInput = {
    create?: XOR<PhotoTagCreateWithoutPhotoInput, PhotoTagUncheckedCreateWithoutPhotoInput> | PhotoTagCreateWithoutPhotoInput[] | PhotoTagUncheckedCreateWithoutPhotoInput[]
    connectOrCreate?: PhotoTagCreateOrConnectWithoutPhotoInput | PhotoTagCreateOrConnectWithoutPhotoInput[]
    createMany?: PhotoTagCreateManyPhotoInputEnvelope
    connect?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PhotoTagUpdateManyWithoutPhotoNestedInput = {
    create?: XOR<PhotoTagCreateWithoutPhotoInput, PhotoTagUncheckedCreateWithoutPhotoInput> | PhotoTagCreateWithoutPhotoInput[] | PhotoTagUncheckedCreateWithoutPhotoInput[]
    connectOrCreate?: PhotoTagCreateOrConnectWithoutPhotoInput | PhotoTagCreateOrConnectWithoutPhotoInput[]
    upsert?: PhotoTagUpsertWithWhereUniqueWithoutPhotoInput | PhotoTagUpsertWithWhereUniqueWithoutPhotoInput[]
    createMany?: PhotoTagCreateManyPhotoInputEnvelope
    set?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
    disconnect?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
    delete?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
    connect?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
    update?: PhotoTagUpdateWithWhereUniqueWithoutPhotoInput | PhotoTagUpdateWithWhereUniqueWithoutPhotoInput[]
    updateMany?: PhotoTagUpdateManyWithWhereWithoutPhotoInput | PhotoTagUpdateManyWithWhereWithoutPhotoInput[]
    deleteMany?: PhotoTagScalarWhereInput | PhotoTagScalarWhereInput[]
  }

  export type PhotoTagUncheckedUpdateManyWithoutPhotoNestedInput = {
    create?: XOR<PhotoTagCreateWithoutPhotoInput, PhotoTagUncheckedCreateWithoutPhotoInput> | PhotoTagCreateWithoutPhotoInput[] | PhotoTagUncheckedCreateWithoutPhotoInput[]
    connectOrCreate?: PhotoTagCreateOrConnectWithoutPhotoInput | PhotoTagCreateOrConnectWithoutPhotoInput[]
    upsert?: PhotoTagUpsertWithWhereUniqueWithoutPhotoInput | PhotoTagUpsertWithWhereUniqueWithoutPhotoInput[]
    createMany?: PhotoTagCreateManyPhotoInputEnvelope
    set?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
    disconnect?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
    delete?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
    connect?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
    update?: PhotoTagUpdateWithWhereUniqueWithoutPhotoInput | PhotoTagUpdateWithWhereUniqueWithoutPhotoInput[]
    updateMany?: PhotoTagUpdateManyWithWhereWithoutPhotoInput | PhotoTagUpdateManyWithWhereWithoutPhotoInput[]
    deleteMany?: PhotoTagScalarWhereInput | PhotoTagScalarWhereInput[]
  }

  export type BlogTagCreateNestedManyWithoutTagInput = {
    create?: XOR<BlogTagCreateWithoutTagInput, BlogTagUncheckedCreateWithoutTagInput> | BlogTagCreateWithoutTagInput[] | BlogTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: BlogTagCreateOrConnectWithoutTagInput | BlogTagCreateOrConnectWithoutTagInput[]
    createMany?: BlogTagCreateManyTagInputEnvelope
    connect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
  }

  export type PhotoTagCreateNestedManyWithoutTagInput = {
    create?: XOR<PhotoTagCreateWithoutTagInput, PhotoTagUncheckedCreateWithoutTagInput> | PhotoTagCreateWithoutTagInput[] | PhotoTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: PhotoTagCreateOrConnectWithoutTagInput | PhotoTagCreateOrConnectWithoutTagInput[]
    createMany?: PhotoTagCreateManyTagInputEnvelope
    connect?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
  }

  export type VlogTagCreateNestedManyWithoutTagInput = {
    create?: XOR<VlogTagCreateWithoutTagInput, VlogTagUncheckedCreateWithoutTagInput> | VlogTagCreateWithoutTagInput[] | VlogTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: VlogTagCreateOrConnectWithoutTagInput | VlogTagCreateOrConnectWithoutTagInput[]
    createMany?: VlogTagCreateManyTagInputEnvelope
    connect?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
  }

  export type BlogTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<BlogTagCreateWithoutTagInput, BlogTagUncheckedCreateWithoutTagInput> | BlogTagCreateWithoutTagInput[] | BlogTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: BlogTagCreateOrConnectWithoutTagInput | BlogTagCreateOrConnectWithoutTagInput[]
    createMany?: BlogTagCreateManyTagInputEnvelope
    connect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
  }

  export type PhotoTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<PhotoTagCreateWithoutTagInput, PhotoTagUncheckedCreateWithoutTagInput> | PhotoTagCreateWithoutTagInput[] | PhotoTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: PhotoTagCreateOrConnectWithoutTagInput | PhotoTagCreateOrConnectWithoutTagInput[]
    createMany?: PhotoTagCreateManyTagInputEnvelope
    connect?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
  }

  export type VlogTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<VlogTagCreateWithoutTagInput, VlogTagUncheckedCreateWithoutTagInput> | VlogTagCreateWithoutTagInput[] | VlogTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: VlogTagCreateOrConnectWithoutTagInput | VlogTagCreateOrConnectWithoutTagInput[]
    createMany?: VlogTagCreateManyTagInputEnvelope
    connect?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
  }

  export type BlogTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<BlogTagCreateWithoutTagInput, BlogTagUncheckedCreateWithoutTagInput> | BlogTagCreateWithoutTagInput[] | BlogTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: BlogTagCreateOrConnectWithoutTagInput | BlogTagCreateOrConnectWithoutTagInput[]
    upsert?: BlogTagUpsertWithWhereUniqueWithoutTagInput | BlogTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: BlogTagCreateManyTagInputEnvelope
    set?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    disconnect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    delete?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    connect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    update?: BlogTagUpdateWithWhereUniqueWithoutTagInput | BlogTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: BlogTagUpdateManyWithWhereWithoutTagInput | BlogTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: BlogTagScalarWhereInput | BlogTagScalarWhereInput[]
  }

  export type PhotoTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<PhotoTagCreateWithoutTagInput, PhotoTagUncheckedCreateWithoutTagInput> | PhotoTagCreateWithoutTagInput[] | PhotoTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: PhotoTagCreateOrConnectWithoutTagInput | PhotoTagCreateOrConnectWithoutTagInput[]
    upsert?: PhotoTagUpsertWithWhereUniqueWithoutTagInput | PhotoTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: PhotoTagCreateManyTagInputEnvelope
    set?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
    disconnect?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
    delete?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
    connect?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
    update?: PhotoTagUpdateWithWhereUniqueWithoutTagInput | PhotoTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: PhotoTagUpdateManyWithWhereWithoutTagInput | PhotoTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: PhotoTagScalarWhereInput | PhotoTagScalarWhereInput[]
  }

  export type VlogTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<VlogTagCreateWithoutTagInput, VlogTagUncheckedCreateWithoutTagInput> | VlogTagCreateWithoutTagInput[] | VlogTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: VlogTagCreateOrConnectWithoutTagInput | VlogTagCreateOrConnectWithoutTagInput[]
    upsert?: VlogTagUpsertWithWhereUniqueWithoutTagInput | VlogTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: VlogTagCreateManyTagInputEnvelope
    set?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
    disconnect?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
    delete?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
    connect?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
    update?: VlogTagUpdateWithWhereUniqueWithoutTagInput | VlogTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: VlogTagUpdateManyWithWhereWithoutTagInput | VlogTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: VlogTagScalarWhereInput | VlogTagScalarWhereInput[]
  }

  export type BlogTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<BlogTagCreateWithoutTagInput, BlogTagUncheckedCreateWithoutTagInput> | BlogTagCreateWithoutTagInput[] | BlogTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: BlogTagCreateOrConnectWithoutTagInput | BlogTagCreateOrConnectWithoutTagInput[]
    upsert?: BlogTagUpsertWithWhereUniqueWithoutTagInput | BlogTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: BlogTagCreateManyTagInputEnvelope
    set?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    disconnect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    delete?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    connect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    update?: BlogTagUpdateWithWhereUniqueWithoutTagInput | BlogTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: BlogTagUpdateManyWithWhereWithoutTagInput | BlogTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: BlogTagScalarWhereInput | BlogTagScalarWhereInput[]
  }

  export type PhotoTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<PhotoTagCreateWithoutTagInput, PhotoTagUncheckedCreateWithoutTagInput> | PhotoTagCreateWithoutTagInput[] | PhotoTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: PhotoTagCreateOrConnectWithoutTagInput | PhotoTagCreateOrConnectWithoutTagInput[]
    upsert?: PhotoTagUpsertWithWhereUniqueWithoutTagInput | PhotoTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: PhotoTagCreateManyTagInputEnvelope
    set?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
    disconnect?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
    delete?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
    connect?: PhotoTagWhereUniqueInput | PhotoTagWhereUniqueInput[]
    update?: PhotoTagUpdateWithWhereUniqueWithoutTagInput | PhotoTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: PhotoTagUpdateManyWithWhereWithoutTagInput | PhotoTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: PhotoTagScalarWhereInput | PhotoTagScalarWhereInput[]
  }

  export type VlogTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<VlogTagCreateWithoutTagInput, VlogTagUncheckedCreateWithoutTagInput> | VlogTagCreateWithoutTagInput[] | VlogTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: VlogTagCreateOrConnectWithoutTagInput | VlogTagCreateOrConnectWithoutTagInput[]
    upsert?: VlogTagUpsertWithWhereUniqueWithoutTagInput | VlogTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: VlogTagCreateManyTagInputEnvelope
    set?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
    disconnect?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
    delete?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
    connect?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
    update?: VlogTagUpdateWithWhereUniqueWithoutTagInput | VlogTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: VlogTagUpdateManyWithWhereWithoutTagInput | VlogTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: VlogTagScalarWhereInput | VlogTagScalarWhereInput[]
  }

  export type BlogCreateNestedOneWithoutTagsInput = {
    create?: XOR<BlogCreateWithoutTagsInput, BlogUncheckedCreateWithoutTagsInput>
    connectOrCreate?: BlogCreateOrConnectWithoutTagsInput
    connect?: BlogWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutBlogsInput = {
    create?: XOR<TagCreateWithoutBlogsInput, TagUncheckedCreateWithoutBlogsInput>
    connectOrCreate?: TagCreateOrConnectWithoutBlogsInput
    connect?: TagWhereUniqueInput
  }

  export type BlogUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<BlogCreateWithoutTagsInput, BlogUncheckedCreateWithoutTagsInput>
    connectOrCreate?: BlogCreateOrConnectWithoutTagsInput
    upsert?: BlogUpsertWithoutTagsInput
    connect?: BlogWhereUniqueInput
    update?: XOR<XOR<BlogUpdateToOneWithWhereWithoutTagsInput, BlogUpdateWithoutTagsInput>, BlogUncheckedUpdateWithoutTagsInput>
  }

  export type TagUpdateOneRequiredWithoutBlogsNestedInput = {
    create?: XOR<TagCreateWithoutBlogsInput, TagUncheckedCreateWithoutBlogsInput>
    connectOrCreate?: TagCreateOrConnectWithoutBlogsInput
    upsert?: TagUpsertWithoutBlogsInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutBlogsInput, TagUpdateWithoutBlogsInput>, TagUncheckedUpdateWithoutBlogsInput>
  }

  export type PhotoCreateNestedOneWithoutTagsInput = {
    create?: XOR<PhotoCreateWithoutTagsInput, PhotoUncheckedCreateWithoutTagsInput>
    connectOrCreate?: PhotoCreateOrConnectWithoutTagsInput
    connect?: PhotoWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutPhotosInput = {
    create?: XOR<TagCreateWithoutPhotosInput, TagUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: TagCreateOrConnectWithoutPhotosInput
    connect?: TagWhereUniqueInput
  }

  export type PhotoUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<PhotoCreateWithoutTagsInput, PhotoUncheckedCreateWithoutTagsInput>
    connectOrCreate?: PhotoCreateOrConnectWithoutTagsInput
    upsert?: PhotoUpsertWithoutTagsInput
    connect?: PhotoWhereUniqueInput
    update?: XOR<XOR<PhotoUpdateToOneWithWhereWithoutTagsInput, PhotoUpdateWithoutTagsInput>, PhotoUncheckedUpdateWithoutTagsInput>
  }

  export type TagUpdateOneRequiredWithoutPhotosNestedInput = {
    create?: XOR<TagCreateWithoutPhotosInput, TagUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: TagCreateOrConnectWithoutPhotosInput
    upsert?: TagUpsertWithoutPhotosInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutPhotosInput, TagUpdateWithoutPhotosInput>, TagUncheckedUpdateWithoutPhotosInput>
  }

  export type VlogTagCreateNestedManyWithoutVlogInput = {
    create?: XOR<VlogTagCreateWithoutVlogInput, VlogTagUncheckedCreateWithoutVlogInput> | VlogTagCreateWithoutVlogInput[] | VlogTagUncheckedCreateWithoutVlogInput[]
    connectOrCreate?: VlogTagCreateOrConnectWithoutVlogInput | VlogTagCreateOrConnectWithoutVlogInput[]
    createMany?: VlogTagCreateManyVlogInputEnvelope
    connect?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
  }

  export type VlogTagUncheckedCreateNestedManyWithoutVlogInput = {
    create?: XOR<VlogTagCreateWithoutVlogInput, VlogTagUncheckedCreateWithoutVlogInput> | VlogTagCreateWithoutVlogInput[] | VlogTagUncheckedCreateWithoutVlogInput[]
    connectOrCreate?: VlogTagCreateOrConnectWithoutVlogInput | VlogTagCreateOrConnectWithoutVlogInput[]
    createMany?: VlogTagCreateManyVlogInputEnvelope
    connect?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
  }

  export type VlogTagUpdateManyWithoutVlogNestedInput = {
    create?: XOR<VlogTagCreateWithoutVlogInput, VlogTagUncheckedCreateWithoutVlogInput> | VlogTagCreateWithoutVlogInput[] | VlogTagUncheckedCreateWithoutVlogInput[]
    connectOrCreate?: VlogTagCreateOrConnectWithoutVlogInput | VlogTagCreateOrConnectWithoutVlogInput[]
    upsert?: VlogTagUpsertWithWhereUniqueWithoutVlogInput | VlogTagUpsertWithWhereUniqueWithoutVlogInput[]
    createMany?: VlogTagCreateManyVlogInputEnvelope
    set?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
    disconnect?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
    delete?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
    connect?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
    update?: VlogTagUpdateWithWhereUniqueWithoutVlogInput | VlogTagUpdateWithWhereUniqueWithoutVlogInput[]
    updateMany?: VlogTagUpdateManyWithWhereWithoutVlogInput | VlogTagUpdateManyWithWhereWithoutVlogInput[]
    deleteMany?: VlogTagScalarWhereInput | VlogTagScalarWhereInput[]
  }

  export type VlogTagUncheckedUpdateManyWithoutVlogNestedInput = {
    create?: XOR<VlogTagCreateWithoutVlogInput, VlogTagUncheckedCreateWithoutVlogInput> | VlogTagCreateWithoutVlogInput[] | VlogTagUncheckedCreateWithoutVlogInput[]
    connectOrCreate?: VlogTagCreateOrConnectWithoutVlogInput | VlogTagCreateOrConnectWithoutVlogInput[]
    upsert?: VlogTagUpsertWithWhereUniqueWithoutVlogInput | VlogTagUpsertWithWhereUniqueWithoutVlogInput[]
    createMany?: VlogTagCreateManyVlogInputEnvelope
    set?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
    disconnect?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
    delete?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
    connect?: VlogTagWhereUniqueInput | VlogTagWhereUniqueInput[]
    update?: VlogTagUpdateWithWhereUniqueWithoutVlogInput | VlogTagUpdateWithWhereUniqueWithoutVlogInput[]
    updateMany?: VlogTagUpdateManyWithWhereWithoutVlogInput | VlogTagUpdateManyWithWhereWithoutVlogInput[]
    deleteMany?: VlogTagScalarWhereInput | VlogTagScalarWhereInput[]
  }

  export type VlogCreateNestedOneWithoutTagsInput = {
    create?: XOR<VlogCreateWithoutTagsInput, VlogUncheckedCreateWithoutTagsInput>
    connectOrCreate?: VlogCreateOrConnectWithoutTagsInput
    connect?: VlogWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutVlogsInput = {
    create?: XOR<TagCreateWithoutVlogsInput, TagUncheckedCreateWithoutVlogsInput>
    connectOrCreate?: TagCreateOrConnectWithoutVlogsInput
    connect?: TagWhereUniqueInput
  }

  export type VlogUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<VlogCreateWithoutTagsInput, VlogUncheckedCreateWithoutTagsInput>
    connectOrCreate?: VlogCreateOrConnectWithoutTagsInput
    upsert?: VlogUpsertWithoutTagsInput
    connect?: VlogWhereUniqueInput
    update?: XOR<XOR<VlogUpdateToOneWithWhereWithoutTagsInput, VlogUpdateWithoutTagsInput>, VlogUncheckedUpdateWithoutTagsInput>
  }

  export type TagUpdateOneRequiredWithoutVlogsNestedInput = {
    create?: XOR<TagCreateWithoutVlogsInput, TagUncheckedCreateWithoutVlogsInput>
    connectOrCreate?: TagCreateOrConnectWithoutVlogsInput
    upsert?: TagUpsertWithoutVlogsInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutVlogsInput, TagUpdateWithoutVlogsInput>, TagUncheckedUpdateWithoutVlogsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BlogTagCreateWithoutBlogInput = {
    tag: TagCreateNestedOneWithoutBlogsInput
  }

  export type BlogTagUncheckedCreateWithoutBlogInput = {
    tag_id: number
  }

  export type BlogTagCreateOrConnectWithoutBlogInput = {
    where: BlogTagWhereUniqueInput
    create: XOR<BlogTagCreateWithoutBlogInput, BlogTagUncheckedCreateWithoutBlogInput>
  }

  export type BlogTagCreateManyBlogInputEnvelope = {
    data: BlogTagCreateManyBlogInput | BlogTagCreateManyBlogInput[]
    skipDuplicates?: boolean
  }

  export type BlogTagUpsertWithWhereUniqueWithoutBlogInput = {
    where: BlogTagWhereUniqueInput
    update: XOR<BlogTagUpdateWithoutBlogInput, BlogTagUncheckedUpdateWithoutBlogInput>
    create: XOR<BlogTagCreateWithoutBlogInput, BlogTagUncheckedCreateWithoutBlogInput>
  }

  export type BlogTagUpdateWithWhereUniqueWithoutBlogInput = {
    where: BlogTagWhereUniqueInput
    data: XOR<BlogTagUpdateWithoutBlogInput, BlogTagUncheckedUpdateWithoutBlogInput>
  }

  export type BlogTagUpdateManyWithWhereWithoutBlogInput = {
    where: BlogTagScalarWhereInput
    data: XOR<BlogTagUpdateManyMutationInput, BlogTagUncheckedUpdateManyWithoutBlogInput>
  }

  export type BlogTagScalarWhereInput = {
    AND?: BlogTagScalarWhereInput | BlogTagScalarWhereInput[]
    OR?: BlogTagScalarWhereInput[]
    NOT?: BlogTagScalarWhereInput | BlogTagScalarWhereInput[]
    blog_id?: IntFilter<"BlogTag"> | number
    tag_id?: IntFilter<"BlogTag"> | number
  }

  export type PhotoTagCreateWithoutPhotoInput = {
    tag: TagCreateNestedOneWithoutPhotosInput
  }

  export type PhotoTagUncheckedCreateWithoutPhotoInput = {
    tag_id: number
  }

  export type PhotoTagCreateOrConnectWithoutPhotoInput = {
    where: PhotoTagWhereUniqueInput
    create: XOR<PhotoTagCreateWithoutPhotoInput, PhotoTagUncheckedCreateWithoutPhotoInput>
  }

  export type PhotoTagCreateManyPhotoInputEnvelope = {
    data: PhotoTagCreateManyPhotoInput | PhotoTagCreateManyPhotoInput[]
    skipDuplicates?: boolean
  }

  export type PhotoTagUpsertWithWhereUniqueWithoutPhotoInput = {
    where: PhotoTagWhereUniqueInput
    update: XOR<PhotoTagUpdateWithoutPhotoInput, PhotoTagUncheckedUpdateWithoutPhotoInput>
    create: XOR<PhotoTagCreateWithoutPhotoInput, PhotoTagUncheckedCreateWithoutPhotoInput>
  }

  export type PhotoTagUpdateWithWhereUniqueWithoutPhotoInput = {
    where: PhotoTagWhereUniqueInput
    data: XOR<PhotoTagUpdateWithoutPhotoInput, PhotoTagUncheckedUpdateWithoutPhotoInput>
  }

  export type PhotoTagUpdateManyWithWhereWithoutPhotoInput = {
    where: PhotoTagScalarWhereInput
    data: XOR<PhotoTagUpdateManyMutationInput, PhotoTagUncheckedUpdateManyWithoutPhotoInput>
  }

  export type PhotoTagScalarWhereInput = {
    AND?: PhotoTagScalarWhereInput | PhotoTagScalarWhereInput[]
    OR?: PhotoTagScalarWhereInput[]
    NOT?: PhotoTagScalarWhereInput | PhotoTagScalarWhereInput[]
    photo_id?: IntFilter<"PhotoTag"> | number
    tag_id?: IntFilter<"PhotoTag"> | number
  }

  export type BlogTagCreateWithoutTagInput = {
    blog: BlogCreateNestedOneWithoutTagsInput
  }

  export type BlogTagUncheckedCreateWithoutTagInput = {
    blog_id: number
  }

  export type BlogTagCreateOrConnectWithoutTagInput = {
    where: BlogTagWhereUniqueInput
    create: XOR<BlogTagCreateWithoutTagInput, BlogTagUncheckedCreateWithoutTagInput>
  }

  export type BlogTagCreateManyTagInputEnvelope = {
    data: BlogTagCreateManyTagInput | BlogTagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type PhotoTagCreateWithoutTagInput = {
    photo: PhotoCreateNestedOneWithoutTagsInput
  }

  export type PhotoTagUncheckedCreateWithoutTagInput = {
    photo_id: number
  }

  export type PhotoTagCreateOrConnectWithoutTagInput = {
    where: PhotoTagWhereUniqueInput
    create: XOR<PhotoTagCreateWithoutTagInput, PhotoTagUncheckedCreateWithoutTagInput>
  }

  export type PhotoTagCreateManyTagInputEnvelope = {
    data: PhotoTagCreateManyTagInput | PhotoTagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type VlogTagCreateWithoutTagInput = {
    vlog: VlogCreateNestedOneWithoutTagsInput
  }

  export type VlogTagUncheckedCreateWithoutTagInput = {
    vlog_id: number
  }

  export type VlogTagCreateOrConnectWithoutTagInput = {
    where: VlogTagWhereUniqueInput
    create: XOR<VlogTagCreateWithoutTagInput, VlogTagUncheckedCreateWithoutTagInput>
  }

  export type VlogTagCreateManyTagInputEnvelope = {
    data: VlogTagCreateManyTagInput | VlogTagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type BlogTagUpsertWithWhereUniqueWithoutTagInput = {
    where: BlogTagWhereUniqueInput
    update: XOR<BlogTagUpdateWithoutTagInput, BlogTagUncheckedUpdateWithoutTagInput>
    create: XOR<BlogTagCreateWithoutTagInput, BlogTagUncheckedCreateWithoutTagInput>
  }

  export type BlogTagUpdateWithWhereUniqueWithoutTagInput = {
    where: BlogTagWhereUniqueInput
    data: XOR<BlogTagUpdateWithoutTagInput, BlogTagUncheckedUpdateWithoutTagInput>
  }

  export type BlogTagUpdateManyWithWhereWithoutTagInput = {
    where: BlogTagScalarWhereInput
    data: XOR<BlogTagUpdateManyMutationInput, BlogTagUncheckedUpdateManyWithoutTagInput>
  }

  export type PhotoTagUpsertWithWhereUniqueWithoutTagInput = {
    where: PhotoTagWhereUniqueInput
    update: XOR<PhotoTagUpdateWithoutTagInput, PhotoTagUncheckedUpdateWithoutTagInput>
    create: XOR<PhotoTagCreateWithoutTagInput, PhotoTagUncheckedCreateWithoutTagInput>
  }

  export type PhotoTagUpdateWithWhereUniqueWithoutTagInput = {
    where: PhotoTagWhereUniqueInput
    data: XOR<PhotoTagUpdateWithoutTagInput, PhotoTagUncheckedUpdateWithoutTagInput>
  }

  export type PhotoTagUpdateManyWithWhereWithoutTagInput = {
    where: PhotoTagScalarWhereInput
    data: XOR<PhotoTagUpdateManyMutationInput, PhotoTagUncheckedUpdateManyWithoutTagInput>
  }

  export type VlogTagUpsertWithWhereUniqueWithoutTagInput = {
    where: VlogTagWhereUniqueInput
    update: XOR<VlogTagUpdateWithoutTagInput, VlogTagUncheckedUpdateWithoutTagInput>
    create: XOR<VlogTagCreateWithoutTagInput, VlogTagUncheckedCreateWithoutTagInput>
  }

  export type VlogTagUpdateWithWhereUniqueWithoutTagInput = {
    where: VlogTagWhereUniqueInput
    data: XOR<VlogTagUpdateWithoutTagInput, VlogTagUncheckedUpdateWithoutTagInput>
  }

  export type VlogTagUpdateManyWithWhereWithoutTagInput = {
    where: VlogTagScalarWhereInput
    data: XOR<VlogTagUpdateManyMutationInput, VlogTagUncheckedUpdateManyWithoutTagInput>
  }

  export type VlogTagScalarWhereInput = {
    AND?: VlogTagScalarWhereInput | VlogTagScalarWhereInput[]
    OR?: VlogTagScalarWhereInput[]
    NOT?: VlogTagScalarWhereInput | VlogTagScalarWhereInput[]
    vlog_id?: IntFilter<"VlogTag"> | number
    tag_id?: IntFilter<"VlogTag"> | number
  }

  export type BlogCreateWithoutTagsInput = {
    title: string
    description: string
    slug: string
    content: string
    author: string
    priority?: number
    category: string
    published_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    is_published?: boolean
    featured_image_url?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
  }

  export type BlogUncheckedCreateWithoutTagsInput = {
    id?: number
    title: string
    description: string
    slug: string
    content: string
    author: string
    priority?: number
    category: string
    published_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    is_published?: boolean
    featured_image_url?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
  }

  export type BlogCreateOrConnectWithoutTagsInput = {
    where: BlogWhereUniqueInput
    create: XOR<BlogCreateWithoutTagsInput, BlogUncheckedCreateWithoutTagsInput>
  }

  export type TagCreateWithoutBlogsInput = {
    name: string
    slug: string
    photos?: PhotoTagCreateNestedManyWithoutTagInput
    vlogs?: VlogTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateWithoutBlogsInput = {
    id?: number
    name: string
    slug: string
    photos?: PhotoTagUncheckedCreateNestedManyWithoutTagInput
    vlogs?: VlogTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagCreateOrConnectWithoutBlogsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutBlogsInput, TagUncheckedCreateWithoutBlogsInput>
  }

  export type BlogUpsertWithoutTagsInput = {
    update: XOR<BlogUpdateWithoutTagsInput, BlogUncheckedUpdateWithoutTagsInput>
    create: XOR<BlogCreateWithoutTagsInput, BlogUncheckedCreateWithoutTagsInput>
    where?: BlogWhereInput
  }

  export type BlogUpdateToOneWithWhereWithoutTagsInput = {
    where?: BlogWhereInput
    data: XOR<BlogUpdateWithoutTagsInput, BlogUncheckedUpdateWithoutTagsInput>
  }

  export type BlogUpdateWithoutTagsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_published?: BoolFieldUpdateOperationsInput | boolean
    featured_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BlogUncheckedUpdateWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_published?: BoolFieldUpdateOperationsInput | boolean
    featured_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TagUpsertWithoutBlogsInput = {
    update: XOR<TagUpdateWithoutBlogsInput, TagUncheckedUpdateWithoutBlogsInput>
    create: XOR<TagCreateWithoutBlogsInput, TagUncheckedCreateWithoutBlogsInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutBlogsInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutBlogsInput, TagUncheckedUpdateWithoutBlogsInput>
  }

  export type TagUpdateWithoutBlogsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    photos?: PhotoTagUpdateManyWithoutTagNestedInput
    vlogs?: VlogTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateWithoutBlogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    photos?: PhotoTagUncheckedUpdateManyWithoutTagNestedInput
    vlogs?: VlogTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type PhotoCreateWithoutTagsInput = {
    title?: string | null
    description?: string | null
    file_url: string
    taken_at?: Date | string | null
    uploaded_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    location?: string | null
  }

  export type PhotoUncheckedCreateWithoutTagsInput = {
    id?: number
    title?: string | null
    description?: string | null
    file_url: string
    taken_at?: Date | string | null
    uploaded_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    location?: string | null
  }

  export type PhotoCreateOrConnectWithoutTagsInput = {
    where: PhotoWhereUniqueInput
    create: XOR<PhotoCreateWithoutTagsInput, PhotoUncheckedCreateWithoutTagsInput>
  }

  export type TagCreateWithoutPhotosInput = {
    name: string
    slug: string
    blogs?: BlogTagCreateNestedManyWithoutTagInput
    vlogs?: VlogTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateWithoutPhotosInput = {
    id?: number
    name: string
    slug: string
    blogs?: BlogTagUncheckedCreateNestedManyWithoutTagInput
    vlogs?: VlogTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagCreateOrConnectWithoutPhotosInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutPhotosInput, TagUncheckedCreateWithoutPhotosInput>
  }

  export type PhotoUpsertWithoutTagsInput = {
    update: XOR<PhotoUpdateWithoutTagsInput, PhotoUncheckedUpdateWithoutTagsInput>
    create: XOR<PhotoCreateWithoutTagsInput, PhotoUncheckedCreateWithoutTagsInput>
    where?: PhotoWhereInput
  }

  export type PhotoUpdateToOneWithWhereWithoutTagsInput = {
    where?: PhotoWhereInput
    data: XOR<PhotoUpdateWithoutTagsInput, PhotoUncheckedUpdateWithoutTagsInput>
  }

  export type PhotoUpdateWithoutTagsInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    taken_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PhotoUncheckedUpdateWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: StringFieldUpdateOperationsInput | string
    taken_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TagUpsertWithoutPhotosInput = {
    update: XOR<TagUpdateWithoutPhotosInput, TagUncheckedUpdateWithoutPhotosInput>
    create: XOR<TagCreateWithoutPhotosInput, TagUncheckedCreateWithoutPhotosInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutPhotosInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutPhotosInput, TagUncheckedUpdateWithoutPhotosInput>
  }

  export type TagUpdateWithoutPhotosInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    blogs?: BlogTagUpdateManyWithoutTagNestedInput
    vlogs?: VlogTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateWithoutPhotosInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    blogs?: BlogTagUncheckedUpdateManyWithoutTagNestedInput
    vlogs?: VlogTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type VlogTagCreateWithoutVlogInput = {
    tag: TagCreateNestedOneWithoutVlogsInput
  }

  export type VlogTagUncheckedCreateWithoutVlogInput = {
    tag_id: number
  }

  export type VlogTagCreateOrConnectWithoutVlogInput = {
    where: VlogTagWhereUniqueInput
    create: XOR<VlogTagCreateWithoutVlogInput, VlogTagUncheckedCreateWithoutVlogInput>
  }

  export type VlogTagCreateManyVlogInputEnvelope = {
    data: VlogTagCreateManyVlogInput | VlogTagCreateManyVlogInput[]
    skipDuplicates?: boolean
  }

  export type VlogTagUpsertWithWhereUniqueWithoutVlogInput = {
    where: VlogTagWhereUniqueInput
    update: XOR<VlogTagUpdateWithoutVlogInput, VlogTagUncheckedUpdateWithoutVlogInput>
    create: XOR<VlogTagCreateWithoutVlogInput, VlogTagUncheckedCreateWithoutVlogInput>
  }

  export type VlogTagUpdateWithWhereUniqueWithoutVlogInput = {
    where: VlogTagWhereUniqueInput
    data: XOR<VlogTagUpdateWithoutVlogInput, VlogTagUncheckedUpdateWithoutVlogInput>
  }

  export type VlogTagUpdateManyWithWhereWithoutVlogInput = {
    where: VlogTagScalarWhereInput
    data: XOR<VlogTagUpdateManyMutationInput, VlogTagUncheckedUpdateManyWithoutVlogInput>
  }

  export type VlogCreateWithoutTagsInput = {
    title: string
    slug: string
    description?: string | null
    video_url: string
    published_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    is_published?: boolean
    thumbnail_url?: string | null
    duration?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
  }

  export type VlogUncheckedCreateWithoutTagsInput = {
    id?: number
    title: string
    slug: string
    description?: string | null
    video_url: string
    published_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    is_published?: boolean
    thumbnail_url?: string | null
    duration?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
  }

  export type VlogCreateOrConnectWithoutTagsInput = {
    where: VlogWhereUniqueInput
    create: XOR<VlogCreateWithoutTagsInput, VlogUncheckedCreateWithoutTagsInput>
  }

  export type TagCreateWithoutVlogsInput = {
    name: string
    slug: string
    blogs?: BlogTagCreateNestedManyWithoutTagInput
    photos?: PhotoTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateWithoutVlogsInput = {
    id?: number
    name: string
    slug: string
    blogs?: BlogTagUncheckedCreateNestedManyWithoutTagInput
    photos?: PhotoTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagCreateOrConnectWithoutVlogsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutVlogsInput, TagUncheckedCreateWithoutVlogsInput>
  }

  export type VlogUpsertWithoutTagsInput = {
    update: XOR<VlogUpdateWithoutTagsInput, VlogUncheckedUpdateWithoutTagsInput>
    create: XOR<VlogCreateWithoutTagsInput, VlogUncheckedCreateWithoutTagsInput>
    where?: VlogWhereInput
  }

  export type VlogUpdateToOneWithWhereWithoutTagsInput = {
    where?: VlogWhereInput
    data: XOR<VlogUpdateWithoutTagsInput, VlogUncheckedUpdateWithoutTagsInput>
  }

  export type VlogUpdateWithoutTagsInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_published?: BoolFieldUpdateOperationsInput | boolean
    thumbnail_url?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VlogUncheckedUpdateWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_published?: BoolFieldUpdateOperationsInput | boolean
    thumbnail_url?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TagUpsertWithoutVlogsInput = {
    update: XOR<TagUpdateWithoutVlogsInput, TagUncheckedUpdateWithoutVlogsInput>
    create: XOR<TagCreateWithoutVlogsInput, TagUncheckedCreateWithoutVlogsInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutVlogsInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutVlogsInput, TagUncheckedUpdateWithoutVlogsInput>
  }

  export type TagUpdateWithoutVlogsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    blogs?: BlogTagUpdateManyWithoutTagNestedInput
    photos?: PhotoTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateWithoutVlogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    blogs?: BlogTagUncheckedUpdateManyWithoutTagNestedInput
    photos?: PhotoTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type BlogTagCreateManyBlogInput = {
    tag_id: number
  }

  export type BlogTagUpdateWithoutBlogInput = {
    tag?: TagUpdateOneRequiredWithoutBlogsNestedInput
  }

  export type BlogTagUncheckedUpdateWithoutBlogInput = {
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type BlogTagUncheckedUpdateManyWithoutBlogInput = {
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type PhotoTagCreateManyPhotoInput = {
    tag_id: number
  }

  export type PhotoTagUpdateWithoutPhotoInput = {
    tag?: TagUpdateOneRequiredWithoutPhotosNestedInput
  }

  export type PhotoTagUncheckedUpdateWithoutPhotoInput = {
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type PhotoTagUncheckedUpdateManyWithoutPhotoInput = {
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type BlogTagCreateManyTagInput = {
    blog_id: number
  }

  export type PhotoTagCreateManyTagInput = {
    photo_id: number
  }

  export type VlogTagCreateManyTagInput = {
    vlog_id: number
  }

  export type BlogTagUpdateWithoutTagInput = {
    blog?: BlogUpdateOneRequiredWithoutTagsNestedInput
  }

  export type BlogTagUncheckedUpdateWithoutTagInput = {
    blog_id?: IntFieldUpdateOperationsInput | number
  }

  export type BlogTagUncheckedUpdateManyWithoutTagInput = {
    blog_id?: IntFieldUpdateOperationsInput | number
  }

  export type PhotoTagUpdateWithoutTagInput = {
    photo?: PhotoUpdateOneRequiredWithoutTagsNestedInput
  }

  export type PhotoTagUncheckedUpdateWithoutTagInput = {
    photo_id?: IntFieldUpdateOperationsInput | number
  }

  export type PhotoTagUncheckedUpdateManyWithoutTagInput = {
    photo_id?: IntFieldUpdateOperationsInput | number
  }

  export type VlogTagUpdateWithoutTagInput = {
    vlog?: VlogUpdateOneRequiredWithoutTagsNestedInput
  }

  export type VlogTagUncheckedUpdateWithoutTagInput = {
    vlog_id?: IntFieldUpdateOperationsInput | number
  }

  export type VlogTagUncheckedUpdateManyWithoutTagInput = {
    vlog_id?: IntFieldUpdateOperationsInput | number
  }

  export type VlogTagCreateManyVlogInput = {
    tag_id: number
  }

  export type VlogTagUpdateWithoutVlogInput = {
    tag?: TagUpdateOneRequiredWithoutVlogsNestedInput
  }

  export type VlogTagUncheckedUpdateWithoutVlogInput = {
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type VlogTagUncheckedUpdateManyWithoutVlogInput = {
    tag_id?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}