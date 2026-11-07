import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@/css/main.scss";
import { GlobalProviders } from "./GlobalProviders";
import { WebSocketProvider } from "@websocket";

ReactDOM.createRoot(document.getElementById("root")!).render(

    //<React.StrictMode> для разработки, добавляет двойной вызов функций
    
    <BrowserRouter> 
        <GlobalProviders>
            <WebSocketProvider>
                <App />
            </WebSocketProvider>
        </GlobalProviders>
    </BrowserRouter>
);