
import React from 'react';
import ProductList from '@/components/ProductList';
import { type ProductCardProps } from '@/components/ProductCard';

// 商品一覧ページ
export default async function ProductsPage() {

    // 商品APIから商品データを取得
    const res = await fetch(`${process.env.BASE_URL}/api/products`, {
        cache: 'no-store'
    });

    // APIから返されたデータをJavaScriptの配列に変換
    const productArray = await res.json()
    console.log('API response:', productArray);
    if (!Array.isArray(productArray)) {
        console.error('商品データの取得に失敗しました。');
        return <p className="text-center text-gray-500 text-lg py-10">商品データの取得に失敗しました。</p>;
    }

    // 商品カードの形式に変換
    const products: ProductCardProps[] = productArray.map((row: any) => ({
        id: String(row.id),
        title: row.name,
        price: row.price,
        imageUrl: row.image_url ?? undefined
    }));

    return (
        <main className="p-8">
            <h1>商品一覧</h1>
            <section className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <p>{products.length}件の商品が見つかりました</p>
            </section>

            <section className="mb-8">
                <ProductList products={products} />
            </section>
        </main>
    );
}