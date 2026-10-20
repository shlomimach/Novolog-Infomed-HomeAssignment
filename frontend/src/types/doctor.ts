
export interface DoctorPhone {
    number: string;
    phoneType: number;
}

export interface DoctorClinic {
    name: string;
    isActive: boolean;
    address: {
        cityName: string;
        street: string;
    };
    phones: DoctorPhone[];
}

export interface Doctor {
    id: number;
    fullName: string;
    isActive: boolean;
    promotionLevel: number;
    reviews: {
        averageRating: number;
        totalRatings: number;
    };
    languages: string[];
    hasArticle: boolean;
    phones: DoctorPhone[];
    clinics: DoctorClinic[];
}
