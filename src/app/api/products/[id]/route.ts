import { NextRequest, NextResponse } from 'next/server';

// 商品データの配列（ダミー）
const products = [
    { id: 1, name: 'アロマキャンドル', price: 1980 },
    { id: 2, name: 'ドライフラワー', price: 2580 },
    { id: 3, name: 'ガラス花瓶', price: 1200 },
    { id: 4, name: 'ルームスプレー', price: 980 }
];

// 指定IDの商品データを取得
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    // URLのパラメータからIDを取得
    const { id } = await context.params;

    // IDを数値に変換
    const productId = parseInt(id, 10);

    // 商品リストから、リクエストのIDと一致するデータを検索
    const product = products.find(p => p.id === productId);

    // 指定IDの商品が見つかった場合
    if (product) {
        // 商品データをJSON形式に変換して出力
        return NextResponse.json(product);
    } else {
        // 商品が見つからなかった場合、404 Not Foundエラーを出力
        return NextResponse.json(
            { message: '商品が見つかりませんでした。' },
            { status: 404 }
        );
    }
}