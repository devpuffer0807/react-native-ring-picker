import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableOpacity,
    Image,
    Text as TText
} from 'react-native';
import * as d3Shape from 'd3-shape';

import Svg, { G, Text, TSpan, Path, Pattern } from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const { width, height } = Dimensions.get('screen');

class Spin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameScreen: new Animated.Value(width*0.8 - 20),
            wheelOpacity: new Animated.Value(1),
        };
        this.angle = 0;

        this.prepareWheel();
    }

    prepareWheel = () => {
        this.Rewards = this.props.options.rewards;
        this.RewardCount = this.Rewards.length;

        this.numberOfSegments = this.RewardCount;
        this.fontSize = 20;
        this.oneTurn = 360;
        this.angleBySegment = this.oneTurn / this.numberOfSegments;
        this.angleOffset = this.angleBySegment / 2;

        this._wheelPaths = this.makeWheel();
        this._angle = new Animated.Value(0);

        this.props.options.onRef(this);
    };

    componentWillUnmount() {
        this.props.options.onRef(undefined);
    }

    componentDidMount() {

    }

    makeWheel = () => {
        const data = Array.from({ length: this.numberOfSegments }).fill(1);
        const arcs = d3Shape.pie()(data);
        var colors = this.props.options.colors
            ? this.props.options.colors
            : [
                '#E07026',
                '#E8C22E',
                '#ABC937',
                '#4F991D',
                '#22AFD3',
                '#5858D0',
                '#7B48C8',
                '#D843B9',
                '#E23B80',
                '#D82B2B',
            ];
        return arcs.map((arc, index) => {
            const instance = d3Shape
                .arc()
                .padAngle(0.01)
                .outerRadius(width / 2)
                .innerRadius(this.props.options.innerRadius || 100);
            return {
                path: instance(arc),
                color: colors[index % colors.length],
                value: this.Rewards[index],
                centroid: instance.centroid(arc),
            };
        });
    };

    
    _textRender = (x, y, number, i) => (
        <Text
            x={x - number.length * 2}
            y={y - 75}
            fill={
                this.props.options.textColor ? this.props.options.textColor : '#fff'
            }
            textAnchor="middle"
            fontSize={12}
            fontWeight="bold"
        >

            {Array.from({ length: number.length > 8 ? 8 : number.length }).map((_, j) => {
                return (
                    <TSpan x={x} dy={12} key={`arc-${i}-slice-${j}`}>
                        {number.charAt(j)}
                    </TSpan>
                );
            })}
            {number.length > 8 ? <><TSpan x={x} dy={7}>.</TSpan>
                <TSpan x={x} dy={5}>.</TSpan>
                <TSpan x={x} dy={5}>.</TSpan></>
                : null
            }
        </Text>
    );

    render() {
        return (
            <Animated.View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [
                        {
                            rotate: this._angle.interpolate({
                                inputRange: [-this.oneTurn, 0, this.oneTurn],
                                outputRange: [
                                    `-${this.oneTurn}deg`,
                                    `0deg`,
                                    `${this.oneTurn}deg`,
                                ],
                            }),
                        },
                    ],
                    backgroundColor: this.props.options.backgroundColor
                        ? this.props.options.backgroundColor
                        : '#fff',
                    width: width*0.8,
                    height: width*.8,
                    borderRadius: width*0.8 / 2,
                    borderWidth: this.props.options.borderWidth
                        ? this.props.options.borderWidth
                        : 2,
                    borderColor: this.props.options.borderColor
                        ? this.props.options.borderColor
                        : '#fff',
                    opacity: this.state.wheelOpacity,
                }}>
                <AnimatedSvg
                    width={this.state.gameScreen}
                    height={this.state.gameScreen}
                    viewBox={`0 0 ${width} ${width}`}
                    style={{
                        transform: [{ rotate: `-${this.angleOffset}deg` }],
                        margin: 10,
                    }}>
                    <G y={width / 2} x={width / 2}>
                        {this._wheelPaths.map((arc, i) => {
                            const [x, y] = arc.centroid;
                            const number = arc.value.toString();

                            return (
                                <G key={`arc-${i}`}>
                                    <Path d={arc.path} strokeWidth={2} fill={arc.color} />
                                    <G
                                        rotation={
                                            (i * this.oneTurn) / this.numberOfSegments +
                                            this.angleOffset
                                        }
                                        origin={`${x}, ${y}`}>
                                        {this._textRender(x, y, number, i)}
                                    </G>
                                </G>
                            );
                        })}
                    </G>
                </AnimatedSvg>
            </Animated.View>
        );
    }
}

export default Spin;

const styles = StyleSheet.create({
    content: {
        
    },
});
