import React, {Component} from 'react';
import {View, Text} from 'react-native';

export class Form extends Component {
  constructor(props) {
    super(props);
    this.refs={};
  }

  setRef = element => {
    console.log("element :",element.props);
    //this.textInput = element;
  };

  recursiveMap(children, fn,fnref) {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }
  
      if (child.props.children) {
        let merge = {
          children: this.recursiveMap(child.props.children, fn,fnref),
          ref: fnref
        };
       
        child = React.cloneElement(child,merge );
      }
  
      return fn(child);
    });
  }

  renderContent = () => {
    let {children} = this.props;
    if (!children) {
      return null;
    }
    return this.recursiveMap(children, (item,test) => {
      let { name } = item.props;
      if(name){
        this.refs[name] = {};
      }
      return item;
    },this.setRef);
  };

  render() {
    return <View>{this.renderContent()}</View>;
  }
}
