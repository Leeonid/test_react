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

        if (items && items.items && items.items.length > 2) {
            let newItem = items.items[0],
                currentTime = new Date(newItem.E),
                h = currentTime.getHours(),
                m = currentTime.getMinutes(),
                s = currentTime.getSeconds();

            newItem['time'] = ((h < 10 ? "0" : "") + h) + ':' + ((m < 10 ? "0" : "") + m) + ':' + ((s < 10 ? "0" : "") + s);
            newItem['reg'] = false;
            newItem['green'] = false;

            const lastItem = items.items[1] ? items.items[1] : false;
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
        }

        if (items && items.items && items.items.length > 22) {
            return (
                <div className="pTop6">
                    {
                        items.items.map((item, index) => (
                            <div className="dfSBRW" key={index}>
                                <div className="div33">
                                    <span className={item.green ? 'green' : 'red'}>{Number(item.p).toFixed(2)}</span>
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