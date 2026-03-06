import { useAppStore } from "@repo/store";
import { SearchBar } from "./search-bar";
import { SearchHistory } from "../../../_components/SearchHistory";

interface Props {
  term: string;
  setTerm: (val: string) => void;
}

export function HeroHeader({ term, setTerm }: Props) {
  const { addRecentSearch } = useAppStore();

  return (
    <header className="pt-10 space-y-10 relative z-20">
      <h1 className="text-[4rem] md:text-[8rem] font-black leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
        Listen <br /> Beyond <span className="text-blue-500 italic">Limits.</span>
      </h1>
      
      <div className="max-w-2xl space-y-4">
        <SearchBar 
          initialValue={term}
          onSearch={(val) => {
            setTerm(val);
            if (val) addRecentSearch(val);
          }} 
        />
        {!term && <SearchHistory onSelect={setTerm} />}
      </div>
    </header>
  );
}