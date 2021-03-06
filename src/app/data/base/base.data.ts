export interface BaseData<T> {
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T>;
    add(item: T): Promise<T>;
    findOne(query?: any, isCaseSensitive?: boolean): Promise<T>;
    find(model, year): Promise<T[]>;
}