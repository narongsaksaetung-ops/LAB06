import './TypeBadge.css';

interface TypeBadgeProps {
    type: string;
}

function TypeBadge({ type }: TypeBadgeProps) {
    return (
        <span className={`type-badge type-${type}`}>
      {type}
    </span>
    );
}

export default TypeBadge;
