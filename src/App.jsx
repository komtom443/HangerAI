import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import Login from "./screen/Login";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useAuthentication } from "./providers/AuthenticationProvider";
import VirtualTryOn from "./screen/VirtualTryOn";
import Home from "./screen/Home";
import ProductDescriptionGenerate from "./screen/ProductDescriptionGenerate";
import io from "socket.io-client";
import { useSave } from "./stores/useStores";
import { useEffect } from "react";
import cachedKeys from "./constants/cachedKeys";
import Callback from "./screen/Callback";
import FacebookPost from "./screen/FacebookPost";
import UserProfile from "./screen/UserProfile";
import VirtualPhotoshoot from "./screen/VirtualPhotoshoot";
import VirtualDressingRoom from "./screen/VirtualDressingRoom";
import VirtualModel from "./screen/VirtualModel";
import ChatImage from "./screen/ProductImageChat"
import UpscaleImagePage from "./screen/UpscaleImage";

const socket = io("https://a512-123-25-21-211.ngrok-free.app", {
  retries: 0,
  reconnectionAttempts: 3,
  extraHeaders: {
    "ngrok-skip-browser-warning": "true",
  },
});

socket.on("connect_success", (data) => {
  console.log("data", data);
});
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

const App = () => {
  //! State
  const { islogged } = useAuthentication();
  const save = useSave();
  const router = createBrowserRouter([
    {
      path: "callback",
      element: <Callback />,
    },
    {
      path: "/login",
      element: <Login />,
      loader: () => {
        if (islogged) return redirect("/");
        return null;
      },
    },
    {
      element: <DefaultLayout />,
      children: [
        {
          path: "/product-images-editing/background-generator",
          element: <VirtualPhotoshoot />,
        },
        {
          path: '/image-editing/upscale-image',
          element: <UpscaleImagePage />,
        },
        {
          path: "/virtual-model",
          element: <VirtualModel />,
        },
        {
          path: "/virtual-dressing-room",
          element: <VirtualDressingRoom />,
        },

        {
          path: "user-profile",
          element: <UserProfile />,
        },
        {
          path: "facebook-post",
          element: <FacebookPost />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/product-content-writing/product-descriptions",
          element: <ProductDescriptionGenerate />,
        },
        {
          path: "/product-content-writing/image-social-media-marketing",
          element: <ProductDescriptionGenerate />,
        },
        {
          path: "/product-content-writing/image-website-seo",
          element: <ProductDescriptionGenerate />,
        },
        {
          path: "/product-image-chat",
          element: <ChatImage />,
        },
        {
          path: "*",
          element: <VirtualTryOn />,
        },
        // {
        //   path: "*",
        //   loader: () => {
        //     const path = window.location.pathname
        //     if (path !== "virtual-try-on") {
        //       return redirect("/virtual-try-on")
        //     }

        //     return null
        //   },
        // },
      ],
      loader: () => {
        if (!islogged) return redirect("/login");

        return null;
      },
    },
  ]);

  //! Function
  useEffect(() => {
    save(cachedKeys.socket, socket);
  }, []);

  //! Render
  return <RouterProvider router={router} />;
};

export default App;
