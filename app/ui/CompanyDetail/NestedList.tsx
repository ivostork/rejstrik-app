type NestedListProps = {
    items: string[];
    ordered?: boolean;
};

export default function NestedList({ items, ordered = false }: NestedListProps) {
    const ListTag = ordered ? 'ol' : 'ul';

    return (
        <ListTag className="nested-list">
            {items.map((item, index) => (
                <li key={index} className="nested-list-item">
                    {ordered && <span className="list-number">{index + 1}.</span>}
                    <span className="list-text">{item}</span>
                </li>
            ))}
        </ListTag>
    );
}
