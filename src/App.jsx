import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { routes } from "./routes/routes.data";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import "./App.css";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { ParallaxProvider } from "react-scroll-parallax";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const App = () => {
  return (
    <MantineProvider>
      <ModalsProvider>
        <ParallaxProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Navbar />

              <Routes>
                {routes.map((route) => (
                  <Route
                    path={route.path}
                    element={route.element}
                    key={route.name}
                  />
                ))}
              </Routes>

              <Footer />
            </div>
          </Router>
        </ParallaxProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default App;
