export class Engine {
    fuel  :  'petrol'  | 'diesel' | 'electric';
    power :  number;
    consumption : number;

    Engine(){
        this.fuel = 'petrol';
        this.power = 0;
        this.consumption = 0;
    }
}
