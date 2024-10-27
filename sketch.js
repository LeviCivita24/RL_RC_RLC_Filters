class Circuit {
  constructor(name="canvas", ix=50, iy=50) {
    this.canvas = document.getElementById(name);
    this.ctx = canvas.getContext("2d");
    this.d = 0;
    this.ix = ix;
    this.iy = iy;
    this.cx = ix;
    this.cy = iy;
    this.dx = 1;
    this.dy = 0;
    this.px = 0;
    this.py = 0;
    this.pd = 0;
    this.pdx = 0;
    this.pdy = 0;
    this.ctx.beginPath();
    this.ctx.moveTo(this.cx, this.cy);
  }
  start(ix=10, iy=10) {
    this.d = 0;
    this.ix = ix;
    this.iy = iy;
    this.cx = ix;
    this.cy = iy;
    this.dx = 1;
    this.dy = 0;
    this.px = 0;
    this.py = 0;
    this.pd = 0;
    this.pdx = 0;
    this.pdy = 0;
    this.ctx.beginPath();
    this.ctx.moveTo(this.cx, this.cy);
  }
  
  finish(close=true) {
    if (close) {
      this.ctx.lineTo(this.ix, this.iy);
    }
    this.ctx.stroke();
  }
  
  save() {
    this.px = this.cx;
    this.py = this.cy;
    this.pd = this.d;
    this.pdx = this.dx;
    this.pdy = this.dy;
  }
  
  restore() {
    this.cx = this.px;
    this.cy = this.py;
    this.d = this.pd;
    this.dx = this.pdx;
    this.dy = this.pdy;
    this.ctx.moveTo(this.cx, this.cy);
  }
  
  newelement(len=50) {
    this.ctx.save();
    this.ctx.translate(this.cx, this.cy);
    this.ctx.rotate(this.d*Math.PI/2);
    if (this.dx < -0.5 ) {
      this.ctx.rotate(Math.PI);
      this.ctx.translate(-len, 0);
    }
    this.ctx.moveTo(0,0);
  }
  
  endelement(len=50) {
    this.ctx.restore();
    this.cx += this.dx * len;
    this.cy += this.dy * len;
    this.ctx.moveTo(this.cx,this.cy);
  }
  
  wire(len=50) {
    this.newelement(len);
 		this.ctx.lineTo(len,0);
    this.endelement(len);
  }

  wire_y(len=50) {
    this.newelement(len);
 		this.cty.lineTo(len,0);
    this.endelement(len);
  }
  
  drawWire(len=50) {
    this.cx += this.dx * len;
    this.cy += this.dy * len;
    this.ctx.lineTo(this.cx, this.cy);
  }

  verticalWire(len=50){
    //this.ctx.beginPath();
    this.d = 2;
    this.newelement(len);
    this.ctx.lineTo(0,len);
    this.ctx.lineTo(-len*5,len);
    this.d = 1;
    this.ctx.lineTo(-5*len,0);
    this.endelement(len);
  }
  
  drawPower(len=50, n=2, label="") {
    var space = 5;
    var wl = (len - (2*n-1)*space)/2;
    this.drawWire(wl);

    // Desde aca -- Pablo
    this.ctx.save();

    if(label){
    this.ctx.lineWidth = 0.7;
    this.ctx.strokeText(label, this.cx + 30 * this.dy, this.cy + 30 * this.dx);
    }

    this.ctx.restore();
    // Hasta aca 

    while (n--) {
        this.ctx.moveTo(this.cx + 15 * this.dy, this.cy + 15 * this.dx);
        this.ctx.lineTo(this.cx - 15 * this.dy, this.cy - 15 * this.dx);
        this.cx += this.dx * space;
        this.cy += this.dy * space;
        this.ctx.moveTo(this.cx + 2*space * this.dy, this.cy + 2*space * this.dx);
        this.ctx.lineTo(this.cx - 2*space * this.dy, this.cy - 2*space * this.dx);
        if (n != 0) {
            this.cx += this.dx * space;
            this.cy += this.dy * space;
        }
    }
    this.ctx.moveTo(this.cx, this.cy);
    this.drawWire(wl);
  }
  
  drawCapacitor(len=50, label="") {
    var space=5;
    var cl = (len-space)/2;
    this.ctx.save();

    if(label){
    this.ctx.lineWidth = 0.7;
    this.ctx.strokeText(label, this.cx + 30 * this.dy, this.cy + 30 * this.dx);
    }

    this.ctx.restore();
    this.drawWire(cl);
    this.ctx.fillText(label, this.cx + 20 * this.dy, this.cy + 20 * this.dx )
    this.ctx.moveTo(this.cx + 10 * this.dy, this.cy + 10 * this.dx);
    this.ctx.lineTo(this.cx - 10 * this.dy, this.cy - 10 * this.dx);
    this.cx += this.dx * space;
    this.cy += this.dy * space;
    this.ctx.moveTo(this.cx + 10 * this.dy, this.cy + 10 * this.dx);
    this.ctx.lineTo(this.cx - 10 * this.dy, this.cy - 10 * this.dx);
    this.ctx.moveTo(this.cx, this.cy);
    this.drawWire(cl);
  }

  inductor(len=50, n=4, label="") {
    var xs, ys;
    this.ctx.save();

    if(label){
    this.ctx.lineWidth = 0.7;
    this.ctx.strokeText(label, this.cx + 30 * this.dy, this.cy + 30 * this.dx);
    }

    this.ctx.restore();
    xs = 1;
    ys = 2;
    var space = 6;
    var wl = (len-(n+1)*space)/2;
    this.newelement(len);
    this.ctx.lineTo(wl, 0);
    this.ctx.fillText(label, wl, 25);
    this.ctx.scale(xs, ys);
    while (n--) {
        this.ctx.moveTo(wl+space*(n+2), 0);
        this.ctx.arc(wl+space*(n+1), 0, space, 0, Math.PI, 1);
        this.ctx.moveTo(wl+space*(n), 0);
        if (n>0) {
          this.ctx.arc(wl+space*(n+1/2), 0, space/2, Math.PI,0, 1);
        }
    }
    this.ctx.scale(1/xs, 1/ys);
    this.ctx.moveTo(len-wl,0);
    this.ctx.lineTo(len,0);
    this.endelement(len);
}

  resistor(len=50, n=5, style=1, label="") {
    var size = 5;
    var wl = (len-(n+1)*size)/2;
    this.ctx.save();

    if(label){
    this.ctx.lineWidth = 0.7;
    this.ctx.strokeText(label, this.cx + 30 * this.dy, this.cy + 30 * this.dx);
    }

    this.ctx.restore();
    this.newelement(len);
    this.ctx.lineTo(wl,0);
    this.ctx.fillText(label, wl, size+15);
		if (style == 1) {
      var x = wl+size;
      var y = -size;
      while (n--) {
        this.ctx.lineTo(x,y);
        this.ctx.lineTo(x,y+2*size);
        x += size;
      }
      this.ctx.lineTo(len-wl, 0);
    } else {
      this.ctx.rect(wl,-size, size*(n+1), 2*size);
    }
    this.ctx.moveTo(len-wl, 0);
    this.ctx.lineTo(len,0);
		this.endelement(len);
  }
}

// Variables para los campos de entrada
// RL
let sel;
let VpInput;
let RInput;
let lInput;
// RC
let VpInputc;
let RInputc;
let cInputc;
// RL
let plot;
let plot2;
let plot3;
// RC
let plotc;
let plot2c;
let plot3c;
//RLC
let VpInputl;
let RInputl;
let lInputl;
let cInputl;
// RLC
let plotl;

// Variables para el RL
let currentIndex = 0; // Variable para rastrear el índice actual
let points = []; // Almacena los puntos para la primera gráfica
let points2 = []; // Almacena los puntos para la segunda gráfica
let points3 = []; // Almacena los puntos para la tercera gráfica
let dataf1 = [];
let dataf2 = [];
let dataf3 = [];

// Variables para el RC
let currentIndexc = 0; // Variable para rastrear el índice actual
let pointsc = []; // Almacena los puntos para la primera gráfica
let points2c = []; // Almacena los puntos para la segunda gráfica
let points3c = []; // Almacena los puntos para la tercera gráfica
let dataf1c = [];
let dataf2c = [];
let dataf3c = [];

// Variables para el RLC
let currentIndexl = 0; // Variable para rastrear el índice actual
let pointsl = []; // Almacena los puntos para la primera gráfica
let dataf1l = [];

let circuitoRLActivado = false; 
let circuitoRCActivado = false; 
let circuitoRCLActivado = false; 

var cc = new Circuit("canvas",1850, 750);
cc.ctx.lineWidth = 2;
//let VerifyPressMouse = false; 
let CheckBox_1;
let CheckBox_2;
let CheckBox_3; 
// RL
let submitButtonVp;
let submitButtonR;
let submitButtonl;
let submitButtonSavef1;
let submitButtonSavef2;
let submitButtonSavef3;
// RC
let submitButtonVpc; 
let submitButtonRc; 
let submitButtonc; 
let submitButtonSavef1c; 
let submitButtonSavef2c; 
let submitButtonSavef3c; 
// RLC
let submitButtonVpl;
let submitButtonRl;
let submitButtonrlc;
let submitButtoncl;
let submitButtonSavef1l;



function setup() {
  createCanvas(1500, 750);
  background(255);
  
  CheckBox_1 = createCheckbox("Circuito RC", false);
  CheckBox_1.position(5,25);
  CheckBox_1.style('font-family', 'Georgia');
  CheckBox_1.style('font-size', '20px'); 
  CheckBox_1.changed(RC);
  CheckBox_2 = createCheckbox("Circuito RL", false);
  CheckBox_2.position(5,45);
  CheckBox_2.style('font-family', 'Georgia');
  CheckBox_2.style('font-size', '20px'); 
  CheckBox_2.changed(RL);
  CheckBox_3 = createCheckbox("Circuito RLC", false);
  CheckBox_3.position(5,65); 
  CheckBox_3.style('font-family', 'Georgia');
  CheckBox_3.style('font-size', '20px');
  CheckBox_3.changed(RLC);



  push();
  textSize(20); 
  textAlign(16); 
  fill(0);
  textFont('Georgia'); 
  //text("", 900, 40);
  text("1. Seleccione el tipo de circuito.", 900, 50);
  text("2. Ingrese los valores.", 900, 70);
  text("3. Seleccione las unidades.", 900, 90);
  text("4. Descargue los datos.", 900, 110);
  pop();
  

  // Crear campos de entrada para Vp, R , l y c

  VpInput = createInput();
  VpInput.position(200, 350);
  VpInput.hide();

  VpInputc = createInput();
  VpInputc.position(200, 350);
  VpInputc.hide();

  RInput = createInput();
  RInput.position(700, 350);
  RInput.hide();

  RInputc = createInput();
  RInputc.position(700, 350);
  RInputc.hide();

  lInput = createInput();
  lInput.position(1200, 350);
  lInput.hide();

  cInputc = createInput();
  cInputc.position(1200, 350);
  cInputc.hide();

  VpInputl = createInput();
  VpInputl.position(200, 350);
  VpInputl.hide();

  RInputl = createInput();
  RInputl.position(200, 450);
  RInputl.hide();

  lInputl = createInput();
  lInputl.position(200, 550);
  lInputl.hide();

  cInputl = createInput();
  cInputl.position(200, 650);
  cInputl.hide();

  

  // Crear botones para cargar los valores
  //submitButtonVp = createButton('Cargar Vp (V)');
  // RL
  submitButtonVp = createSelect('Cargar Vp (V)');
  submitButtonVp.style('font-family', 'Georgia');
  submitButtonVp.position(350, 350);
  submitButtonVp.option('Cargar Vp (mV)');
  submitButtonVp.option('Cargar Vp (V)');
  submitButtonVp.selected('mV');
  submitButtonVp.mousePressed(cargarVp);
  submitButtonVp.hide();

  submitButtonR = createSelect('Cargar R (Ohm)');
  submitButtonR.style('font-family', 'Georgia');
  submitButtonR.position(850, 350);
  submitButtonR.option('Cargar R (mili Ohm)');
  submitButtonR.option('Cargar R (kilo Ohm)');
  submitButtonR.mousePressed(cargarR);
  submitButtonR.hide();

  submitButtonl = createSelect('Cargar l (H)');
  submitButtonl.style('font-family', 'Georgia');
  submitButtonl.position(1350, 350);
  submitButtonl.option('Cargar l (mili H)');
  submitButtonl.option('Cargar l (micro H)');
  submitButtonl.mousePressed(cargarl);
  submitButtonl.hide();


  // RC
  submitButtonVpc = createSelect('Cargar Vp (V)');
  submitButtonVpc.style('font-family', 'Georgia');
  submitButtonVpc.position(350, 350);
  submitButtonVpc.option('Cargar Vp (mV)');
  submitButtonVpc.option('Cargar Vp (V)');
  submitButtonVpc.mousePressed(cargarVpc); // Falta funcion
  submitButtonVpc.hide();

  submitButtonRc = createSelect('Cargar R (Ohm)');
  submitButtonRc.style('font-family', 'Georgia');
  submitButtonRc.position(850, 350);
  submitButtonRc.option('Cargar R (mili Ohm)');
  submitButtonRc.option('Cargar R (kilo Ohm)');
  submitButtonRc.mousePressed(cargarRc); // Falta funcion
  submitButtonRc.hide();
  
  submitButtonc = createSelect('Cargar c (F)');
  submitButtonc.style('font-family', 'Georgia');
  submitButtonc.position(1350, 350);
  submitButtonc.option('Cargar c (mili F)');
  submitButtonc.option('Cargar c (micro F)');
  submitButtonc.mousePressed(cargarc); // Falta funcion
  submitButtonc.hide();

  // RLC

  submitButtonVpl = createSelect('Cargar Vp (V)');
  submitButtonVpl.style('font-family', 'Georgia');
  submitButtonVpl.position(350, 350);
  submitButtonVpl.option('Cargar Vp (mV)');
  submitButtonVpl.option('Cargar Vp (V)');
  submitButtonVpl.mousePressed(cargarVpl);
  submitButtonVpl.hide();

  submitButtonRl = createSelect('Cargar R (Ohm)');
  submitButtonRl.style('font-family', 'Georgia');
  submitButtonRl.position(350, 450);
  submitButtonRl.option('Cargar R (mili Ohm)');
  submitButtonRl.option('Cargar R (kilo Ohm)');
  submitButtonRl.mousePressed(cargarRl);
  submitButtonRl.hide();

  submitButtonrlc = createSelect('Cargar l (H)');
  submitButtonrlc.style('font-family', 'Georgia');
  submitButtonrlc.position(350, 550);
  submitButtonrlc.option('Cargar l (mili H)');
  submitButtonrlc.option('Cargar l (micro H)');
  submitButtonrlc.mousePressed(cargarll);
  submitButtonrlc.hide();
  
  submitButtoncl = createSelect('Cargar c (F)');
  submitButtoncl.style('font-family', 'Georgia');
  submitButtoncl.position(350, 650);
  submitButtoncl.option('Cargar c (mili F)');
  submitButtoncl.option('Cargar c (micro F)');
  submitButtoncl.mousePressed(cargarcl);
  submitButtoncl.hide();

  // SAVE

  submitButtonSavef1 = createButton('Guardar Datos f1');
  submitButtonSavef1.style('font-family', 'Georgia');
  submitButtonSavef1.position(100, 575);
  submitButtonSavef1.mousePressed(guardarDatosf1);
  submitButtonSavef1.hide();

  submitButtonSavef1c = createButton('Guardar Datos f1');
  submitButtonSavef1c.style('font-family', 'Georgia');
  submitButtonSavef1c.position(100, 575);
  submitButtonSavef1c.mousePressed(guardarDatosf1c); // Falta funcion
  submitButtonSavef1c.hide();

  submitButtonSavef2 = createButton('Guardar Datos f2');
  submitButtonSavef2.style('font-family', 'Georgia');
  submitButtonSavef2.position(600, 575);
  submitButtonSavef2.mousePressed(guardarDatosf2);
  submitButtonSavef2.hide();

  submitButtonSavef2c = createButton('Guardar Datos f2');
  submitButtonSavef2c.style('font-family', 'Georgia');
  submitButtonSavef2c.position(600, 575);
  submitButtonSavef2c.mousePressed(guardarDatosf2c); // Falta funcion
  submitButtonSavef2c.hide();

  submitButtonSavef3 = createButton('Guardar Datos f3');
  submitButtonSavef3.style('font-family', 'Georgia');
  submitButtonSavef3.position(1100, 575);
  submitButtonSavef3.mousePressed(guardarDatosf3);
  submitButtonSavef3.hide();

  submitButtonSavef3c = createButton('Guardar Datos f3');
  submitButtonSavef3c.style('font-family', 'Georgia');
  submitButtonSavef3c.position(1100, 575);
  submitButtonSavef3c.mousePressed(guardarDatosf3c); // Falta funcion
  submitButtonSavef3c.hide();
  //RLC
  submitButtonSavef1l = createButton('Guardar Datos');
  submitButtonSavef1l.style('font-family', 'Georgia');
  submitButtonSavef1l.position(720, 625);
  submitButtonSavef1l.mousePressed(guardarDatosf1l);
  submitButtonSavef1l.hide();

  
  
  // Crear las gráficas, pero sin establecer puntos
  // RL
  plot = new GPlot(this);
  plot.setPos(25, 300);
  plot.getXAxis().setAxisLabelText("w");
  plot.getYAxis().setAxisLabelText("Ip");
  plot.setTitleText("");

  
  plot2 = new GPlot(this);
  plot2.setPos(525, 300);
  plot2.getXAxis().setAxisLabelText("w");
  plot2.getYAxis().setAxisLabelText("VR");
  plot2.setTitleText("");

  
  plot3 = new GPlot(this);
  plot3.setPos(1025, 300);
  plot3.getXAxis().setAxisLabelText("w");
  plot3.getYAxis().setAxisLabelText("VL");
  plot3.setTitleText();
  // RC
  plotc = new GPlot(this);
  plotc.setPos(25, 300);
  plotc.getXAxis().setAxisLabelText("w");
  plotc.getYAxis().setAxisLabelText("Ip");
  plotc.setTitleText("");

  plot2c = new GPlot(this);
  plot2c.setPos(525, 300);
  plot2c.getXAxis().setAxisLabelText("w");
  plot2c.getYAxis().setAxisLabelText("VR");
  plot2c.setTitleText("");

  plot3c = new GPlot(this);
  plot3c.setPos(1025, 300);
  plot3c.getXAxis().setAxisLabelText("w");
  plot3c.getYAxis().setAxisLabelText("VC");
  plot3c.setTitleText();
  //RLC
  plotl = new GPlot(this);
  plotl.setPos(650, 350);
  plotl.getXAxis().setAxisLabelText("w");
  plotl.getYAxis().setAxisLabelText("Ip");
  plotl.setTitleText("");

  
}

let clickCountVp = 0; 
let clickCountR = 0; 
let clickCountl = 0; 
// RL
function cargarVp(){
  clickCountVp++;
  if (clickCountVp == 2){
    let selectedOption = submitButtonVp.value();
    if (selectedOption === 'Cargar Vp (mV)'){
      Vp = parseFloat(VpInput.value()*0.001);
    } 
    else if (selectedOption === 'Cargar Vp (V)'){
      Vp = parseFloat(VpInput.value());
    }
    calcularY();
    clickCountVp = 0; 
  }
}
function cargarR(){
  clickCountR++; 
  if(clickCountR == 2){
    let selectedOption = submitButtonR.value();
    if (selectedOption === 'Cargar R (mili Ohm)'){
      R = parseFloat(RInput.value()*0.001);
    } else if (selectedOption ==='Cargar R (kilo Ohm)'){
      R = parseFloat(RInput.value()*1000);
    }  
    calcularY();
    clickCountR = 0; 
  }
}

function cargarl(){
  clickCountl++; 
  if (clickCountl==2){
    let selectedOption = submitButtonl.value();
    if (selectedOption === 'Cargar l (mili H)'){
      l = parseFloat(lInput.value()*0.001);
    } else if (selectedOption === 'Cargar l (micro H)'){
      l = parseFloat(lInput.value()*0.000001);
    }
    calcularY();
    clickCountl = 0; 
  }
}



let clickCountVp_1 = 0; 
let clickCountR_1 = 0; 
let clickCountc_1 = 0; 
// RC
function cargarVpc() {
  clickCountVp_1++; 
  if (clickCountVp_1 ==2){
    let selectedOption = submitButtonVpc.value();
    if (selectedOption === 'Cargar Vp (mV)') {
      Vp = parseFloat(VpInputc.value()* 0.001) ;
      
    } else if (selectedOption === 'Cargar Vp (V)') {
      Vp = parseFloat(VpInputc.value()) ;
      
    }
    calcularYc();
    clickCountVp_1=0; 

  }
  
  
}
function cargarRc() {
  clickCountR_1++; 
  if (clickCountR_1 == 2){
    let selectedOption = submitButtonRc.value();
    if (selectedOption === 'Cargar R (mili Ohm)') {
      R = parseFloat(RInputc.value()* 0.001) ;
      
    } else if (selectedOption === 'Cargar R (kilo Ohm)') {
      R = parseFloat(RInputc.value()* 1000) ;
      
    }
    calcularYc();
    clickCountR_1=0; 

  }
  
}
function cargarc() {
  clickCountc_1++; 
  if (clickCountc_1 == 2){
    let selectedOption = submitButtonc.value();
    if (selectedOption === 'Cargar c (mili F)') {
      c = parseFloat(cInputc.value()* 0.001) ;
      
    } else if (selectedOption === 'Cargar c (micro F)') {
      c = parseFloat(cInputc.value()* 0.000001) ;
      
    }
    calcularYc();
    clickCountc_1 = 0; 
  }
  
  
}

// RLC
let vv1 = 0; 
let vv2 = 0; 
let vv3 = 0; 
let vv4 = 0; 

function cargarVpl() {
  vv1++; 
  if (vv1==2){
    let selectedOption = submitButtonVpl.value();
    if (selectedOption === 'Cargar Vp (mV)') {
      Vp = parseFloat(VpInputl.value()* 0.001) ;
      
    } else if (selectedOption === 'Cargar Vp (V)') {
      Vp = parseFloat(VpInputl.value()) ;
      
    }
    calcularYl();
    vv1 = 0; 
  }
}

function cargarRl() {
  vv2++; 
  if (vv2 == 2){
    let selectedOption = submitButtonRl.value();
    if (selectedOption === 'Cargar R (mili Ohm)') {
      R = parseFloat(RInputl.value()* 0.001) ;
      
    } else if (selectedOption === 'Cargar R (kilo Ohm)') {
      R = parseFloat(RInputl.value()* 1000) ;
      
    }
    calcularYl();
    vv2 = 0; 
  }
  
  
}

function cargarcl() {
  vv3++; 
  if (vv3 == 2){
    let selectedOption = submitButtoncl.value();
    if (selectedOption === 'Cargar c (mili F)') {
      c = parseFloat(cInputl.value()* 0.001) ;
      
    } else if (selectedOption === 'Cargar c (micro F)') {
      c = parseFloat(cInputl.value()* 0.000001) ;
      
    }
    calcularYl();
    vv3 = 0; 
  }
}

function cargarll() {
  vv4++; 
  if (vv4 == 2){
    let selectedOption = submitButtonrlc.value();
    if (selectedOption === 'Cargar l (mili H)') {
      // Realizar acciones para 'Cargar c (mili F)'
      l = parseFloat(lInputl.value()* 0.001) ;
  
    } else if (selectedOption === 'Cargar l (micro H)') {
      l = parseFloat(lInputl.value()* 0.000001) ;
  
    }
    calcularYl();
    vv4 = 0; 
  }
}

function calcularYc() {
  if (circuitoRCActivado){
    if (currentIndexc < 100) {
      let xc = currentIndexc;
      let yc = Vp * xc * c / (1 + (xc * R * c) * (xc * R * c)) ** (1 / 2);
      let y2c = Vp / (1 +  1 / ((xc * R * c) * (xc * R * c)) ) ** (1 / 2);
      let y3c = Vp / (1 + (xc * R * c) * (xc * R * c)) ** (1 / 2);
  
      pointsc.push(new GPoint(xc, yc));
      points2c.push(new GPoint(xc, y2c));
      points3c.push(new GPoint(xc, y3c));
  
      currentIndexc++;
  
      // Actualizar la primera gráfica
      plotc.setPoints(pointsc);
      plotc.defaultDraw();
  
      // Actualizar la segunda grafica
      plot2c.setPoints(points2c);
      plot2c.defaultDraw();
  
      // Actualizar la tercera grafica
      plot3c.setPoints(points3c);
      plot3c.defaultDraw();
  
      // Esperar un poco antes de la próxima actualización
      setTimeout(calcularYc, 100); // 100 milisegundos de espera
    }
  }
}
// RL
function calcularY() {
  if (circuitoRLActivado){
    if (currentIndex < 100) {
      let x = currentIndex;
      let y = Vp / (R * R + (x * l) * (x * l)) ** (1 / 2);
      let y2 = Vp / (1 + (x * l / R) * (x * l / R)) ** (1 / 2);
      let y3 = Vp / (1 + (R / x * l) * (R / x * l)) ** (1 / 2);

      points.push(new GPoint(x, y));
      points2.push(new GPoint(x, y2));
      points3.push(new GPoint(x, y3));
      currentIndex++;

      // Actualizar la primera gráfica
      plot.setPoints(points);
      plot.defaultDraw();

      // Actualizar la segunda grafica
      plot2.setPoints(points2);
      plot2.defaultDraw();

      // Actualizar la tercera grafica
      plot3.setPoints(points3);
      plot3.defaultDraw();

      // Esperar un poco antes de la próxima actualización
      setTimeout(calcularY, 100); // 100 milisegundos de espera
    } 
 }
}

// RLC

function calcularYl() {
  if (circuitoRCLActivado){
 
    if (currentIndexl < 100) {
      let xl = currentIndexl;
      let yl = Vp / (R * R +  (xl * l - 1/ (xl * c)) * (xl * l - 1/ (xl * c))) ** (1 / 2);
      pointsl.push(new GPoint(xl, yl));
      currentIndexl++;

      // Actualizar la primera gráfica
      plotl.setPoints(pointsl);
      plotl.defaultDraw();

      // Esperar un poco antes de la próxima actualización
      setTimeout(calcularYl, 100); // 100 milisegundos de espera
    }
  }
}


// Función para guardar los datos en un archivo de texto
function guardarDatosf1() {
  for (let i = 0; i < points.length; i++) {
    let x = points[i].x;
    let y = points[i].y;
    dataf1.push(`x: ${x}, y: ${y}`);
  }
  save(dataf1, 'datosf1.txt');
}

// Función para guardar los datos en un archivo de texto
function guardarDatosf1c() {
  for (let i = 0; i < pointsc.length; i++) {
    let xc = pointsc[i].x;
    let yc = pointsc[i].y;
    dataf1c.push(`x: ${xc}, y: ${yc}`);
  }
  save(dataf1c, 'datosf1c.txt');
}

function guardarDatosf2() {
  for (let i = 0; i < points2.length; i++) {
    let x = points2[i].x;
    let y = points2[i].y;
    dataf2.push(`x: ${x}, y: ${y}`);
  }
  save(dataf2, 'datosf2.txt');
}

function guardarDatosf2c() {
  for (let i = 0; i < points2c.length; i++) {
    let xc = points2c[i].x;
    let yc = points2c[i].y;
    dataf2c.push(`x: ${xc}, y: ${yc}`);
  }
  save(dataf2c, 'datosf2c.txt');
}

function guardarDatosf3() {
  for (let i = 0; i < points3.length; i++) {
    let x = points3[i].x;
    let y = points3[i].y;
    dataf3.push(`x: ${x}, y: ${y}`);
  }
  save(dataf3, 'datosf3.txt');
}

function guardarDatosf3c() {
  for (let i = 0; i < points3c.length; i++) {
    let xc = points3c[i].x;
    let yc = points3c[i].y;
    dataf3c.push(`x: ${xc}, y: ${yc}`);
  }
  save(dataf3c, 'datosf3c.txt');
}
// RLC

function guardarDatosf1l() {
  //let dataf1 = [];

  // Agregar los datos de "x" y "y" al array
  for (let i = 0; i < pointsl.length; i++) {
    let xl = pointsl[i].x;
    let yl = pointsl[i].y;
    dataf1l.push(`x: ${xl}, y: ${yl}`);
  }
  // Guardar el string en un archivo de texto
  save(dataf1l, 'datosf1l.txt');
}


function RC(){
  cc.start(200, 30);
  if (CheckBox_1.checked()){
    circuitoRCActivado = true; 
    cc.drawPower(50, 1,  "");
    cc.resistor(100,5,1, ""); 
    cc.drawCapacitor(100, ""); 
    cc.verticalWire(-50);
    VpInputc.show(); 
    RInputc.show(); 
    cInputc.show(); 
    submitButtonVpc.show(); 
    submitButtonRc.show();
    submitButtonc.show();
    submitButtonSavef1c.show(); 
    submitButtonSavef2c.show(); 
    submitButtonSavef3c.show(); 

  } else{
      cc.ctx.fillStyle = "#ffffff";
      cc.ctx.fillRect(0,0, 500, 400); // variar 
      window.location.reload();
  }
  cc.finish();
}

function RL(){
  cc.start(150, 30);
  if (CheckBox_2.checked()){
    circuitoRLActivado = true; 
    cc.drawPower(50, 1, "");
    cc.resistor(100,5,1, ""); 
    cc.inductor(100,5, ""); 
    cc.verticalWire(-50);
    VpInput.show(); 
    RInput.show(); 
    lInput.show(); 
    submitButtonVp.show(); 
    submitButtonR.show();
    submitButtonl.show();  
    submitButtonSavef1.show(); 
    submitButtonSavef2.show(); 
    submitButtonSavef3.show(); 
    
  } else{
      circuitoRLActivado = false; 
      cc.ctx.fillStyle = "#ffffff";
      cc.ctx.fillRect(0,0, 500, 400); // variar 
      VpInput.hide(); 
      RInput.hide(); 
      lInput.hide(); 
      submitButtonVp.hide(); 
      submitButtonR.hide();
      submitButtonl.hide();  
      submitButtonSavef1.hide(); 
      submitButtonSavef2.hide(); 
      submitButtonSavef3.hide();  
      window.location.reload();
  }
  cc.finish();
  
}

function RLC(){
  cc.start(150, 30);
  if (CheckBox_3.checked()){
    circuitoRCLActivado = true; 
    cc.drawPower(50, 1, "");
    cc.resistor(100,5,1, ""); 
    cc.drawCapacitor(100, "");
    cc.inductor(100,5, ""); 
    cc.verticalWire(-70);
    VpInputl.show();
    RInputl.show();
    lInputl.show();
    cInputl.show();
    submitButtonVpl.show();
    submitButtonRl.show();
    submitButtonrlc.show();
    submitButtoncl.show();
    submitButtonSavef1l.show();
  } else{
      circuitoRCLActivado = false; 
      cc.ctx.fillStyle = "#ffffff";
      cc.ctx.fillRect(0,0, 500, 400); // variar 
      //VpInputl.hide();
      //RInputl.hide();
      //lInputl.hide();
      //cInputl.hide();
      //submitButtonVpl.hide();
      //submitButtonRl.hide();
      //submitButtonrlc.hide();
      //submitButtoncl.hide();
      //submitButtonSavef1l.hide();
      window.location.reload();
  }
  cc.finish();
}

function draw() {

  if (circuitoRCActivado) {
    // Muestra la ecuación LaTeX solo cuando circuitoRCActivado sea true
    displayLatexEquation1();
    displayLatexEquation2(); 
    displayLatexEquation3(); 
  }

  if (circuitoRLActivado){
    displayLatexEquation4();
    displayLatexEquation5(); 
    displayLatexEquation6();

  }

  if (circuitoRCLActivado){
    displayLatexEquation7(); 

  }
  // Resto del código
}

// VOLTAJE EN LA RESISTENCIA RC
function displayLatexEquation1() {
  const latexContainer = document.getElementById('latex-container1');
  latexContainer.innerHTML = ''; // Limpiar contenido anterior

  const latexExpression = 'V_R = \\frac{V_p}{\\sqrt{1 + \\frac{1}{(wRc)^2}}}';

  katex.render(latexExpression, latexContainer, {
    throwOnError: false, // Evita errores si la expresión LaTeX es incorrecta
  });
   // Ajusta la posición del contenedor directamente aquí arranca desde la esquina superior derecha
  latexContainer.style.fontSize = '25px';
  latexContainer.style.position = 'absolute';
  latexContainer.style.top = '200px'; // Ajusta la distancia desde la parte superior
  latexContainer.style.right = '620px';
}

// VOLTAJE EN EL CAPACITOR RC
function displayLatexEquation2() {
  const latexContainer = document.getElementById('latex-container2');
  latexContainer.innerHTML = ''; // Limpiar contenido anterior

  const latexExpression = 'V_c = \\frac{V_p}{\\sqrt{1 + (wRc)^2}}';

  katex.render(latexExpression, latexContainer, {
    throwOnError: false, // Evita errores si la expresión LaTeX es incorrecta
  });
   // Ajusta la posición del contenedor directamente aquí
  latexContainer.style.fontSize = '25px';
  latexContainer.style.position = 'absolute';
  latexContainer.style.top = '200px'; // Ajusta la distancia desde la parte superior
  latexContainer.style.right = '120px';
}

// CORRIENTE EN EL RC
function displayLatexEquation3() {
  const latexContainer = document.getElementById('latex-container3');
  latexContainer.innerHTML = ''; // Limpiar contenido anterior

  const latexExpression = 'I_p = \\frac{w c V_p}{\\sqrt{1 + (wRc)^2}}';
  //const latexExpressionWithSize = `<span style="font-size: 100px;">${latexExpression}</span>`;
  //latexContainer.innerHTML = latexExpressionWithSize;

  katex.render(latexExpression, latexContainer, {
    throwOnError: false, // Evita errores si la expresión LaTeX es incorrecta
  });
   // Ajusta la posición del contenedor directamente aquí
  latexContainer.style.fontSize = '25px';
  latexContainer.style.position = 'absolute';
  latexContainer.style.top = '200px'; // Ajusta la distancia desde la parte superior
  latexContainer.style.right = '1100px';
}

// CORRIENTE EN EL RL
function displayLatexEquation4() {
  const latexContainer = document.getElementById('latex-container4');
  latexContainer.innerHTML = ''; // Limpiar contenido anterior

  const latexExpression = 'I_p = \\frac{V_p}{\\sqrt{R^2 + (wl)^2}}';

  katex.render(latexExpression, latexContainer, {
    throwOnError: false, // Evita errores si la expresión LaTeX es incorrecta
  });
   // Ajusta la posición del contenedor directamente aquí
  latexContainer.style.fontSize = '25px'; 
  latexContainer.style.position = 'absolute';
  latexContainer.style.top = '200px'; // Ajusta la distancia desde la parte superior
  latexContainer.style.right = '1100px';
}

// VOLTAJE EN LA RESISTENCIA RL
function displayLatexEquation5() {
  const latexContainer = document.getElementById('latex-container5');
  latexContainer.innerHTML = ''; // Limpiar contenido anterior

  const latexExpression = 'V_R = \\frac{V_p}{\\sqrt{1 + (\\frac{w l}{R})^2}}';

  katex.render(latexExpression, latexContainer, {
    throwOnError: false, // Evita errores si la expresión LaTeX es incorrecta
  });
   // Ajusta la posición del contenedor directamente aquí arranca desde la esquina superior derecha
  latexContainer.style.fontSize = '25px'; 
  latexContainer.style.position = 'absolute';
  latexContainer.style.top = '200px'; // Ajusta la distancia desde la parte superior
  latexContainer.style.right = '620px';
}

// VOLTAJE EN EL INDUCTOR RL 
function displayLatexEquation6() {
  const latexContainer = document.getElementById('latex-container6');
  latexContainer.innerHTML = ''; // Limpiar contenido anterior

  const latexExpression = 'V_l = \\frac{V_p}{\\sqrt{1 + (\\frac{R}{w l })^2}}';

  katex.render(latexExpression, latexContainer, {
    throwOnError: false, // Evita errores si la expresión LaTeX es incorrecta
  });
   // Ajusta la posición del contenedor directamente aquí
  latexContainer.style.fontSize = '25px';
  latexContainer.style.position = 'absolute';
  latexContainer.style.top = '200px'; // Ajusta la distancia desde la parte superior
  latexContainer.style.right = '120px';
}

// CORRIENTE PARA EL RLC
function displayLatexEquation7() {
  const latexContainer = document.getElementById('latex-container7');
  latexContainer.innerHTML = ''; // Limpiar contenido anterior

  const latexExpression = 'I_p = \\frac{V_p}{\\sqrt{R^2 + ( w l  -  \\frac{1}{w c })^2}}';

  katex.render(latexExpression, latexContainer, {
    throwOnError: false,
    fontSize: 100, // Evita errores si la expresión LaTeX es incorrecta
  });
   // Ajusta la posición del contenedor directamente aquí
  latexContainer.style.fontSize = '25px';
  latexContainer.style.position = 'absolute';
  latexContainer.style.top = '200px'; // Ajusta la distancia desde la parte superior
  latexContainer.style.right = '520px';
}