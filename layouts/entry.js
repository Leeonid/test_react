import "regenerator-runtime/runtime";

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from "redux-saga";

import OrderBookAsks from "../src/components/OrderBookAsks";
import OrderBookDiffs from "../src/components/OrderBookDiffs";
import OrderBookBids from "../src/components/OrderBookBids";
import RecentTrades from "../src/components/RecentTrades";
import rootReducer from "../src/reducers";
import {watchFetchData} from "../src/actions";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(watchFetchData);

import './css/app.css';

render(
    <Provider store={store}>
        <div className="dfSBRW">
            <div className="div50">
                <OrderBookAsks/>
                <OrderBookDiffs/>
                <OrderBookBids/>
            </div>
            <div className="div50">
                <RecentTrades/>
            </div>
        </div>
    </Provider>,
    document.getElementById('app')
);
