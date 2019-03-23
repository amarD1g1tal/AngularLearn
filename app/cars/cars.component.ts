import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car';
import { CarService } from '../services/car.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

   cars:Car[];
   selectedCar : Car;

  constructor(public carservice:CarService) { 
    this.selectedCar = new Car();
  }

  ngOnInit() {
    this.getCars();
  }

  getCars(){
    this.carservice.getCars().subscribe((cars:Car[])=>{
      this.cars=cars;
    });
  }

  editCar(carId:number){
    this.carservice.getCarById(carId)
    .subscribe((car:Car)=>{
      this.selectedCar = car;
      console.log(this.selectedCar);
    },
    error=>{
      alert("Could not retrieve car with this id" + carId); 
    })
  }

  deleteCar(carId:number){
    this.carservice.deleteCar(carId)
    .subscribe((car:Car)=>{
      this.getCars();
    });
  }

}
