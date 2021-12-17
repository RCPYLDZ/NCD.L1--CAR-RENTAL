import { context, PersistentMap, PersistentVector } from "near-sdk-core";
import { AccountId} from "../../utils";
import { Car,CarRenterInfo, FuelType, GearType, rentalCars, carRenters} from "./model";

@nearBindgen
export class Contract {

    private owner: AccountId;


    init(): void {
        assert(this.owner,"Contract already initialized.")
        this.owner = context.sender;
    }

    /**
     * Adds a new car to the rentable car list.\
     */
    @mutateState()
    addCar(carId: string,manufacturer: string,gearType:GearType,fuelType:FuelType,name:string): void {
        assert(this.assert_self(),"Only contract owner can add new rentable car.");
        for(let i = 0;i<rentalCars.length;i++){
            assert(!(carId == rentalCars[i].carId),"Can not add new car which has previously used id.")
        }
        let car = new Car(carId,manufacturer,gearType,fuelType,name,false);
        rentalCars.push(car);
    }

    @mutateState()
    removeCar(carId: string) : void {
        assert(this.assert_self(),"Only contract owner can remove a rentable car.");
        let removed = false;
        for(let i = 0;i< rentalCars.length;i++){
            assert(!(rentalCars[i].carId == carId && rentalCars[i].isRent),"A car which is already rent can not be removed.");
            if(rentalCars[i].carId == carId){
                rentalCars.swap_remove(i);
                removed = true;
            }
        }
        assert(removed,"The car could not find in rentable car.");
    }

    @mutateState()
    rentCar(carId: string) : void {
        for(let i = 0;i<carRenters.length;i++){
            assert(carRenters[i].renter != context.sender,"User already rent a car.")
        }
        for(let i = 0;i<rentalCars.length;i++){
            assert(!(rentalCars[i].carId == carId && rentalCars[i].isRent),"Car already rented");
            if(rentalCars[i].carId == carId && !rentalCars[i].isRent){
                let tempCar = rentalCars[i];
                tempCar.isRent = true;
                rentalCars.swap_remove(i);
                rentalCars.push(tempCar);
                let info = new CarRenterInfo(carId,context.sender);
                carRenters.push(info);
                break;
            }
        }
    }

    @mutateState()
    returnCar(carId: string) : void {
        let isUserRentedCar = false;
        let rentedCarIndex = -1;
        for(let i = 0;i<carRenters.length;i++){
            if(carRenters[i].renter == context.sender){
                isUserRentedCar = true;
                rentedCarIndex = i;
                break;
            }
        }
        assert(isUserRentedCar,"User did not rent any car.")
        let rentedCarId = carRenters[rentedCarIndex].carId;
        assert(carId == rentedCarId, "The car was not rented by the user.");
        for(let i = 0;i<rentalCars.length;i++){
            if(rentalCars[i].carId == carId){
                let tempCar = rentalCars[i];
                tempCar.isRent = false;
                rentalCars.swap_remove(i);
                rentalCars.push(tempCar);
                break;
            }
        }
        carRenters.swap_remove(rentedCarIndex);
    }

    getAllCars() : Array<Car>{
        const result = new Array<Car>(rentalCars.length);
        for (let i = 0; i < rentalCars.length; i++) {
            result[i] = rentalCars[i];
        }
        return result;
    }

    getCarRenters() : Array<CarRenterInfo>{
        const result = new Array<CarRenterInfo>(carRenters.length);
        for (let i = 0; i < carRenters.length; i++) {
            result[i] = carRenters[i];
        }
        return result;
    }

    private assert_self(): boolean {
        const caller = context.predecessor
        const self = context.contractName
        if(caller == self){
            return true;
        }else{
            return false;
        }
      }
}


