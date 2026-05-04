import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  onSelect: () => void;
}

export function ServiceCard({ icon: Icon, title, description, image, onSelect }: ServiceCardProps) {
  return (
    <div className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
      <img
        src={image}
        alt={title}
        className="w-full h-36 sm:h-40 object-cover rounded-lg mb-4"
        loading="lazy"
      />
      <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
        <Icon size={28} className="text-secondary" />
      </div>
      <h3 className="mb-2 text-base sm:text-lg font-semibold">
        {title}
      </h3>
      <p className="text-muted-foreground mb-4 text-sm flex-1">
        {description}
      </p>
      <button
        onClick={onSelect}
        className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg hover:opacity-90 transition-opacity mt-auto"
      >
        Select Service
      </button>
    </div>
  );
}
