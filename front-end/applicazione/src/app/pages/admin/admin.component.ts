import { Component} from '@angular/core';
import { AdminService } from './admin.service';
import { IUser } from 'src/app/interfaces/IUser';
import { AuthService } from '../auth/auth.service';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  orders!:any[];
  numero!:number

  constructor (private homeSvc:HomeService){}


  calculateTotal(): number {
    return this.orders.reduce((total, order) => total + order.totalPrice, 0);
  }

  ngOnInit(){
    this.homeSvc.getAllOrders().subscribe(res=>{
      console.log(res);
      this.orders = res
      this.numero = res.length
      console.log(this.numero);
    })
  }

  ngAfterViewInit(){
     this.getOrdersAndCreateGraph()
  }

  getOrdersAndCreateGraph(){
    this.homeSvc.getAllOrders().subscribe(res=>{

      this.orders = res
    this.creaGrafico()
    })
  }


  creaGrafico(){
    /* Chart code */

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
let root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
let chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX"
}));


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "zoomX"
}));
cursor.lineY.set("visible", false);

 let date = new Date();
date.setHours(0, 0, 0, 0);
let value = 100;


let dataPoints:any[] = [];
    const generateData = () => {
      let currentDate:Date ; // Variabile per tenere traccia della data corrente
  let accumulatedValue = 0;
  this.orders.forEach((element) => {
    const datoVecchio = element.orderDate.split('-');
    const year = parseInt(datoVecchio[0], 10); // Estrai l'anno e convertilo in un numero intero
    const month = parseInt(datoVecchio[1], 10) - 1; // Estrai il mese e sottrai 1 perché i mesi in JavaScript sono 0-based (0 = gennaio, 1 = febbraio, ecc.)
    const day = parseInt(datoVecchio[2], 10); // Estrai il giorno


     date = new Date(year, month, day);
     if (currentDate && date.getTime() === currentDate.getTime()) {
      // Se la data è la stessa di quella precedente, accumula il valore
      accumulatedValue += element.totalPrice;
    } else {
      // Se la data è diversa, crea un nuovo punto dati e reimposta l'accumulatore
      accumulatedValue = element.totalPrice;
      currentDate = date;
    }

    dataPoints.push({
      date: date.getTime(),
      value: accumulatedValue,
    });
  });

  return dataPoints;
}



// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0,
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance: 60
  }),
  tooltip: am5.Tooltip.new(root, {})
}));

let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
let series = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}"
  })
}));
series.columns.template.set("fill", am5.color("#f9af23"));

// Puoi anche impostare il colore del bordo delle colonne se necessario
series.columns.template.set("stroke", am5.color("#181818"));
series.columns.template.set("strokeOpacity", 1); // Opzionale: imposta l'opacità del bordo
series.columns.template.setAll({ strokeOpacity: 0 })


// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

//let data = generateDatas(this.numero);
generateData()
series.data.setAll(dataPoints);
console.log(dataPoints);





// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000,100);
chart.appear(1000, 100);
}
}
