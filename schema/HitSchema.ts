export default interface Place {
  title: string;
  id: string;
  resultType: string;
  address: PlaceAddress;
  position: Position;
  access: Position[];
  distance: number;
  categories: Category[];
  references: Reference[];
  highlights: Highlights;
}

interface Position {
  lat: number;
  lng: number;
}

interface PlaceAddress {
  label: string;
}

interface Category {
  id: string;
  name: string;
  primary?: boolean;
}

interface Highlights {
  title: Title[];
  address: HighlightsAddress;
}

interface HighlightsAddress {
  label: Title[];
}

interface Title {
  start: number;
  end: number;
}

interface Reference {
  supplier: Supplier;
  id: string;
}

interface Supplier {
  id: string;
}
