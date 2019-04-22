import React, {Component} from 'react';
import {connect} from 'react-redux';
import {itemsFetchData} from '../actions/index';
import {convertItems} from '../helpers/functions';
import OrderBookColumns from "./OrderBookColumns";

const mapStateToProps = (state) => {
    return {
        hasErrored: state.socketsHasError,
        isConnect: state.socketConnecting,
        items: state.socketsOnMessageOrderBook
    };
};

class OrderBookAsks extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'SOCKET_INIT',
            from: 'OrderBook',
            url: 'wss://stream.binance.com:9443/ws/btcusdt@depth10'
        });
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isConnect) {
            return <p>Loading…</p>;
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