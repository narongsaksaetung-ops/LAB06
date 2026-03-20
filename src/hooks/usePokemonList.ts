import { useState, useEffect, useCallback } from 'react';
import type { Pokemon, PokemonListResponse, PokemonType } from '../types/pokemon';

// Minimal shape we need from the PokeAPI detail response.
type PokemonDetailApiResponse = {
    id: number;
    name: string;
    types: Array<{ type: { name: string } }>;
    sprites: {
        front_default: string | null;
        other?: {
            'official-artwork'?: {
                front_default: string | null;
            };
        };
    };
    stats: Array<{ base_stat: number }>;
};

interface UsePokemonListReturn {
    pokemonList: Pokemon[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    loadMore: () => void;
    refresh: () => void;
}

const ITEMS_PER_PAGE = 20;

function usePokemonList(): UsePokemonListReturn {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchPokemonDetails = async (url: string): Promise<Pokemon> => {
        const response = await fetch(url);
        const data: PokemonDetailApiResponse = await response.json();

        return {
            id: data.id,
            name: data.name,
            types: data.types.map(t => t.type.name as PokemonType),
            sprite:
                data.sprites.other?.['official-artwork']?.front_default ||
                data.sprites.front_default ||
                '',
            stats: {
                hp: data.stats[0]?.base_stat ?? 0,
                attack: data.stats[1]?.base_stat ?? 0,
                defense: data.stats[2]?.base_stat ?? 0,
                speed: data.stats[5]?.base_stat ?? 0,
            }
        };
    };

    const fetchPokemonList = useCallback(async (currentOffset: number, append: boolean = false) => {
        setLoading(true);
        setError(null);

        try {
            // ดึงรายชื่อ Pokemon
            const listResponse = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${currentOffset}`
            );
            const listData: PokemonListResponse = await listResponse.json();

            // ดึงรายละเอียดแต่ละตัว
            const detailPromises = listData.results.map(item =>
                fetchPokemonDetails(item.url)
            );
            const details = await Promise.all(detailPromises);

            // อัพเดท state
            setPokemonList(prev => append ? [...prev, ...details] : details);
            setHasMore(listData.next !== null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
        } finally {
            setLoading(false);
        }
    }, []);

    // โหลดครั้งแรก
    useEffect(() => {
        fetchPokemonList(0);
    }, [fetchPokemonList]);

    const loadMore = useCallback(() => {
        const newOffset = offset + ITEMS_PER_PAGE;
        setOffset(newOffset);
        fetchPokemonList(newOffset, true);
    }, [offset, fetchPokemonList]);

    const refresh = useCallback(() => {
        setOffset(0);
        setPokemonList([]);
        fetchPokemonList(0);
    }, [fetchPokemonList]);

    return {
        pokemonList,
        loading,
        error,
        hasMore,
        loadMore,
        refresh
    };
}

export default usePokemonList;
