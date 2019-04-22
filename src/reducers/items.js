export function socketConnecting(state = false, action) {
    switch (action.type) {
        case 'SOCKETS_CONNECTING':
            return {...state, ...{[action.from]: action.isConnect}};

        default:
            return state;
    }
}


export function socketsHasError(state = false, action) {
    switch (action.type) {
        case 'SOCKETS_HAS_ERROR':
            return {...state, ...{[action.from]: action.error}};

        default:
            return state;
    }
}

export function socketsOnMessageOrderBook(state = {}, action) {
    switch (action.type) {
        case 'SOCKETS_ON_MESSAGE_ORDER_BOOK':
            return {
                asks: action.items.asks,
                bids: action.items.bids,
                oldAsks: {...state.asks, ...{}},
                oldBids: {...state.bids, ...{}},
            };

        default:
            return state;
    }
}

export function socketsOnMessageOrderBookDiffs(state = {}, action) {
    switch (action.type) {
        case 'SOCKETS_ON_MESSAGE_ORDER_BOOK_DIFFS':
            return {
                items: {...action.items.data, ...{}},
                oldItems: {...state.items, ...{}}
            };

        default:
            return state;
    }
}

export function socketsOnMessageRecentTrades(state = {}, action) {
    switch (action.type) {
        case 'SOCKETS_ON_MESSAGE_RECENT_TRADES':
            let returns = {
                items: state.items ? state.items : []
            };

            if (returns.items.unshift(action.items.data) > 23) {
                returns.items.pop()
            }

            return returns;

        default:
            return state;
    }
}