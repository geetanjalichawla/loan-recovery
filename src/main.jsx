import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {persistor,store} from './redux/store.js'
import './index.css'

export const BASE_URL = "https://vehicle-node.onrender.com/backend/api/v1";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}> 
  <PersistGate loading={null} persistor={persistor}>
    <App/>
  </PersistGate>
</Provider>
)
