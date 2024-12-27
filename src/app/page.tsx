"use client";

import React, { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import GameList from "@/components/gameList";
import { Game } from "@/types/games";
import { useGameStore } from "@/store/useGameStore";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";

const Home: React.FC = () => {
  const { loadGames, loading, currentGenre, setCurrentPage, currentPage, games, error } = useGameStore();
  const { addGame } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    loadGames();
  }, [loadGames])

  const handleAddToCart = (game: Game) => {
    addGame(game);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    loadGames(currentGenre ?? undefined, nextPage, true);
    router.replace(`?page=${nextPage}`);
  };


  return (
    <div className="max-w-[1280px] mx-auto">
      <h1>Game Store</h1>

      {!loading && <Loading color="blue-500" />}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      {loading && !error && 
        <>
          <GameList games={games} onAddToCart={handleAddToCart}/>
          {
            <div className="flex justify-center sm:justify-start">
              <button
                className="w-full max-w-[327px] sm:w-auto sm:max-w-none cursor-pointer font-sans font-semibold text-white bg-soft-gray rounded-lg px-6 py-5 mb-12"
                onClick={handleLoadMore}
              >
                SEE MORE
              </button>
            </div>
          }
        </>
      }
    </div>
  );
};

export default Home;