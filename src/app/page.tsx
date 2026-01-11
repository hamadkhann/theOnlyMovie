import Popular from "./movie/popular/page";
import Trending from "./movie/trending/page";

export default async function Home() {
  return (
    <div className="p-6">
      <Trending />
      <Popular />
    </div>
  );
}
