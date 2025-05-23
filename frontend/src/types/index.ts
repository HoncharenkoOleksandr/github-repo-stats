import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface RepoResponse {
  id: string;
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  openIssues: number;
  createdAtUTC: number;
  addedAt: Date;
}

export type AuthResponse = {
  data: {
    token: string;
  };
};

export type AuthFormData = {
  email: string;
  password: string;
};
