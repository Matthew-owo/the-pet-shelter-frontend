import CatList from "@/components/CatList";
import SearchCat from "@/components/SearchCat";

export default function Home() {
  return (
    <main>
      <SearchCat />
      <CatList />
    </main>
  );
}
