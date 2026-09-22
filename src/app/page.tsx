'use client'; // クライアント（ブラウザ）側で動作

import Image from 'next/image'
import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';

// 商品データの型定義
type Product = {
  id: number
  name: string
  price: number
  imageUrl?: string
};

export default function Home() {
  // 商品データを保持するための状態
  const [products, setProducts] = useState<Product[]>([]);

  // コンポーネントの表示直後に一度だけ実行される処理
  useEffect(() => {
    // 商品APIからデータを取得
    fetch('/api/products')
      .then(res => res.json()) // JSON形式に変換
      .then(data => setProducts(data)) // 状態を更新
      .catch(err => console.error('商品データの取得に失敗しました。', err)); // エラー時の処理
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <section>
          <h2>
            <span>Pick Up</span>
            <span>|</span>
            <span>おすすめ商品</span>
          </h2>
          <div>
            {products
              .slice(0, 3)
              .map(item => (
                <ProductCard
                  key={`pickup-${item.id}`}
                  id={item.id.toString()}
                  title={item.name}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  imageSize={400}
                />
              ))}
          </div>
        </section>

        <section>
          <h2>
            <span>New Arrival</span>
            <span>|</span>
            <span>新着商品</span>
          </h2>
          <div>
            {products
              .slice(0, 4)
              .map(item => (
                <ProductCard
                  key={`new-${item.id}`}
                  id={item.id.toString()}
                  title={item.name}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  showCartButton
                />
              ))}
          </div>
        </section>

        <section>
          <h2>
            <span>Hot Items</span>
            <span>|</span>
            <span>注目商品</span>
          </h2>
          <div>
            {products
              .slice(0, 4)
              .map(item => (
                <ProductCard
                  key={`featured-${item.id}`}
                  id={item.id.toString()}
                  title={item.name}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  showCartButton
                />
              ))}
          </div>
        </section>

      </main>

    </div>
  );
}