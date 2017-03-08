# React Native Echarts (remobile)
A react-native wrapper baidu echarts

## Installation
```sh
npm install @remobile/react-native-echarts --save
```
### Installation (Android)
```gradle
...
include ':react-native-echarts'
project(':react-native-echarts').projectDir = new File(settingsDir, '../node_modules/@remobile/react-native-echarts/android')
```

* In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':react-native-echarts')
}
```

## Usage

### Example
```js
'use strict';
var React = require('react');
var ReactNative = require('react-native');
var {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView
} = ReactNative;

import Echarts from '@remobile/react-native-echarts';

module.exports = React.createClass({
    getInitialState() {
        return {
            data: {
                male: 1000,
                female: 5000,
            },
        };
    },
    render() {
        const {male, female} = this.state.data;
        const malePercentage = Math.round(male*100/(male+female));
        const femalePercentage = 100-malePercentage;
        const sections = [
            {name: '男', count: app.utils.toThousands(male), percentage: malePercentage+'%', color: '#C23531'},
            {name: '女', count: app.utils.toThousands(female), percentage: femalePercentage+'%', color: '#2F4554'},
        ];
        const option = {
            series: [{
                name: '性别比例',
                type: 'pie',
                radius : '70%',
                data: [
                    {value:male, name:'男'},
                    {value:female, name:'女' },
                ]
            }]
        };
        return (
            <ScrollView style={styles.container}>
                <Echarts option={option} height={sr.ws(200)}/>
                <View style={styles.totalView}>
                    <Text style={styles.littleView}>
                        总人数：{app.utils.toThousands(male+female)}
                    </Text>
                </View>
                <View style={styles.bottomView}>
                    {
                        sections.map((item, i)=>{
                            return(
                                <View key={i} style={styles.itemView}>
                                    <View style={styles.leftView}>
                                        <Text style={[styles.littleView, {marginLeft:3,width: 20}]}>
                                            {i+1}
                                        </Text>
                                        <View style={[styles.squirView, {backgroundColor: item.color}]}/>
                                        <Text style={styles.littleView}>
                                            {item.name}
                                        </Text>
                                    </View>
                                    <Text style={styles.littleView}>
                                        {item.percentage}
                                    </Text>
                                    <Text style={[styles.littleView, {marginRight: 39}]}>
                                        {item.count}
                                    </Text>
                                    <View style={styles.lineView}/>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 50,
        backgroundColor: '#FFFFFF',
    },
    totalView: {
        height: 50,
        width: sr.w,
        alignItems: 'center',
    },
    bottomView: {
        height: 120,
        width: sr.w,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemView: {
        height: 37,
        width: sr.w,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftView: {
        height: 37,
        marginLeft: 39,
        flexDirection: 'row',
        alignItems: 'center',
    },
    squirView: {
        height: 25,
        width: 25,
        marginRight: 10,
    },
    littleView: {
        fontSize: 12,
        color: '#888888',
    },
    lineView: {
        position: 'absolute',
        height: 1,
        width: sr.w-78,
        bottom: 0,
        left: 39,
        backgroundColor: '#aab9ba',
    },
});
```

## Screencasts

![demo](https://github.com/remobile/react-native-echarts/blob/master/screencasts/demo.gif)

#### Props
- `option: PropTypes.object` chart option
- `width: PropTypes.number` chart width
- `height: PropTypes.number` chart height

#### Method
- `reload: PropTypes.function` reload chart
