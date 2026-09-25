import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db'; // DB共通モジュール
import { type ProductData } from '@/types/product';
// 商品データの型定義
type Product = ProductData; // 基本型から変更なし
// 指定IDの商品データを取得
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    // URLのパラメータからIDを取得
    const { id } = await context.params;

    // IDを数値に変換
    const productId = parseInt(id, 10);

    try { // DBから商品データを取得
        const result = await executeQuery<Product>(
            'SELECT * FROM products WHERE id = ?;',
            [productId]
        );

        // 指定IDの商品が見つからなかった場合
        if (result.length === 0) {
            return NextResponse.json(
                { message: '商品が見つかりませんでした。' },
                { status: 404 }
            );
        }

        // 取得した商品データを返却
        return NextResponse.json(result[0]);
    } catch (err) {
        console.error('商品取得エラー：', err);
        return NextResponse.json(
            { message: 'サーバーエラーが発生しました。' },
            { status: 500 }
        );
    }
    
}