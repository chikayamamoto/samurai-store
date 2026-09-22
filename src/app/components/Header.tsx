import Link from 'next/link';
import Image from 'next/image';

// 共通ヘッダー
export default function Header() {
    return (
        <header>
            <div>
                <Link href="/">
                    <Image src="/images/samurai-store-logo.png" alt="SAMURAI Store" width={910} height={200} />
                </Link>
            </div>

            <nav>
                <ul>
                    <li><Link href="/">ホーム</Link></li>
                    <li><Link href="/products">商品一覧</Link></li>
                    <li><Link href="/contact">お問い合わせ</Link></li>
                </ul>
            </nav>

            <div>
                <input type="text" placeholder="検索..." />
                <Link href="/account/favorites">
                    <Image src="/icons/heart-icon.svg" alt="Favorites" width={24} height={24} />
                </Link>
                <Link href="/cart">
                    <Image src="/icons/cart-icon.svg" alt="Cart" width={24} height={24} />
                </Link>
                <Link href="/account">
                    <Image src="/icons/account-icon.svg" alt="Account" width={24} height={24} />
                </Link>
            </div>
        </header>
    );
}