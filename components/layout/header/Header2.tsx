"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useCurrency } from "@/context/CurrencyContext";

const ThemeSwitch = dynamic(() => import("@/components/elements/ThemeSwitch"), {
  ssr: false,
});

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: Record<string, any>,
          elementId: string,
        ) => void;
      };
    };
  }
}

export default function Header2({
  scroll,
  isMobileMenu,
  handleMobileMenu,
  handleOffcanvas,
  isOffcanvas,
}: any) {
  // --- Language & Currency Logic ---
  const languages: Record<string, string> = {
    en: "English",
    de: "German",
    es: "Spanish",
    it: "Italian",
  };

  const { currency, setCurrency } = useCurrency();
  const [language, setLanguage] = useState("en");

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    let attempts = 0;
    const interval = setInterval(() => {
      const select = document.querySelector(
        ".goog-te-combo",
      ) as HTMLSelectElement | null;
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));
        clearInterval(interval);
      }
      attempts++;
      if (attempts > 10) clearInterval(interval);
    }, 300);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && !window.google) {
      const addScript = document.createElement("script");
      addScript.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(addScript);

      window.googleTranslateElementInit = () => {
        new window.google!.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,de,es,it",
            autoDisplay: false,
          },
          "google_translate_element",
        );
      };
    }
  }, []);

  return (
    <>
      <header
        className={`header sticky-bar header-home-2 ${scroll ? "stick" : ""}`}
      >
        <div className="top-bar top-bar-2 top-bar-3 @@bg">
          <div className="container-fluid px-4">
            <div className="text-header-info">
              {/* Phone & Email stays same */}
              <Link className="phone-head text-white" href="tel:+12225553399">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.656 2.34229C10.5314 -0.781426 5.46601 -0.780676 2.34229 2.34401C-0.781426 5.4687 -0.780676 10.534 2.34401 13.6577C5.4687 16.7814 10.534 16.7807 13.6577 13.656C15.1579 12.1554 16.0005 10.1202 16 7.99829C15.9996 5.87673 15.1564 3.84223 13.656 2.34229ZM12.1157 11.1439C12.1154 11.1443 12.115 11.1446 12.1147 11.145V11.1423L11.7093 11.545C11.1851 12.0758 10.4216 12.2942 9.69598 12.121C8.96489 11.9253 8.26989 11.6138 7.63732 11.1983C7.04964 10.8227 6.50501 10.3837 6.01332 9.88898C5.56092 9.43989 5.15448 8.94676 4.79998 8.41698C4.41223 7.84692 4.10532 7.22592 3.88798 6.57164C3.63882 5.80301 3.84529 4.95961 4.42132 4.39298L4.89598 3.91832C5.02795 3.78576 5.24239 3.78529 5.37492 3.91726C5.37526 3.91761 5.37564 3.91795 5.37598 3.91832L6.87464 5.41698C7.0072 5.54895 7.00767 5.76339 6.8757 5.89592C6.87536 5.89626 6.87501 5.89661 6.87464 5.89698L5.99464 6.77698C5.74214 7.02673 5.71039 7.42361 5.91998 7.71032C6.23826 8.14714 6.59048 8.55817 6.97332 8.93967C7.40017 9.36835 7.8642 9.75832 8.35998 10.105C8.64645 10.3048 9.03482 10.2711 9.28264 10.025L10.1333 9.16101C10.2653 9.02845 10.4797 9.02798 10.6122 9.15995C10.6126 9.16029 10.6129 9.16064 10.6133 9.16101L12.1146 10.665C12.2472 10.7969 12.2477 11.0114 12.1157 11.1439Z"
                    fill="white"
                  />
                </svg>
                <span className="d-none d-lg-inline-block">
                  {" "}
                  +1 222-555-33-99{" "}
                </span>
              </Link>
            </div>

            <div className="top-right-header">
              {/* Hidden Google Translate Target */}
              <div id="google_translate_element" style={{ display: "none" }} />

              {/* Language Selector */}
              <Dropdown className="d-xl-inline-block box-dropdown-cart align-middle mr-15 head-lang">
                <Dropdown.Toggle
                  as="span"
                  className="text-14-medium icon-list icon-account icon-lang"
                >
                  <span className="text-14-medium arrow-down">
                    {languages[language] || "English"}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="dropdown-account"
                  style={{ visibility: "visible" }}
                >
                  <Dropdown.Item onClick={() => changeLanguage("en")}>
                    English
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage("de")}>
                    German
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage("es")}>
                    Spanish
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage("it")}>
                    Italian
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* Currency Selector */}
              <Dropdown className="d-xl-inline-block box-dropdown-cart align-middle head-currency">
                <Dropdown.Toggle
                  as="span"
                  className="text-14-medium icon-list icon-cart"
                >
                  <span className="text-14-medium arrow-down">{currency}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{ visibility: "visible" }}
                  className="dropdown-cart"
                >
                  <Dropdown.Item onClick={() => setCurrency("USD")}>
                    USD
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setCurrency("EUR")}>
                    EUR
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <div className="top-button-mode">
                <ThemeSwitch />
              </div>
            </div>
          </div>
        </div>

        {/* Main Nav Section */}
        <div className="container-fluid background-body p-3 px-sm-5">
          <div className="main-header">
            <div className="header-left">
              <div className="header-logo">
                <Link className="d-flex" href="/">
                  <img
                    className="light-mode"
                    alt="luxentina"
                    src="/assets/imgs/logo-dark.png"
                    style={{ width: "8rem" }}
                  />
                  <img
                    className="dark-mode"
                    alt="luxentina"
                    src="/assets/imgs/logo.png"
                    style={{ width: "8rem" }}
                  />
                </Link>
              </div>
              <div className="header-nav">
                <nav className="nav-main-menu">
                  <ul className="main-menu">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/cars-list">Vehicles</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="d-flex gap-2">
                <div
                  className="burger-icon-2 burger-icon-white"
                  onClick={handleOffcanvas}
                >
                  <img
                    src="/assets/imgs/template/icons/menu.svg"
                    alt="luxentina"
                  />
                </div>
                <div
                  className="burger-icon burger-icon-white"
                  onClick={handleMobileMenu}
                >
                  <span className="burger-icon-top" />
                  <span className="burger-icon-mid" />
                  <span className="burger-icon-bottom" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
