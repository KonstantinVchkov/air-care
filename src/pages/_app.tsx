import "@/styles/globals.css";
import type { AppProps } from "next/app";

import NavMenu from "@/components/NavigationBar/NavMenu";
import { LocationProvider } from "@/context/global_context";
import Footer from "@/components/footer/footer";

import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      {/* <ReportProvider> */}
      <LocationProvider>
        {/* <Logo /> */}
        <Component {...pageProps} />
        <NavMenu />
        {router.asPath === "/" && <Footer />}
      </LocationProvider>
      {/* </ReportProvider> */}
    </>
  );
}
