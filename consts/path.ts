export interface PathItem {
  url: string;
  label: string;
}

export const PATH = {
  viewTransitionDemo: {
    url: "/viewtransition-demo",
    label: "View Transition モーダルデモ",
  } satisfies PathItem,
};
