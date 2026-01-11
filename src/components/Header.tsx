"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { HamburgerIcon } from "@/icons";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-red-500/20 shadow-lg backdrop-blur-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl md:text-2xl">🎬</span>
            <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent group-hover:from-red-400 group-hover:to-orange-400 transition-all duration-300">
              MovieExplorer
            </span>
          </Link>

          {/* Desktop: Search + Nav */}
          <div className="flex gap-4 items-center">
            {/* Search Bar */}
            <span className="hidden md:block">
              <SearchBar />
            </span>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6 lg:gap-8">
              <Link
                href="/movie/trending"
                className="relative text-gray-300 hover:text-white font-medium transition-colors duration-300 group"
              >
                <span className="relative z-10">Trending</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                <span className="absolute -inset-2 bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
              </Link>

              <Link
                href="/movie/popular"
                className="relative text-gray-300 hover:text-white font-medium transition-colors duration-300 group"
              >
                <span className="relative z-10">Popular</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                <span className="absolute -inset-2 bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
              </Link>

              <Link
                href="/movie/top-rated"
                className="relative text-gray-300 hover:text-white font-medium transition-colors duration-300 group"
              >
                <span className="relative z-10">Top Rated</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                <span className="absolute -inset-2 bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
              </Link>
            </div>

            {/* Hamburger - Mobile Only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-white text-2xl hover:text-red-500 transition-colors"
            >
              <HamburgerIcon />
            </button>
          </div>
        </nav>
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <Link href="movie/popular">
          <h1 className="text-white">hello</h1>
        </Link>
      </Sidebar>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <nav className="flex flex-col gap-4">
          <Link
            href="/movie/trending"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 p-3 rounded-lg transition-all"
          >
            <span className="text-xl">🔥</span>
            <span className="font-medium">Trending</span>
          </Link>

          <Link
            href="/movie/popular"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 p-3 rounded-lg transition-all"
          >
            <span className="text-xl">⭐</span>
            <span className="font-medium">Popular</span>
          </Link>

          <Link
            href="/movie/top-rated"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 p-3 rounded-lg transition-all"
          >
            <span className="text-xl">🏆</span>
            <span className="font-medium">Top Rated</span>
          </Link>

          {/* Mobile Search in Sidebar */}
          <div className="pt-4 mt-4 border-t border-gray-800">
            <p className="text-gray-400 text-sm mb-3">Search Movies</p>
            <SearchBar />
          </div>
        </nav>
      </Sidebar>
    </>
  );
}
