'use client';

import { useEffect, useMemo, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import GameList from "@/components/gameList";
import { Game } from "@/types/games";
import { useGameStore } from "@/store/useGameStore";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/loading";
import { FilterDropdown } from "@/components/filterDropdown";
import { filterFormatter, urlFormatter } from "@/utils/urlFormatter";
import { allFilter } from "@/static/filters";

const Home = () => {
  const { 
    initialLoad,
    loadGames, 
    loading, 
    currentGenre, 
    availableFilters, 
    setCurrentGenre, 
    setCurrentPage, 
    setFilters,
    currentPage, 
    totalPages,
    games, 
    error
  } = useGameStore();
  const { addGame, deleteGame, cart } = useCartStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [firstLoad, setFirstLoad] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      let filter = filterFormatter(Array.from(searchParams.entries()));
      
      if(!firstLoad && window.location.search.length > 0){
        setFirstLoad(true);
        await initialLoad(filter.genre, filter.page);
      }else if(window.location.search.length === 0){
        const newUrl = urlFormatter({ currentRoute: window.location.search, page: 1, genre: allFilter });
        router.replace(newUrl);
        setFirstLoad(true);
        await initialLoad(currentGenre, currentPage);
      } else if(filter.genre !== currentGenre || filter.page !== currentPage) {
        setFirstLoad(true);
        await loadGames(currentGenre, currentPage, currentPage !== 1);
      }
    };
    
    fetchData();
  }, [loadGames, currentGenre, currentPage]);

  const handleRemoveFromCart = (game: Game) => {
    deleteGame(game.id);
  }

  const handleAddToCart = (game: Game) => {
    addGame(game);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    if(nextPage <= totalPages){
      setCurrentPage(nextPage);
      const newUrl = urlFormatter({ currentRoute: window.location.search, page: nextPage, genre: currentGenre });
      router.replace(newUrl);
    }
  };

  const handleSelectGenre = (genre: string) => {
    setFilters(genre, 1);
    const newUrl = urlFormatter({ currentRoute: window.location.search, page: 1, genre });
    router.replace(newUrl);
  }

  const cartMap: Map<string, boolean> = useMemo(() => {
    const map = new Map();
    cart.forEach((game) => {
      map.set(game.id, true)
    })
    return map;
  }, [cart])

  return (
    <div className="max-w-[1280px] mx-auto px-3">
      <h1 className="text-2xl md:text-3xl font-bold py-12">Top Sellers</h1>
      {loading && <Loading color="blue-500" />}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      {!loading && <FilterDropdown selectedOption={currentGenre} options={availableFilters} setSelectedOption={handleSelectGenre} />}
      {!loading && !error && 
        <>
          <GameList cartMap={cartMap} games={games} onRemoveFromCart={handleRemoveFromCart} onAddToCart={handleAddToCart}/>
          {
            currentPage < totalPages && (<div className="flex justify-center sm:justify-start">
              <button
                className="w-full max-w-[327px] sm:w-auto sm:max-w-none cursor-pointer font-sans font-semibold text-white bg-soft-gray rounded-lg px-6 py-5 mb-12"
                onClick={handleLoadMore}
              >
                SEE MORE
              </button>
            </div>)
          }
        </>
      }
    </div>
  );
};

export default Home;