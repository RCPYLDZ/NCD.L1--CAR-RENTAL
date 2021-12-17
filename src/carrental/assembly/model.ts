import {  PersistentVector,PersistentMap } from "near-sdk-as";

/** 
 * Exporting a new classes for car rental, so they can be used outside of this file.
 */

export enum GearType{
    MANUAL,
    AUTO
}

export enum FuelType{
    DIESEL,
    PETROL
}

@nearBindgen
export class Car {
  carId: string;  
  manufacturer: string;
  gearType: GearType;
  fuelType: FuelType;
  name: string;
  isRent : boolean;
  constructor(carId:string,manufacturer: string,gearType: GearType,fuelType: FuelType,name: string,isRent : boolean) {
    this.carId = carId;
    this.manufacturer = manufacturer;
    this.gearType = gearType;
    this.fuelType = fuelType;
    this.name = name;
    this.isRent = isRent;
  }
}

@nearBindgen
export class CarRenterInfo {
  carId: string;  
  renter: string;
  constructor(carId:string, renter: string) {
    this.carId = carId;
    this.renter = renter;
  }
}


/**
 * List of rental cars.
 */
 export let rentalCars = new PersistentVector<Car>("c");
 export let carRenters = new PersistentVector<CarRenterInfo>("r");
 

