import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { Engine } from 'src/app/models/engine';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-cars-add',
  templateUrl: './cars-add.component.html',
  styleUrls: ['./cars-add.component.css']
})
export class CarsAddComponent implements OnInit, OnChanges {

  @Output() update:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() selectedCar:Car;

  car:Car = new Car();

  constructor(private carservice:CarService) { }

  ngOnInit() {
    this.car.engine = new Engine();
    this.car.engine.fuel = null;
    this.car.engine.power = 0;
    this.car.engine.consumption = 0;
  }

  ngOnChanges(changes:SimpleChanges):void{
    this.car = this.selectedCar;
    console.log("Selected car=>"+this.car);
  }

  isAddAction(carId):boolean{
    return isNullOrUndefined(carId) || carId === 0;
  }

  processForm(car:Car):void{
    //add a new car
      if(this.isAddAction(car.id)){
        // we post
        this.carservice.addCar(car).subscribe((car:Car)=>{
          //emit event here
          this.update.emit(true);
        },
        error =>{
          console.log(error);
          alert("Could not retrieve cars");
        });
      }else{
        //we edit
        this.carservice.editCar(car).subscribe((car:Car)=>{
            this.update.emit(true);
        })
      }
  }

}
