'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    WebView,
    View,
    Platform,
    Dimensions,
} = ReactNative;
const _ = require('lodash');
const source = Platform.OS==='android' ? { uri: 'file:///android_asset/remobile-echarts.html' } : require('./remobile-echarts.html');

module.exports = React.createClass({
    getDefaultProps() {
        return {
            width: Dimensions.get('window').width,
            height: 400,
        };
    },
    componentWillReceiveProps(nextProps) {
        if(!this.loading && !_.isEqual(nextProps.option, this.props.option)) {
            this.refs.chart.reload();
        }
    },
    getOption(obj) {
        const escape = `-=remobile=-`;
        return JSON.stringify(obj, function(key, val) {
            if (typeof val === 'function') {
                return `${escape}${val}${escape}`;
            }
            return val;
        }).replace(`"${escape}`, '').replace(`${escape}"`, '').replace(/\\n/g, '');
    },
    getInjectedJavaScript() {
        const {width, height, option} = this.props;
        const params = {...option, animation: false};
        return `
        document.body.style.height = "${height}px";
        document.body.style.width = "${width}px";
        echarts.init(document.body).setOption(${this.getOption(params)})
        `;
    },
    reload() {
        this.refs.chart.reload();
    },
    onLoadStart() {
        this.loading = true;
    },
    onLoadEnd() {
        this.loading = false;
    },
    render() {
        const {width, height} = this.props;
        const script = this.getInjectedJavaScript();
        return (
            <View style={{width, height}}>
                <WebView
                    ref="chart"
                    onLoadStart={this.onLoadStart}
                    onLoadEnd={this.onLoadEnd}
                    scrollEnabled={false}
                    scalesPageToFit={true}
                    startInLoadingState={true}
                    injectedJavaScript={script}
                    style={{width, height}}
                    source={source}
                    />
                <View style={{width, height, position:'absolute', top:0, left:0, backgroundColor:'transparent'}} />
            </View>
        );
    },
});
