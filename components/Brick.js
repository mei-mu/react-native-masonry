import React, { Component } from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import Injector from 'react-native-injectable-component';

export default function Brick (props) {
	// Avoid margins for first element
	const image = (props.onPress) ? _getTouchableUnit(props, props.gutter) : _getImageTag(props, props.gutter);
	const footer = (props.renderFooter) ? props.renderFooter(props.data) : null;
	const header = (props.renderHeader) ? props.renderHeader(props.data) : null;
    const Container = (props.containerComponent) ? props.containerComponent : View;
	return (
		<Container key={props.brickKey}>
		  {header}
		  {image}
		  {footer}
		</Container>
	);
}

// _getImageTag :: Image, Gutter -> ImageTag
export function _getImageTag (props, gutter = 0) {
	const imageProps = {
		key: props.uri,
		source: {
			uri: props.uri
		},
		data: {
			...props.data
		},
		resizeMethod: 'auto',
		style: {
            width: props.width - (props.imageWidthOffset || 0),
            height: props.height - (props.imageHeightOffset || 0),
			marginTop: gutter,
			...props.imageContainerStyle
		}
	};

	return (
		<Injector
		  defaultComponent={Image}
		  defaultProps={imageProps}
		  injectant={props.customImageComponent}
		  injectantProps={props.customImageProps} />
	);
}

// _getTouchableUnit :: Image, Number -> TouchableTag
export function _getTouchableUnit (image, gutter = 0) {
	return (
		<TouchableHighlight
          key={image.uri}
          onPress={() => image.onPress(image.data)}>
          <View>
            { _getImageTag(image, gutter) }
          </View>
		</TouchableHighlight>
	);
}
