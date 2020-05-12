import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {styles} from './styles';

const VIEWABILITY_CONFIG = {
  minimumViewTime: 500,
  itemVisiblePercentThreshold: 30,
  waitForInteraction: true,
};

export class Picker extends Component {
  constructor(props) {
    super(props);
    let { label }= props;
    this.List = [
    //  {value: 'test1', label: 'test1'},
    { value : '' , label : label}
    ];
    this.FocusValue = {};
    this.state = {
      List:this.List
    };
  } 

  

  onViewableItemsChanged = ({viewableItems, changed}) => {
    let { onStartScroll ,onEndScroll} = this.props;
    let lastItem = viewableItems.length - 1;
    let lastIndexList = this.state.List.length - 1;
    if (viewableItems[lastItem]) {
      this.FocusValue = viewableItems[lastItem];
      this.scrollToItem(this.FocusValue.index);
      if(this.FocusValue.index == lastIndexList){
        if(typeof onEndScroll != "function"){
          onEndScroll = () => {};
        }
        onEndScroll();
      }
      if((this.FocusValue.index == 0 || this.FocusValue.index == 1) && this.FocusValue.item.value != ""){
        if(typeof onStartScroll != "function"){
          onStartScroll = () => {};
        }
        onStartScroll();
      }
      this.onChangeEventListener();
    }
  };

  focusValue(index){
    this.scrollToItem(index);
  }

  onChangeEventListener = () => {
    let { onChange } = this.props;
    if(typeof onChange != "function"){
      onChange = () => {};
    }
    onChange( this.FocusValue );
  }

  onSetList = async (List) => {
     return await new Promise((resolve) => {
        this.setState({
          List:List
        });
        resolve();
    });
   
  }

  getLastIndex(){
    return this.state.List.length;
  }

  getItemLayout = (data, index) => ({
    length: this.List.length,
    offset: 80 * index,
    index,
  });

  scrollToItem = (index) => {
    this._flatList.scrollToIndex({
      animated: true, //can also be false
      index: index,
    });
  };

  getValue = () => {
    if(this.FocusValue){
      return this.FocusValue;
    }
  };

  render() {
    return (
      <View style={styles.containerPicker}>
        <FlatList
          data={this.state.List}
          ref={(ref) => {
            this._flatList = ref;
          }}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={VIEWABILITY_CONFIG}
          keyExtractor={(item, index) => index}
          initialScrollIndex={0}  
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              this.scrollToItem(0);
            });
          }}
          renderItem={({item}) => (
            <View style={styles.row}>
              <Text style={styles.label}>{item.label}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}
