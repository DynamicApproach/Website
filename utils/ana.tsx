import ReactGA from "react-ga4";

export const initGA = () => {
  console.log("GA init");
  ReactGA.initialize("G-TGX1KE5CE0");
};

export const logPageView = () => {
  console.log(`Logging pageview for ${window.location.pathname}`);
  ReactGA.set({ page: window.location.pathname });
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

export const logEvent = (category = "", action = "", label = "", value = 0) => {
  if (category && action) {
    ReactGA.event({
      category,
      action,
      label,
      value
    });
  }
};

export const logUserTiming = (name = "", value = 0, label = "") => {
  if (name && value) {
    ReactGA.gtag("event", "timing_complete", {
      name,
      value, // in milliseconds
      label
    });
  }
};

export const logException = (description = "", fatal = false) => {
  if (description) {
    ReactGA.gtag("event", "exception", {
      description,
      fatal // set to true if the error is fatal
    });
  }
};
