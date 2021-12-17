#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 0: Check for environment variable with contract name"
echo ---------------------------------------------------------
echo

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$ACCOUNT" ] && echo "Missing \$ACCOUNT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"

echo
echo
echo ---------------------------------------------------------
echo "Step 1: Call addCarr method to add 4 cars."
echo ---------------------------------------------------------
echo

near call $CONTRACT addCar '{"carId":"81833782-44de-4c28-bcff-74b3ba6e964c","manufacturer":"VW","gearType":1,"fuelType":0,"name":"golf"}' --accountId $CONTRACT
near call $CONTRACT addCar '{"carId":"ee410f45-5755-466f-9f8b-891dda06704d","manufacturer":"VW","gearType":0,"fuelType":1,"name":"golf"}' --accountId $CONTRACT
near call $CONTRACT addCar '{"carId":"db496866-8e19-419b-a660-9dc4d487358c","manufacturer":"VW","gearType":1,"fuelType":0,"name":"golf"}' --accountId $CONTRACT
near call $CONTRACT addCar '{"carId":"2428648b-0fa5-4bd3-85c8-1d89c192cfa8","manufacturer":"VW","gearType":0,"fuelType":1,"name":"golf"}' --accountId $CONTRACT

echo
echo


echo
echo ---------------------------------------------------------
echo "Step 2: Call getAllCars to get cars."
echo ---------------------------------------------------------
echo




echo
echo

near view $CONTRACT getAllCars

echo
echo

echo
echo ---------------------------------------------------------
echo "Step 3: Rent a car with `echo $ACCOUNT`."
echo ---------------------------------------------------------
echo

echo
echo

near call $CONTRACT rentCar '{"carId":"81833782-44de-4c28-bcff-74b3ba6e964c"}' --accountId $ACCOUNT

echo
echo

echo
echo ---------------------------------------------------------
echo "Step 4: List car renters. See the `echo $ACCOUNT` is rented car ID 81833782-44de-4c28-bcff-74b3ba6e964c"
echo ---------------------------------------------------------
echo

echo
echo

near view $CONTRACT getCarRenters

echo
echo 

echo
echo ---------------------------------------------------------
echo "Step 5: Try to remove rented car. It will fire an error."
echo ---------------------------------------------------------
echo

echo
echo

near call $CONTRACT removeCar '{"carId":"81833782-44de-4c28-bcff-74b3ba6e964c"}' --accountId $CONTRACT

echo
echo

echo
echo ---------------------------------------------------------
echo "Step 6: list all cars. This time one car is flaged as rented."
echo ---------------------------------------------------------
echo

echo
echo

near view $CONTRACT getAllCars

echo
echo

echo
echo ---------------------------------------------------------
echo "Step 7: Return rented car."
echo ---------------------------------------------------------
echo


echo
echo

near call $CONTRACT returnCar '{"carId":"81833782-44de-4c28-bcff-74b3ba6e964c"}' --accountId $ACCOUNT

echo
echo

echo
echo ---------------------------------------------------------
echo "Step 8: Try to remove the same car again which we tried before. This time it will be removed."
echo ---------------------------------------------------------
echo

echo
echo

near call $CONTRACT removeCar '{"carId":"81833782-44de-4c28-bcff-74b3ba6e964c"}' --accountId $CONTRACT

echo
echo

echo
echo ---------------------------------------------------------
echo "Step 9: Again list all cars. See carId=81833782-44de-4c28-bcff-74b3ba6e964c is removed."
echo ---------------------------------------------------------
echo

echo
echo

near view $CONTRACT getAllCars

echo
echo

exit 0
