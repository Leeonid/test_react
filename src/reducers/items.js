export function socketConnecting(state = false, action) {
    switch (action.type) {
        case 'SOCKETS_CONNECTING':
            return action.isConnect;

        default:
            return state;
    }
}

export function socketsOnMessageOrderBook(state = {}, action) {
    switch (action.type) {
        case 'SOCKETS_ON_MESSAGE_ORDER_BOOK':
            let returns = {};

            returns['asks'] = action.items.asks;
            returns['bids'] = action.items.bids;
            returns['oldAsks'] = state.asks ? state.asks : {};
            returns['oldBids'] = state.bids ? state.bids : {};

            return returns;

        default:
            return state;
    }
}

export function socketsOnMessageOrderBookDiffs(state = {}, action) {
    switch (action.type) {
        case 'SOCKETS_ON_MESSAGE_ORDER_BOOK_DIFFS':
            let returns = {};

            returns['items'] = action.items && action.items.data ? action.items.data : {};
            returns['oldItems'] = state.items ? state.items : {};

            return returns;

        default:
            return state;
    }
}

export function socketsOnMessageRecentTrades(state = {}, action) {
    switch (action.type) {
        case 'SOCKETS_ON_MESSAGE_RECENT_TRADES':
            let returns = {};

            returns['items'] = state.items ? state.items : [];
            let newItem = {},
                currentTime = new Date(action.items.data.E),
                h = currentTime.getHours(),
                m = currentTime.getMinutes(),
                s = currentTime.getSeconds();

            newItem['time'] = ((h < 10 ? "0" : "") + h) + ':' + ((m < 10 ? "0" : "") + m) + ':' + ((s < 10 ? "0" : "") + s);
            newItem['q'] = action.items.data.q;
            newItem['p'] = Number(action.items.data.p).toFixed(2);
            newItem['reg'] = false;
            newItem['green'] = false;

            let lastItem = returns['items'][0] ? returns['items'][0] : false;
            if (lastItem && lastItem.p) {
                if (Number(lastItem.p) < Number(newItem['p'])) {
                    newItem['green'] = true;
                } else if (Number(lastItem.p) > Number(newItem['p'])) {
                    newItem['reg'] = true;
                } else {
                    newItem['green'] = lastItem['green'];
                    newItem['reg'] = lastItem['reg'];
                }
            } else {
                newItem['green'] = true;
            }

            let length = returns['items'].unshift(newItem);

            if (length > 23) {
                returns['items'].pop();
            }

            return returns;

        default:
            return state;
    }
}

export function socketsHasError(state = false, action) {
    switch (action.type) {
        case 'SOCKETS_HAS_ERROR':
            return action.error;

        default:
            return state;
    }
}