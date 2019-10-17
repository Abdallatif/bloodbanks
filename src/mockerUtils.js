export const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export const randomFutureDate = () => randomDate(new Date(2020, 0, 1), new Date(2022, 5, 8))

export const createBloodBankBloodType = (city, hospital, bloodType) => ({
  city,
  hospital,
  bloodType,
  quantity: Math.floor(Math.random() * 15),
  expire: randomFutureDate(),
})

export const createBloodBank = (city, hospital) => ([
  createBloodBankBloodType(city, hospital, "AB+"),
  createBloodBankBloodType(city, hospital, "AB-"),
  createBloodBankBloodType(city, hospital, "A+"),
  createBloodBankBloodType(city, hospital, "A-"),
  createBloodBankBloodType(city, hospital, "B+"),
  createBloodBankBloodType(city, hospital, "B-"),
  createBloodBankBloodType(city, hospital, "O+"),
  createBloodBankBloodType(city, hospital, "O-"),
])
