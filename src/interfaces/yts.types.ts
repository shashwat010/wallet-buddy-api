export type IEnvironmentType ='dev' | 'production' | 'staging' | 'development'; 

export interface IPopulate {
    path: string;
    model?: string;
    populate?: IPopulate;
} 

export interface IFindPaginationQuery{
    page_size?: number,
    page_number?:number
}