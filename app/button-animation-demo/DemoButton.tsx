import clsx from "clsx";

interface DemoButtonProps {
  animation: boolean;
}

const DemoButton = ({ animation }: DemoButtonProps) => {
  return (
    <button
      className={clsx(
        "text-2xl px-8 py-5 bg-black text-white rounded-lg font-bold",
        animation &&
          "hover:scale-120 active:scale-95 transition-transform duration-200",
      )}
    >
      Button
    </button>
  );
};

export default DemoButton;
