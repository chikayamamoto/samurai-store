import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db'; // DB共通モジュール
import { type ProductData } from '@/types/product';
// 商品データの型定義
type Product = Omit<ProductData, 'description'>;
// 全商品のデータを取得

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // クエリパラメータからpageとperPageを取得
        let page = Number(searchParams.get('page')) || 1;
        let perPage = Number(searchParams.get('perPage')) || 16;

        // 最小値・最大値を超えている場合は補正
        page = Math.max(1, Math.min(page, 1000)); // ページ番号は1～1000
        perPage = Math.max(1, Math.min(perPage, 100)); // 1ページ件数は1～100

        // オフセット（スキップする件数）を計算
        const offset = (page - 1) * perPage;
        // クエリパラメータから並べ替え条件を取得
        const sort = searchParams.get('sort') ?? 'new';
            // ORDER BY句に指定する条件を決定
    let order = '';
    switch (sort) {
      case 'priceAsc': // 価格が安い順
        order = 'ORDER BY price ASC';
        break;
      case 'new': // 新着順
      default:
        order = 'ORDER BY created_at DESC';
        break;
    }
        // 2つのデータベース操作を並行処理で実施
        const [products, totalItemsResult] = await Promise.all([
            // LIMITとOFFSETを使い、現在のページに表示する商品データだけを取得
            executeQuery<Product[]>(`
        SELECT *
        FROM products
        ${order}
        LIMIT ?
        OFFSET ?
        ;`, [perPage, offset]
            ),
            // 商品データの全件数を取得
            executeQuery<{ count: number }>(`
        SELECT COUNT(*) AS count
        FROM products
      ;`)
        ]);

        // 全件数を扱いやすい変数に取得
        const totalItems = totalItemsResult[0].count;

        // 総ページ数を計算
        const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

        // 取得した商品データとページネーション情報を返す
        return NextResponse.json({
            products, // 現在のページの商品データ
            pagination: { currentPage: page, perPage, totalItems, totalPages },
        });
    } catch (err) {
        console.error('商品取得エラー：', err);
        return NextResponse.json({ message: 'サーバーエラーが発生しました。' }, { status: 500 });
    }
}