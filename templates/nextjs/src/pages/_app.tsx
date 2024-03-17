import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { queryClient } from "@/common/helpers/queryClient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
