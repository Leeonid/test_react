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

class OrderBookBids extends Component {
    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isConnect) {
            return <p>Loading…</p>;
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