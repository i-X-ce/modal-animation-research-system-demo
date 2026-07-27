import { CssBaseline } from "@mui/material";
import DemoButton from "./DemoButton";

export default function Page() {
  return (
    <>
      <CssBaseline />
      <main>
        <div className="h-dvh w-dvw flex flex-col lg:flex-row">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="flex-1 flex items-center justify-center border-t border-l"
            >
              <DemoButton animation={index === 1} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
