import {
  FileText,
  LayoutGrid,
  Library,
  LucideIcon,
  Network,
  UserCog,
  Users,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Geral",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          active: pathname.endsWith("/"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Gerenciamento",
      menus: [
        {
          href: "/algoritmos",
          label: "Algoritmos",
          active: pathname.includes("/algoritmos"),
          icon: Network,
          submenus: [],
        },
        {
          href: "/categorias",
          label: "Categorias",
          active: pathname.includes("/categorias"),
          icon: Library,
          submenus: [],
        },
        {
          href: "/documentos",
          label: "Documentos",
          active: pathname.includes("/documentos"),
          icon: FileText,
          submenus: [],
        },
        {
          href: "/usuarios",
          label: "Usuários",
          active: pathname.includes("/usuarios"),
          icon: Users,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Configurações",
      menus: [
        {
          href: "/minha-conta",
          label: "Minha Conta",
          active: pathname.includes("/minha-conta"),
          icon: UserCog,
          submenus: [],
        },
      ],
    },
  ];
}
