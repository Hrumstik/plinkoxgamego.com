/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import MainView from "./components/MainView";
import AboutView from "./components/AboutView";
import PwaView from "./components/PwaView";
import ReviewsView from "./components/ReviewsView";

import { PwaContent } from "./shared/models";
import { useIntl } from "react-intl";

declare const window: any;

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function App() {
  const [view, setView] = useState("main");
  const [isPWAActive, setIsPWAActive] = useState(false);
  const intl = useIntl();
  const content: PwaContent = {
    appName: "Plinko Max",
    developerName: "Google Play",
    countOfDownloads: "2M+",
    countOfReviews: "37 K+",
    size: "12 MB",
    verified: true,
    tags: ["#1 TOP Casino"],
    securityUI: true,
    pwaLink: "https://vk.com/",
    rating: "4.7",
    shortDescription: intl.formatMessage({ id: "shortDescription" }),
    fullDescription: intl.formatMessage({ id: "fullDescription" }),
    countOfReviewsFull: "37,663",
    countOfStars: 4.7,
    appIcon:
      "https://pwac-media.s3.eu-north-1.amazonaws.com/c0fa39e4-e671-4438-9125-0930249bc89f-29.avif",
    images: [
      {
        url: "https://pwac-media.s3.eu-north-1.amazonaws.com/48718686-15a9-46f1-b790-f4e15797c534-screenshot0.webp",
      },
      {
        url: "https://pwac-media.s3.eu-north-1.amazonaws.com/14539aac-304a-4bc3-8f07-2c2dc9b448f9-screenshot1.webp",
      },
      {
        url: "https://pwac-media.s3.eu-north-1.amazonaws.com/9a09fbb9-dcf3-4d24-a23d-75218f01c479-screenshot2.webp",
      },
    ],
    reviews: [
      {
        reviewAuthorName: "Alessandro Neri",
        reviewAuthorIcon: "https://dnacont.com/user/4.webp",
        reviewAuthorRating: 5,
        reviewDate: new Date("2024-10-23").toISOString(),
        reviewText: intl.formatMessage({ id: "neri" }),
      },
      {
        reviewAuthorName: "Daniele Rossi",
        reviewAuthorIcon: "https://dnacont.com/user/1.webp",
        reviewAuthorRating: 5,
        reviewDate: new Date("2024-10-26").toISOString(),
        reviewText: intl.formatMessage({ id: "rossi" }),
      },
      {
        reviewAuthorName: "Arianna Fabbri",
        reviewAuthorRating: 5,
        reviewDate: new Date("2024-10-4").toISOString(),
        reviewText: intl.formatMessage({ id: "fabbri" }),
        reviewAuthorIcon: "https://dnacont.com/user/?n=%20Arianna%20Fabbri",
      },
      {
        reviewAuthorName: "Riccardo Marchi",
        reviewAuthorRating: 5,
        reviewDate: new Date("2024-09-17").toISOString(),
        reviewText: intl.formatMessage({ id: "fabbri" }),
        reviewAuthorIcon: "https://dnacont.com/user/?n=Riccardo%20Marchi",
      },
      {
        reviewAuthorName: "Ben Afrim",
        reviewAuthorRating: 5,
        reviewDate: new Date("2024-10-24").toISOString(),
        reviewText: intl.formatMessage({ id: "afrim" }),
        reviewAuthorIcon: "https://dnacont.com/user/2.webp",
      },
      {
        reviewAuthorName: "Jonson Stoun",
        reviewAuthorRating: 5,
        reviewDate: new Date("2024-08-15").toISOString(),
        reviewText: intl.formatMessage({ id: "stoun" }),
        reviewAuthorIcon: "https://dnacont.com/user/?n=Jonson%20Stoun",
      },
      {
        reviewAuthorName: "Steffan Belingam",
        reviewAuthorRating: 5,
        reviewDate: new Date("2024-07-24").toISOString(),
        reviewText: intl.formatMessage({ id: "belingam" }),
        reviewAuthorIcon: "https://dnacont.com/user/?n=Steffan%20Belingam",
      },
      {
        reviewAuthorName: "Martin Gray",
        reviewAuthorRating: 5,
        reviewDate: new Date("2024-07-13").toISOString(),
        reviewText: intl.formatMessage({ id: "gray" }),
        reviewAuthorIcon: "https://dnacont.com/user/?n=Martin%20Gray",
      },
      {
        reviewAuthorName: "Mo Ali",
        reviewAuthorRating: 5,
        reviewDate: new Date("2024-11-1").toISOString(),
        reviewText: intl.formatMessage({ id: "ali" }),
        reviewAuthorIcon: "https://dnacont.com/user/3.webp",
      },
      {
        reviewAuthorName: "Martin Gray",
        reviewAuthorRating: 5,
        reviewDate: new Date("2024-06-09").toISOString(),
        reviewText: intl.formatMessage({ id: "bright" }),
        reviewAuthorIcon: "https://dnacont.com/user/?n=IAN%20BRIGHT",
      },
    ],
    version: "3.10",
    sliders: [4.5, 0.3, 0.2, 0.1, 0.1],
    lastUpdate: new Date("2024-10-17").toISOString(),
  };

  const [pwaContent, setPwaContent] = useState<PwaContent | null>(content);

  useEffect(() => {
    setPwaContent(content);
  }, [pwaContent]);

  useEffect(() => {
    const isPWAActivated = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    setIsPWAActive(isPWAActivated);

    if (/FBA[NV]/.test(navigator.userAgent)) {
      const intentUrl = `intent://${window.location.hostname}${
        window.location.pathname
      }${
        window.location.search
      }#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(
        window.location.href
      )};end`;

      window.location.href = intentUrl;
    }
  }, []);

  useEffect(() => {
    console.log("useEffect");
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log("beforeinstallprompt");
      const event = e as BeforeInstallPromptEvent;
      console.log(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  useEffect(() => {
    if (pwaContent?.pwaLink) {
      setTimeout(() => {
        const searchParams = new URLSearchParams(window.location.search);

        let newPwaLink = pwaContent.pwaLink;
        let pixelId: string | null = "";

        const fbc = Cookies.get("_fbc");
        const fbp = Cookies.get("_fbp");

        const domain = window.location.hostname;

        newPwaLink += `${
          newPwaLink.includes("?") ? "&" : "?"
        }sub_id_5=${domain}`;

        if (searchParams.has("idpixel") || searchParams.has("sub_id_7")) {
          pixelId = searchParams.has("idpixel")
            ? searchParams.get("idpixel")
            : searchParams.get("sub_id_7");
          newPwaLink += `${
            newPwaLink.includes("?") ? "&" : "?"
          }sub_id_7=${pixelId}`;
        }

        if (fbp && fbc) {
          newPwaLink += `${
            newPwaLink.includes("?") ? "&" : "?"
          }sub_id_8=${fbp}&sub_id_9=${fbc}`;
        }

        searchParams.forEach((value, key) => {
          if (key !== "idpixel" && key !== "sub_id_7") {
            newPwaLink += `${
              newPwaLink.includes("?") ? "&" : "?"
            }${key}=${value}`;
          }
        });

        const pwaLink = localStorage.getItem("pwaLink");
        if (!pwaLink) {
          localStorage.setItem("pwaLink", newPwaLink);
        }
      }, 3000);
    }
  }, [pwaContent]);

  if (!pwaContent) return <></>;

  let currentView;

  switch (view) {
    case "main":
      currentView = <MainView pwaContent={pwaContent} setView={setView} />;
      break;
    case "about":
      currentView = <AboutView setView={setView} pwaContent={pwaContent} />;
      break;
    case "reviews":
      currentView = <ReviewsView pwaContent={pwaContent} setView={setView} />;
      break;
  }

  return isPWAActive && pwaContent ? (
    <PwaView pwaLink={pwaContent.pwaLink} />
  ) : (
    <>{currentView}</>
  );
}
