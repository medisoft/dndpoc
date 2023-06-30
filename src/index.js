import {StrictMode} from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));

// DnD don't work with strictmode on DEV, so we need to disable on DEV
root.render(
    <StrictMode>
        <App/>
    </StrictMode>
);
