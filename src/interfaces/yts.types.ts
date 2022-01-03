export type IEnvironmentType ='dev' | 'production' | 'staging' | 'development'; 

export interface IPopulate {
    path: string;
    model?: string;
    populate?: IPopulate;
} 