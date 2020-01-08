import { GraphQLResolveInfo } from 'graphql';
import { Model } from '../dataModel';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

/** Query Types */
export type App = {
   __typename?: 'App',
  id: Scalars['ID'],
  name: Scalars['String'],
  devices?: Maybe<Array<Device>>,
  templates?: Maybe<Array<Template>>,
};

export type Device = {
   __typename?: 'Device',
  id: Scalars['ID'],
  name: Scalars['String'],
  template?: Maybe<Template>,
};

export type MigrateDeviceInput = {
  deviceId: Scalars['ID'],
  templateId: Scalars['ID'],
};

/** Mutations */
export type Mutation = {
   __typename?: 'Mutation',
  newApp?: Maybe<App>,
  newDevice?: Maybe<Device>,
  newTemplate?: Maybe<Template>,
  migrateDevice?: Maybe<Device>,
};


/** Mutations */
export type MutationNewAppArgs = {
  name: Scalars['String']
};


/** Mutations */
export type MutationNewDeviceArgs = {
  appId: Scalars['ID'],
  device?: Maybe<NewDeviceInput>
};


/** Mutations */
export type MutationNewTemplateArgs = {
  appId: Scalars['ID'],
  name: Scalars['String']
};


/** Mutations */
export type MutationMigrateDeviceArgs = {
  data?: Maybe<MigrateDeviceInput>
};

export type NewDeviceInput = {
  name: Scalars['String'],
  templateId?: Maybe<Scalars['ID']>,
};

export type Query = {
   __typename?: 'Query',
  viewer: User,
};

export type Template = {
   __typename?: 'Template',
  id: Scalars['ID'],
  name: Scalars['String'],
  devices?: Maybe<Array<Device>>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  apps?: Maybe<Array<App>>,
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  User: ResolverTypeWrapper<Model.User>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  App: ResolverTypeWrapper<Model.App>,
  Device: ResolverTypeWrapper<Model.Device>,
  Template: ResolverTypeWrapper<Model.Template>,
  Mutation: ResolverTypeWrapper<{}>,
  NewDeviceInput: NewDeviceInput,
  MigrateDeviceInput: MigrateDeviceInput,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  User: Model.User,
  ID: Scalars['ID'],
  String: Scalars['String'],
  App: Model.App,
  Device: Model.Device,
  Template: Model.Template,
  Mutation: {},
  NewDeviceInput: NewDeviceInput,
  MigrateDeviceInput: MigrateDeviceInput,
  Boolean: Scalars['Boolean'],
};

export type AppResolvers<ContextType = any, ParentType extends ResolversParentTypes['App'] = ResolversParentTypes['App']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  devices?: Resolver<Maybe<Array<ResolversTypes['Device']>>, ParentType, ContextType>,
  templates?: Resolver<Maybe<Array<ResolversTypes['Template']>>, ParentType, ContextType>,
};

export type DeviceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Device'] = ResolversParentTypes['Device']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  template?: Resolver<Maybe<ResolversTypes['Template']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  newApp?: Resolver<Maybe<ResolversTypes['App']>, ParentType, ContextType, RequireFields<MutationNewAppArgs, 'name'>>,
  newDevice?: Resolver<Maybe<ResolversTypes['Device']>, ParentType, ContextType, RequireFields<MutationNewDeviceArgs, 'appId'>>,
  newTemplate?: Resolver<Maybe<ResolversTypes['Template']>, ParentType, ContextType, RequireFields<MutationNewTemplateArgs, 'appId' | 'name'>>,
  migrateDevice?: Resolver<Maybe<ResolversTypes['Device']>, ParentType, ContextType, MutationMigrateDeviceArgs>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  viewer?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
};

export type TemplateResolvers<ContextType = any, ParentType extends ResolversParentTypes['Template'] = ResolversParentTypes['Template']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  devices?: Resolver<Maybe<Array<ResolversTypes['Device']>>, ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  apps?: Resolver<Maybe<Array<ResolversTypes['App']>>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  App?: AppResolvers<ContextType>,
  Device?: DeviceResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Template?: TemplateResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
