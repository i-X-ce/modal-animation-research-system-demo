"use client";

import CartView from "./_components/CartView";
import ProductView from "./_components/ProductView";
import SettingButton from "./_components/SettingButton";
import { categories } from "./_consts/products";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="sticky top-0 z-20 border-b border-white/15 bg-[#0a0a0a]">
        <div className="flex h-24.5 items-center justify-between px-13 pr-22">
          <h1 className="font-wine-serif text-[24px] font-normal leading-none text-white">
            Vintage Selection
          </h1>
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-8 text-[16px] leading-none text-white/90">
              <a
                aria-current="page"
                className="border-b border-[#a3b3ff] pb-2 text-[#a3b3ff]"
                href="#menu"
              >
                メニュー
              </a>
              <a className="pb-2" href="#orders">
                注文履歴
              </a>
            </nav>
            <SettingButton />
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100dvh-98px)] grid-cols-[295px_minmax(0,1fr)_357px] bg-[#0a0a0a]">
        <aside
          className="border-r border-white/10 bg-[#171717]"
          id="categories"
        >
          <div className="px-8 py-8">
            <h2 className="text-[20px] font-normal text-white">Category</h2>
          </div>
          <div>
            {categories.map((category) => {
              const isSelected = category.selected === true;

              return (
                <div
                  key={category.label}
                  className={[
                    "flex items-baseline gap-6 px-6 py-4",
                    isSelected
                      ? "border-l-4 border-[#a3b3ff] bg-[rgba(163,179,255,0.10)] text-[#a3b3ff]"
                      : "text-white",
                  ].join(" ")}
                >
                  <span className="font-wine-serif text-[20px] leading-none">
                    {category.number}
                  </span>
                  <span className={isSelected ? "font-bold" : "font-medium"}>
                    {category.label}
                  </span>
                </div>
              );
            })}
          </div>
        </aside>

        <section className="px-8 pt-8" id="menu">
          <ProductView />
        </section>

        <aside className="border-l border-white/10 bg-[#171717]" id="orders">
          <CartView />
        </aside>
      </div>
    </main>
  );
}
