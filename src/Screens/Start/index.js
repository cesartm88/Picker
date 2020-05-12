import React from 'react';
import {Text, View, TouchableWithoutFeedback, FlatList} from 'react-native';
import {Window} from '../../Class/Window';
import {styles} from './styles';
import {Picker, Form} from '../../Components/Forms';
import {SafeView} from '../../Components/SafeView';
import {Calendar} from '../../Class/Calendar';
import {connect} from 'react-redux';
import {saveOrder} from '../../Redux/Actions/Orders';
import {isEmpty} from '../../Libs/Utils';
import moment from 'moment';

export class _Start extends Window {
  constructor(props) {
    super(props);
    this.pickerMonth = React.createRef();
    this.pickerDay = React.createRef();
    this.pickerHour = React.createRef();
    this.ObjCalendar = new Calendar();
    this.currentYear = this.ObjCalendar.getFocusYear();
    this.state = {
      hourChangeEvent: false,
    };
  }

  componentDidMount() {
    this.pickerMonth.current.onSetList(this.ObjCalendar.getMonths());
    //this.pickerMonth.getValue();
  }

  changeMonth(Value) {
    let focusMonth = Value.item.value;
    let daysInMonth = this.ObjCalendar.getDaysArrayByMonth(focusMonth);
    this.pickerDay.current.onSetList(daysInMonth);
  }

  changeDay(day) {
    console.log({day});
    let lastIndex = this.pickerDay.current.getLastIndex();
    let Hour = this.ObjCalendar.getHours();
    this.pickerHour.current.onSetList(Hour).then(() => {
      this.pickerHour.current.focusValue(6);
    });
  }

  endDayScroll() {
    let day = this.pickerDay.current.getValue();
    let lastIndex = this.pickerDay.current.getLastIndex();
    if (day.index > 0 && day.index < lastIndex) {
      let nextDay = day.index + 1;
      this.pickerDay.current.focusValue(nextDay);
    }
  }

  startDayScroll() {
    let day = this.pickerDay.current.getValue();
    if (day.index > 0) {
      let dayBefore = day.index - 1;
      this.pickerDay.current.focusValue(dayBefore);
    }
  }

  onSave() {
    let selectDay = this.pickerDay.current.getValue();
    let selectHour = this.pickerHour.current.getValue();
    let formatDate = '';
    if (!isEmpty(selectDay) && !isEmpty(selectHour)) {
      formatDate = `${selectDay.item.value} ${selectHour.item.value}`;
    } else if (!isEmpty(selectDay)) {
      formatDate = `${selectDay.item.value} 07:00`;
    }
    let selectedDate = moment(formatDate, 'YYYY-MM-DD HH:mm');
    let limiteDate = moment().add(30, 'days');
    if (!isEmpty(selectedDate)) {
      let dif = limiteDate.diff(selectedDate, 'days');
      console.log(
        {dif},
        limiteDate.format('YYYY-MM-DD'),
        selectedDate.format('YYYY-MM-DD'),
      );
      if (dif >= 0) {
        this.props.saveOrder({
          selectedDate: moment(selectedDate).format('DD/MM/YYYY HH:ss'),
        });
      } else {
        alert('solamente se pueden agendar pedidos de 30 dias limite');
      }
    } else {
      alert('falta seleccionar campos');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeView style={[styles.sfView]}>
          <View>
            <View style={styles.ViewTextArea}>
              <View style={styles.TextPlace}>
                <Text style={styles.TextStyle}>Año: {this.currentYear}</Text>
              </View>
            </View>

            <Picker
              name="month"
              ref={this.pickerMonth}
              onChange={this.changeMonth.bind(this)}
            />
            <Picker
              name="Day"
              label={'selecciona un día'}
              ref={this.pickerDay}
              onChange={this.changeDay.bind(this)}
            />
            <Picker
              name="Hour"
              label={'selecciona una hora'}
              ref={this.pickerHour}
              onStartScroll={this.startDayScroll.bind(this)}
              onEndScroll={this.endDayScroll.bind(this)}
            />

            <View style={styles.btnSave}>
              <View style={styles.TextPlace}>
                <TouchableWithoutFeedback onPress={this.onSave.bind(this)}>
                  <Text style={styles.TextSave}>Guardar</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
          <FlatList
          style={styles.list}
            data={this.props.Orders}
            keyExtractor={(item,id)=> id.toString()}
            renderItem={({item}) => (

              <View style={styles.row}>
                <View style={styles.rowPlace}>
                  <Text style={styles.label}>Pedido para la fecha :</Text>
                  <Text style={styles.label}>{item.date}</Text>
                </View>
              </View>
            )}
          />
        </SafeView>
      </View>
    );
  }
}

const mapStateToProps = ({Orders}) => {
  console.log({Orders});
  return {
    Orders,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    saveOrder: (data) => dispatch(saveOrder(data)),
  };
};

// Exports
const Start = connect(mapStateToProps, mapDispatchToProps)(_Start);

export {Start};
