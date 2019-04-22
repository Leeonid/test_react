import React, {Component} from 'react';

export default class OrderBookColumns extends Component {
    render() {
        return (
            <div>
            {
                this.props.items.map((item, index) => (
                    <div className="dfSBRW" key={index}>
                        <div className={this.props.class}>
                            <span className={item.convFlag[0]}>{item.conv[0]}</span>
                            <span className="hHLfPw">.</span>
                            <span className={item.convFlag[1]}>{item.conv[1]}</span>
                        </div>
                        <div className="div33">{item[1]}</div>
                        <div className="div33 textRight">{(item[1] * item[0]).toFixed(8)}</div>
                    </div>
                ))
            }
            </div>
        );
    }
}