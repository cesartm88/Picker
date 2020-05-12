import React from 'react';
import moment from 'moment';

export class Calendar {

  constructor() {
    this.FocusHour = "";
    this.FocusYear = '';
    this.FocusMonth = 0;
    this.FocusDay = 1;
    this.Months = [
      {label:'Selecciona un mes',value:''},
      {label:'Enero'     ,value:1},
      {label:'Febrero'   ,value:2},
      {label:'Marzo'     ,value:3},
      {label:'Abril'     ,value:4},
      {label:'Mayo'      ,value:5},
      {label:'Junio'     ,value:6},
      {label:'Julio'     ,value:7},
      {label:'Agosto'    ,value:8},
      {label:'Septiembre',value:9 },
      {label:'Octubre'   ,value:10},
      {label:'Noviembre' ,value:11},
      {label:'Diciembre' ,value:12}
    ];
    this.Days = [];
    this.Hours = [
      {label : '01:00' ,value:'01:00'},
      {label : '02:00' ,value:'02:00'},
      {label : '03:00' ,value:'03:00'},
      {label : '04:00' ,value:'04:00'},
      {label : '05:00' ,value:'05:00'},
      {label : '06:00' ,value:'06:00'},
      {label : '07:00' ,value:'07:00'},
      {label : '08:00' ,value:'08:00'},
      {label : '09:00' ,value:'09:00'},
      {label : '10:00' ,value:'10:00'},
      {label : '11:00' ,value:'11:00'},
      {label : '12:00' ,value:'12:00'},
      {label : '13:00' ,value:'13:00'},
      {label : '14:00' ,value:'14:00'},
      {label : '15:00' ,value:'15:00'},
      {label : '16:00' ,value:'16:00'},
      {label : '17:00' ,value:'17:00'},
      {label : '18:00' ,value:'18:00'},
      {label : '19:00' ,value:'19:00'},
      {label : '20:00' ,value:'20:00'},
      {label : '21:00' ,value:'21:00'},
      {label : '22:00' ,value:'22:00'},
      {label : '23:00' ,value:'23:00'},
      {label : '24:00' ,value:'24:00'},
    ];
  }

  getFocusYear = () => {
    this.FocusYear = moment().format('YYYY');
    return this.FocusYear;
  };

  getMonths = () => {
    return this.Months;
  }

  getHours = () => {
    return this.Hours;
  }


  getDaysArrayByMonth = (month) => {
    let formatDate = `${moment().format('YYYY')}-${month}`;
    let dateConfig = moment(formatDate,'YYYY/MM');
    var daysInMonth = dateConfig.daysInMonth();
    var arrDays = [
      {label:'Selecciona un dia',value:''},
    ];
  
    for (let index = 1; index <= daysInMonth; index++) {
      var current ={ value:dateConfig.date(index).format('YYYY-MM-DD'),label:dateConfig.date(index).format('DD/MM/YYYY')};
      arrDays.push(current);
    }
  
    return arrDays;
  }

  addADay(value){
    return moment(value,'YYYY-MM-DD').add(1,'days');
  }

  subtractADay(value){
    return moment(value,'YYYY-MM-DD').subtract(1,'days');
  }



  setFocusYear = (Year) => {
    this.FocusYear = Year;
  };

  getFocusHour = () => {
    return this.FocusHour;
  };

  setFocusHour = (Hour) => {
    this.FocusHour = Hour;
  };

  getFocusMonth = () => {
    return this.FocusMonth;
  };

  setFocusMonth = (Month) => {
    this.FocusMonth = Month;
  };

  getFocusDay = () => {
    return this.FocusDay;
  };

  setFocusDay = (Day) => {
    this.FocusDay = Day;
  };

  setConfigMonths = (Month) => {

  }
}

export default Calendar;
