'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
// 共通ヘッダー
export default function Header() {
    const searchParams = useSearchParams();
    const perPage = searchParams.get('perPage') || '16';
    const sort = searchParams.get('sort') || 'new';
    const keyword = searchParams.get('keyword') || '';

    return (
        <header className="bg-white shadow-md">

            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex-shrink-0">
                    <Link href="/">
                        <Image src="/images/samurai-store-logo.png" alt="SAMURAI Store" width={910} height={200} className="w-[250px] h-[55px] object-contain" />
                    </Link>
                </div>

                <nav className="flex-grow text-center mt-8">
                    <ul className="flex justify-center space-x-8 list-none">
                        <li className="border-r border-gray-300 pr-8"><Link href="/">ホーム</Link></li>
                        <li className="border-r border-gray-300 pr-8"><Link href="/products">商品一覧</Link></li>
                        <li><Link href="/contact">お問い合わせ</Link></li>
                    </ul>
                </nav>

                <div className="flex items-center space-x-6 flex-shrink-0">
                    <form action="/products" method="GET" className="hidden sm:block">
                        <input type="hidden" name="page" value="1" />
                        <input type="hidden" name="perPage" value={perPage} />
                        <input type="hidden" name="sort" value={sort} />
                        <input
                            type="text"
                            name="keyword"
                            placeholder="検索..."
                            defaultValue={keyword}
                            className="border border-gray-300 rounded-md py-1 px-3 text-sm focus:ring-2 focus:ring-indigo-500"
                        />
                    </form>
                    <Link href="/account/favorites">
                        <Image src="/icons/heart-icon.svg" alt="Favorites" width={24} height={24} className="w-6 h-6" />
                    </Link>
                    <Link href="/cart">
                        <Image src="/icons/cart-icon.svg" alt="Cart" width={24} height={24} className="w-6 h-6" />
                    </Link>
                    <Link href="/account">
                        <Image src="/icons/account-icon.svg" alt="Account" width={24} height={24} className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </header>
    );
}