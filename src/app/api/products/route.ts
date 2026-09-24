import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db'; // DB共通モジュール
// 商品データの型定義
type Product = {
    id: number;
    name: string;
    price: number;
    image_url?: string | null;
    review_avg?: number; // 平均評価（一般ユーザー向け）
    review_count?: number; // 総レビュー数（一般ユーザー向け）
    stock?: number; // 在庫数（管理者向け）
    updated_at?: string; // 最終更新日時（管理者向け）
};

// 全商品のデータを取得
export async function GET() {
    try { // DBから商品データを取得
        const products = await executeQuery<Product[]>('SELECT * FROM products;');
        return NextResponse.json(products);
    } catch (err) {
        console.error('商品取得エラー：', err);
        return NextResponse.json({ message: 'サーバーエラーが発生しました。' }, { status: 500 });
    }
}