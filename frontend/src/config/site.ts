export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Github Repos",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
  ],
  navMenuItems: [
    {
      label: "Logout",
      href: "/logout",
    },
  ],
};

export const routes = {
  dashboard: "/dashboard",
  home: "/",
};
