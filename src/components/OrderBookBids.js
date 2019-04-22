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

class OrderBookBids extends Component {
    render() {
        if (this.props.hasErrored || this.props.isConnect) {
            return <Messages {...this.props} />;
        }

        let items = this.props.items.bids,
            oldItems = this.props.items.oldBids;

        if (items) {
            convertItems(items, oldItems);

            return (
                <OrderBookColumns items={items} class={'div33 green'}/>
            );
        } else {
            return <p>Loading…</p>
        }
    }
}

export default connect(mapStateToProps)(OrderBookBids);