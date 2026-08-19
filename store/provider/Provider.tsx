import { Provider } from "react-redux";
import { store } from "../store";
import type { ReactNode } from "react";

type providersProps = Readonly<{
  children: ReactNode;
}>;

export default function Providers({ children }: providersProps) {
  return <Provider store={store}>{children}</Provider>;
}
