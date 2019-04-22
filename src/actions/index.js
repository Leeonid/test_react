import { put, call, takeEvery, fork } from 'redux-saga/effects'

function socketsConnecting(bool, string) {
    return {
        type: 'SOCKETS_CONNECTING',
        isConnect: bool,
        from: string
    };
}

function socketsHasError(error, string) {
    return {
        type: 'SOCKETS_HAS_ERROR',
        error: error
    };
}

function socketsOnMessageOrderBook(items, string) {
    return {
        type: 'SOCKETS_ON_MESSAGE_ORDER_BOOK',
        items: items,
        from: string,
    };
}

function socketsOnMessageOrderBookDiffs(items) {
    return {
        type: 'SOCKETS_ON_MESSAGE_ORDER_BOOK_DIFFS',
        items: items
    };
}

function socketsOnMessageRecentTrades(items) {
    return {
        type: 'SOCKETS_ON_MESSAGE_RECENT_TRADES',
        items: items
    };
}

function createSource(url) {
    let source = new WebSocket(url),
        deferred;

    source.onmessage = event => {
        if(deferred) {
            deferred.resolve(JSON.parse(event.data));
            deferred = null
        }
    };

    return {
        nextMessage() {
            if(!deferred) {
                deferred = {};
                deferred.promise = new Promise(resolve => deferred.resolve = resolve)
            }
            return deferred.promise
        }
    }
}

export function* watchFetchData() {
    yield takeEvery('SOCKET_INIT', socketInit);
}

function* watchMessages(msgSource, from) {
    let txs = yield call(msgSource.nextMessage);

    yield put(socketsConnecting(false, from));

    let y = true;
    while(txs) {
        yield put(eval('socketsOnMessage' + from + '(txs)'));
        txs = yield call(msgSource.nextMessage);
        y = false;
    }
}

export function* socketInit(action) {
    try {
        yield put(socketsConnecting(true, action.from));
        const msgSource = yield call(createSource, action.url);
        yield fork(watchMessages, msgSource, action.from);
    } catch (error) {
        console.log(error);
        yield put(socketsHasError(true, action.from))
    }
}