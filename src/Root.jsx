import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import RootRoute from "./routes/index";
import { persistor, store } from "./store";

const Root = () => {
  return (
    <PersistGate persistor={persistor} loading={null}>
      <Provider store={store}>
        <RootRoute />
      </Provider>
    </PersistGate>
  );
};

export default Root;
