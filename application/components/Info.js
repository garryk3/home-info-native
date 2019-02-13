import React from 'react';
import { SectionList, Image, StyleSheet, Text, View, ScrollView, FlatList, Button, Alert } from 'react-native';
import { Constants } from 'expo';

import Switcher from './Switcher';

export default class Info extends React.Component {
	
	constructor() {
		super(...arguments);
		this.transport = this.props.transport;
		this.timer = null;
	}

	state = {
		info: null,
		error: null,
		logContent: null,
		waterHeaterContent: null,
		systemReboot: false
	}

	async componentDidMount() {
		await this._loadDomoticzInfo();
	}

	componentWillUnmount() {
		if(this.timer) {
			clearInterval(this.timer)
		}
	}


	_loadDomoticzInfo = () => {
		return this.transport.request('get', '/system/getVersion').then((res) => {
			const newState = {};

			if(res.error) {
				newState.error = res.error;
			} else {
				newState.info = res.result.response;

				if(this.state.systemReboot) {
					newState.systemReboot = false;
				}
			}
			this.setState(newState)
		}).catch(console.error)
	};

	_onPressLogBtn = () => {
		return this.transport.request('post', '/system/getlog').then((res) => {
			if(res.error) {
				this.setState({ error: res.error })
			} else {
				let content = [{message: 'Нет результатов!'}]

				if(res.result.response && res.result.response.result) {
					content = res.result.response.result;
				}
				this.setState({ logContent: content })
			}
		}).catch(console.error)
	};

	_onPressWaterHeaterBtn = () => {
		if(!this.state.waterHeaterContent) {
			return this.transport.request('get', '/content/getWaterHeaterInfo').then((res) => {
				if(res.error) {
					this.setState({ error: res.error })
				} else {
					this.setState({ waterHeaterContent: res.result.response })
				}
			}).catch(console.error)
		}
	};

	_watchWhenSystemWillActive = () => {
		this.timer && clearInterval(this.timer);

		this.timer = setInterval(() => {
			if(this.state.systemReboot) {
				this._loadDomoticzInfo();
			} else {
				clearInterval(this.timer);
			}
		}, 20000)
	}

	_rebootSystem = () => {
		return this.transport.request('get', '/system/reboot').then((res) => {
			this.setState({ systemReboot: true }) // При отправке команды ребут, запрос к Домотикзу отвалится по таймауту, но перезагрузка стартанет
			this._watchWhenSystemWillActive()
		}).catch(console.error)
	}

	_onPressReloadBtn = () => {
		Alert.alert(
			'Перезагрузка системы',
			'Вы уверены, что необходимо перезагрузить систему?',
			[
			  {text: 'Да',
			   onPress: this._rebootSystem},
			  {
				text: 'Нет',
				style: 'cancel',
			  },
			],
			{cancelable: false},
		  );
	}

	get infoData() {
		let result = [];

		if(this.state.info) {
			const { HaveUpdate, Revision, build_time, status, version } = this.state.info;
			const info = {
				status,
				version,
				haveUpdate: HaveUpdate,
				revision: Revision,
				buildTime: build_time
			};
			const infoArray = Object.entries(info);

			if(infoArray.length) {
				result = infoArray.map((item) => ({
					data: [{
						value: item[1] + ''
					}],
					title: item[0]
				}))
			}
		}

		return result;
	}

	get _renderWaterHeaterContent() {
		if(this.state.waterHeaterContent) {
			return (
				<FlatList
					data={this.state.waterHeaterContent}
					keyExtractor={(item, index) => `$key-${index}`}
					renderItem={({item, index}) => (
						<View key={index}>
							<Text>{item.title}</Text>
							{Array.isArray(item.data) && item.data.map((subitem, index) => (
								<Text key={`value-${index}`}>{subitem.value}</Text>
							))}
						</View>
					)}
				/>
			)
		}
	}

	get _renderWaterHeaterInfo() {
		return <Switcher
			btnText='Время работы бойлера'
			renderContent={this._renderWaterHeaterContent}
			onPress={this._onPressWaterHeaterBtn}
		/>
	}

	get _renderLogContent() {
		if(this.state.logContent) {
			return (
				<ScrollView style={styles.logWrapper}>
					{this.state.logContent.map((item, index) => (
						<Text key={`log-${index}`}>
							{item.level && `Level ${item.level}: `}{item.message}
						</Text>
					))}
				</ScrollView>
			)
		}
	}

	get _renderLogInfo() {
		return <Switcher 
			btnText='Журнал системы'
			renderContent={this._renderLogContent}
			onPress={this._onPressLogBtn}
		/>
	}

	get _renderRebootBtn() {
		return <Button
			title='Перезагрузить систему'
			onPress={this._onPressReloadBtn}
		/>
	}

	get _renderRebootInfo() {
		if(this.state.systemReboot) {
			return (
				<View style={styles.infoContainer}>
					<Text>Система перезагружается. Это может занять около минуты!</Text>
				</View>
			)
		}
	}

	render() {
		return (
			<React.Fragment>
				<SectionList
					style={styles.container}
					renderItem={this._renderItem}
					renderSectionHeader={this._renderSectionHeader}
					stickySectionHeadersEnabled={true}
					keyExtractor={(item, index) => index}
					ListHeaderComponent={ListHeader}
					sections={this.infoData}
				/>
				{this._renderWaterHeaterInfo}
				{this._renderLogInfo}
				{this._renderRebootBtn}
				{this._renderRebootInfo}
			</React.Fragment>
		);
	}

	_renderSectionHeader = ({ section }) => {
		return <SectionHeader title={section.title} />;
	};

	_renderItem = ({ item }) => {
		if (item.type === 'color') {
			return (
				<SectionContent>
					{item.value && <Color value={item.value} />}
				</SectionContent>
			);
		} else {
			return (
				<SectionContent>
					<Text style={styles.sectionContentText}>
						{item.value}
					</Text>
				</SectionContent>
			);
		}
	};
}

const ListHeader = () => {
	return (
		<View style={styles.titleContainer}>
			<View style={styles.titleIconContainer}>
				<Image
					source={require('./../assets/images/domoticz.png')}
					style={{ width: 64, height: 64 }}
					resizeMode="cover"
				/>
			</View>

			<View style={styles.titleTextContainer}>
				<Text style={styles.nameText} numberOfLines={1}>
					Domoticz
				</Text>

				<Text style={styles.slugText} numberOfLines={1}>
					Система умного дома
				</Text>
			</View>
		</View>
	);
};

const SectionHeader = ({ title }) => {
	return (
		<View style={styles.sectionHeaderContainer}>
			<Text style={styles.sectionHeaderText}>
				{title}
			</Text>
		</View>
	);
};

const SectionContent = props => {
	return (
		<View style={styles.sectionContentContainer}>
			{props.children}
		</View>
	);
};

const Color = ({ value }) => {
	if (!value) {
		return <View />;
	} else {
		return (
			<View style={styles.colorContainer}>
				<View style={[styles.colorPreview, { backgroundColor: value }]} />
				<View style={styles.colorTextContainer}>
					<Text style={styles.sectionContentText}>
						{value}
					</Text>
				</View>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	wrapper: {
		paddingTop: 18
	},
	header: {
		marginTop: 18,
		fontWeight: '700',
		fontSize: 24,
		textAlign: 'center'
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	titleContainer: {
		paddingHorizontal: 15,
		paddingTop: 15,
		paddingBottom: 15,
		flexDirection: 'row',
	},
	titleIconContainer: {
		marginRight: 15,
		paddingTop: 2,
	},
	sectionHeaderContainer: {
		backgroundColor: '#fbfbfb',
		paddingVertical: 8,
		paddingHorizontal: 15,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: '#ededed',
	},
	sectionHeaderText: {
		fontSize: 14,
	},
	sectionContentContainer: {
		paddingTop: 8,
		paddingBottom: 12,
		paddingHorizontal: 15,
	},
	sectionContentText: {
		color: '#808080',
		fontSize: 14,
	},
	nameText: {
		fontWeight: '600',
		fontSize: 18,
	},
	slugText: {
		color: '#a39f9f',
		fontSize: 14,
		backgroundColor: 'transparent',
	},
	descriptionText: {
		fontSize: 14,
		marginTop: 6,
		color: '#4d4d4d',
	},
	colorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	colorPreview: {
		width: 17,
		height: 17,
		borderRadius: 2,
		marginRight: 6,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: '#ccc',
	},
	colorTextContainer: {
		flex: 1,
	},
	logWrapper: {
		height: 500
	},
	infoContainer: {
		zIndex: 10,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 24,
		color: '#fff',
		backgroundColor: 'rgba(0,0,0,0.5)'
	}
});
