import { combineReducers } from 'redux';
import { socketConnecting, socketsOnMessageOrderBook, socketsOnMessageOrderBookDiffs, socketsOnMessageRecentTrades, socketsHasError } from './items';

export default combineReducers({
    socketConnecting,
    socketsOnMessageOrderBook,
    socketsOnMessageOrderBookDiffs,
    socketsOnMessageRecentTrades,
    socketsHasError
});