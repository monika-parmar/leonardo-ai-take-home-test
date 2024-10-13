type Info = {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
};

type CharacterResults = {
  id: number;
  name: string;
  status: string | null;
  image: string;
  species: string;
  type: string | null;
  gender: string;
  origin: string;
};

type CharacterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  character: CharacterResults;
};

type Character = {
  info: Info;
  results: CharacterResults;
};
