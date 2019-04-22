import React, {Component} from 'react';
import {connect} from 'react-redux';
import {itemsFetchData} from '../actions/index';

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
            items.map((item, i) => {
                item.itemConvString = item.itemConv = Number(item[0]).toFixed(2);

                if (oldItems && oldItems[i]) {
                    let ic = item.itemConv.split('.');
                    let ico = oldItems[i].itemConv.split('.');

                    for (let j = 0; j < ic.length; j++) {
                        if (ico[j].indexOf(ic[j]) == 0) {
                            ic[j] = '<span class="hHLfPw">' + ic[j] + '</span>'
                        }
                    }

                    item.itemConvString = ic.join('<span class="hHLfPw">.</span>');
                }
            });

            return (
                <div>
                    <div className="dfSBRW head">
                        <div className="div33">Price(USDT)</div>
                        <div className="div33">Amount(BTC)</div>
                        <div className="div33 textRight">Total(USDT)</div>
                    </div>
                    {
                        items.map((item, index) => (
                            <div className="dfSBRW" key={index}>
                                <div className="div33 pink"
                                     dangerouslySetInnerHTML={{__html: item.itemConvString}}></div>
                                <div className="div33">{item[1]}</div>
                                <div className="div33 textRight">{(item[1] * item[0]).toFixed(8)}</div>
                            </div>
                        ))
                    }
                </div>
            );
        } else {
            return <p>Loading…</p>
        }
    }
}

export default connect(mapStateToProps)(OrderBookAsks);