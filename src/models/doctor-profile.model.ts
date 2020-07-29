import { Document, Schema } from "mongoose";
import { User } from "./user.model";
import { Profile } from "./profile.model";

export interface Section {
    startTime: string;
    endTime: string;
}

export interface WeekDays {
    name: string,
    sectionOne: Array<Section>,
    sectionTwo: Array<Section>
}

export class DoctorProfile extends Document {
    userId: User["_id"];
    profileId: Profile["_id"];
    salutation: string[];
    specialties: string;
    doctorDegrees: string[];
    colleges: string[];
    yearsOfExperience: number;
    isOwnEstablishment: boolean;
    establishmentName: string;
    establishmentCity: string;
    establishmentEmail: string;
    establishmentContact: string;
    establishmentAddress: string;
    consultationFees: number;
    establishmentTiming: WeekDays[];
    doctorHours: WeekDays[];
    service: string[];
}

export const DoctorProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    profileId: {
        type: Schema.Types.ObjectId,
        ref: "Profile",
        required: false
    },

    salutation: {
        type: String,
        required: true
    },
    specialties: {
        type: [String],
    },

    doctorDegrees: {
        type: [String],
    },

    colleges: {
        type: [String]
    },

    yearsOfExperience: {
        type: Number,
        required: true
    },

    isOwnEstablishment: {
        type: Boolean
    },

    establishmentName: {
        type: String,
        required: true
    },

    establishmentCity: {
        type: String,
        required: true
    },

    establishmentEmail: {
        type: String,
        required: true
    },

    establishmentContact: {
        type: String,
        required: true
    },

    establishmentAddress: {
        type: String,
        required: true
    },

    consultationFees: {
        type: Number,
        required: true
    },

    establishmentTiming: {
        type: [{
            monday: {
                type: [{
                    section1: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    },
                    section2: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    }
                }]
            },
            tuesday: {
                type: [{
                    section1: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    },
                    section2: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    }
                }]
            },
            wednesday: {
                type: [{
                    section1: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    },
                    section2: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    }
                }]
            },
            thursday: {
                type: [{
                    section1: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    },
                    section2: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    }
                }]
            },
            friday: {
                type: [{
                    section1: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    },
                    section2: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    }
                }]
            },
            saturday: {
                type: [{
                    section1: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    },
                    section2: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    }
                }]
            },
            sunday: {
                type: [{
                    section1: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    },
                    section2: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    }
                }]
            }
        }]
    },

    doctorHours: {
        type: [{
            monday: {
                type: [{
                    section1: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    },
                    section2: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    }
                }]
            },
            tuesday: {
                type: [{
                    section1: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    },
                    section2: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    }
                }]
            },
            wednesday: {
                type: [{
                    section1: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    },
                    section2: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    }
                }]
            },
            thursday: {
                type: [{
                    section1: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    },
                    section2: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    }
                }]
            },
            friday: {
                type: [{
                    section1: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    },
                    section2: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    }
                }]
            },
            saturday: {
                type: [{
                    section1: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    },
                    section2: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    }
                }]
            },
            sunday: {
                type: [{
                    section1: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    },
                    section2: {
                        type: [{
                            startTime: { type: String },
                            endTime: { type: String },
                        }]
                    }
                }]
            }
        }]
    },
});