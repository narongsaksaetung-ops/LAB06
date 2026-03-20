import Header from './components/Header';
import Footer from './components/Footer';
import PokemonCard from './components/PokemonCard';
import type { Pokemon } from './types/pokemon';
import './App.css';

// ข้อมูลตัวอย่าง (ยังไม่ได้ดึงจาก API)
const samplePokemons: Pokemon[] = [
    {
        id: 1,
        name: 'bulbasaur',
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        types: ['grass', 'poison'],
        stats: { hp: 45, attack: 49, defense: 49, speed: 45 },
    },
    {
        id: 4,
        name: 'charmander',
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
        types: ['fire'],
        stats: { hp: 39, attack: 52, defense: 43, speed: 65 },
    },
    {
        id: 7,
        name: 'squirtle',
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
        types: ['water'],
        stats: { hp: 44, attack: 48, defense: 65, speed: 43 },
    },
    {
        id: 25,
        name: 'pikachu',
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        types: ['electric'],
        stats: { hp: 35, attack: 55, defense: 40, speed: 90 },
    }
];

function App() {
    const handleToggleFavorite = (id: number) => {
        console.log('Toggle favorite:', id);
        // จะเพิ่ม logic ใน Part ถัดไป
    };

    return (
        <div className="app">
            <Header />

            <main className="main-content">
                <h2>Starter Pokemon</h2>

                {samplePokemons.length === 0 ? (
                    <p style={{ padding: '1rem' }}>No Pokémon to show.</p>
                ) : (
                    <div className="pokemon-grid">
                        {samplePokemons.map((pokemon) => (
                            <PokemonCard
                                key={pokemon.id}
                                pokemon={pokemon}
                                onToggleFavorite={handleToggleFavorite}
                                isFavorite={pokemon.id === 25} // Pikachu is favorite
                            />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default App;
