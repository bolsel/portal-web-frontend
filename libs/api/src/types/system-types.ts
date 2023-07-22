import { DefaultType } from "@directus/sdk";

export type ActivityType = {
  action: string;
  collection: string;
  comment: string | null;
  id: number;
  ip: string;
  item: string;
  origin: string | null;
  timestamp: string;
  revisions: number[];
  user: string;
  user_agent: string;
};
export type Comment = {
  collection: string;
  comment: string;
  item: string;
};
export type CollectionType = {
  collection: string;
  meta: CollectionMetaType;
  schema: CollectionSchemaType | null;
};
export type CollectionMetaType = {
  accountability: string | null;
  archive_app_filter: boolean;
  archive_field: string | null;
  archive_value: string | null;
  collapse: string;
  collection: string;
  display_template: string | null;
  group: string | null;
  hidden: boolean;
  icon: string | null;
  item_duplication_fields: string[] | null;
  note: string | null;
  singleton: boolean;
  sort_field: string | null;
  translations: CollectionMetaTranslationType[] | null;
  unarchive_value: string | null;
};
export type CollectionMetaTranslationType = {
  language: string;
  plural: string;
  singular: string;
  translation: string;
};
export type CollectionSchemaType = {
  comment: string | null;
  name: string;
  schema: string;
};
export type FieldType = {
  collection: string;
  field: string;
  meta: FieldMetaType;
  schema: FieldSchemaType;
  type: string;
};
export type FieldMetaType = {
  collection: string;
  conditions: FieldMetaConditionType[] | null;
  display: string | null;
  display_options: string | null;
  field: string;
  group: string | null;
  hidden: boolean;
  id: number;
  interface: string;
  note: string | null;
  options: DefaultType | null;
  readonly: boolean;
  required: boolean;
  sort: number | null;
  special: string[] | null;
  translations: FieldMetaTranslationType[] | null;
  validation: DefaultType | null;
  validation_message: string | null;
  width: string;
};
export type FieldMetaConditionType = {
  hidden: boolean;
  name: string;
  options: FieldMetaConditionOptionType;
  readonly: boolean;
  required: boolean;
  rule: DefaultType;
};
export type FieldMetaTranslationType = {
  language: string;
  translation: string;
};
export type FieldMetaConditionOptionType = {
  clear: boolean;
  font: string;
  iconLeft?: string;
  iconRight?: string;
  masked: boolean;
  placeholder: string;
  slug: boolean;
  softLength?: number;
  trim: boolean;
};
export type FieldSchemaType = {
  comment: string | null;
  data_type: string;
  default_value: any | null;
  foreign_key_column: string | null;
  foreign_key_schema: string | null;
  foreign_key_table: string | null;
  generation_expression: unknown | null;
  has_auto_increment: boolean;
  is_generated: boolean;
  is_nullable: boolean;
  is_primary_key: boolean;
  is_unique: boolean;
  max_length: number | null;
  name: string;
  numeric_precision: number | null;
  numeric_scale: number | null;
  schema: string;
  table: string;
};
export type FileType = {
  charset: string | null;
  description: string | null;
  duration: number | null;
  embed: unknown | null;
  filename_disk: string;
  filename_download: string;
  filesize: string;
  folder: string;
  height: number | null;
  id: string;
  location: string | null;
  metadata: DefaultType;
  modified_by: string;
  modified_on: string;
  storage: string;
  tags: string[];
  title: string;
  type: string;
  uploaded_by: string;
  uploaded_on: string;
  width: number | null;
};
export type FolderType = {
  id: string;
  name: string;
  parent: string;
};
export type PermissionType = {
  action: string;
  collection: string | null;
  fields: string[];
  id: string;
  permissions: DefaultType;
  presets: DefaultType | null;
  role: string | null;
  system?: boolean;
  validation: DefaultType | null;
};
export type PresetType = {
  collection: string;
  color: string | null;
  bookmark: string | null;
  filter: DefaultType;
  icon: string | null;
  id: number;
  layout: string | null;
  layout_options: DefaultType;
  layout_query: DefaultType;
  refresh_interval: number | null;
  role: string | null;
  search: string | null;
  user: string | null;
};
export type RelationType = {
  collection: string;
  field: string;
  related_collection: string;
  schema: RelationSchemaType;
  meta: RelationMetaType;
};
export type RelationMetaType = {
  id: number | null;
  junction_field: string | null;
  many_collection: string | null;
  many_field: string | null;
  one_allowed_collections: string | null;
  one_collection: string | null;
  one_collection_field: string | null;
  one_deselect_action: string;
  one_field: string | null;
  sort_field: string | null;
  system: boolean | null;
};
export type RelationSchemaType = {
  column: string;
  constraint_name: string;
  foreign_key_column: string;
  foreign_key_schema: string;
  foreign_key_table: string;
  on_delete: string;
  on_update: string;
  table: string;
};
export type RevisionType = {
  activity: number;
  collection: string;
  data: DefaultType;
  delta: DefaultType;
  id: number;
  item: string;
  parent: number | null;
};
export type RoleType = {
  admin_access: boolean;
  app_access: boolean;
  description: string | null;
  enforce_tfa: boolean;
  icon: string;
  id: string;
  ip_access: string[] | null;
  name: string;
  users: string[];
};
export type SettingType = {
  id: 1;
  auth_login_attempts: number;
  auth_password_policy: string | null;
  custom_css: string | null;
  project_color: string | null;
  project_logo: string | null;
  project_name: string;
  project_url: string;
  public_background: string | null;
  public_foreground: string | null;
  public_note: string | null;
  storage_asset_presets:
    | {
        fit: string;
        height: number;
        width: number;
        quality: number;
        key: string;
        withoutEnlargement: boolean;
      }[]
    | null;
  storage_asset_transform: "all" | "none" | "presets";
};
export type UserType = {
  auth_data: DefaultType;
  avatar: string;
  description: string | null;
  email: string | null;
  email_notifications: boolean;
  external_identifier: string;
  first_name: string | null;
  id: string;
  language: string | null;
  last_access: string | null;
  last_name: string | null;
  last_page: string | null;
  location: string | null;
  password: string | null;
  provider: string;
  role: string;
  status: string;
  tags: string[];
  theme: string;
  tfa_secret: string | null;
  title: string | null;
  token: string | null;
  content_author_name?: string;
};
