import useFetch from '../hooks/useFetch';

interface PokemonListResponse {
    count: number;
    results: Array<{
        name: string;
        url: string;
    }>;
}

function PokemonList() {
    const { data, loading, error, refetch } = useFetch<PokemonListResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=20'
    );

    if (loading) return <div className="loading">กำลังโหลด...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!data) return null;

    return (
        <div>
            <div className="header">
                <h2>Pokemon ({data.count} ตัว)</h2>
                <button onClick={refetch}>🔄 รีเฟรช</button>
            </div>

            <ul className="pokemon-list">
                {data.results.map((pokemon, index) => (
                    <li key={pokemon.name}>
                        #{index + 1} {pokemon.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PokemonList;
