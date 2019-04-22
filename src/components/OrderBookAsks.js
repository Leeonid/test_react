import React, {Component} from 'react';
import {connect} from 'react-redux';
import {convertItems} from '../helpers/functions';
import OrderBookColumns from "./OrderBookColumns";
import Messages from "./Messages";

const typeBlock = 'OrderBook';

const mapStateToProps = (state) => {
    return {
        hasErrored: state.socketsHasError[typeBlock],
        isConnect: state.socketConnecting[typeBlock],
        items: state.socketsOnMessageOrderBook
    };
};

class OrderBookAsks extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'SOCKET_INIT',
            from: typeBlock,
            url: 'wss://stream.binance.com:9443/ws/btcusdt@depth10'
        });
    }

    render() {
        if (this.props.hasErrored || this.props.isConnect) {
            return <Messages {...this.props} />;
        }

        let items = this.props.items.asks,
            oldItems = this.props.items.oldAsks;


        if (items) {
            convertItems(items, oldItems);

            return (
                <div>
                    <div className="dfSBRW head">
                        <div className="div33">Price(USDT)</div>
                        <div className="div33">Amount(BTC)</div>
                        <div className="div33 textRight">Total(USDT)</div>
                    </div>
                    <OrderBookColumns items={items} class={'div33 pink'}/>
                </div>
            );
        } else {
            return <p>Loading…</p>
        }
    }
}

export default connect(mapStateToProps)(OrderBookAsks);