import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import Messages from "./Messages";

const typeBlock = 'RecentTrades';

const mapStateToProps = (state) => {
    return {
        hasErrored: state.socketsHasError[typeBlock],
        isConnect: state.socketConnecting[typeBlock],
        items: state.socketsOnMessageRecentTrades
    };
};

class RecentTrades extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'SOCKET_INIT',
            from: typeBlock,
            url: 'wss://stream.binance.com:9443/stream?streams=btcusdt@trade'
        });
    }

    render() {
        if (this.props.hasErrored || this.props.isConnect) {
            return <Messages {...this.props} />;
        }

        const {items} = this.props;

        if (!!items.items && items.items.length > 2) {
            let newItem = items.items[0],
                currentTime = moment.unix(newItem.E);

            newItem['time'] = currentTime.format('hh:mm:ss');
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

        if (!!items.items &&items.items.length > 22) {
            return (
                <div className="pTop6">
                    {
                        items.items.map((item, index) => (
                            <div className="dfSBRW" key={index}>
                                <div className="div33">
                                    <span className={item.green ? 'green' : 'red'}>{Number(item.p).toFixed(2)}</span>
                                </div>
                                <div className="div33">{item.q}</div>
                                <div className="div33 opacity50">{item.time}</div>
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