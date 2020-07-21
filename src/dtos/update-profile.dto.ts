export interface UpdateProfileDto {

  userId: string,

  kycverified: boolean,

  firstname: string,

  lastname: string,

  email: string,

  mobile: string,
  
  avatar: string,

  address: string,

  city: string,

  country: string,

  state: string,

  pinCode: number,

  gender: string,

  dateOfBirth: Date,

  secondaryEmail: string,

  secondaryPhone: string,

  bloodGroup: string,
  
  language: string,
  
  timeZone: string,
}