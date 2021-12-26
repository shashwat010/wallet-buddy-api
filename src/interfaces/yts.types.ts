export type IEnvironmentType ='dev' | 'production' | 'staging'; 

export interface IPopulate {
    path: string;
    model?: string;
    populate?: IPopulate;
} 