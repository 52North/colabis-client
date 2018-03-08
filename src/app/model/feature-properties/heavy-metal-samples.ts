import { GeoJsonProperties } from 'geojson';

export interface HeavyMetalSamples extends GeoJsonProperties {
    X: number;
    Y: number;
    Timestamp: string;
    Place: string;
    'Zn_1000_-_400___micro_g_per_g_': number;
    'Zn_400_-_100___micro_g_per_g_': number;
    'Zn_100_-_63___micro_g_per_g_': number;
    'Zn_63_-_0.45___micro_g_per_g_': number;
    'Zn_SUMM___micro_g_per_g_': number;
    'Cu_1000_-_400___micro_g_per_g_': number;
    'Cu_400_-_100___micro_g_per_g_': number;
    'Cu_100_-_63___micro_g_per_g_': number;
    'Cu_63_-_0.45___micro_g_per_g_': number;
    'Cu_SUMM___micro_g_per_g_': number;
    'Cd_1000_-_400___micro_g_per_g_': number;
    'Cd_400_-_100___micro_g_per_g_': number;
    'Cd_100_-_63___micro_g_per_g_': number;
    'Cd_63_-_0.45___micro_g_per_g_': number;
    'Cd_SUMM___micro_g_per_g_': number;
}
