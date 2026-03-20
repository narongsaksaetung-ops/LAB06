export interface Pokemon {
    id: number;
    name: string;
    types: PokemonType[];
    sprite: string;
    stats: PokemonStats;
}

export interface PokemonStats {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
}

export type PokemonType =
    | 'normal' | 'fire' | 'water' | 'electric' | 'grass'
    | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying'
    | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon'
    | 'dark' | 'steel' | 'fairy';

export interface PokemonListItem {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}
