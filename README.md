# `NCD.L1 Car Rental Demo` 
Car rental process demo with smart contract.

----
## Environment
```sh
export CONTRACT=[contract_id] // test.testnet
export ACCOUNT=[account_id] //your test accountId
export BENEFICIARY=[beneficiary_account_id] //beneficiary account will be used when cleanup script runs.
```

## Methods

`addCar(carId: string,manufacturer: string,gearType:GearType,fuelType:FuelType,name:string): void`

Only the contract owner can run that command. This method adds the specified car to the cars' array.

```sh
near call CONTRACT addCar '{"carId":"554562b5-87fa-4696-875a-e6f97ec7bafd","manufacturer":"VW","gearType":1,"fuelType":0,"name":"golf"}' --accountId $CONTRACT
```

`removeCar(carId: string) : void`

Only the contract owner can run that command. That method removes the car which has given carId from the cars' array if it was not rented.

```sh
near call $CONTRACT removeCar '{"carId":"554562b5-87fa-4696-875a-e6f97ec7bafd"}' --accountId $CONTRACT
```

`rentCar(carId: string) : void`

When someone rents a car that method will be used.

```sh
near call $CONTRACT rentCar '{"carId":"554562b5-87fa-4696-875a-e6f97ec7bafd"}' --accountId $CONTRACT
```

`returnCar(carId: string) : void`
When someone returns a car that method will be used.

```sh
near call $CONTRACT returnCar '{"carId":"554562b5-87fa-4696-875a-e6f97ec7bafd"}' --accountId $CONTRACT
```

`getAllCars() : Array<Car>`

This method returns all cars which are in the cars' array.

```sh
near view $CONTRACT getAllCars
```

`getCarRenters() : Array<CarRenterInfo>`

This method returns an array which contains rented carId and renter accountId.

```sh
near view $CONTRACT getCarRenters
```

## Usage

### Getting started

1. clone this repo to a local folder
2. run `yarn`
3. run `./scripts/1.dev-deploy.sh` 
    deploys the smartcontract
4. run `./scripts/2.use-contract.sh`
   These commands will be simulate;
    1.  Adding and removing car
    2.  Rent and return car
    3.  List all cars and car renters.
5. run `./scripts/3.cleanup.sh`
   Deletes temporary account which is created for contract deployment and transfer benefits to $BENEFICIARY.

 