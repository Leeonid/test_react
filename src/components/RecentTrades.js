import React, {Component} from 'react';
import {connect} from 'react-redux';
import {itemsFetchData} from '../actions/index';

const mapStateToProps = (state) => {
    return {
        hasErrored: state.socketsHasError,
        isConnect: state.socketConnecting,
        items: state.socketsOnMessageRecentTrades
    };
};

class RecentTrades extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'SOCKET_INIT',
            from: 'RecentTrades',
            url: 'wss://stream.binance.com:9443/stream?streams=btcusdt@trade'
        });
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isConnect) {
            return <p>Loading…</p>;
        }

        let items = this.props.items;

        if (items && items.items && Object.keys(items.items).length > 22) {
            return (
                <div className="pTop6">
                    {
                        items.items.map((item, index) => (
                            <div className="dfSBRW" key={index}>
                                <div className="div33">
                                    <span className={item.green ? 'green' : 'red'}>{item.p}</span>
                                </div>
                                <div className="div33">{item.q}</div>
                                <div className="div33 hHLfPw">{item.time}</div>
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

export default connect(mapStateToProps)(RecentTrades);