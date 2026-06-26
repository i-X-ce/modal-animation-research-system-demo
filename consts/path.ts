import { isDev } from "@/next.config";
import { BASE_PATH } from "./userSetting";

export interface PathItem {
  url: string;
  label: string;
}

export const PATH = {
  viewTransitionDemo: {
    url: "/viewtransition-demo",
    label: "View Transition モーダルデモ （焼肉）",
  },
  viewTransitionDemo2: {
    url: "/viewtransition-demo2",
    label: "View Transition モーダルデモ2 （カフェ）",
  },
} satisfies Record<string, PathItem>;

/**
 * basePath を付与したパスを返す（画像やリンクのパスに使用する）
 *
 * @param path
 * @returns
 */
export const withBasePath = (path: string) => {
  // 開発環境またはパスがスラッシュで始まらない場合はそのまま返す
  if (!path.startsWith("/") || isDev) {
    return path;
  }

  // BASE_PATH が設定されている場合は、そのまま返す
  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) {
    return path;
  }

  return `${BASE_PATH}${path}`;
};
