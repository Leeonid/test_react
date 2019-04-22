import React, {Component} from 'react';
import {connect} from 'react-redux';
import {itemsFetchData} from '../actions/index';

const mapStateToProps = (state) => {
    return {
        hasErrored: state.socketsHasError,
        isConnect: state.socketConnecting,
        items: state.socketsOnMessageOrderBookDiffs
    };
};

class OrderBookDiffs extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'SOCKET_INIT',
            from: 'OrderBookDiffs',
            url: 'wss://stream.binance.com:9443/stream?streams=btcusdt@miniTicker'
        });
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isConnect) {
            return <p>Loading…</p>;
        }

        const {items} = this.props;

        if (items && Object.keys(items).length > 0) {
            let priceNow = Number(items.items.c).toFixed(2),
                priceOld = Number(items.oldItems.c).toFixed(2),
                classPrice = 'white';

            if (priceNow > priceOld) {
                classPrice = 'green';
            } else if(priceNow < priceOld) {
                classPrice = 'red';
            }

            return (
                <div className="padding5">
                    <div className="dfSBRW">
                        <div className="div33"></div>
                        <div className="fs18">
                            <span className={classPrice}>
                                {priceNow}
                                &nbsp;
                                {classPrice == 'green' ? '↑' : (classPrice == 'red' ? '↓' : '')}
                            </span>
                        </div>
                        <div className="div33"></div>
                    </div>
                </div>
            );
        } else {
            return <p>Loading…</p>
        }
    }
}

export default connect(mapStateToProps)(OrderBookDiffs);