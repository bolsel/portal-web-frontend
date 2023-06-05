export type BasePageProps<P = Record<string, any>> = {
  website: Record<string, any>;
  title: string;
  subTitle?: string;
  route: string;
  pageMetadata?: Record<string, any>;
  breadcrumbs?: {
    link: string;
    label: string;
    active?: boolean;
    capitalize?: boolean;
  }[];
} & P;
