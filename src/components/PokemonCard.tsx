import type {Pokemon} from '../types/pokemon';
import TypeBadge from './TypeBadge';
import './PokemonCard.css';

interface PokemonCardProps {
    pokemon: Pokemon;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
    onClick?: () => void;
}

function PokemonCard({
                         pokemon,
                         isFavorite,
                         onToggleFavorite,
                         onClick
                     }: PokemonCardProps) {
    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // ไม่ให้ trigger onClick ของ card
        onToggleFavorite(pokemon.id);
    };

    return (
        <div className="pokemon-card" onClick={onClick}>
            <button
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={handleFavoriteClick}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>

            <div className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</div>

            <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="pokemon-image"
                loading="lazy"
            />

            <h3 className="pokemon-name">{pokemon.name}</h3>

            <div className="pokemon-types">
                {pokemon.types.map(type => (
                    <TypeBadge key={type} type={type} />
                ))}
            </div>

            <div className="pokemon-stats">
                <div className="stat">
                    <span className="stat-label">HP</span>
                    <span className="stat-value">{pokemon.stats.hp}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">ATK</span>
                    <span className="stat-value">{pokemon.stats.attack}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">DEF</span>
                    <span className="stat-value">{pokemon.stats.defense}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">SPD</span>
                    <span className="stat-value">{pokemon.stats.speed}</span>
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;
