import { useState, useEffect } from 'react';
import { Pokemon } from '../types/pokemon';

interface PokemonDetailProps {
    pokemonId: number;
}

function PokemonDetail({ pokemonId }: PokemonDetailProps) {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Reset states เมื่อ pokemonId เปลี่ยน
        setLoading(true);
        setError(null);
        setPokemon(null);

        // สร้าง AbortController สำหรับ cancel request
        const abortController = new AbortController();

        const fetchPokemon = async () => {
            try {
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
                    { signal: abortController.signal }
                );

                if (!response.ok) {
                    throw new Error('Pokemon not found');
                }

                const data = await response.json();

                // แปลงข้อมูลให้ตรงกับ Type ของเรา
                const pokemonData: Pokemon = {
                    id: data.id,
                    name: data.name,
                    types: data.types.map((t: any) => t.type.name),
                    sprite: data.sprites.other['official-artwork'].front_default,
                    stats: {
                        hp: data.stats[0].base_stat,
                        attack: data.stats[1].base_stat,
                        defense: data.stats[2].base_stat,
                        speed: data.stats[5].base_stat,
                    }
                };

                setPokemon(pokemonData);
            } catch (err) {
                // ไม่แสดง error ถ้าเป็นการ abort
                if (err instanceof Error && err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();

        // Cleanup: Cancel request เมื่อ component unmount
        // หรือเมื่อ pokemonId เปลี่ยน
        return () => {
            abortController.abort();
        };
    }, [pokemonId]); // ทำงานเมื่อ pokemonId เปลี่ยน

    // Conditional Rendering
    if (loading) {
        return <div className="loading">กำลังโหลด...</div>;
    }

    if (error) {
        return <div className="error">❌ Error: {error}</div>;
    }

    if (!pokemon) {
        return <div>ไม่พบข้อมูล Pokemon</div>;
    }

    return (
        <div className="pokemon-detail">
            <img src={pokemon.sprite} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
            <div className="types">
                {pokemon.types.map(type => (
                    <span key={type} className={`type-badge ${type}`}>
            {type}
          </span>
                ))}
            </div>
            <div className="stats">
                <p>HP: {pokemon.stats.hp}</p>
                <p>Attack: {pokemon.stats.attack}</p>
                <p>Defense: {pokemon.stats.defense}</p>
                <p>Speed: {pokemon.stats.speed}</p>
            </div>
        </div>
    );
}

export default PokemonDetail;
